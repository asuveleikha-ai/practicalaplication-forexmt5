import streamlit as st

def check_password():
    if "auth" not in st.session_state:
        st.session_state.auth = False
    if st.session_state.auth:
        return True
    st.title("🔒 ForexMT5 - Market Intelligent")
    st.write("Halaman ini khusus untuk tim observasi. Masukkan password untuk lanjut.")
    pw = st.text_input("Password", type="password")
    if st.button("Masuk"):
        correct = st.secrets.get("APP_PASSWORD", "market2026")
        if pw == correct:
            st.session_state.auth = True
            st.rerun()
        else:
            st.error("Password salah. Hubungi admin via WhatsApp / Email.")
    st.caption("Tautan dan kata sandi tidak dibagikan melalui kanal publik. Hanya dibagikan kepada mitra yang telah diverifikasi.")
    st.stop()
    return False

check_password()

st.set_page_config(page_title="ForexMT5 - Market Intelligent", layout="wide")
st.caption("AICHALIVERET COMPANY — AICHALIVERET BY META.AI")
st.title("🛡️ PRACTICAL APPLICATION GAME - FOREX MT5")
st.caption("Diselenggarakan oleh aichaliveret company — aichaliveret by meta.ai. Platform observasi dan edukasi Market Intelligent.")
st.caption("Market Intelligent | PRIVATE DEMO | Akurat sebelum cepat, hati-hati sebelum ramai. Observasi dulu, baru beritakan.")
st.warning("⚠️ SIMULASI - VIRTUAL MONEY. Bukan sinyal trading, bukan ajakan trading. Bukan nasihat keuangan.")

tab1, tab2, tab3 = st.tabs(["1. INDEX NEURAL - RUANG ANALISIS", "2. PODCAST INTELLIGENT MARKET", "3. PANGSA PASAR & KEPUTUSAN"])

# ============ TAB 1 - NEURAL TETAP ============
with tab1:
    st.subheader("INDEX NEURAL - Ruang Analisis")
    st.write("Ruang kerja internal untuk merakit, menguji, dan memvalidasi instrumen analisis. Hasil yang telah terverifikasi di sini, kemudian disampaikan melalui Podcast Intelligent Market.")
    c1, c2 = st.columns([1,2])
    with c1:
        st.write("**Market Watch - MT5 Mirror**")
        st.dataframe([
            {"Pair":"GBPUSD","Bid":1.32305,"Ask":1.32306,"Chg":-0.02},
            {"Pair":"EURUSD","Bid":1.11787,"Ask":1.11788,"Chg":-0.21},
            {"Pair":"USDJPY","Bid":158.622,"Ask":158.623,"Chg":0.19},
            {"Pair":"XAUUSD","Bid":2632.10,"Ask":2632.45,"Chg":0.42},
            {"Pair":"USD/IDR","Bid":16520,"Ask":16535,"Chg":0.15},
        ], hide_index=True)
        st.write("**Indikator:** MA, RSI, MACD, Bollinger, Fibonacci, Stochastic (5,3,3) 19.77 / 15.14 = OVERSOLD")
        st.write("**Fundamental:** Forex Factory Calendar - CPI, NFP, Suku Bunga, FOMC Minutes")
        st.write("**Dinamika Kebijakan dan Politik Internasional:** Pidato FOMC / ECB / BOE, Pemilu, Perang Dagang, Sanksi, Geopolitik")
    with c2:
        st.write("**Chart GBPUSD H1 - Grafik Chain**")
        st.line_chart([1.3281,1.3260,1.3220,1.3190,1.3210,1.3240,1.3265,1.32305])
        st.info("OBSERVASI - GBPUSD H1 | Stochastic oversold 19.77 | Potensi rebound ke 1.32650, jika jebol 1.31900 batal. | Keyakinan 68% - Observasi, bukan ajakan trading.")
        st.write("**Checklist Validasi Analisis (sebelum siaran):**")
        st.checkbox("Teknikal sudah dibaca - trend, support/resistance, indikator", value=True)
        st.checkbox("Fundamental sudah dicek - jam & impact Forex Factory")
        st.checkbox("Politik sudah disaring - fakta vs opini vs rumor")
        st.checkbox("Kalender perayaan sudah diverifikasi - Diwali / Natal / Imlek / Lebaran / Isra Miraj")

