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
    st.caption("Jangan share link + password ini ke orang bengal / publik. Hanya ke orang kompeten yang kamu undang.")
    st.stop()
    return False

check_password()

st.set_page_config(page_title="ForexMT5 - Market Intelligent", layout="wide")
st.title("🛡️ PRACTICAL APPLICATION GAME - FOREX MT5")
st.caption("Market Intelligent | PRIVATE DEMO | Akurat sebelum cepat, hati-hati sebelum ramai. Observasi dulu, baru beritakan.")
st.warning("⚠️ SIMULASI - VIRTUAL MONEY. Bukan sinyal trading, bukan ajakan trading. Bukan nasihat keuangan.")

tab1, tab2, tab3 = st.tabs(["1. INDEX NEURAL - BENGKEL", "2. PODCAST INTELLIGENT MARKET", "3. PANGSA MARKET & KEPUTUSAN"])

# ============ TAB 1 - NEURAL TETAP ============
with tab1:
    st.subheader("INDEX NEURAL - Ruang Rakit Alat")
    st.write("Di sini kita rakit, simak, pahami, dan prediksi. Bukan tempat siaran, tapi tempat kerja.")
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
        st.write("**Gosip Politik Internasional:** Pidato FOMC / ECB / BOE, Pemilu, Perang Dagang, Sanksi, Geopolitik")
    with c2:
        st.write("**Chart GBPUSD H1 - Grafik Chain**")
        st.line_chart([1.3281,1.3260,1.3220,1.3190,1.3210,1.3240,1.3265,1.32305])
        st.info("OBSERVASI - GBPUSD H1 | Stochastic oversold 19.77 | Potensi rebound ke 1.32650, jika jebol 1.31900 batal. | Keyakinan 68% - Observasi, bukan ajakan trading.")
        st.write("**Checklist Rakit Alat (sebelum siaran):**")
        st.checkbox("Teknikal sudah dibaca - trend, support/resistance, indikator", value=True)
        st.checkbox("Fundamental sudah dicek - jam & impact Forex Factory")
        st.checkbox("Politik sudah disaring - fakta vs opini vs rumor")
        st.checkbox("Festival sudah dicek - Diwali / Natal / Imlek / Lebaran / Isra Miraj")

# ============ TAB 2 - CLASSIC JADI PODCAST ============
with tab2:
    st.subheader("🎙️ PODCAST INTELLIGENT MARKET - Halaman Siaran")
    st.write("Ini panggung kita. Bukan lagi sekadar karakter pengeluh / gembira. Di sini kita bawakan acara, biar pengguna - pelaku perdagangan & masyarakat luas - gampang baca beritanya, rapih dan terpisah dari bengkel Neural.")
    st.write("**Format Acara (setiap episode 10-15 menit):**")
    st.write("1. **Pembuka (2 menit):** Halo, ini Market Intelligent. Hari ini kita observasi apa?")
    st.write("2. **Berita Utama (5 menit):** 1 berita fundamental + 1 teknikal + 1 politik. Sebut sumbernya: Forex Factory + MT5.")
    st.write("3. **Cerita Manusia (3 menit):** Si Pengeluh, Si Gembira, Si Sehari-hari - kenapa market gerak dari sisi manusia. Misal: Lebaran THR telat, Diwali beli emas.")
    st.write("4. **Penutup + Keputusan (2 menit):** Jadi kesimpulan kita apa? Observasi dulu, baru putuskan. Bukan ajakan trading.")
    st.divider()
    st.write("**Episode Terbaru - Contoh Script:**")
    st.text_area("Script Episode - Copy untuk dibacakan / rekam", value="EPISODE: GBPUSD Oversold + Jelang Natal\n\nHalo, ini Market Intelligent. Hari ini GBPUSD H1 di 1.32305, Stochastic 19.77 oversold. Artinya habis dibanting, ada potensi mantul ke 1.32650. Tapi kalau jebol 1.31900, batal.\n\nFundamental: malam ini ada pidato FOMC. Teknikal: oversold. Politik: netral. Festival: Natal dekat, likuiditas menipis.\n\nKesimpulan: observasi dulu, jangan FOMO. Keyakinan 68%, bukan sinyal pasti.", height=160)
    st.write("**Segmen Tetap Podcast:**")
    st.write("- 🎧 **Bengkel ke Panggung:** Apa yang kita rakit di Neural, kita ceritakan di sini dengan bahasa awam")
    st.write("- 💬 **Tanya Jawab Pendengar:** Pertanyaan dari WhatsApp / Email / Sosmed, dijawab hati-hati")
    st.write("- 📖 **Kamus Market:** Setiap episode jelaskan 1 istilah: Stochastic, CPI, Spread, dll. Biar masyarakat luas ikut paham")
    st.write("**Tombol untuk Host:**")
    if st.button("Salin Script Episode Hari Ini"):
        st.success("Script siap dibacakan / direkam. Upload ke WhatsApp / YouTube / Spotify / TikTok setelah observasi matang.")

