import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Activity, Anchor, BarChart3, BookOpen, Brain, CalendarDays, ChevronRight, Coins, Crown, Flame, Gamepad2, Globe2, Landmark, LineChart, Lock, Mic, MicOff, Play, Pause, Radio, RotateCcw, ShieldCheck, Sparkles, TrendingUp, Trophy, Users, Video, Waves, Zap, X, CheckCircle2, AlertTriangle, Clock, CreditCard, Wallet, Building2, FileText, Eye, Volume2, VolumeX } from 'lucide-react';

type Page = 'neural'|'podcast'|'conclusion';
type Signal = 'BUY'|'SELL'|'NETRAL';

const PRODUCTS = [
  { name: 'Calendar | Forex Factory', href: 'https://www.forexfactory.com/calendar', desc: 'Calendar panel — schedule, currency, impact, forecast and previous.' },
  { name: 'MetaTrader 5 web platform', href: 'https://www.metatrader5.com/en/trading-platform/web-trading', desc: 'Chart and terminal — 30 indicators, 24 graphic objects, 9 timeframes.' },
];
const MASTER_PASSWORD = 'market2026';

const MT5_WATCH = [
  { s:'EURUSD', bid:1.11787, ask:1.11788, chg:-0.21, dec:5 },
  { s:'GBPUSD', bid:1.32305, ask:1.32306, chg:-0.02, dec:5 },
  { s:'USDCHF', bid:0.83325, ask:0.83326, chg:0.38, dec:5 },
  { s:'USDJPY', bid:158.622, ask:158.623, chg:0.19, dec:3 },
  { s:'AUDUSD', bid:0.69674, ask:0.69676, chg:-0.24, dec:5 },
  { s:'USDCAD', bid:1.42574, ask:1.42575, chg:0.01, dec:5 },
  { s:'USDINR', bid:83.24, ask:83.25, chg:0.12, dec:2 },
  { s:'USDIDR', bid:15782, ask:15784, chg:0.08, dec:0 },
  { s:'USDCNY', bid:6.69406, ask:6.69418, chg:-0.13, dec:5 },
  { s:'USDSGD', bid:1.34210, ask:1.34220, chg:-0.05, dec:5 },
  { s:'XAUUSD', bid:2331.40, ask:2331.70, chg:0.42, dec:2 },
  { s:'XAGUSD', bid:27.84, ask:27.88, chg:0.31, dec:2 },
];
const MT5_NAMES: Record<string,string> = { EURUSD:'Euro vs US Dollar', GBPUSD:'Pound Sterling vs US Dollar', USDCHF:'US Dollar vs Swiss Franc', USDJPY:'US Dollar vs Japanese Yen', AUDUSD:'Australian Dollar vs US Dollar', USDCAD:'US Dollar vs Canadian Dollar', USDINR:'US Dollar vs Indian Rupee', USDIDR:'US Dollar vs Indonesian Rupiah', USDCNY:'US Dollar vs Chinese Yuan', USDSGD:'US Dollar vs Singapore Dollar', XAUUSD:'Gold vs US Dollar', XAGUSD:'Silver vs US Dollar' };

function mt5CandleSeries(bid:number){
  const out:{o:number;c:number;h:number;l:number}[]=[];
  const range=Math.max(bid*0.0038,0.0004);
  const ctrl:[number,number][]=[[0,0.92],[10,0.58],[20,-0.82],[29,-0.38],[38,0.18],[44,0.72],[51,0.38],[59,0]];
  for(let i=0;i<60;i++){
    let j=0; while(j<ctrl.length-2 && i>ctrl[j+1][0]) j++;
    const [x0,y0]=ctrl[j]; const [x1,y1]=ctrl[j+1];
    const t=(i-x0)/Math.max(1,x1-x0);
    const base=y0+(y1-y0)*t;
    const noise=Math.sin(i*1.63+0.7)*0.10+Math.sin(i*0.41)*0.06;
    const close=bid+(base+noise)*range;
    const open=i===0?close-range*0.08:out[i-1].c;
    const high=Math.max(open,close)+Math.abs(Math.sin(i*2.1))*range*0.22;
    const low=Math.min(open,close)-Math.abs(Math.cos(i*1.9))*range*0.22;
    out.push({o:open,c:close,h:high,l:low});
  }
  return out;
}
function mt5StochSeries(){
  const k:number[]=[]; const d:number[]=[];
  for(let i=0;i<40;i++){ const t=i/39; const v=78-62*t+Math.sin(i*0.8)*6+Math.sin(i*0.23)*3; k.push(Math.max(8,Math.min(92,v))); }
  for(let i=0;i<40;i++){ const s=k.slice(Math.max(0,i-2),i+1); d.push(s.reduce((a,b)=>a+b,0)/s.length); }
  k[39]=19.77; d[39]=15.14; return {k,d};
}
const EVENTS = [
  { time:'19:30 WIB', cur:'USD', ev:'CPI — Consumer Inflation (YoY)', imp:'HIGH', fc:'3,2%', pv:'3,1%', note:'Primary driver for rate expectations.' },
  { time:'19:30 WIB', cur:'USD', ev:'Retail Sales (MoM)', imp:'HIGH', fc:'0,4%', pv:'0,2%', note:'Household consumption signal.' },
  { time:'01:00 WIB', cur:'USD', ev:'FOMC Meeting Minutes', imp:'HIGH', fc:'—', pv:'—', note:'Wording is read closely by the market.' },
  { time:'16:00 WIB', cur:'EUR', ev:'Euro Area Final CPI', imp:'MED', fc:'2,4%', pv:'2,4%', note:'Confirmation of regional inflation trend.' },
  { time:'17:00 WIB', cur:'GBP', ev:'UK CPI (YoY)', imp:'HIGH', fc:'3,1%', pv:'3,4%', note:'Relevant to Bank of England expectations.' },
  { time:'06:30 WIB', cur:'JPY', ev:'Japan National Core CPI', imp:'MED', fc:'2,6%', pv:'2,8%', note:'Signal for Bank of Japan direction.' },
  { time:'19:30 WIB', cur:'CAD', ev:'Canada CPI', imp:'MED', fc:'2,9%', pv:'2,9%', note:'Can move CAD and oil-linked assets.' },
  { time:'09:30 WIB', cur:'CNY', ev:'China Activity & Production', imp:'MED', fc:'—', pv:'—', note:'Regional demand signal for Asia.' },
];
const HOLIDAYS = [
  { n:'Diwali & Indian Wedding Season', e:'Gold demand', d:'Jewellery and gift demand supports physical gold observation.', date:'2026-11-08' },
  { n:'Christmas', e:'Thin liquidity', d:'Liquidity thins. Movement can be narrow, then sharp on reopen.', date:'2026-12-25' },
  { n:'Chinese New Year', e:'Asia rotation', d:'Asia session slows. Consumption and gift sentiment in focus.', date:'2027-02-17' },
  { n:'Ramadan', e:'Consumption rhythm', d:'Regional consumption and trading hours shift during the month.', date:'2026-02-18' },
  { n:'Idul Fitri / Lebaran', e:'THR & domestic spending', d:'In Indonesia, THR flow and travel affect rupiah and consumption.', date:'2026-03-20' },
  { n:'Isra Miraj', e:'Reflection & pause', d:'A quiet moment for strategy review, not for chasing price.', date:'2026-01-16' },
  { n:'Idul Adha', e:'Social & consumption', d:'Holiday activity affects domestic market rhythm.', date:'2026-05-27' },
];
const MODELS = [
  { name:'Fundamental', signal:'BUY' as Signal, prob:68, text:'US labour and inflation data lean softer. USD softens in this observation. Wait for release confirmation, not rumour.' },
  { name:'Technical', signal:'BUY' as Signal, prob:62, text:'Price holds above MA and rebounds from lower Bollinger. RSI rises from oversold. Needs a close above nearest resistance.' },
  { name:'Political Opinion', signal:'NETRAL' as Signal, prob:51, text:'Central-bank speakers send mixed signals. Market waits for clearer language. Intraday volatility can occur without clear direction.' },
  { name:'Holiday / Festival', signal:'BUY' as Signal, prob:74, text:'Wedding season and Diwali support physical gold demand. Effect is gradual, not a one-night move. Suitable for seasonal observation.' },
];
const PACKAGES = [
  { id:'free', label:'Free Install', price:'Rp 0', desc:'1 page each: Neural, Podcast, Conclusion. Paid features locked.' },
  { id:'cartoon-still', label:'Cartoon Still', price:'Rp 5.000 / month', desc:'Static cartoon host in top-right.' },
  { id:'cartoon-still-insert', label:'Cartoon Still + Photo / Logo Insert', price:'Rp 10.000 / month', desc:'Static cartoon + customer photo / logo insert.' },
  { id:'cartoon-animated', label:'Animated Cartoon', price:'Rp 10.000 / month', desc:'Animated cartoon host, 3-step motion base.' },
  { id:'cartoon-animated-insert', label:'Animated Cartoon + Insert', price:'Rp 15.000 / month', desc:'Animated cartoon + photo / logo insert. 5-step motion.' },
  { id:'conclusion-column', label:'Conclusion Column for Public', price:'Rp 20.000 / month', desc:'Full public conclusion column.' },
  { id:'conclusion-screen', label:'Screen Inside Conclusion Column', price:'Rp 20.000 / month', desc:'Dedicated screen inside the conclusion column.' },
  { id:'extra-page', label:'Extra Page / Screen', price:'Rp 20.000 / month each', desc:'One additional page or screen.' },
  { id:'full', label:'Full Example Without Sponsor', price:'Rp 75.000 / month', desc:'All packages above, except sponsor priced separately by contract.' },
];
const PAYMENTS = ['Bank Transfer — Interbank','GoPay','Dana','OVO','ShopeePay','Bank Transfer — Virtual Account'];
const SESSIONS = [
  { n:'Asia — Tokyo', t:'07:00–08:00 WIB', d:'Opening observation. Asia liquidity.' },
  { n:'Europe — London', t:'14:00–14:30 WIB', d:'Overlap observation. Europe liquidity.' },
  { n:'America — New York', t:'19:00–19:30 WIB', d:'US data window. Highest news sensitivity.' },
];
const SPONSORS = [
  { name:'Sponsor A — Contract', contrib:'Contribution by contract', podcast:'Podcast segment', neural:'Neural camera room', pub:'Public conclusion mention' },
  { name:'Sponsor B — Contract', contrib:'Contribution by contract', podcast:'Interview / temu bicara', neural:'Neural camera room', pub:'Public distribution' },
  { name:'Calendar / Chart Provider', contrib:'Free lawful access — screenshot / camera / public site', podcast:'Machine displayed with credit', neural:'Machine displayed with credit', pub:'Public credit, no payment from us' },
];
const TELEPROMPTER = `AICHALIVERET — INTELLIGENT MARKET. PUBLIC BROADCAST. EDUCATIONAL OBSERVATION ONLY.

Good session. We open with three facts, then one opinion.

FACT ONE — GBPUSD. Reference: GBPUSD 1.32305. Timeframe H1. Stochastic (5,3,3): 19.77 / 15.14. Reading: below 20, oversold zone. No automatic buy signal.

FACT TWO — GOLD. Reference: XAUUSD. Focus: gold / logam mulia. Seasonal theme: Diwali and Indian wedding season support physical demand. Effect is gradual.

FACT THREE — CALENDAR. Source: Forex Factory calendar. Today: USD CPI and Retail Sales at 19:30 WIB. Impact: HIGH. Wait for release confirmation.

OPINION — Main scenario: consolidation above invalidation, with limited follow-through. Alternative: rejection below invalidation opens a deeper correction. Invalidation: break and close below the stated level on H1.

RISK NOTE — Anomaly over 30 percent is treated as unhealthy competition. Pause. Verify with a second source. Do not chase.

CLOSE — This is observation, not financial advice. No real order is placed in this broadcast. Thank you. Aichaliveret.`;