# ============ TAB 2 - PODCAST INTELLIGENT MARKET ============
with tab2:
    st.subheader("🎙️ PODCAST INTELLIGENT MARKET — Siaran Informasi Bisnis")
    st.write("Podcast Intelligent Market adalah program siaran edukasi Market Intelligent. Kami membawakan hasil observasi perdagangan derivatif bursa berjangka — foreign exchange — dalam format yang terstruktur, profesional, dan mudah dipahami oleh pelaku perdagangan, kalangan profesional, akademisi, serta masyarakat luas.")
    st.write("**Fokus Siaran — Empat Pilar Informasi:**")
    st.write("1. **Informasi Fundamental — Forex Factory.** Kalender ekonomi, kebijakan bank sentral, indikator makroekonomi: CPI, data ketenagakerjaan, suku bunga, risalah rapat bank sentral. Setiap pernyataan disertai sumber, waktu rilis, dan konteks.")
    st.write("2. **Informasi Teknikal — Grafik Chain MT5 / MT4.** Struktur harga, tren, level support dan resistance, serta konfirmasi indikator: Moving Average, RSI, MACD, Bollinger Bands, Fibonacci, dan Stochastic. Disampaikan skenario utama, skenario alternatif, dan level invalidasi.")
    st.write("3. **Dinamika Kebijakan dan Politik Internasional.** Pernyataan pejabat bank sentral, dinamika pemilu, kebijakan perdagangan, sanksi, dan geopolitik — dengan pemisahan tegas antara fakta yang terverifikasi, interpretasi analis, dan opini pasar.")
    st.write("4. **Efek Perayaan Hari Raya Umat Beragama — Khususnya Pergerakan Logam Mulia.** Analisis musiman atas Diwali dan musim pernikahan di India, Natal, Imlek, Ramadan, Idul Fitri, Isra Miraj, dan Idul Adha — terhadap likuiditas, permintaan emas fisik (XAUUSD), pergerakan USD/INR, dan sentimen pasar.")
    st.divider()
    st.write("**Format Siaran — Setiap Episode**")
    st.write("Pembuka — Konteks Pasar (2 menit) | Analisis Fundamental (4 menit) | Analisis Teknikal (4 menit) | Dinamika Kebijakan dan Politik Internasional (3 menit) | Efek Perayaan dan Logam Mulia (2 menit) | Penutup — Sintesis dan Prinsip Keputusan (2 menit)")
    st.write("**Contoh Naskah Episode — Bahasa Siaran Bisnis**")
    st.text_area("Naskah Episode — Siap dibacakan / direkam", value="Selamat datang di Podcast Intelligent Market. Pada episode kali ini, kami mengamati GBPUSD pada kerangka waktu H1 di level 1.32305. Indikator Stochastic (5,3,3) berada pada level 19.77, yang mengindikasikan kondisi jenuh jual. Skenario utama kami adalah potensi pemulihan menuju 1.32650. Skenario ini akan gugur apabila harga menembus ke bawah 1.31900. Tingkat keyakinan kami adalah 68 persen.\n\nDari sisi fundamental, kalender Forex Factory mencatat agenda pidato pejabat bank sentral. Dari sisi teknikal, konfirmasi indikator masih bersifat terbatas. Dari sisi kebijakan, tidak terdapat perubahan struktural yang signifikan. Dari sisi musiman, menjelang Natal, likuiditas pasar Barat cenderung menipis dan spread melebar.\n\nKhususnya pada logam mulia, permintaan emas fisik di India pada musim Diwali dan musim pernikahan secara historis meningkatkan volatilitas XAUUSD. Oleh karena itu, kami mengajak pendengar untuk melakukan observasi terlebih dahulu, memvalidasi dengan manajemen risiko masing-masing, dan tidak mengambil keputusan berdasarkan satu sumber semata.", height=220)
    st.write("**Standar Etika Siaran**")
    st.write("Berbasis sumber • Terukur • Jujur mengenai ketidakpastian • Tidak sensasional • Menghormati audiens sebagai mitra yang cerdas dan berpendidikan.")
    st.write("**Segmen Tetap:** Dari Ruang Analisis ke Siaran — Tanya Jawab Pendengar Berbasis Data — Glosarium Pasar: satu istilah teknikal atau fundamental per episode.")
    if st.button("Salin Naskah Episode Hari Ini"):
        st.success("Naskah siap dibacakan dan direkam. Publikasikan melalui WhatsApp, Email, YouTube, Spotify, atau TikTok setelah proses verifikasi selesai.")

