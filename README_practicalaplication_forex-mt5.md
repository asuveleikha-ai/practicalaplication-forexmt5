# practicalaplication-forexmt5

Kita Market Intelligent, bukan penebak harga. 1. Baca akurat: Forex Factory, bank sentral, MT5. 2. Saring hati-hati: fakta vs opini vs prediksi. 3. Sampaikan jelas: pair apa, efeknya, kapan. Akurat sebelum cepat, hati-hati sebelum ramai. Observasi dulu, baru beritakan.

> ⚠️ REPO PRIVATE - EDUKASI & OBSERVASI
> Repo ini PRIVATE. Jangan share link repo sembarangan. Share hanya HASIL observasi yang sudah matang via WhatsApp / Email / Sosial Media. Ini bukan sinyal trading, bukan ajakan trading, bukan jaminan profit. Semua uang di simulasi adalah VIRTUAL.

## Kita Sebagai Market Intelligent

Kita memberikan informasi news secara akurat dan hati-hati untuk perdagangan derivatif - bursa berjangka forex, untuk pengguna dan masyarakat internasional yang menggandrungi forex.

Tugas kita cuma 3:
1. **Baca dengan akurat** - Cek dari sumbernya: Forex Factory Calendar, bank sentral, MT5 / MT4. Jam, mata uang, impact, forecast vs previous vs actual. Bukan dari rumor.
2. **Saring dengan hati-hati** - Bedakan fakta, opini, dan prediksi. Kalau belum pasti, bilang belum pasti. Jangan bikin panik.
3. **Sampaikan dengan jelas** - Pair apa, efeknya seberapa besar, kapan. Bisa dipahami orang awam.

Prinsip: **Akurat sebelum cepat, hati-hati sebelum ramai. Observasi dulu, baru beritakan.**

## Struktur Project

Persis seperti repo sebelumnya, tapi khusus forex:

```
practicalaplication-forexmt5/
├── index.html              # HOME - Pintu masuk
├── index_neural.html       # INDEX NEURAL - Otak, dashboard MT5 View
├── index_classic.html      # INDEX KLASIK - Hati, karakter manusia
├── surfing.html            # SURFING GAME - Badan, game observasi
├── koneksi_real.md         # Cara sambung ke MT5 / Forex Factory
├── README.md               # File ini
└── .gitignore
```

### 1. INDEX NEURAL - Otak
- MT5 VIEW: Mirror layout MT5 - Market Watch kiri, Chart tengah, Stochastic bawah
- Contoh referensi: GBPUSD H1, 1.32305, Stochastic (5,3,3) 19.77 / 15.14 = Oversold
- 4 Robot: Fundamental, Teknikal, Opini Politik, Festival / Hari Raya
- Forex Calendar: Forex Factory - https://www.forexfactory.com/calendar

### 2. INDEX KLASIK - Hati
Menerjemahkan data dingin jadi cerita manusia:
- Si Pengeluh - trader yang loss / nyangkut
- Si Gembira - profit karena baca event Diwali / emas
- Si Sehari-hari - pedagang, ibu rumah tangga saat Lebaran / Imlek / Isra Miraj
- Si Pengamat Politik - baca pidato FOMC / ECB / bank sentral

### 3. SURFING GAME - Badan
- Ombak = Chart harga
- Papan = Modal virtual $100,000
- Ombak besar = High Impact / Hari Raya
- Tugas: baca ombak Fundamental, Teknikal, Politik, Festival dengan benar

## 4 Model Prediksi

1. **Fundamental:** Suku bunga, CPI, NFP, GDP, Retail Sales, FOMC Minutes
2. **Teknikal:** MA, RSI, MACD, Bollinger, Fibonacci, Support-Resistance, Stochastic
3. **Opini Politik:** Pemilu, perang dagang, sanksi, pernyataan presiden / bank sentral, geopolitik
4. **Festival / Hari Raya / Musiman:**
   - Hindu India: Diwali, Musim Pernikahan, Akshaya Tritiya -> Emas / USD/INR / NIFTY 50
   - Natal: Likuiditas tipis, spread melebar, year-end positioning
   - Imlek: Pasar China / Hong Kong / Singapura libur, repatriasi dana
   - Islam: Ramadhan, Lebaran Idul Fitri, Isra Miraj, Idul Adha -> USD/IDR, IHSG, konsumsi

## Format Laporan Agar Meyakinkan & Tepat

Jangan pernah tulis PASTI 100%. Selalu pakai format ini:

```
OBSERVASI - [PAIR] [TIMEFRAME]
Sumber: Forex Factory + MT5
Data: [angka + jam WIB]
Sinyal: [misal Stochastic oversold 19.77]
Prediksi: Potensi [naik/turun] ke [harga], jika jebol [harga batal] maka batal.
Keyakinan: [misal 68%] - Observasi, bukan ajakan trading.
```

Contoh:
> OBSERVASI - GBPUSD H1
> Sumber: Forex Factory + MT5
> Sinyal: Stochastic oversold 19.77
> Prediksi: Potensi rebound ke 1.32650, jika jebol 1.31900 batal.
> Keyakinan: 68% - Observasi, bukan ajakan trading.

## Koneksi Real - MT5 / MT4

MT5 Web tidak bisa di-copas / di-embed karena butuh login broker dan data terenkripsi.
Platform resmi: https://www.metatrader5.com/en/trading-platform/web-trading

3 cara koneksi:
1. **EA Bridge (paling akurat):** EA di MT5 kirim harga tiap detik via WebSocket ke Index Neural
2. **Broker API:** Jika broker support MetaApi / API
3. **Screen / Kamera OCR (cadangan):** Kamera baca layar MT5, AI baca angka & warna candle. Butuh jendela MT5 terbuka, delay 1-2 detik.

Sampai bridge tersambung, Index Neural memakai data simulasi yang meniru layout MT5.

## Aturan Share - Private Repo

Repo ini PRIVATE.
- Jangan share link repo ke publik.
- Untuk undang orang lihat kode: Settings > Collaborators > Add people.
- Untuk publik: share HANYA hasil observasi yang sudah matang, via WhatsApp / Email / Sosial Media.

Teks share yang aman:
> Hasil observasi Market Intelligent hari ini. Bukan sinyal pasti, tapi hasil baca data Forex Factory + MT5. Observasi dulu, baru putuskan.

## Disclaimer

Simulasi & observasi edukasi. Virtual money. Bukan nasihat keuangan. Perdagangan derivatif / bursa berjangka berisiko tinggi. Selalu verifikasi ke sumber resmi sebelum mengambil keputusan.
