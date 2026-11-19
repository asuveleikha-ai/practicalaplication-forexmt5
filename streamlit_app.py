import streamlit as st
import time, random

st.set_page_config(page_title="ForexMT5 - Market Intelligent", layout="wide")
st.title("🛡️ PRACTICAL APPLICATION GAME - FOREX MT5")
st.caption("Market Intelligent | PRIVATE DEMO | Akurat sebelum cepat, hati-hati sebelum ramai. Observasi dulu, baru beritakan.")

st.warning("⚠️ SIMULASI - VIRTUAL MONEY. Bukan sinyal trading, bukan ajakan trading.")

tab1, tab2, tab3 = st.tabs(["INDEX NEURAL - MT5 VIEW", "INDEX KLASIK", "SURFING GAME"])

with tab1:
    st.subheader("MT5 VIEW - GBPUSD H1")
    col1, col2 = st.columns([1,3])
    with col1:
        st.write("**Market Watch**")
        st.dataframe([
            {"Pair":"GBPUSD","Bid":1.32305,"Ask":1.32306,"Chg":-0.02},
            {"Pair":"EURUSD","Bid":1.11787,"Ask":1.11788,"Chg":-0.21},
            {"Pair":"USDJPY","Bid":158.622,"Ask":158.623,"Chg":0.19},
            {"Pair":"XAUUSD","Bid":2632.10,"Ask":2632.45,"Chg":0.42},
        ], hide_index=True)
        st.write("Stochastic (5,3,3): **19.77 / 15.14 = OVERSOLD**")
    with col2:
        st.write("Chart simulasi - di Streamlit Cloud, chart ini akan jalan live dari data EA Bridge / Forex Factory")
        # chart sederhana dari data simulasi
        import pandas as pd
        prices = [1.3281,1.3260,1.3220,1.3190,1.3210,1.3240,1.3265,1.32305]
        st.line_chart(prices)
        st.info("OBSERVASI - GBPUSD H1 | Sinyal: Stochastic oversold 19.77 | Prediksi: Potensi rebound ke 1.32650, jika jebol 1.31900 batal. | Keyakinan: 68%")

with tab2:
    st.subheader("INDEX KLASIK - Hati")
    st.write("**Si Pengeluh:** Aduh nyangkut di GBPUSD...")
    st.write("**Si Gembira:** Asik, emas naik pas Diwali!")
    st.write("**Si Sehari-hari:** Lebaran ini THR telat, USD/IDR gerak...")
    st.write("**Si Pengamat Politik:** FOMC ngomong malam ini, hati-hati.")

with tab3:
    st.subheader("SURFING GAME")
    st.write("Ombak = Chart, Papan = Modal virtual $100,000")
    if st.button("Mulai Surfing - Ombak Diwali Datang"):
        st.success("Kamu baca ombak dengan benar! +100 Intelligence Points")

st.divider()
st.write("Sumber: Forex Factory Calendar + MT5 | Format laporan wajib ada di kontrak.json")
