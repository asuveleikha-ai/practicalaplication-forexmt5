import streamlit as st

# ===== KUNCI 1: PASSWORD GATE - Hanya yang dikasih password yang bisa masuk =====
# Cara set password: di Streamlit Cloud > Manage app > Settings > Secrets, isi:
# APP_PASSWORD = "isi-password-rahasia-kamu"
# Jangan taruh password asli di GitHub!

def check_password():
    if "auth" not in st.session_state:
        st.session_state.auth = False
    if st.session_state.auth:
        return True
    st.title("🔒 ForexMT5 - Market Intelligent")
    st.write("Halaman ini khusus untuk tim observasi. Masukkan password untuk lanjut.")
    pw = st.text_input("Password", type="password")
    if st.button("Masuk"):
        # Ambil dari Secrets, fallback ke password contoh untuk demo lokal
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

# ===== ISI APP ASLI - Baru muncul kalau password benar =====
import time
st.set_page_config(page_title="ForexMT5 - Market Intelligent", layout="wide")
st.title("🛡️ PRACTICAL APPLICATION GAME - FOREX MT5")
st.caption("Market Intelligent | PRIVATE DEMO | Akurat sebelum cepat, hati-hati sebelum ramai.")
st.warning("⚠️ SIMULASI - VIRTUAL MONEY. Bukan sinyal trading, bukan ajakan trading.")
tab1, tab2, tab3 = st.tabs(["INDEX NEURAL - MT5 VIEW", "INDEX KLASIK", "SURFING GAME"])
with tab1:
    st.subheader("MT5 VIEW - GBPUSD H1")
    col1, col2 = st.columns([1,3])
    with col1:
        st.write("**Market Watch**")
        st.dataframe([{"Pair":"GBPUSD","Bid":1.32305,"Ask":1.32306,"Chg":-0.02},{"Pair":"EURUSD","Bid":1.11787,"Ask":1.11788,"Chg":-0.21},{"Pair":"USDJPY","Bid":158.622,"Ask":158.623,"Chg":0.19},{"Pair":"XAUUSD","Bid":2632.10,"Ask":2632.45,"Chg":0.42}], hide_index=True)
        st.write("Stochastic (5,3,3): **19.77 / 15.14 = OVERSOLD**")
    with col2:
        st.line_chart([1.3281,1.3260,1.3220,1.3190,1.3210,1.3240,1.3265,1.32305])
        st.info("OBSERVASI - GBPUSD H1 | Sinyal: Stochastic oversold 19.77 | Prediksi: Potensi rebound ke 1.32650, jika jebol 1.31900 batal. | Keyakinan: 68%")
with tab2:
    st.subheader("INDEX KLASIK")
    st.write("Si Pengeluh, Si Gembira, Si Sehari-hari, Si Pengamat Politik")
with tab3:
    st.subheader("SURFING GAME")
    if st.button("Mulai Surfing - Ombak Diwali Datang"):
        st.success("Kamu baca ombak dengan benar! +100 Intelligence Points")
