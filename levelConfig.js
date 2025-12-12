// levelConfig.js
// Konfigurasi level - di sini Anda bisa menambahkan gambar di berbagai tempat!

/*
CARA MENAMBAHKAN OBJEK KE LEVEL:
================================

Setiap objek memiliki format:
{
    type: 'tipe_objek',
    x: posisi_x,
    y: posisi_y,
    width: lebar,
    height: tinggi,
    image: 'path/ke/gambar.png'  // opsional
}

TIPE OBJEK YANG TERSEDIA:
- 'platform': Platform solid yang bisa dipijak
- 'enemy': Musuh yang bergerak kiri-kanan
- 'item': Item seperti koin atau question block
- 'decoration': Dekorasi yang tidak berinteraksi
- 'trap_platform': Platform yang jatuh saat dipijak (jebakan!)
- 'invisible_block': Blok tak terlihat yang muncul saat dipukul dari bawah

PARAMETER TAMBAHAN:
- Enemy: moveRange (jarak gerakan), speed (kecepatan)
- Item: itemType (tipe item: 'coin', 'powerup', 'goal', dll)
*/

function createLevel1() {
    return [
        // Ground/Tanah
        { type: 'platform', x: 0, y: 550, width: 800, height: 50, image: 'assets/block.png' },
        { type: 'platform', x: 900, y: 550, width: 400, height: 50, image: 'assets/block.png' },
        { type: 'platform', x: 1400, y: 550, width: 600, height: 50, image: 'assets/block.png' },

        // Platform melayang
        { type: 'platform', x: 300, y: 450, width: 100, height: 32, image: 'assets/block.png' },
        { type: 'platform', x: 500, y: 400, width: 100, height: 32, image: 'assets/block.png' },
        { type: 'platform', x: 700, y: 350, width: 100, height: 32, image: 'assets/block.png' },

        // Platform jebakan! (akan jatuh saat dipijak)
        { type: 'trap_platform', x: 1000, y: 450, width: 100, height: 32, image: 'assets/block.png' },

        // Blok tak terlihat (muncul saat dipukul dari bawah)
        { type: 'invisible_block', x: 600, y: 300, width: 32, height: 32, image: 'assets/item.png' },

        // Question blocks
        { type: 'item', x: 400, y: 350, width: 32, height: 32, image: 'assets/item.png' },
        { type: 'item', x: 800, y: 250, width: 32, height: 32, image: 'assets/item.png' },
        { type: 'item', x: 1200, y: 450, width: 32, height: 32, image: 'assets/item.png' },

        // Musuh
        { type: 'enemy', x: 1100, y: 510, width: 32, height: 32, image: 'assets/enemy.png', moveRange: 150, speed: 2 },
        { type: 'enemy', x: 1500, y: 510, width: 32, height: 32, image: 'assets/enemy.png', moveRange: 200, speed: 3 },

        // Dekorasi (bukit hijau)
        { type: 'decoration', x: 50, y: 450, width: 150, height: 100, image: 'assets/hill.png' },
        { type: 'decoration', x: 1300, y: 450, width: 150, height: 100, image: 'assets/hill.png' },

        // Platform tinggi untuk goal
        { type: 'platform', x: 1800, y: 350, width: 200, height: 32, image: 'assets/block.png' },
        { type: 'item', x: 1850, y: 250, width: 64, height: 64, image: 'assets/item.png', itemType: 'goal' },
    ];
}

function createCustomLevel() {
    /*
    Level kustom - TAMBAHKAN GAMBAR ANDA DI SINI!
    
    Contoh menambahkan objek:
    1. Letakkan file gambar di folder 'assets/'
    2. Tambahkan objek baru ke array di bawah
    3. Atur posisi x, y, ukuran, dan path gambar
    */
    return [
        // Tanah dasar
        { type: 'platform', x: 0, y: 550, width: 3000, height: 50, image: 'assets/block.png' },

        // TAMBAHKAN OBJEK ANDA DI SINI!
        // Contoh:
        // {type: 'decoration', x: 200, y: 300, width: 100, height: 100, image: 'assets/gambar_saya.png'},
        // {type: 'platform', x: 500, y: 400, width: 150, height: 32, image: 'assets/platform_kustom.png'},
        // {type: 'enemy', x: 800, y: 510, width: 40, height: 40, image: 'assets/musuh_saya.png', moveRange: 100, speed: 2},
    ];
}

// Level yang akan dimuat (ganti dengan createCustomLevel() untuk level kustom)
function getCurrentLevel() {
    return createLevel1(); // Ganti dengan createCustomLevel() jika ingin level kustom
}