# ============ TAB 3 - PANGSA PASAR & KEPUTUSAN ============
with tab3:
    st.subheader("🌍 Pangsa Pasar, Ringkasan Berita & Pengambilan Keputusan")
    st.write("Halaman ini menyajikan pangsa pasar melalui kanal media sosial, ringkasan berita fundamental dan teknikal, serta sintesis kalender perayaan keagamaan — sebagai dasar pengambilan keputusan yang terukur, profesional, dan bertanggung jawab bagi pelaku perdagangan dan masyarakat luas.")
    st.write("**A. Pangsa Pasar — Distribusi Informasi per Kanal**")
    cols = st.columns(4)
    cols[0].metric("WhatsApp", "Tim Internal", "Observasi dan validasi")
    cols[1].metric("Email", "Mitra Terverifikasi", "Laporan lengkap beserta sumber")
    cols[2].metric("YouTube / TikTok", "Masyarakat Luas", "Potongan siaran 60 detik")
    cols[3].metric("Instagram / Threads", "Pelaku Perdagangan", "Infografis ringkasan")
    st.write("Prinsip distribusi: informasi mentah hanya untuk tim internal. Informasi publik selalu melalui penyaringan, verifikasi, dan penyederhanaan bahasa. Tautan dan kata sandi tidak dibagikan melalui kanal publik.")
    st.divider()
    st.write("**B. Ringkasan Berita — Fundamental, Teknikal, Kebijakan, dan Kalender Perayaan**")
    st.dataframe([
        {"Kategori":"Fundamental — Forex Factory","Informasi":"Kalender ekonomi: CPI, data ketenagakerjaan, suku bunga, risalah bank sentral","Implikasi":"Volatilitas meningkat pada pasangan mata uang terkait","Sikap":"Menunggu konfirmasi setelah rilis data"},
        {"Kategori":"Teknikal — Grafik Chain MT5 / MT4","Informasi":"GBPUSD H1 di 1.32305; Stochastic (5,3,3) 19.77 — kondisi jenuh jual","Implikasi":"Skenario utama: pemulihan menuju 1.32650; invalidasi di bawah 1.31900","Sikap":"Observasi; tidak mengambil posisi hanya berdasarkan satu indikator"},
        {"Kategori":"Kebijakan & Politik Internasional","Informasi":"Pernyataan pejabat bank sentral, dinamika pemilu, kebijakan perdagangan, geopolitik","Implikasi":"Peningkatan permintaan aset safe haven, termasuk emas","Sikap":"Memisahkan fakta terverifikasi dari interpretasi dan opini"},
        {"Kategori":"Hindu — Diwali & Musim Pernikahan, India","Informasi":"Peningkatan permintaan emas fisik dan konsumsi musiman","Implikasi":"Volatilitas XAUUSD, USD/INR, dan indeks NIFTY 50 meningkat","Sikap":"Memantau permintaan musiman dan likuiditas logam mulia"},
        {"Kategori":"Natal","Informasi":"Likuiditas pasar Barat menipis; aktivitas perdagangan menurun","Implikasi":"Spread melebar; risiko pergerakan harga yang tidak representatif","Sikap":"Mengurangi eksposur; menghindari interpretasi berlebihan"},
        {"Kategori":"Imlek","Informasi":"Pasar Tiongkok, Hong Kong, dan Singapura libur","Implikasi":"Volume HSI dan USD/CNH menurun","Sikap":"Tidak memaksakan aktivitas perdagangan"},
        {"Kategori":"Islam — Ramadan, Idul Fitri, Isra Miraj, Idul Adha","Informasi":"Peningkatan konsumsi, mobilitas mudik, dan hari libur bursa Indonesia","Implikasi":"Pergerakan USD/IDR dan sektor konsumsi IHSG","Sikap":"Memperhatikan pola musiman dan kalender bursa"},
        {"Kategori":"Logam Mulia — XAUUSD","Informasi":"Permintaan musiman, dinamika suku bunga riil, dan sentimen safe haven","Implikasi":"XAUUSD sebagai indikator utama sentimen risiko global","Sikap":"Memantau korelasi dengan USD, suku bunga, dan kalender perayaan"},
    ], hide_index=True, use_container_width=True)
    st.divider()
    st.write("**C. Kerangka Pengambilan Keputusan — Agar Tepat dan Bertanggung Jawab**")
    st.write("1. **Manajemen Risiko.** Tentukan terlebih dahulu batas kerugian yang dapat diterima. Dalam simulasi, batas kami adalah maksimal 2% per posisi. Dalam konteks riil, jangan menggunakan dana yang dibutuhkan untuk kebutuhan pokok, pendidikan, maupun kewajiban keuangan lainnya.")
    st.write("2. **Validasi Berlapis.** Keputusan yang layak disampaikan harus lolos tiga filter: (a) bersumber dari data resmi dan dapat diverifikasi, (b) memiliki skenario utama, skenario alternatif, dan level invalidasi, (c) disertai pernyataan tingkat keyakinan dan risiko.")
    st.write("3. **Kondisi Pengambilan Keputusan.** Keputusan yang baik membutuhkan kondisi fisik dan mental yang stabil. Apabila dalam kondisi lelah atau emosional, keputusan sebaiknya ditunda. Pasar tidak menghilang; kesempatan untuk melakukan observasi selalu tersedia.")
    st.write("4. **Dokumentasi dan Evaluasi.** Setiap keputusan dicatat: alasan, data yang digunakan, hasil, dan pembelajaran. Evaluasi dilakukan berdasarkan catatan, bukan berdasarkan ingatan.")
    st.write("5. **Tanggung Jawab Etis.** Kami tidak menjanjikan hasil, tidak menyembunyikan risiko, dan tidak mendorong audiens untuk mengambil keputusan yang melampaui kapasitas risikonya.")
    st.write("**Keputusan Tim Hari Ini (Contoh):** Observasi terlebih dahulu. Tidak mengambil posisi baru hingga terdapat konfirmasi yang memadai dan kondisi pasar mendukung analisis yang bertanggung jawab.")
    keputusan = st.radio("Keputusan tim hari ini:", ["OBSERVASI TERLEBIH DAHULU — Tidak membuka posisi baru", "MENUNGGU KONFIRMASI — Menunggu validasi level 1.32650", "TIDAK MELAKUKAN TRANSAKSI — Likuiditas menipis"], index=0)
    if st.button("Simpan Keputusan"):
        st.success(f"Keputusan tersimpan: {keputusan}. Keputusan ini yang diberitakan melalui Podcast dan kanal Pangsa Pasar.")

st.divider()
st.caption("aichaliveret company — aichaliveret by meta.ai | Market Intelligent: Akurat sebelum cepat, hati-hati sebelum ramai. Observasi dulu, baru beritakan.")
