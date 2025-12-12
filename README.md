# Cat Mario - Versi Web

Game platformer bergaya Cat Mario yang bisa dimainkan langsung di browser! Dibuat dengan HTML5 Canvas dan JavaScript.

## 🎮 Cara Menjalankan

### Opsi 1: Buka Langsung (Lokal)
1. Buka file `index.html` di browser (Chrome, Firefox, Edge, Safari)
2. Game langsung bisa dimainkan!

### Opsi 2: Menggunakan Live Server (Recommended)
Jika menggunakan VS Code:
1. Install extension "Live Server"
2. Klik kanan pada `index.html`
3. Pilih "Open with Live Server"
4. Game akan terbuka di browser dengan auto-reload

### Opsi 3: Python HTTP Server
```bash
# Di folder web/, jalankan:
python -m http.server 8000

# Buka browser dan kunjungi:
# http://localhost:8000
```

## 🌐 Deploy ke Internet (GRATIS!)

### GitHub Pages (Recommended)

1. **Buat Repository GitHub**
   - Buat repository baru di GitHub
   - Upload semua file di folder `web/`

2. **Aktifkan GitHub Pages**
   - Masuk ke Settings repository
   - Scroll ke bagian "Pages"
   - Pilih branch `main` dan folder `/ (root)`
   - Klik Save

3. **Akses Game**
   - Game akan tersedia di: `https://username.github.io/repository-name/`
   - Tunggu 1-2 menit untuk deployment

### Netlify

1. **Daftar di Netlify** (gratis): https://www.netlify.com
2. **Drag & Drop**
   - Drag folder `web/` ke Netlify dashboard
   - Atau connect ke GitHub repository
3. **Game Live!**
   - Netlify akan berikan URL gratis
   - Contoh: `https://your-game.netlify.app`

### Vercel

1. **Daftar di Vercel** (gratis): https://vercel.com
2. **Import Project**
   - Connect GitHub repository
   - Atau upload folder `web/`
3. **Deploy**
   - Vercel otomatis deploy
   - URL: `https://your-game.vercel.app`

## 🎯 Kontrol Game

- **Panah Kiri/Kanan** atau **A/D**: Gerak kiri/kanan
- **Spasi** atau **Panah Atas** atau **W**: Lompat
- **R**: Restart (saat game over)
- **ESC**: Keluar

## ✨ Fitur

- ✅ Fisika platformer ala Mario
- ✅ Jebakan platform yang jatuh
- ✅ Blok tak terlihat
- ✅ Musuh yang bergerak
- ✅ Animasi jalan dari kanan
- ✅ Sistem konfigurasi level mudah
- ✅ Responsive design
- ✅ Berjalan di semua browser modern

## 📝 Cara Kustomisasi

### Mengganti Gambar

1. Letakkan gambar baru di folder `assets/`
2. Edit `levelConfig.js` untuk menggunakan gambar baru
3. Refresh browser

### Mengatur Animasi Jalan

Edit file `game.js` baris 31-38:

```javascript
this.roadWidth = 500;           // Lebar gambar jalan
this.roadHeight = 300;          // Tinggi gambar jalan
this.roadTargetX = SCREEN_WIDTH - 650;  // Posisi akhir
this.roadY = SCREEN_HEIGHT - 450;       // Posisi vertikal
this.roadTriggerX = 1700;       // Kapan jalan muncul
this.roadAnimationSpeed = 5;    // Kecepatan animasi
```

### Membuat Level Baru

Edit `levelConfig.js`:

```javascript
function createCustomLevel() {
    return [
        // Tambahkan objek di sini
        {type: 'platform', x: 0, y: 550, width: 800, height: 50, image: 'assets/block.png'},
        {type: 'enemy', x: 500, y: 510, width: 32, height: 32, image: 'assets/enemy.png', moveRange: 150, speed: 2},
        // dll...
    ];
}

// Ganti return value di getCurrentLevel()
function getCurrentLevel() {
    return createCustomLevel(); // Gunakan level kustom
}
```

## 🗂️ Struktur File

```
web/
├── index.html          # File HTML utama
├── style.css           # Styling
├── game.js             # Game engine
├── player.js           # Player class
├── gameObjects.js      # Game objects
├── levelConfig.js      # Konfigurasi level
├── README.md           # File ini
├── DEPLOYMENT.md       # Panduan deployment
└── assets/             # Gambar game
    ├── player.png
    ├── block.png
    ├── enemy.png
    ├── item.png
    ├── background.png
    ├── hill.png
    └── road.jpeg
```

## 🔧 Troubleshooting

**Gambar tidak muncul?**
- Pastikan path gambar benar
- Cek console browser (F12) untuk error
- Pastikan file gambar ada di folder `assets/`

**Game tidak jalan?**
- Buka console browser (F12) untuk lihat error
- Pastikan semua file JavaScript dimuat
- Coba refresh browser (Ctrl+F5)

**Kontrol tidak responsif?**
- Klik di area canvas terlebih dahulu
- Pastikan tidak ada input lain yang aktif

## 🌟 Kelebihan Versi Web

- ✅ Tidak perlu install apapun
- ✅ Bisa dimainkan di semua device (PC, tablet, mobile)
- ✅ Mudah di-share (tinggal kirim link)
- ✅ Gratis hosting di GitHub Pages/Netlify/Vercel
- ✅ Update mudah (tinggal upload file baru)
- ✅ Cross-platform (Windows, Mac, Linux, Android, iOS)

## 📱 Mobile Support

Game bisa dimainkan di mobile browser, tapi kontrol keyboard perlu diganti dengan touch controls. Untuk menambahkan touch controls, bisa tambahkan virtual buttons di HTML/CSS.

## 🎨 Kustomisasi Tampilan

Edit `style.css` untuk mengubah:
- Warna background
- Font
- Layout
- Animasi
- Responsive breakpoints

## 📦 Versi Python vs Web

| Fitur | Python | Web |
|-------|--------|-----|
| Platform | Windows/Mac/Linux | Semua (Browser) |
| Install | Perlu Python + Pygame | Tidak perlu |
| Sharing | Kirim file .exe | Kirim link |
| Mobile | Tidak | Ya (browser) |
| Hosting | Tidak | Gratis (GitHub Pages) |
| Update | Download ulang | Auto (refresh) |

## 🚀 Next Steps

1. **Test Game**: Buka `index.html` dan mainkan!
2. **Kustomisasi**: Edit level, gambar, atau animasi
3. **Deploy**: Upload ke GitHub Pages atau Netlify
4. **Share**: Bagikan link game ke teman!

---

**Selamat bermain dan berkreasi! 🎮✨**

Butuh bantuan? Cek `DEPLOYMENT.md` untuk panduan lengkap deployment.
