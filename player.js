// player.js
// Kelas untuk karakter pemain

class Player {
    constructor(x, y, width, height, imagePath = null) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.imagePath = imagePath;
        this.color = '#FFFFFF';
        this.image = null;

        if (imagePath) {
            this.image = new Image();
            this.image.src = imagePath;
        }

        // Fisika
        this.velX = 0;
        this.velY = 0;
        this.speed = 5;
        this.jumpPower = 15;
        this.gravity = 0.8;
        this.maxFallSpeed = 20;

        // Status
        this.onGround = false;
        this.alive = true;
        this.spawnX = x;
        this.spawnY = y;

        // Kontrol
        this.facingRight = true;

        // Keyboard state
        this.keys = {};
    }

    handleInput() {
        if (!this.alive) return;

        // Gerakan horizontal
        this.velX = 0;
        if (this.keys['ArrowLeft'] || this.keys['a'] || this.keys['A']) {
            this.velX = -this.speed;
            this.facingRight = false;
        }
        if (this.keys['ArrowRight'] || this.keys['d'] || this.keys['D']) {
            this.velX = this.speed;
            this.facingRight = true;
        }

        // Lompat
        if ((this.keys[' '] || this.keys['ArrowUp'] || this.keys['w'] || this.keys['W']) && this.onGround) {
            this.velY = -this.jumpPower;
            this.onGround = false;
        }
    }

    update(platforms) {
        if (!this.alive) return;

        // Gravitasi
        this.velY += this.gravity;
        if (this.velY > this.maxFallSpeed) {
            this.velY = this.maxFallSpeed;
        }

        // Gerakan horizontal
        this.x += this.velX;
        this.checkCollisionX(platforms);

        // Gerakan vertikal
        this.y += this.velY;
        this.onGround = false;
        this.checkCollisionY(platforms);

        // Mati jika jatuh ke bawah
        if (this.y > 800) {
            this.die();
        }
    }

    checkCollisionX(platforms) {
        for (let platform of platforms) {
            if (platform.type === 'decoration' || platform.type === 'item') continue;
            if (platform.type === 'invisible_block' && !platform.visible) continue;

            if (this.intersects(platform)) {
                if (this.velX > 0) { // Bergerak ke kanan
                    this.x = platform.x - this.width;
                } else if (this.velX < 0) { // Bergerak ke kiri
                    this.x = platform.x + platform.width;
                }
            }
        }
    }

    checkCollisionY(platforms) {
        for (let platform of platforms) {
            if (platform.type === 'decoration' || platform.type === 'item') continue;
            if (platform.type === 'invisible_block' && !platform.visible) continue;

            if (this.intersects(platform)) {
                if (this.velY > 0) { // Jatuh ke bawah
                    this.y = platform.y - this.height;
                    this.velY = 0;
                    this.onGround = true;

                    // Aktifkan trap platform jika dipijak
                    if (platform.type === 'trap_platform') {
                        platform.activate();
                    }
                } else if (this.velY < 0) { // Melompat ke atas
                    this.y = platform.y + platform.height;
                    this.velY = 0;

                    // Reveal invisible block jika dipukul dari bawah
                    if (platform.type === 'invisible_block') {
                        platform.reveal();
                    }
                }
            }
        }
    }

    intersects(obj) {
        return this.x < obj.x + obj.width &&
            this.x + this.width > obj.x &&
            this.y < obj.y + obj.height &&
            this.y + this.height > obj.y;
    }

    die() {
        this.alive = false;
    }

    respawn() {
        this.x = this.spawnX;
        this.y = this.spawnY;
        this.velX = 0;
        this.velY = 0;
        this.alive = true;
        this.onGround = false;
    }

    draw(ctx, cameraX) {
        const drawX = this.x - cameraX;

        if (this.image && this.image.complete) {
            ctx.save();
            if (!this.facingRight) {
                ctx.scale(-1, 1);
                ctx.drawImage(this.image, -drawX - this.width, this.y, this.width, this.height);
            } else {
                ctx.drawImage(this.image, drawX, this.y, this.width, this.height);
            }
            ctx.restore();
        } else {
            ctx.fillStyle = this.color;
            ctx.fillRect(drawX, this.y, this.width, this.height);
        }
    }
}
