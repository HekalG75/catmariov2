// game.js
// Game engine utama - Cat Mario Style Platformer
// VERSI MP3 - Music menggunakan file MP3 lokal

const SCREEN_WIDTH = 800;
const SCREEN_HEIGHT = 600;
const FPS = 60;
const BACKGROUND_COLOR = '#87CEEB'; // Biru langit

class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');

        // Setup canvas
        this.canvas.width = SCREEN_WIDTH;
        this.canvas.height = SCREEN_HEIGHT;

        // Background
        this.background = new Image();
        this.background.src = 'assets/background.png';

        // Game state
        this.running = false;
        this.gameOver = false;
        this.win = false;

        // Kamera
        this.cameraX = 0;

        // Animasi VIDEO dari kanan (ending)
        this.endingVideo = document.createElement('video');
        this.endingVideo.src = 'assets/video.mp4';
        this.endingVideo.loop = true;
        this.endingVideo.muted = false;
        this.endingVideo.style.display = 'none';
        document.body.appendChild(this.endingVideo);

        this.videoWidth = 500;
        this.videoHeight = 300;
        this.videoX = SCREEN_WIDTH;
        this.videoTargetX = SCREEN_WIDTH - 650;
        this.videoY = SCREEN_HEIGHT - 450;
        this.videoVisible = false;
        this.videoTriggerX = 1700;
        this.videoAnimationSpeed = 5;
        this.videoPlaying = false;

        // Background Music - MP3 LOKAL (Simple & Reliable!)
        // Letakkan file music.mp3 di folder assets/
        this.bgMusic = new Audio('assets/music.mp3');
        this.bgMusic.loop = true;
        this.bgMusic.volume = 0.3; // 30% volume
        this.musicReady = false;
        this.musicMuted = false;

        // Load level
        this.loadLevel();

        // Setup keyboard
        this.setupKeyboard();

        // Setup music start on user interaction
        this.setupMusicStart();

        // Start game loop
        this.lastTime = 0;
        this.running = true;
        requestAnimationFrame((time) => this.gameLoop(time));
    }

    loadLevel() {
        // Buat pemain
        this.player = new Player(100, 400, 32, 32, 'assets/player.png');

        // Buat objek dari konfigurasi level
        this.platforms = [];
        this.enemies = [];
        this.items = [];
        this.decorations = [];

        const levelData = getCurrentLevel();

        for (let obj of levelData) {
            const { type, x, y, width, height, image, moveRange, speed, itemType } = obj;

            if (type === 'platform') {
                this.platforms.push(new Platform(x, y, width, height, image));
            } else if (type === 'trap_platform') {
                this.platforms.push(new TrapPlatform(x, y, width, height, image));
            } else if (type === 'invisible_block') {
                this.platforms.push(new InvisibleBlock(x, y, width, height, image));
            } else if (type === 'enemy') {
                const enemy = new Enemy(x, y, width, height, image, moveRange || 100, speed || 2);
                this.enemies.push(enemy);
                this.platforms.push(enemy);
            } else if (type === 'item') {
                const item = new Item(x, y, width, height, image, itemType || 'coin');
                this.items.push(item);
            } else if (type === 'decoration') {
                const deco = new Decoration(x, y, width, height, image);
                this.decorations.push(deco);
            }
        }
    }

    setupKeyboard() {
        document.addEventListener('keydown', (e) => {
            this.player.keys[e.key] = true;

            // ESC untuk keluar
            if (e.key === 'Escape') {
                this.running = false;
            }

            // R untuk restart
            if ((this.gameOver || this.win) && (e.key === 'r' || e.key === 'R')) {
                this.resetGame();
            }

            // M untuk mute/unmute music
            if (e.key === 'm' || e.key === 'M') {
                this.toggleMusic();
            }

            // Prevent default untuk arrow keys dan space
            if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
                e.preventDefault();
            }
        });

        document.addEventListener('keyup', (e) => {
            this.player.keys[e.key] = false;
        });
    }

    toggleMusic() {
        if (this.bgMusic) {
            this.musicMuted = !this.musicMuted;
            this.bgMusic.muted = this.musicMuted;
            console.log(this.musicMuted ? '🔇 Music muted' : '🔊 Music unmuted');
        }
    }

    setupMusicStart() {
        // Music akan start saat user interact pertama kali (klik atau keypress)
        const startMusic = () => {
            this.bgMusic.play().then(() => {
                this.musicReady = true;
                console.log('🎵 Music started! Press M to mute/unmute');
            }).catch(e => {
                console.log('Click anywhere to start music');
            });

            // Remove listener setelah music start
            document.removeEventListener('click', startMusic);
            document.removeEventListener('keydown', startMusic);
        };

        // Listen untuk click atau keypress pertama
        document.addEventListener('click', startMusic);
        document.addEventListener('keydown', startMusic);
    }

    update() {
        if (this.gameOver || this.win) return;

        // Input pemain
        this.player.handleInput();

        // Update pemain
        this.player.update(this.platforms);

        // Update musuh
        for (let enemy of this.enemies) {
            enemy.update();
        }

        // Update trap platforms
        for (let platform of this.platforms) {
            if (platform.update) {
                platform.update();
            }
        }

        // Cek tabrakan dengan musuh
        for (let enemy of this.enemies) {
            if (this.player.intersects(enemy) && this.player.alive) {
                this.player.die();
            }
        }

        // Cek tabrakan dengan item
        for (let item of this.items) {
            if (!item.collected && this.player.intersects(item)) {
                if (item.itemType === 'goal') {
                    this.win = true;
                } else {
                    item.collect();
                }
            }
        }

        // Trigger animasi VIDEO saat pemain mencapai posisi tertentu
        if (this.player.x >= this.videoTriggerX && !this.videoVisible) {
            this.videoVisible = true;
            // Play video saat triggered
            if (!this.videoPlaying) {
                this.endingVideo.play().catch(e => console.log('Video autoplay blocked:', e));
                this.videoPlaying = true;
            }
        }

        // Update animasi video (slide dari kanan)
        if (this.videoVisible && this.videoX > this.videoTargetX) {
            this.videoX -= this.videoAnimationSpeed;
            if (this.videoX < this.videoTargetX) {
                this.videoX = this.videoTargetX;
            }
        }

        // Update kamera
        this.updateCamera();

        // Cek game over
        if (!this.player.alive) {
            this.gameOver = true;
        }
    }

    updateCamera() {
        const targetX = this.player.x - SCREEN_WIDTH / 3;
        this.cameraX = Math.max(0, targetX);
    }

    draw() {
        // Background
        if (this.background.complete) {
            this.ctx.drawImage(this.background, 0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
        } else {
            this.ctx.fillStyle = BACKGROUND_COLOR;
            this.ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
        }

        // Gambar dekorasi (layer belakang)
        for (let deco of this.decorations) {
            deco.draw(this.ctx, this.cameraX);
        }

        // Gambar platform
        for (let platform of this.platforms) {
            platform.draw(this.ctx, this.cameraX);
        }

        // Gambar item
        for (let item of this.items) {
            if (!item.collected) {
                item.draw(this.ctx, this.cameraX);
            }
        }

        // Gambar pemain
        if (this.player.alive) {
            this.player.draw(this.ctx, this.cameraX);
        }

        // Gambar VIDEO yang muncul dari kanan (jika sudah triggered)
        if (this.videoVisible) {
            // Draw video frame ke canvas
            if (this.endingVideo.readyState >= 2) {
                this.ctx.drawImage(this.endingVideo, this.videoX, this.videoY, this.videoWidth, this.videoHeight);
            } else {
                // Fallback: kotak abu-abu dengan teks "Loading video..."
                this.ctx.fillStyle = '#808080';
                this.ctx.fillRect(this.videoX, this.videoY, this.videoWidth, this.videoHeight);
                this.ctx.fillStyle = '#FFFFFF';
                this.ctx.font = '20px Arial';
                this.ctx.textAlign = 'center';
                this.ctx.fillText('Loading video...', this.videoX + this.videoWidth / 2, this.videoY + this.videoHeight / 2);
                this.ctx.textAlign = 'left';
            }
        }

        // UI - Instruksi
        this.ctx.fillStyle = '#000000';
        this.ctx.font = '16px Arial';
        this.ctx.fillText('Panah/WASD: Gerak | Spasi/Up: Lompat | M: Music | ESC: Keluar', 10, 20);

        // Game Over
        if (this.gameOver) {
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            this.ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

            this.ctx.fillStyle = '#FF0000';
            this.ctx.font = 'bold 48px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText('GAME OVER!', SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2);

            this.ctx.fillStyle = '#000000';
            this.ctx.font = '24px Arial';
            this.ctx.fillText('Tekan R untuk restart', SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2 + 50);
            this.ctx.textAlign = 'left';
        }

        // Win
        if (this.win) {
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            this.ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

            this.ctx.fillStyle = '#00FF00';
            this.ctx.font = 'bold 48px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText('KAMU MENANG!', SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2);

            this.ctx.fillStyle = '#000000';
            this.ctx.font = '24px Arial';
            this.ctx.fillText('Tekan R untuk main lagi', SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2 + 50);
            this.ctx.textAlign = 'left';
        }
    }

    resetGame() {
        this.gameOver = false;
        this.win = false;
        this.cameraX = 0;
        // Reset video
        this.videoX = SCREEN_WIDTH;
        this.videoVisible = false;
        this.videoPlaying = false;
        this.endingVideo.pause();
        this.endingVideo.currentTime = 0;
        this.loadLevel();
    }

    gameLoop(currentTime) {
        if (!this.running) return;

        const deltaTime = currentTime - this.lastTime;
        this.lastTime = currentTime;

        this.update();
        this.draw();

        requestAnimationFrame((time) => this.gameLoop(time));
    }
}

// Start game saat halaman dimuat
window.addEventListener('load', () => {
    new Game();
});