# ============ TAB 3 - SURFING JADI PANGSA MARKET & KEPUTUSAN ============
with tab3:
    st.subheader("🌍 PANGSA MARKET & RINGKASAN NEWS - Halaman Keputusan")
    st.write("Dulu Surfing Game untuk main-main. Sekarang jadi halaman paling penting: di mana pasar kita, berita apa yang paling ngaruh, dan keputusan apa yang tepat.")
    st.write("**A. Pangsa Market - Ke Tiap Sosial Media**")
    st.write("Kita tidak siaran ke semua orang, tapi ke yang tepat:")
    cols = st.columns(4)
    cols[0].metric("WhatsApp Group", "Tim Inti", "Observasi mentah + diskusi")
    cols[1].metric("YouTube / TikTok", "Masyarakat Luas", "Podcast potongan 60 detik")
    cols[2].metric("Instagram / Threads", "Pelaku Forex", "Infografis ringkasan")
    cols[3].metric("Email", "Yang Kompeten", "Laporan lengkap PDF")
    st.write("Aturan share: WhatsApp = mentah & diskusi, Sosmed = ringkasan yang sudah disaring, Email = laporan lengkap + bukti sumber. Jangan pernah share link + password ke publik.")
    st.divider()
    st.write("**B. Ringkasan News Hari Ini - Fundamental + Teknikal + Festival**")
    st.dataframe([
        {"Kategori":"Fundamental","Berita":"USD CPI / FOMC Speaks","Efek":"Ke USD, GBPUSD, XAUUSD","Sikap":"Tunggu jam rilis"},
        {"Kategori":"Teknikal","Berita":"GBPUSD Stochastic Oversold 19.77","Efek":"Potensi rebound ke 1.32650","Sikap":"Observasi, bukan langsung BUY"},
        {"Kategori":"Politik","Berita":"Ketegangan dagang / pidato bank sentral","Efek":"Safe haven XAUUSD naik","Sikap":"Cek fakta, bukan rumor"},
        {"Kategori":"Hindu - Diwali","Berita":"Permintaan emas India naik","Efek":"XAUUSD + USD/INR volatile","Sikap":"Perhatikan NIFTY & emas"},
        {"Kategori":"Natal","Berita":"Likuiditas menipis","Efek":"Spread melebar, fake breakout","Sikap":"Kurangi posisi"},
        {"Kategori":"Imlek","Berita":"Pasar China / HK / SG libur","Efek":"HSI & USD/CNH sepi","Sikap":"Jangan paksa trading"},
        {"Kategori":"Islam - Lebaran / Isra Miraj","Berita":"THR, mudik, libur bursa ID","Efek":"USD/IDR, IHSG retail","Sikap":"Perhatikan konsumsi"},
    ], hide_index=True, use_container_width=True)
    st.divider()
    st.write("**C. Pengambilan Keputusan - Biar Tepat, Bukan Nekat**")
    st.write("Ini tambahan pengalaman yang wajib kita pakai, syst - biar market & kita tidak salah langkah:")
    st.write("1. **Manajemen Risiko (paling penting):** Tentukan dulu berapa yang rela hilang. Di simulasi: max loss 2% per posisi. Kalau di real, jangan pakai uang dapur / uang sekolah.")
    st.write("2. **Psikologi:** Jangan trading pas capek, marah, atau habis ngepel 100m2. Capek = keputusan jelek. Istirahat dulu, market tidak lari kemana-mana.")
    st.write("3. **Jurnal:** Setiap keputusan dicatat: kenapa masuk, kenapa keluar, apa yang kita rasakan. Besok kita koreksi dari jurnal, bukan dari ingatan.")
    st.write("4. **3 Filter Keputusan:** Lolos 3 ini baru boleh bilang 'ini kesimpulan kita': (a) Data dari sumber resmi? (b) Ada batas batalnya? (c) Kita siap kalau salah?")
    st.write("**Keputusan Hari Ini (Contoh):**")
    keputusan = st.radio("Keputusan tim hari ini:", ["OBSERVASI DULU - Jangan open posisi", "SIAP-SIAP - Tunggu konfirmasi 1.32650", "TIDAK TRADING - Likuiditas tipis / capek"], index=0)
    if st.button("Simpan Keputusan"):
        st.success(f"Keputusan tersimpan: {keputusan}. Ini yang kita beritakan ke Podcast & Pangsa Market. Akurat sebelum cepat.")

st.divider()
st.caption("Market Intelligent: Akurat sebelum cepat, hati-hati sebelum ramai. Observasi dulu, baru beritakan.")
