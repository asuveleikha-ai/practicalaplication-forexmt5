from flask import Flask, send_from_directory, jsonify
import os
app = Flask(__name__, static_folder='.')
@app.route('/')
def home():
    return send_from_directory('.', 'index.html')
@app.route('/<path:name>')
def files(name):
    # layani file html statis di repo
    if os.path.exists(name):
        return send_from_directory('.', name)
    return jsonify({'error':'file tidak ditemukan','file':name}), 404
@app.route('/api/status')
def status():
    return jsonify({'app':'practicalaplication-forexmt5','mode':'SIMULASI - VIRTUAL','market':'Market Intelligent','source':'Forex Factory + MT5 Mirror','disclaimer':'Edukasi & observasi, bukan sinyal trading'})
@app.route('/api/ticker')
def ticker():
    # contoh data simulasi, ganti dengan bridge EA MT5 jika sudah tersambung
    return jsonify([
        {'pair':'GBPUSD','bid':1.32305,'ask':1.32306,'chg':-0.02},
        {'pair':'EURUSD','bid':1.11787,'ask':1.11788,'chg':-0.21},
        {'pair':'USDJPY','bid':158.622,'ask':158.623,'chg':0.19},
        {'pair':'XAUUSD','bid':2632.10,'ask':2632.45,'chg':0.42},
    ])
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