async function api(action:string, args:any){
  const res = await fetch("actions", { method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify({action, args}) });
  const j = await res.json().catch(()=>({}));
  if(!res.ok || j?.error) throw new Error(j?.error || `Load failed (${res.status})`);
  return j.data;
}
function fmt(n:number, d=2){ return n.toLocaleString('en-US',{minimumFractionDigits:d, maximumFractionDigits:d}); }
function daysTo(dateStr:string){ const t=new Date(dateStr+'T00:00:00'); const now=new Date(); let diff=Math.ceil((t.getTime()-now.getTime())/86400000); while(diff<0){ t.setFullYear(t.getFullYear()+1); diff=Math.ceil((t.getTime()-now.getTime())/86400000);} return diff; }

export default function App(){
  const [page,setPage]=useState<Page>('neural');
  const [owner,setOwner]=useState(false);
  const [showLogin,setShowLogin]=useState(false);
  const [showSubscribe,setShowSubscribe]=useState(false);
  const [pwd,setPwd]=useState(''); const [loginMsg,setLoginMsg]=useState('');
  const [pkg,setPkg]=useState('cartoon-animated');
  const [payMethod,setPayMethod]=useState(PAYMENTS[1]);
  const [custName,setCustName]=useState(''); const [custRef,setCustRef]=useState('');
  const [subMsg,setSubMsg]=useState(''); const [subBusy,setSubBusy]=useState(false);
  const [activePkgs,setActivePkgs]=useState<string[]>([]);
  const [pendingSubs,setPendingSubs]=useState<any[]>([]);
  const [mt5Pair,setMt5Pair]=useState('GBPUSD');
  const [mt5Tf,setMt5Tf]=useState('H1');
  const [curFilter,setCurFilter]=useState('SEMUA');
  const [mt5Watch,setMt5Watch]=useState(MT5_WATCH);
  const [blink,setBlink]=useState(true);
  const [cartoonMsg,setCartoonMsg]=useState(0);
  const [hostSpeaking,setHostSpeaking]=useState(false);
  const [recorder,setRecorder]=useState<'idle'|'recording'|'paused-host'>('idle');
  const [recMsg,setRecMsg]=useState('Recorder separate from host voice. No overlap.');
  const [telePlay,setTelePlay]=useState(false);
  const [teleSpeed,setTeleSpeed]=useState(1);
  const [anomalyOn,setAnomalyOn]=useState(true);
  const [diary,setDiary]=useState<any[]>([]);
  const [note,setNote]=useState(''); const [noteMood,setNoteMood]=useState('Observasi');
  const [diaryMsg,setDiaryMsg]=useState(''); const [diaryBusy,setDiaryBusy]=useState(false);
  const [comments,setComments]=useState<any[]>([]);
  const [commentText,setCommentText]=useState(''); const [commentName,setCommentName]=useState(''); const [commentMsg,setCommentMsg]=useState('');
  const [leader,setLeader]=useState<any[]>([]);
  const [player,setPlayer]=useState('Peselancar Anonim'); const [saveMsg,setSaveMsg]=useState('');
  const [score,setScore]=useState(0); const [balance,setBalance]=useState(100000);
  const teleRef=useRef<HTMLDivElement>(null);
  const mt5CanvasRef=useRef<HTMLCanvasElement>(null);
  const stochCanvasRef=useRef<HTMLCanvasElement>(null);

  const has = (id:string)=> owner || activePkgs.includes(id) || activePkgs.includes('full');
  const cartoonTier = owner ? 'Video-like motion • Owner' : activePkgs.includes('cartoon-animated-insert') ? 'Animated + Insert • 5-step' : activePkgs.includes('cartoon-animated') ? 'Animated • 3-step' : activePkgs.includes('cartoon-still-insert') ? 'Still + Insert' : 'Still • Free preview';
  const cartoonAnimated = owner || activePkgs.includes('cartoon-animated') || activePkgs.includes('cartoon-animated-insert') || activePkgs.includes('full');

  const loadDiary = async()=>{ try{ const d:any = await api("records.list", {collection:'diary_notes'}); setDiary(d?.records||[]); }catch{ setDiary([]); } };
  const loadLeader = async()=>{ try{ const d:any = await api("records.list", {collection:'leaderboard'}); const rows=(d?.records||[]).map((r:any)=>({id:r.id,...r.value})).sort((a:any,b:any)=>b.score-a.score).slice(0,5); setLeader(rows);}catch{ setLeader([]);} };
  const loadComments = async()=>{ try{ const d:any = await api("records.list", {collection:'public_comments'}); setComments(d?.records||[]); }catch{ setComments([]); } };
  const loadSubs = async()=>{ try{ const d:any = await api("records.list", {collection:'subscriptions'}); setPendingSubs((d?.records||[]).filter((r:any)=>r.value?.status==='pending')); }catch{ setPendingSubs([]); } };
  useEffect(()=>{ loadDiary(); loadLeader(); loadComments(); loadSubs(); },[]);
  useEffect(()=>{ const id=setInterval(()=> setMt5Watch(prev=>prev.map(p=>{ const base=MT5_WATCH.find(x=>x.s===p.s)!; const nb=p.bid+(Math.random()-0.48)*(p.bid*0.00035); const spread=base.ask-base.bid; return {...p, bid:nb, ask:nb+spread, chg:Math.max(-3,Math.min(3,p.chg+(Math.random()-0.5)*0.02))}; })),1500); return ()=>clearInterval(id); },[]);
  useEffect(()=>{ const id=setInterval(()=>setBlink(v=>!v),750); return ()=>clearInterval(id); },[]);
  useEffect(()=>{ const id=setInterval(()=>setCartoonMsg(m=>(m+1)%4),4200); return ()=>clearInterval(id); },[]);
  useEffect(()=>{ if(!telePlay) return; const id=setInterval(()=>{ const el=teleRef.current; if(el) el.scrollTop += 1*teleSpeed; },60); return ()=>clearInterval(id); },[telePlay,teleSpeed]);
  useEffect(()=>{ if(hostSpeaking && recorder==='recording'){ setRecorder('paused-host'); setRecMsg('Recorder paused — host voice is active. No overlap.'); } },[hostSpeaking,recorder]);

  const mt5Live = mt5Watch.find(x=>x.s===mt5Pair) || MT5_WATCH[1];
  const mt5Dec = mt5Live.dec;
  const mt5BaseBid = (MT5_WATCH.find(x=>x.s===mt5Pair) || MT5_WATCH[1]).bid;
  const mt5Series = useMemo(()=>mt5CandleSeries(mt5BaseBid),[mt5Pair,mt5Tf,mt5BaseBid]);
  const mt5Stoch = useMemo(()=>mt5StochSeries(),[mt5Pair,mt5Tf]);
  const mt5Last = mt5Series[mt5Series.length-1];
  const mt5Min = Math.min(...mt5Series.map(c=>c.l));
  const mt5Max = Math.max(...mt5Series.map(c=>c.h));
  useEffect(()=>{
    const cv=mt5CanvasRef.current; if(!cv) return; const ctx=cv.getContext('2d'); if(!ctx) return;
    const W=cv.width=920,H=cv.height=340; ctx.clearRect(0,0,W,H); ctx.fillStyle='rgba(0,0,0,0.55)'; ctx.fillRect(0,0,W,H);
    const plotL=8, plotR=W-78, plotT=8, plotH=H-30;
    ctx.strokeStyle='rgba(255,255,255,.14)'; ctx.lineWidth=1;
    for(let i=0;i<=6;i++){ const y=plotT+(plotH/6)*i; ctx.beginPath(); ctx.moveTo(plotL,y); ctx.lineTo(plotR,y); ctx.stroke(); }
    const yOf=(v:number)=> plotT+((mt5Max-v)/(mt5Max-mt5Min))*plotH;
    const bw=(plotR-plotL)/mt5Series.length;
    mt5Series.forEach((c,i)=>{
      const x=plotL+i*bw+bw*0.2; const w=Math.max(4,bw*0.6);
      const up=c.c>=c.o; const col=up?'#2fd07d':'#ff5a6e';
      ctx.strokeStyle=col; ctx.beginPath(); ctx.moveTo(x+w/2,yOf(c.h)); ctx.lineTo(x+w/2,yOf(c.l)); ctx.stroke();
      ctx.fillStyle=col; ctx.fillRect(x,yOf(Math.max(c.o,c.c)),w,Math.max(2,Math.abs(yOf(c.o)-yOf(c.c))));
    });
    const lastY=yOf(mt5Live.bid);
    if(blink){ ctx.strokeStyle='#facc15'; ctx.setLineDash([6,4]); ctx.beginPath(); ctx.moveTo(plotL,lastY); ctx.lineTo(plotR,lastY); ctx.stroke(); ctx.setLineDash([]); }
    ctx.fillStyle='#facc15'; ctx.fillRect(plotR,lastY-11,78,22);
    ctx.fillStyle='#000'; ctx.font='bold 12px monospace'; ctx.fillText(fmt(mt5Live.bid,mt5Dec),plotR+6,lastY+4);
    ctx.fillStyle='#e5e7eb'; ctx.font='12px monospace';
    for(let i=0;i<=6;i++){ const v=mt5Max-(mt5Max-mt5Min)*(i/6); ctx.fillText(fmt(v,mt5Dec),plotR+6,plotT+(plotH/6)*i+4); }
  },[mt5Pair,mt5Tf,mt5Series,mt5Live,blink,page]);
  useEffect(()=>{
    const cv=stochCanvasRef.current; if(!cv) return; const ctx=cv.getContext('2d'); if(!ctx) return;
    const W=cv.width=920,H=cv.height=120; ctx.clearRect(0,0,W,H); ctx.fillStyle='rgba(0,0,0,0.55)'; ctx.fillRect(0,0,W,H);
    const plotL=8, plotR=W-78, plotT=6, plotH=H-24;
    const yOf=(v:number)=> plotT+((100-v)/100)*plotH;
    ctx.strokeStyle='rgba(255,255,255,.14)'; for(let i=0;i<=4;i++){ const y=plotT+(plotH/4)*i; ctx.beginPath(); ctx.moveTo(plotL,y); ctx.lineTo(plotR,y); ctx.stroke(); }
    [20,80].forEach(v=>{ ctx.strokeStyle='rgba(255,255,255,.45)'; ctx.setLineDash([4,4]); ctx.beginPath(); ctx.moveTo(plotL,yOf(v)); ctx.lineTo(plotR,yOf(v)); ctx.stroke(); ctx.setLineDash([]); });
    const draw=(arr:number[],color:string,dashed:boolean)=>{ ctx.strokeStyle=color; ctx.lineWidth=1.6; if(dashed) ctx.setLineDash([5,4]); ctx.beginPath(); arr.forEach((v,i)=>{ const x=plotL+((plotR-plotL)/(arr.length-1))*i; const y=yOf(v); i?ctx.lineTo(x,y):ctx.moveTo(x,y); }); ctx.stroke(); ctx.setLineDash([]); };
    draw(mt5Stoch.k,'#2dd4bf',false); draw(mt5Stoch.d,'#ef4444',true);
    ctx.fillStyle='#e5e7eb'; ctx.font='11px monospace'; [100,80,50,20,0].forEach(v=>{ ctx.fillText(String(v),plotR+8,yOf(v)+3); });
  },[mt5Stoch,page]);

  const filteredEvents = curFilter==='SEMUA'?EVENTS:EVENTS.filter(e=>e.cur===curFilter);
  const cartoonLines = [
    'Live reporting: GBPUSD 1.32305 • H1 • Stochastic 19.77 / 15.14.',
    'Gold focus: XAUUSD — seasonal demand in observation.',
    'Calendar: USD CPI 19:30 WIB. Source: Forex Factory.',
    'Anomaly rule: move over 30% = pause and verify.',
  ];

  async function doLogin(){
    if(pwd===MASTER_PASSWORD){ setOwner(true); setLoginMsg('Owner access unlocked. Full access.'); setShowLogin(false); setPwd(''); }
    else setLoginMsg('Password not accepted. Try again.');
  }
  async function submitSubscription(){
    if(!custName.trim()){ setSubMsg('Enter customer / company name first.'); return; }
    setSubBusy(true); setSubMsg('');
    const val={name:custName.trim(), package:pkg, payment:payMethod, reference:custRef.trim(), status:'pending', at:new Date().toLocaleString('id-ID')};
    try{
      const created:any=await api("records.create", {collection:'subscriptions', value:val, idempotency_key:`sub-${Date.now()}-${Math.random().toString(36).slice(2)}`});
      setPendingSubs(prev=>[{id:created.id, value:val}, ...prev]);
      setSubMsg('Request recorded as PENDING. Locked until owner activates it. No real payment is processed here.');
    }catch(e:any){ setSubMsg(`Request saved locally for this session, but record write failed: ${e.message}. Locked until owner activates.`); setPendingSubs(prev=>[{id:`local-${Date.now()}`, value:val}, ...prev]); }
    setSubBusy(false);
  }
  async function activateSub(s:any){
    setActivePkgs(prev=> prev.includes(s.value.package)?prev:[...prev, s.value.package]);
    setPendingSubs(prev=>prev.filter(x=>x.id!==s.id));
    try{ if(!String(s.id).startsWith('local-')) await api("records.replace", {collection:'subscriptions', id:s.id, value:{...s.value, status:'active'}}); }catch{}
  }
  function toggleHost(){
    const next=!hostSpeaking; setHostSpeaking(next);
    if(next && recorder==='recording'){ setRecorder('paused-host'); setRecMsg('Recorder paused — host voice is active. No overlap.'); }
    if(!next && recorder==='paused-host'){ setRecMsg('Host voice off. Recorder can resume.'); }
  }
  function toggleRecorder(){
    if(hostSpeaking){ setRecMsg('Recorder blocked while host voice is active. Turn host voice off first.'); return; }
    if(recorder==='recording'){ setRecorder('idle'); setRecMsg('Recorder stopped. Separate track saved in session.'); }
    else { setRecorder('recording'); setRecMsg('Recorder running. Host voice stays off while recording.'); }
  }
  async function addNote(){
    if(!note.trim()){ setDiaryMsg('Write an observation first.'); return; }
    setDiaryBusy(true); setDiaryMsg('');
    const val={text:note.trim(), mood:noteMood, at:new Date().toLocaleString('id-ID')};
    try{ const created:any=await api("records.create", {collection:'diary_notes', value:val, idempotency_key:`diary-${Date.now()}-${Math.random().toString(36).slice(2)}`}); setDiary(prev=>[{id:created.id, value:val}, ...prev]); setNote(''); setDiaryMsg('Note saved to Diary.'); }
    catch(e:any){ setDiaryMsg(`Not saved: ${e.message}. Text remains in the field.`); }
    setDiaryBusy(false);
  }
  async function deleteNote(id:string){ try{ await api("records.delete", {collection:'diary_notes', id}); setDiary(prev=>prev.filter(r=>r.id!==id)); }catch(e:any){ setDiaryMsg(e.message);} }
  async function addComment(){
    if(!commentText.trim()){ setCommentMsg('Write a comment first.'); return; }
    const val={name:commentName.trim()||'Public viewer', text:commentText.trim(), at:new Date().toLocaleString('id-ID')};
    try{ const created:any=await api("records.create", {collection:'public_comments', value:val, idempotency_key:`cmt-${Date.now()}-${Math.random().toString(36).slice(2)}`}); setComments(prev=>[{id:created.id, value:val}, ...prev]); setCommentText(''); setCommentMsg('Comment saved.'); }
    catch(e:any){ setCommentMsg(`Not saved: ${e.message}`); }
  }
  async function saveScore(){ if(score<=0){ setSaveMsg('Play a session first to have a score.'); return; } try{ await api("records.create", {collection:'leaderboard', value:{name:player.trim()||'Peselancar Anonim', score, balance, mode:'Observation', at:new Date().toLocaleString('id-ID')}, idempotency_key:`score-${Date.now()}-${Math.random().toString(36).slice(2)}`}); setSaveMsg('Score saved to leaderboard.'); await loadLeader(); }catch(e:any){ setSaveMsg(`Not saved: ${e.message}`);} }

  function Locked({price, label, feature, children}:{price:string; label:string; feature?:string; children:React.ReactNode}){
    if(feature ? has(feature) : (has('full') || owner)) return <>{children}</>;
    return <div className="relative"><div className="blur-[2px] opacity-45 pointer-events-none select-none" aria-hidden="true">{children}</div><div className="absolute inset-0 flex items-center justify-center p-3"><div className="w-full max-w-md rounded-2xl border border-amber-300/60 bg-[#070b14]/95 p-4 text-center shadow-2xl"><Lock className="mx-auto text-amber-300" size={22}/><p className="font-black mt-1">{label}</p><p className="text-amber-300 font-bold text-sm mt-1">{price}</p><p className="text-xs text-slate-300 mt-1">Locked until subscription is activated by owner.</p><button onClick={()=>{setPkg(feature || 'extra-page'); setShowSubscribe(true);}} className="mt-3 bg-amber-300 text-black px-4 py-2 rounded-full text-sm font-bold">Subscribe</button></div></div></div>;
  }
  function LockedFeature({price, label}:{price:string; label:string}){
    if(has('full') || owner) return null;
    return <div className="rounded-2xl border border-amber-300/50 bg-amber-400/10 p-3 flex flex-wrap items-center gap-2 text-sm"><Lock size={16} className="text-amber-300"/><span className="font-bold">{label}</span><span className="text-amber-200">{price}</span><button onClick={()=>setShowSubscribe(true)} className="ml-auto bg-amber-300 text-black px-3 py-1.5 rounded-full text-xs font-bold">Subscribe</button></div>;
  }

  const panel = (id:Page, children:React.ReactNode)=> <section hidden={page!==id} aria-hidden={page!==id} className={page===id?'block':'hidden'}>{children}</section>;
  const navItems: {id:Page; label:string; icon:any}[]=[{id:'neural',label:'INDEX NEURAL',icon:Brain},{id:'podcast',label:'INDEX CLASSIC — PODCAST',icon:Mic},{id:'conclusion',label:'CONCLUSION / MAIN INDEX',icon:Globe2}];

  return (
    <div data-safe-area-inset-root style={{boxSizing:'border-box', paddingTop:'var(--safe-area-inset-top)', minHeight:'100vh', background:'var(--bg)'}} className="overflow-x-clip">
      {/* CONTROLS — OUTSIDE WOODEN FRAME */}
      <header data-safe-area-sticky-top style={{top:'var(--safe-area-inset-top)'}} className="sticky z-40 border-b border-[var(--line)] bg-[#070b14]/95 backdrop-blur">
        <div className="mx-auto max-w-[1380px] px-3 sm:px-6 py-3 flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-3 min-w-0"><div className="w-10 h-10 rounded-xl bg-cyan-400 text-black grid place-items-center font-black">A</div><div className="min-w-0"><p className="font-bold leading-tight text-[15px] sm:text-lg [overflow-wrap:anywhere]">AICHALIVERET <span className="text-cyan-300">by meta.ai</span></p><p className="text-[10px] tracking-[0.18em] text-cyan-300">INTELLIGENT MARKET • PUBLIC • EDUCATIONAL OBSERVATION</p></div></div>
          <div className="ml-auto flex flex-wrap items-center gap-2">
            <span className="text-xs bg-emerald-500/15 text-emerald-300 px-2 py-1.5 rounded-full flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"/>SIMULATION</span>
            {owner ? <span className="text-xs bg-amber-300 text-black px-3 py-2 rounded-full font-bold flex items-center gap-1"><Crown size={14}/> OWNER • FULL ACCESS</span> : <span className="text-xs bg-[#121d33] border border-[var(--line)] px-3 py-2 rounded-full">CUSTOMER • FREE PREVIEW</span>}
            <button onClick={()=>setShowLogin(true)} className="text-xs font-bold bg-white text-black px-3 py-2 rounded-full flex items-center gap-1"><Lock size={13}/> Owner Login</button>
            <button onClick={()=>setShowSubscribe(true)} className="text-xs font-bold bg-cyan-400 text-black px-3 py-2 rounded-full">Subscribe</button>
          </div>
        </div>
        <nav className="mx-auto max-w-[1380px] px-3 sm:px-6 pb-3 flex gap-2 overflow-x-auto no-scrollbar" aria-label="Main navigation">
          {navItems.map(n=> <button key={n.id} onClick={()=>setPage(n.id)} aria-pressed={page===n.id} className={`shrink-0 flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-bold border ${page===n.id?'bg-cyan-400 text-black border-cyan-300':'bg-[#121d33] text-slate-200 border-[var(--line)]'}`}><n.icon size={16}/>{n.label}</button>)}
        </nav>
      </header>

      {/* THIN WOODEN FRAME — ALL SIDES */}
      <div className="mx-2 sm:mx-4 my-3 sm:my-4 rounded-[18px] p-[10px] shadow-2xl" style={{background:'linear-gradient(135deg,#8b5a2b,#a67c4a 22%,#6b3f1d 48%,#c19a5b 72%,#7a4a22)'}}>
        <div className="relative rounded-[10px] overflow-hidden bg-[#070b14] border border-black/40 min-h-[82vh]">
          {/* CARTOON HOST — TOP RIGHT, ACTIVE AUTOMATICALLY */}
          <div className="absolute top-3 right-3 z-20 flex items-start gap-2 max-w-[min(92vw,420px)]" aria-label="Cartoon host reporting">
            <div className={`hidden sm:block max-w-[240px] rounded-2xl bg-white text-slate-900 px-3 py-2 text-xs leading-relaxed shadow-xl ${cartoonAnimated?'animate-bounce':''}`}><b className="text-cyan-700">CARTOON HOST • LIVE</b><p className="mt-0.5 [overflow-wrap:anywhere]">{cartoonLines[cartoonMsg]}</p><p className="text-[10px] text-slate-500 mt-1">{cartoonTier}</p></div>
            <div className={`shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-b from-amber-200 to-amber-400 border-4 border-white shadow-xl grid place-items-center text-3xl sm:text-4xl ${cartoonAnimated?'animate-pulse':''}`} role="img" aria-label="Cartoon host character">🧑‍🎤</div>
          </div>

          <main className="mx-auto max-w-[1380px] px-3 sm:px-6 pb-10 pt-5">
            <div className="flex flex-wrap items-center gap-2 text-xs pr-[86px] sm:pr-[320px]"><span className="bg-white/10 px-2 py-1 rounded-full font-bold">MARKET 24H • MON–SAT • WIB</span><span className="bg-white/10 px-2 py-1 rounded-full">ASIA 07:00–08:00</span><span className="bg-white/10 px-2 py-1 rounded-full">EUROPE 14:00–14:30</span><span className="bg-white/10 px-2 py-1 rounded-full">AMERICA 19:00–19:30</span><span className="ml-auto hidden md:inline text-slate-400">Content owned by aichaliveret company.</span></div>

            {/* NEURAL */}
            {panel('neural', <div className="pt-4">
              <div className="flex flex-wrap items-end justify-between gap-3"><div><p className="text-cyan-300 text-xs tracking-[0.22em] font-bold">OBSERVATION / WORKSHOP</p><h1 className="text-3xl sm:text-4xl font-black">INDEX NEURAL</h1><p className="text-slate-300 text-sm mt-1">Chart • Technical • Fundamental • Politics. Educational observation only.</p></div><div className="text-right"><p className="text-xs text-slate-400">Virtual balance</p><p className="text-2xl font-black text-amber-300">${fmt(balance,0)}</p></div></div>

              <div className="mt-3 flex flex-wrap gap-2">{PRODUCTS.map(p=> <a key={p.href} href={p.href} target="_blank" rel="noopener" className="bg-cyan-400 text-black px-3 py-2 rounded-full text-xs font-bold">{p.name} ↗</a>)}</div>

              {/* GLASS MONITORING FRAME — MT5 */}
              <section className="mt-4 rounded-[24px] border border-white/25 bg-white/10 backdrop-blur-md shadow-2xl overflow-hidden">
                <div className="flex flex-wrap items-center gap-3 px-4 py-3 bg-black/30"><h2 className="text-lg sm:text-xl font-black">MT5 VIEW — GBPUSD H1 <span className="text-cyan-300">(Mirror)</span></h2><span className="text-[11px] bg-amber-300 text-black px-2 py-1 rounded-full font-bold">MIRROR • SIMULATION</span><span className="ml-auto text-xs text-slate-300">Stochastic (5,3,3) 19.77 / 15.14</span></div>
                <div className="grid lg:grid-cols-[250px_minmax(0,1fr)_220px]">
                  <aside className="min-w-0 border-b lg:border-b-0 lg:border-r border-white/15 bg-white/95 text-slate-900">
                    <div className="px-3 py-2 flex justify-between bg-slate-900 text-white text-sm"><b>Market Watch</b><span className="text-xs text-slate-300">12 assets</span></div>
                    <div className="grid grid-cols-[1fr_1fr_1fr_58px] gap-1 px-3 py-2 text-[11px] font-black border-b border-slate-200"><span>Symbol</span><span className="text-right">Bid</span><span className="text-right">Ask</span><span className="text-right">Chg%</span></div>
                    <div className="max-h-[340px] overflow-y-auto">{mt5Watch.map(r=> <button key={r.s} onClick={()=>setMt5Pair(r.s)} aria-pressed={mt5Pair===r.s} className={`w-full grid grid-cols-[1fr_1fr_1fr_58px] gap-1 px-3 py-[6px] text-left text-[12px] border-b border-slate-100 ${mt5Pair===r.s?'bg-cyan-100':'hover:bg-slate-50'}`}><span className="font-bold">{r.s}</span><span className="text-right font-bold text-blue-700 tabular-nums">{fmt(r.bid,r.dec)}</span><span className="text-right font-bold text-blue-700 tabular-nums">{fmt(r.ask,r.dec)}</span><span className={`text-right font-bold tabular-nums ${r.chg<0?'text-rose-600':'text-emerald-600'}`}>{r.chg>=0?'+':''}{r.chg.toFixed(2)}%</span></button>)}</div>
                    <div className="p-3 bg-slate-900 text-white text-xs"><p className="font-bold">Navigator</p><p className="mt-1 text-slate-300">Accounts • Indicators • Expert Advisors • Scripts • Services • Market</p><p className="mt-2 bg-white/10 rounded-lg p-2">MetaQuotes-Demo<br/>Netting account</p></div>
                  </aside>
                  <section className="min-w-0 bg-black/40">
                    <div className="px-3 py-2 flex flex-wrap gap-2 items-center text-xs"><span className="font-black text-sm">{mt5Pair}, {mt5Tf}: {MT5_NAMES[mt5Pair]} {fmt(mt5Live.bid,mt5Dec)}</span><span className="ml-auto bg-white/15 px-2 py-1 rounded-full font-bold">＋ New Order (demo)</span></div>
                    <div className="px-3 py-2 flex flex-wrap gap-1 items-center bg-white/5">{['M1','M5','M15','H1','H4','D1'].map(t=> <button key={t} onClick={()=>setMt5Tf(t)} aria-pressed={mt5Tf===t} className={`px-2.5 py-1.5 rounded-full text-xs font-bold ${mt5Tf===t?'bg-cyan-400 text-black':'bg-white/15 text-white'}`}>{t}</button>)}<span className="text-[11px] text-slate-300 ml-1">1 candle = {mt5Tf==='H1'?'1 hour':mt5Tf==='D1'?'1 day':mt5Tf==='H4'?'4 hours':mt5Tf}</span></div>
                    <div className="overflow-x-auto"><canvas ref={mt5CanvasRef} className="block w-full min-w-[620px]" aria-label={`Mirror MT5 candlestick chart ${mt5Pair} ${mt5Tf}`}/></div>
                    <div className="px-3 pt-1 flex justify-between text-[11px]"><span className="font-bold">Stochastic (5,3,3) <span className="text-teal-300">19.77</span> <span className="text-red-400">15.14</span></span><span className="text-slate-300">Teal = %K • Red dashed = %D</span></div>
                    <div className="overflow-x-auto"><canvas ref={stochCanvasRef} className="block w-full min-w-[620px]" aria-label="Stochastic indicator 19.77 and 15.14, below 20 oversold"/></div>
                    <p className="px-3 py-2 text-[11px] text-slate-300">O: {fmt(mt5Last.o,mt5Dec)} H: {fmt(mt5Max,mt5Dec)} L: {fmt(mt5Min,mt5Dec)} C: {fmt(mt5Live.bid,mt5Dec)} • Simulation only.</p>
                  </section>
                  <aside className="min-w-0 border-t lg:border-t-0 lg:border-l border-white/15 bg-white/5 p-3 text-xs"><p className="font-bold text-white">Active pair</p><p className="text-lg font-black text-white mt-1">{mt5Pair}</p><p className="text-slate-300">{MT5_NAMES[mt5Pair]}</p><p className="mt-2 text-slate-200">Last: <b className="text-amber-300 tabular-nums">{fmt(mt5Live.bid,mt5Dec)}</b></p><p className="mt-1 text-slate-200">Stochastic: <b>19.77 / 15.14</b> — below 20.</p><p className="mt-3 text-slate-400 leading-relaxed">Click Market Watch to change chart. Timeframe changes label only in this mirror.</p><div className="mt-3 rounded-xl bg-white text-slate-900 p-3"><p className="font-black text-sm">Sponsor Room — Neural</p><p className="mt-1">Camera room placement by contract. Sponsor priced separately.</p><button onClick={()=>setShowSubscribe(true)} className="mt-2 bg-slate-900 text-white px-3 py-1.5 rounded-full text-xs font-bold">Sponsor Contract</button></div></aside>
                </div>
              </section>

              {/* ANOMALY WARNING */}
              <section className="mt-4 rounded-3xl border border-rose-400/50 bg-rose-500/10 p-4 sm:p-5">
                <div className="flex flex-wrap items-center gap-2"><AlertTriangle className="text-rose-300"/><h2 className="text-xl font-black">Anomaly Warning</h2><button onClick={()=>setAnomalyOn(v=>!v)} aria-pressed={anomalyOn} className="ml-auto text-xs font-bold bg-white text-black px-3 py-1.5 rounded-full">{anomalyOn?'Hide demo anomaly':'Show demo anomaly'}</button></div>
                {anomalyOn && <div className="mt-3 grid md:grid-cols-3 gap-3 text-sm"><div className="rounded-2xl bg-black/30 p-3"><p className="font-black text-rose-300">DEMO: GAP / SPIKE +32.4%</p><p className="text-slate-200 mt-1">Move over 30% is flagged as unhealthy competition. Do not chase. Verify with a second source.</p><p className="text-xs text-slate-400 mt-2">Source: Demo feed + Forex Factory calendar. Not a certainty claim.</p></div><div className="rounded-2xl bg-black/30 p-3"><p className="font-bold">Main scenario</p><p className="text-slate-200 mt-1">Consolidation above invalidation. Confidence: <b>52%</b>.</p><p className="font-bold mt-3">Alternative</p><p className="text-slate-200 mt-1">Rejection below invalidation opens deeper correction.</p></div><div className="rounded-2xl bg-black/30 p-3"><p className="font-bold">Invalidation level</p><p className="text-amber-300 font-black mt-1">GBPUSD H1 close below 1.31800</p><p className="font-bold mt-3">Advice / Opinion</p><p className="text-slate-200 mt-1">Pause. Confirm close. Reduce exposure in observation. Wait for release confirmation.</p></div></div>}
                {!anomalyOn && <p className="text-sm text-slate-300 mt-2">No demo anomaly shown. Rule stays active: any move over 30% triggers this warning.</p>}
              </section>

              <div className="grid lg:grid-cols-[1fr_360px] gap-4 mt-4">
                <section className="rounded-3xl border border-white/15 bg-white/5 p-4"><h3 className="font-bold flex items-center gap-2"><Brain className="text-cyan-300"/> 4 Models</h3><div className="grid sm:grid-cols-2 gap-3 mt-3">{MODELS.map(r=> <article key={r.name} className="rounded-2xl border border-white/10 bg-black/25 p-3"><div className="flex justify-between"><b>{r.name}</b><span className={`text-xs font-black px-2 py-1 rounded-full ${r.signal==='BUY'?'bg-emerald-500/20 text-emerald-300':'bg-slate-500/20 text-slate-200'}`}>{r.signal} • {r.prob}%</span></div><p className="text-sm text-slate-300 leading-relaxed mt-2">{r.text}</p></article>)}</div>
                <div className="mt-4"><h4 className="font-bold flex items-center gap-2"><Flame className="text-amber-300"/> Holiday Calendar</h4><div className="grid sm:grid-cols-2 gap-2 mt-2">{HOLIDAYS.map(f=> <div key={f.n} className="rounded-xl bg-black/25 p-3 text-xs"><p className="font-bold text-sm">{f.n} • {daysTo(f.date)} days</p><p className="text-amber-200 mt-0.5">{f.e}</p><p className="text-slate-300 mt-1">{f.d}</p></div>)}</div></div></section>

                {/* GLASS CALENDAR */}
                <aside className="rounded-3xl border border-white/25 bg-white/10 backdrop-blur-md p-4">
                  <div className="flex items-center justify-between"><h3 className="font-bold flex items-center gap-2"><CalendarDays className="text-amber-300"/> Forex Calendar</h3><a href="https://www.forexfactory.com/calendar" target="_blank" rel="noopener" className="text-xs text-cyan-300 underline">Forex Factory ↗</a></div>
                  <p className="text-xs text-slate-300 mt-1">Source: Forex Factory calendar. Demo list.</p>
                  <Locked price="Rp 20.000 / month — Extra Page / Screen" label="Full Calendar + Sponsor Distribution" feature="extra-page">
                    <div className="mt-3"><div className="flex flex-wrap gap-1">{['SEMUA','USD','EUR','GBP','JPY','CNY'].map(c=> <button key={c} onClick={()=>setCurFilter(c)} className={`px-2 py-1 rounded-full text-xs font-bold ${curFilter===c?'bg-amber-300 text-black':'bg-black/30'}`}>{c}</button>)}</div>
                    <div className="space-y-2 mt-3 max-h-[380px] overflow-y-auto pr-1">{filteredEvents.map((e,i)=> <article key={i} className="border-b border-white/10 pb-2"><div className="flex justify-between text-xs"><span>{e.time} • <b>{e.cur}</b></span><span className={`font-black px-2 rounded-full ${e.imp==='HIGH'?'bg-rose-500/25 text-rose-200':'bg-amber-500/25 text-amber-200'}`}>{e.imp}</span></div><p className="text-sm font-bold mt-1 [overflow-wrap:anywhere]">{e.ev}</p><p className="text-xs text-slate-300">Forecast {e.fc} • Previous {e.pv}</p><p className="text-xs text-slate-300">{e.note}</p></article>)}</div>
                    </div>
                  </Locked>
                  <div className="mt-3 space-y-2">{PRODUCTS.map(p=> <article key={p.href} className="rounded-xl border border-white/15 bg-black/25 p-3"><a href={p.href} target="_blank" rel="noopener" className="font-bold text-cyan-300 hover:underline [overflow-wrap:anywhere]">{p.name} ↗</a><p className="text-xs text-slate-300 mt-1">{p.desc}</p></article>)}</div>
                </aside>
              </div>

              <section className="mt-4 rounded-3xl border border-white/15 bg-white/5 p-4"><h3 className="font-bold">Market Hours • WIB</h3><div className="grid sm:grid-cols-3 gap-3 mt-3">{SESSIONS.map(s=> <div key={s.n} className="rounded-2xl bg-black/25 p-3"><p className="font-bold flex items-center gap-2"><Clock size={15} className="text-cyan-300"/>{s.n}</p><p className="text-amber-300 font-bold mt-1">{s.t}</p><p className="text-sm text-slate-300 mt-1">{s.d}</p></div>)}</div><p className="text-xs text-slate-400 mt-3">Market: 24h Monday to Saturday WIB. Sunday: closed for weekly review.</p></section>

              {owner && <section className="mt-4 rounded-3xl border border-amber-300/50 bg-amber-400/10 p-4"><h3 className="font-bold flex items-center gap-2"><Crown className="text-amber-300"/> Owner Panel — Pending Subscriptions</h3>{pendingSubs.length===0 ? <p className="text-sm text-slate-300 mt-2">No pending requests.</p> : pendingSubs.map((s:any)=> <div key={s.id} className="mt-2 flex flex-wrap gap-2 items-center bg-black/30 rounded-xl p-3 text-sm"><span className="font-bold">{s.value?.name}</span><span>{s.value?.package}</span><span className="text-slate-300">{s.value?.payment}</span><span className="text-slate-400">Ref: {s.value?.reference || '—'}</span><button onClick={()=>activateSub(s)} className="ml-auto bg-emerald-400 text-black px-3 py-1.5 rounded-full font-bold text-xs">Activate</button></div>)}<p className="text-xs text-slate-400 mt-2">Active in this session: {activePkgs.join(', ') || '—'}</p></section>}
            </div>)}

            {/* PODCAST */}
            {panel('podcast', <div className="pt-4">
              <p className="text-cyan-300 text-xs tracking-[0.22em] font-bold">PODCAST • INTELLIGENT MARKET</p><h1 className="text-3xl sm:text-4xl font-black">INDEX CLASSIC — PODCAST</h1><p className="text-slate-300 text-sm mt-1">Hosted by user. One column script. Voice recorder separate — no overlap.</p>

              <div className="grid lg:grid-cols-[1fr_380px] gap-4 mt-4">
                <section className="rounded-3xl border border-white/20 bg-white/95 text-slate-900 p-4 sm:p-5 min-w-0">
                  <div className="flex flex-wrap items-center gap-2"><h2 className="font-black text-lg">TELEPROMPTER — ONE COLUMN</h2><span className="text-xs bg-slate-900 text-white px-2 py-1 rounded-full">GBPUSD 1.32305 • XAUUSD</span><div className="ml-auto flex gap-2"><button onClick={()=>setTelePlay(v=>!v)} className="bg-slate-900 text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1">{telePlay?<Pause size={13}/>:<Play size={13}/>} {telePlay?'Pause':'Auto-scroll'}</button><select value={teleSpeed} onChange={e=>setTeleSpeed(Number(e.target.value))} className="bg-white border rounded-full px-2 py-1.5 text-xs font-bold" aria-label="Teleprompter speed"><option value={0.5}>0.5×</option><option value={1}>1×</option><option value={1.5}>1.5×</option><option value={2}>2×</option></select></div></div>
                  <div ref={teleRef} className="mt-3 h-[380px] overflow-y-auto rounded-2xl bg-[#fff8e6] border border-black/10 p-4 whitespace-pre-line leading-relaxed text-[15px] [overflow-wrap:anywhere]">{TELEPROMPTER}</div>
                  <p className="text-xs text-slate-500 mt-2">Script is one column only. Conclusion is on the Conclusion page.</p>
                </section>

                <aside className="space-y-4">
                  <section className="rounded-3xl border border-white/20 bg-white/10 backdrop-blur p-4"><h3 className="font-bold flex items-center gap-2"><Mic/> Voice — No Overlap</h3>
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      <button onClick={toggleHost} aria-pressed={hostSpeaking} className={`rounded-2xl p-3 text-left font-bold ${hostSpeaking?'bg-emerald-400 text-black':'bg-black/30 text-white'}`}><Volume2 size={18}/><p className="mt-1 text-sm">Host Voice</p><p className="text-xs font-normal">{hostSpeaking?'ON — Recorder paused':'OFF'}</p></button>
                      <button onClick={toggleRecorder} aria-pressed={recorder==='recording'} className={`rounded-2xl p-3 text-left font-bold ${recorder==='recording'?'bg-rose-400 text-black':'bg-black/30 text-white'}`}><Mic size={18}/><p className="mt-1 text-sm">Recorder</p><p className="text-xs font-normal">{recorder==='recording'?'RECORDING':recorder==='paused-host'?'PAUSED — HOST ON':'IDLE'}</p></button>
                    </div>
                    <p role="status" className="mt-3 text-xs bg-black/30 rounded-xl p-3 leading-relaxed">{recMsg}</p>
                    <p className="text-xs text-slate-300 mt-2">Rule: recorder and host voice never run together. Starting one pauses the other.</p>
                  </section>
                  <Locked price="Sponsor priced separately by contract" label="Sponsor Room — Podcast" feature="full">
                    <section className="rounded-3xl border border-white/20 bg-white/10 backdrop-blur p-4"><h3 className="font-bold flex items-center gap-2"><Users/> Sponsor Room — Temu Bicara / Interview</h3><p className="text-sm text-slate-300 mt-1">Guest temu bicara: take-and-give. Sponsor: with contract.</p><ul className="mt-3 space-y-2 text-sm text-slate-200">{['Contract defines contribution, placement, duration, and credit.','Sponsor appears in Podcast + Neural camera room + Public.','Guest interview is editorial. Sponsor placement is contractual.','No payment claim is made in this demo.'].map(x=> <li key={x} className="flex gap-2"><span>•</span><span>{x}</span></li>)}</ul><button onClick={()=>setShowSubscribe(true)} className="mt-3 bg-cyan-400 text-black px-4 py-2 rounded-full text-sm font-bold">Request Sponsor Contract</button></section>
                  </Locked>
                </aside>
              </div>

              <section className="mt-4 rounded-3xl border border-white/15 bg-white/5 p-4"><h3 className="font-bold flex items-center gap-2"><FileText/> Sponsor Contract — Contribution & Distribution</h3><div className="overflow-x-auto mt-3"><table className="w-full text-sm min-w-[620px]"><thead><tr className="text-left text-slate-300 border-b border-white/10"><th className="py-2 pr-3">Sponsor</th><th className="py-2 pr-3">Contribution</th><th className="py-2 pr-3">Podcast</th><th className="py-2 pr-3">Neural</th><th className="py-2">Public</th></tr></thead><tbody>{SPONSORS.map(s=> <tr key={s.name} className="border-b border-white/5"><td className="py-2 pr-3 font-bold">{s.name}</td><td className="py-2 pr-3 text-slate-300">{s.contrib}</td><td className="py-2 pr-3">{s.podcast}</td><td className="py-2 pr-3">{s.neural}</td><td className="py-2">{s.pub}</td></tr>)}</tbody></table></div><p className="text-xs text-slate-400 mt-2">API principle: Calendar and MT4 / MT5 chart APIs must be free for us. We display their machines in the podcast, so they contribute as sponsors. We use free lawful methods: screenshot, phone / laptop camera, public site. We do not pay them.</p></section>
            </div>)}

            {/* CONCLUSION */}
            {panel('conclusion', <div className="pt-4">
              <p className="text-cyan-300 text-xs tracking-[0.22em] font-bold">PUBLIC SUMMARY</p><h1 className="text-3xl sm:text-4xl font-black">CONCLUSION / MAIN INDEX / MARKET</h1><p className="text-slate-300 text-sm mt-1">One column conclusion for public. Voice without overlap.</p>

              <div className="grid lg:grid-cols-[1fr_380px] gap-4 mt-4">
                <Locked price="Rp 20.000 / month — Conclusion Column for Public" label="Full Conclusion Column" feature="conclusion-column">
                  <section className="rounded-3xl border border-white/20 bg-white/95 text-slate-900 p-4 sm:p-5 min-w-0"><h2 className="font-black text-xl">CONCLUSION — ONE COLUMN</h2><p className="text-xs text-slate-500 mt-1">Public summary • Educational observation • Not financial advice</p>
                    <div className="mt-4 space-y-3 text-[15px] leading-relaxed">
                      <p><b>1. Market today:</b> GBPUSD reference 1.32305 on H1. Stochastic 19.77 / 15.14 — oversold zone, no automatic signal.</p>
                      <p><b>2. Gold:</b> XAUUSD in focus. Seasonal theme: Diwali and Indian wedding season support physical demand. Effect is gradual.</p>
                      <p><b>3. Calendar:</b> USD CPI and Retail Sales at 19:30 WIB. Source: Forex Factory calendar. Wait for release confirmation.</p>
                      <p><b>4. Risk rule:</b> A move over 30% triggers anomaly warning. Pause, verify with a second source, do not chase.</p>
                      <p><b>5. Decision frame:</b> Main scenario — consolidation above invalidation. Alternative — rejection below invalidation. Invalidation — H1 close below 1.31800. Confidence — 52%.</p>
                      <p><b>6. Close:</b> Observation only. No real order is placed. Content owned by aichaliveret company.</p>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2 items-center"><span className="text-xs bg-slate-900 text-white px-3 py-1.5 rounded-full flex items-center gap-1"><Volume2 size={13}/> Public voice — host voice off while recording</span><button onClick={toggleHost} className="text-xs font-bold bg-white border px-3 py-1.5 rounded-full">{hostSpeaking?'Host Voice: ON':'Host Voice: OFF'}</button><button onClick={toggleRecorder} className="text-xs font-bold bg-white border px-3 py-1.5 rounded-full">{recorder==='recording'?'Recorder: RECORDING':'Recorder: IDLE'}</button></div>
                    <p role="status" className="text-xs mt-2 text-slate-600">{recMsg}</p>
                    <div className="mt-4"><h3 className="font-bold">Public Comments</h3><div className="mt-2 flex flex-wrap gap-2"><input value={commentName} onChange={e=>setCommentName(e.target.value)} placeholder="Name (optional)" className="border rounded-full px-3 py-2 text-sm flex-1 min-w-[140px]"/><input value={commentText} onChange={e=>setCommentText(e.target.value)} placeholder="Write a public comment…" className="border rounded-full px-3 py-2 text-sm flex-[2] min-w-[200px] [overflow-wrap:anywhere]"/><button onClick={addComment} className="bg-slate-900 text-white px-4 py-2 rounded-full text-sm font-bold">Post</button></div>{commentMsg && <p role="status" className="text-xs mt-2 bg-amber-100 p-2 rounded-lg">{commentMsg}</p>}<div className="mt-3 space-y-2 max-h-[220px] overflow-y-auto">{comments.length===0 && <p className="text-sm text-slate-500">No public comments yet.</p>}{comments.map((r:any)=> <article key={r.id} className="bg-amber-50 border border-black/10 rounded-xl p-3 text-sm"><b>{r.value?.name}</b> <span className="text-xs text-slate-500">{r.value?.at}</span><p className="mt-1 [overflow-wrap:anywhere]">{r.value?.text}</p></article>)}</div></div>
                  </section>
                </Locked>

                <aside className="space-y-4">
                  <Locked price="Rp 20.000 / month — Screen Inside Conclusion Column" label="Screen Inside Conclusion" feature="conclusion-screen">
                    <section className="rounded-3xl border border-white/20 bg-black/40 p-4"><h3 className="font-bold flex items-center gap-2"><Video/> Screen Inside Conclusion</h3><div className="mt-3 rounded-2xl bg-gradient-to-br from-cyan-900 to-slate-900 p-4 h-44 flex flex-col justify-between"><p className="text-xs tracking-widest text-cyan-300">AICHALIVERET • PUBLIC SCREEN</p><p className="text-2xl font-black">GBPUSD 1.32305<br/><span className="text-amber-300 text-lg">XAUUSD • GOLD FOCUS</span></p><p className="text-xs text-slate-300">Mirror chart • Calendar • Anomaly rule over 30%</p></div><p className="text-xs text-slate-300 mt-2">Dedicated screen inside the conclusion column. Sponsor credit appears here by contract.</p></section>
                  </Locked>
                  <section className="rounded-3xl border border-white/15 bg-white/5 p-4"><h3 className="font-bold flex items-center gap-2"><BookOpen/> Diary Observasi</h3><label className="block text-xs font-bold mt-3" htmlFor="mood">Mood</label><select id="mood" value={noteMood} onChange={e=>setNoteMood(e.target.value)} className="w-full mt-1 bg-white text-black rounded-xl px-3 py-2 text-sm"><option>Observasi</option><option>Waspada</option><option>Semangat</option><option>Kecewa</option><option>Tenang</option></select><label className="block text-xs font-bold mt-3" htmlFor="note">Note</label><textarea id="note" value={note} onChange={e=>setNote(e.target.value)} rows={3} placeholder="Write an observation…" className="w-full mt-1 bg-white text-black rounded-xl px-3 py-2 text-sm [overflow-wrap:anywhere]"/><button disabled={diaryBusy} onClick={addNote} className="mt-3 bg-cyan-400 text-black px-4 py-2 rounded-full font-bold text-sm disabled:opacity-50">{diaryBusy?'Saving…':'Save to Diary'}</button>{diaryMsg && <p role="status" className="text-sm mt-2 bg-amber-100 text-slate-900 p-2 rounded-lg">{diaryMsg}</p>}<div className="space-y-2 mt-3 max-h-[260px] overflow-y-auto">{diary.length===0 && <p className="text-sm text-slate-400">No notes yet.</p>}{diary.map((r:any)=> <article key={r.id} className="bg-black/30 rounded-xl p-3 text-sm"><div className="flex justify-between gap-2"><b>{r.value?.mood}</b><span className="text-xs text-slate-400">{r.value?.at}</span></div><p className="mt-1 [overflow-wrap:anywhere]">{r.value?.text}</p><button onClick={()=>deleteNote(r.id)} className="text-xs underline mt-1">Delete note</button></article>)}</div></section>
                  <section className="rounded-3xl border border-white/15 bg-white/5 p-4"><h3 className="font-bold flex items-center gap-2"><Trophy className="text-amber-400"/> Leaderboard — Top 5</h3><div className="mt-3"><label className="text-xs font-bold" htmlFor="player">Name</label><input id="player" value={player} onChange={e=>setPlayer(e.target.value)} className="w-full bg-white text-black rounded-xl px-3 py-2 mt-1 text-sm"/></div><div className="mt-2 flex gap-2"><button onClick={()=>setScore(s=>s+60)} className="flex-1 bg-emerald-400 text-black py-2 rounded-full text-sm font-bold">+ Observation</button><button onClick={saveScore} className="flex-1 bg-white text-black py-2 rounded-full text-sm font-bold">Save Score</button></div>{saveMsg && <p role="status" className="text-sm mt-2 bg-amber-100 text-slate-900 p-2 rounded-lg">{saveMsg}</p>}<ol className="mt-3 space-y-2">{leader.map((r,i)=> <li key={r.id} className="flex justify-between bg-black/30 rounded-xl px-3 py-2 text-sm"><span><b>{i+1}.</b> <span className="[overflow-wrap:anywhere]">{r.name}</span></span><b>{r.score} pts</b></li>)}{leader.length===0 && <li className="text-sm text-slate-400">No scores yet.</li>}</ol><p className="text-xs text-slate-400 mt-2">Score: {score} • Virtual balance: ${fmt(balance,0)}</p></section>
                </aside>
              </div>

              <section className="mt-4 rounded-3xl border border-white/15 bg-white/5 p-4"><h3 className="font-bold">Pricing — Transparent</h3><div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 mt-3">{PACKAGES.map(p=> <div key={p.id} className="rounded-2xl bg-black/25 p-3 text-sm"><p className="font-bold">{p.label}</p><p className="text-amber-300 font-bold mt-0.5">{p.price}</p><p className="text-slate-300 text-xs mt-1">{p.desc}</p></div>)}</div><p className="text-xs text-slate-400 mt-3">Sponsor priced separately by contract. Animation tiers: 3-step base • 5-step higher value • video-like highest value. More steps = higher subscription value.</p><div className="mt-3 flex flex-wrap gap-2">{PRODUCTS.map(p=> <a key={p.href} href={p.href} target="_blank" rel="noopener" className="text-xs font-bold bg-cyan-400 text-black px-3 py-2 rounded-full">{p.name} ↗</a>)}</div></section>
            </div>)}
          </main>
        </div>
      </div>

      {/* FOOTER — OUTSIDE FRAME */}
      <footer className="border-t border-[var(--line)] bg-[#070b14]"><div className="mx-auto max-w-[1380px] px-3 sm:px-6 py-5 flex flex-wrap gap-4 justify-between text-xs text-slate-400"><p className="max-w-xl [overflow-wrap:anywhere]">AICHALIVERET by meta.ai — Intelligent Market. Public educational observation. Content owned by aichaliveret company. Broadcast to TikTok / social platforms follows those platforms’ rules. Share via link. Simulation only — no real order, no financial advice.</p><div className="flex gap-4">{PRODUCTS.map(p=> <a key={p.href} href={p.href} target="_blank" rel="noopener" className="underline">{p.name}</a>)}</div></div></footer>

      {/* OWNER LOGIN MODAL */}
      {showLogin && <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 pt-[max(1rem,var(--safe-area-inset-top))] pb-6"><div className="min-h-full flex items-center justify-center p-3"><div className="w-full max-w-md rounded-3xl bg-[#0d1424] border border-[var(--line)] p-5"><div className="flex justify-between items-start"><h2 className="text-xl font-black">Owner Login</h2><button onClick={()=>setShowLogin(false)} aria-label="Close owner login" className="bg-white/10 rounded-full p-2"><X size={16}/></button></div><p className="text-sm text-slate-300 mt-1">Owner: free, full access to all pages. Master password required.</p><label className="block text-xs font-bold mt-4" htmlFor="pwd">Master password</label><input id="pwd" type="password" value={pwd} onChange={e=>setPwd(e.target.value)} onKeyDown={e=>{if(e.key==='Enter') doLogin();}} className="w-full mt-1 bg-white text-black rounded-xl px-3 py-2" placeholder="Enter master password"/><button onClick={doLogin} className="w-full mt-3 bg-cyan-400 text-black py-3 rounded-full font-bold">Unlock Owner Access</button>{loginMsg && <p role="status" className="text-sm mt-3 bg-amber-100 text-slate-900 p-2 rounded-lg">{loginMsg}</p>}{owner && <p className="text-sm mt-2 text-emerald-300">Owner is already unlocked.</p>}<p className="text-xs text-slate-400 mt-3">Customer? Use Subscribe — no master password needed.</p></div></div></div>}

      {/* SUBSCRIBE MODAL */}
      {showSubscribe && <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 pt-[max(1rem,var(--safe-area-inset-top))] pb-6"><div className="min-h-full flex items-center justify-center p-3"><div className="w-full max-w-2xl rounded-3xl bg-[#0d1424] border border-[var(--line)] p-5"><div className="flex justify-between items-start"><h2 className="text-xl font-black">Subscribe — Customer</h2><button onClick={()=>setShowSubscribe(false)} aria-label="Close subscribe" className="bg-white/10 rounded-full p-2"><X size={16}/></button></div><p className="text-sm text-slate-300 mt-1">Free install: 1 page each. Paid features stay locked until owner activates your subscription. No real payment is processed here.</p>
        <label className="block text-xs font-bold mt-4" htmlFor="pkg">Choose package</label><select id="pkg" value={pkg} onChange={e=>setPkg(e.target.value)} className="w-full mt-1 bg-white text-black rounded-xl px-3 py-2 text-sm">{PACKAGES.map(p=> <option key={p.id} value={p.id}>{p.label} — {p.price}</option>)}</select>
        <label className="block text-xs font-bold mt-3">Payment method</label><div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-1">{PAYMENTS.map(m=> <button key={m} onClick={()=>setPayMethod(m)} aria-pressed={payMethod===m} className={`px-3 py-2 rounded-xl text-xs font-bold border ${payMethod===m?'bg-cyan-400 text-black':'bg-white/10 text-white border-white/15'}`}>{m}</button>)}</div>
        <div className="grid sm:grid-cols-2 gap-3 mt-3"><div><label className="block text-xs font-bold" htmlFor="cust">Customer / company name</label><input id="cust" value={custName} onChange={e=>setCustName(e.target.value)} className="w-full mt-1 bg-white text-black rounded-xl px-3 py-2 text-sm" placeholder="Name"/></div><div><label className="block text-xs font-bold" htmlFor="ref">Payment reference / proof note</label><input id="ref" value={custRef} onChange={e=>setCustRef(e.target.value)} className="w-full mt-1 bg-white text-black rounded-xl px-3 py-2 text-sm" placeholder="Transfer reference, e.g. TRF-123"/></div></div>
        <p className="text-xs text-slate-400 mt-2">Proof upload note: file upload is not available yet. Enter the transfer reference above. Owner verifies and activates.</p>
        <div className="mt-3 rounded-2xl bg-black/30 p-3 text-sm"><p className="font-bold flex items-center gap-2"><Wallet size={15} className="text-cyan-300"/> Selected: {PACKAGES.find(p=>p.id===pkg)?.label} — {PACKAGES.find(p=>p.id===pkg)?.price}</p><p className="text-slate-300 text-xs mt-1">Payment: {payMethod} • Bank transfer or online wallet: GoPay, Dana, etc. • Broadcast use only under subscription agreement.</p></div>
        <button disabled={subBusy} onClick={submitSubscription} className="w-full mt-3 bg-amber-300 text-black py-3 rounded-full font-bold disabled:opacity-50">{subBusy?'Saving request…':'Submit Subscription Request'}</button>{subMsg && <p role="status" className="text-sm mt-3 bg-amber-100 text-slate-900 p-2 rounded-lg">{subMsg}</p>}
        <p className="text-xs text-slate-400 mt-3">Broadcast rights: Content is owned by aichaliveret company. Customers may use the system for broadcast only under subscription agreement.</p>
      </div></div></div>}
    </div>
  );
}
