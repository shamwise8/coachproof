import { useState, useEffect, useRef, useCallback } from "react";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Instrument+Sans:wght@400;500;600;700&display=swap');

:root {
  --bg: #060B16;
  --bg2: #0B1121;
  --card: #111827;
  --card2: #161F33;
  --border: #1C2A42;
  --border2: #243044;
  --green: #00C853;
  --green2: #10B981;
  --green-soft: rgba(0,200,83,0.08);
  --green-glow: rgba(0,200,83,0.15);
  --text: #F1F5F9;
  --text2: #94A3B8;
  --text3: #64748B;
  --red: #EF4444;
  --line-green: #06C755;
}
*, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
html { scroll-behavior:smooth; overflow-x:clip; }
body {
  background: var(--bg); color: var(--text);
  font-family: 'Instrument Sans', sans-serif;
  font-size: 15px; line-height: 1.65;
  -webkit-font-smoothing: antialiased;
  overflow-x:clip; max-width:100vw;
}
#root { overflow-x:clip; max-width:100vw; }

.reveal { opacity:0; transform:translateY(32px); transition: opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1); }
.reveal.visible { opacity:1; transform:translateY(0); }
.reveal-d1 { transition-delay:0.08s; }
.reveal-d2 { transition-delay:0.16s; }
.reveal-d3 { transition-delay:0.24s; }
.reveal-d4 { transition-delay:0.32s; }

.cp-nav {
  position:fixed; top:0; left:0; right:0; z-index:100;
  display:flex; align-items:center; justify-content:space-between;
  padding: 0 clamp(20px,4vw,48px); height:64px;
  background:rgba(6,11,22,0.8);
  backdrop-filter:blur(20px) saturate(1.4);
  border-bottom:1px solid rgba(28,42,66,0.6);
}
.nav-logo { font-family:'Outfit',sans-serif; font-weight:800; font-size:19px; color:var(--text); letter-spacing:-0.5px; display:flex; align-items:center; gap:10px; }
.nav-logo span { color:var(--green); }
.nav-icon { width:30px; height:30px; background:linear-gradient(135deg,var(--green),var(--green2)); border-radius:8px; display:flex; align-items:center; justify-content:center; font-size:14px; box-shadow:0 2px 12px rgba(0,200,83,0.3); }
.nav-links { display:flex; align-items:center; gap:28px; }
.nav-links a { color:var(--text3); font-size:13px; font-weight:500; text-decoration:none; transition:color 0.2s; letter-spacing:0.01em; }
.nav-links a:hover { color:var(--text); }
.nav-cta { background:var(--green)!important; color:#000!important; padding:8px 20px!important; border-radius:8px!important; font-weight:700!important; font-size:13px!important; transition:all 0.2s!important; box-shadow:0 2px 12px rgba(0,200,83,0.25); }
.nav-cta:hover { box-shadow:0 4px 20px rgba(0,200,83,0.4); transform:translateY(-1px); }
.hamburger { display:none; background:none; border:none; cursor:pointer; width:32px; height:32px; flex-direction:column; align-items:center; justify-content:center; gap:5px; }
.hamburger span { display:block; width:20px; height:2px; background:var(--text2); border-radius:2px; transition:all 0.3s; }

.hero { min-height:100vh; display:flex; align-items:center; padding:120px clamp(20px,4vw,48px) 80px; position:relative; overflow:hidden; }
.hero-bg { position:absolute; inset:0; pointer-events:none; background: radial-gradient(ellipse 50% 60% at 65% 40%,rgba(0,200,83,0.06) 0%,transparent 70%), radial-gradient(ellipse 30% 30% at 20% 70%,rgba(16,185,129,0.04) 0%,transparent 60%); }
.hero-grid { position:absolute; inset:0; pointer-events:none; opacity:0.025; background-image:linear-gradient(var(--border2) 1px,transparent 1px),linear-gradient(90deg,var(--border2) 1px,transparent 1px); background-size:64px 64px; }
.hero-noise { position:absolute; inset:0; pointer-events:none; opacity:0.015; background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); background-size:128px 128px; }
.hero-inner { position:relative; z-index:1; display:grid; grid-template-columns:1fr 1fr; gap:60px; align-items:center; max-width:1200px; margin:0 auto; width:100%; }
.hero-badge { display:inline-flex; align-items:center; gap:8px; background:var(--green-soft); border:1px solid rgba(0,200,83,0.2); color:var(--green); padding:6px 16px; border-radius:100px; font-size:11px; font-weight:600; letter-spacing:0.06em; text-transform:uppercase; margin-bottom:28px; }
.hero-badge::before { content:''; width:6px; height:6px; background:var(--green); border-radius:50%; animation:pulse 2s infinite; }
@keyframes pulse { 0%,100%{opacity:1;transform:scale(1);} 50%{opacity:0.4;transform:scale(1.5);} }
.hero-title { font-family:'Outfit',sans-serif; font-size:clamp(40px,4.8vw,62px); font-weight:900; line-height:1.04; letter-spacing:-2px; margin-bottom:22px; }
.hero-title .green { color:var(--green); }
.hero-title .dim { color:var(--text3); font-weight:700; }
.hero-sub { color:var(--text2); font-size:16px; line-height:1.75; max-width:460px; margin-bottom:36px; }
.hero-sub strong { color:var(--text); font-weight:600; }
.hero-ctas { display:flex; gap:12px; align-items:center; flex-wrap:wrap; }
.btn-primary { display:inline-flex; align-items:center; gap:8px; background:var(--green); color:#000; padding:14px 28px; border-radius:10px; font-size:14px; font-weight:700; text-decoration:none; transition:all 0.25s cubic-bezier(0.16,1,0.3,1); box-shadow:0 4px 16px rgba(0,200,83,0.2); }
.btn-primary:hover { transform:translateY(-2px); box-shadow:0 12px 36px rgba(0,200,83,0.35); }
.btn-secondary { display:inline-flex; align-items:center; gap:8px; border:1px solid var(--border2); color:var(--text2); padding:14px 28px; border-radius:10px; font-size:14px; font-weight:500; text-decoration:none; transition:all 0.25s; background:rgba(22,31,51,0.4); }
.btn-secondary:hover { border-color:var(--green2); color:var(--text); background:rgba(22,31,51,0.8); }
.hero-stats { display:flex; gap:36px; margin-top:48px; padding-top:40px; border-top:1px solid var(--border); }
.hero-stat-num { font-family:'Outfit',sans-serif; font-size:28px; font-weight:800; color:var(--green); line-height:1; }
.hero-stat-label { font-size:11px; color:var(--text3); margin-top:4px; letter-spacing:0.02em; }

.hero-visual { position:relative; display:flex; justify-content:center; overflow:clip; padding:0 30px; }
.phone-wrap { position:relative; width:290px; overflow:visible; }
.phone-shell { background:linear-gradient(160deg,var(--card2),#0E1525); border:1px solid var(--border2); border-radius:36px; padding:14px; box-shadow:0 0 0 1px rgba(0,200,83,0.06),0 40px 100px rgba(0,0,0,0.65),0 0 80px rgba(0,200,83,0.04); animation:float 7s ease-in-out infinite; }
@keyframes float { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-14px);} }
.phone-notch { width:100px; height:6px; background:#0E1525; border-radius:0 0 10px 10px; margin:0 auto 8px; }
.phone-screen { background:var(--bg2); border-radius:22px; overflow:hidden; }
.phone-bar { background:var(--card); padding:11px 14px; display:flex; align-items:center; justify-content:space-between; border-bottom:1px solid var(--border); }
.phone-bar-left { display:flex; align-items:center; gap:6px; }
.back-btn { color:var(--green); font-size:11px; font-weight:600; }
.phone-title { font-size:12px; font-weight:600; letter-spacing:-0.2px; }
.phone-body { padding:12px; }
.ba-row { display:grid; grid-template-columns:1fr 1fr; gap:6px; margin-bottom:10px; }
.ba-card { background:var(--card); border:1px solid var(--border); border-radius:10px; padding:10px; text-align:center; }
.ba-label { font-size:8px; letter-spacing:0.12em; color:var(--text3); margin-bottom:2px; font-weight:600; }
.ba-emoji { font-size:26px; display:block; margin:2px 0; }
.metric-grid { display:grid; grid-template-columns:1fr 1fr; gap:5px; margin-bottom:8px; }
.m-card { background:var(--card); border:1px solid var(--border); border-radius:8px; padding:7px 9px; }
.m-label { font-size:7px; letter-spacing:0.1em; color:var(--text3); font-weight:600; }
.m-val { font-family:'Outfit',sans-serif; font-size:14px; font-weight:800; color:var(--green); }
.m-base { font-size:8px; color:var(--text3); }
.mini-chart { background:var(--card); border:1px solid var(--border); border-radius:8px; padding:8px 10px; height:48px; position:relative; overflow:hidden; }
.mini-chart-label { font-size:7px; letter-spacing:0.12em; color:var(--text3); margin-bottom:2px; font-weight:600; }
.chart-line { position:absolute; bottom:8px; left:10px; right:10px; top:22px; }
.float-badge { position:absolute; right:-10px; top:50px; background:var(--card2); border:1px solid var(--border2); border-radius:12px; padding:10px 14px; box-shadow:0 8px 32px rgba(0,0,0,0.5); animation:float 7s ease-in-out infinite 1.2s; white-space:nowrap; z-index:2; }
.float-badge2 { position:absolute; left:-10px; bottom:70px; background:var(--card2); border:1px solid var(--border2); border-radius:12px; padding:10px 14px; box-shadow:0 8px 32px rgba(0,0,0,0.5); animation:float 7s ease-in-out infinite 2.4s; white-space:nowrap; z-index:2; }
.badge-label { font-size:8px; letter-spacing:0.1em; color:var(--text3); margin-bottom:2px; font-weight:600; }
.badge-val { font-family:'Outfit',sans-serif; font-size:18px; font-weight:800; color:var(--green); }
.badge-sub { font-size:9px; color:var(--text3); }

.marquee-wrap { border-top:1px solid var(--border); border-bottom:1px solid var(--border); overflow:hidden; padding:14px 0; background:rgba(17,24,39,0.5); }
.marquee-track { display:flex; gap:56px; animation:marquee 24s linear infinite; width:max-content; }
@keyframes marquee { from{transform:translateX(0);} to{transform:translateX(-50%);} }
.marquee-item { display:flex; align-items:center; gap:10px; font-size:12px; font-weight:600; letter-spacing:0.04em; color:var(--text3); white-space:nowrap; }
.marquee-dot { width:4px; height:4px; background:var(--green); border-radius:50%; flex-shrink:0; }

.audience-section { padding:80px clamp(20px,4vw,48px); background:var(--card); border-bottom:1px solid var(--border); overflow:hidden; }
.audience-inner { max-width:1200px; margin:0 auto; display:grid; grid-template-columns:1fr 1fr; gap:60px; align-items:center; }
.audience-label { display:inline-flex; align-items:center; gap:8px; font-size:11px; font-weight:700; letter-spacing:0.12em; text-transform:uppercase; color:var(--green); margin-bottom:16px; }
.audience-label::before { content:''; width:20px; height:1px; background:var(--green); }
.audience-title { font-family:'Outfit',sans-serif; font-size:clamp(28px,3vw,38px); font-weight:800; letter-spacing:-1px; line-height:1.15; margin-bottom:16px; }
.audience-desc { color:var(--text2); font-size:15px; line-height:1.7; margin-bottom:28px; }
.audience-checks { display:flex; flex-direction:column; gap:12px; }
.audience-check { display:flex; align-items:flex-start; gap:12px; font-size:14px; color:var(--text2); }
.audience-check-icon { width:22px; height:22px; flex-shrink:0; margin-top:1px; background:var(--green-soft); border:1px solid rgba(0,200,83,0.2); border-radius:6px; display:flex; align-items:center; justify-content:center; color:var(--green); font-size:11px; font-weight:700; }
.audience-cards { display:grid; grid-template-columns:1fr 1fr; gap:12px; }
.audience-card { background:var(--card2); border:1px solid var(--border); border-radius:14px; padding:20px; transition:all 0.25s; }
.audience-card:hover { border-color:rgba(0,200,83,0.25); transform:translateY(-2px); }
.audience-card-icon { font-size:24px; margin-bottom:10px; }
.audience-card-title { font-weight:700; font-size:14px; margin-bottom:4px; }
.audience-card-desc { font-size:12px; color:var(--text3); line-height:1.5; }

.cp-section { padding:100px clamp(20px,4vw,48px); overflow:hidden; }
.section-inner { max-width:1200px; margin:0 auto; }
.section-tag { display:inline-flex; align-items:center; gap:8px; font-size:11px; font-weight:700; letter-spacing:0.12em; text-transform:uppercase; color:var(--green); margin-bottom:16px; }
.section-tag::before { content:''; width:20px; height:1px; background:var(--green); }
.section-title { font-family:'Outfit',sans-serif; font-size:clamp(30px,3.5vw,46px); font-weight:800; letter-spacing:-1px; line-height:1.1; margin-bottom:14px; }
.section-sub { color:var(--text2); font-size:15px; max-width:500px; line-height:1.7; }

.features-layout { display:grid; grid-template-columns:1fr 1.15fr; gap:60px; align-items:start; margin-top:52px; }
.feature-list { display:flex; flex-direction:column; gap:2px; }
.feature-item { padding:18px 20px; border-radius:12px; border:1px solid transparent; cursor:pointer; transition:all 0.25s; position:relative; }
.feature-item:hover { background:rgba(22,31,51,0.5); }
.feature-item.active { background:var(--card2); border-color:var(--border2); }
.feature-item.active::before { content:''; position:absolute; left:0; top:12px; bottom:12px; width:3px; background:var(--green); border-radius:0 2px 2px 0; }
.fi-header { display:flex; align-items:center; gap:12px; margin-bottom:4px; }
.fi-icon { width:36px; height:36px; border-radius:10px; display:flex; align-items:center; justify-content:center; font-size:18px; background:var(--green-soft); border:1px solid rgba(0,200,83,0.12); flex-shrink:0; }
.fi-title { font-weight:700; font-size:15px; }
.fi-desc { color:var(--text3); font-size:13px; line-height:1.6; padding-left:48px; }
.feature-preview { position:sticky; top:80px; background:var(--card2); border:1px solid var(--border2); border-radius:20px; padding:24px; box-shadow:0 0 80px rgba(0,200,83,0.03); }
.preview-label { font-size:10px; letter-spacing:0.12em; color:var(--text3); text-transform:uppercase; font-weight:700; margin-bottom:16px; }
.preview-content { transition:opacity 0.3s; }

.imp-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:8px; }
.imp-card { background:var(--card); border:1px solid var(--border); border-radius:10px; padding:14px; }
.imp-label { font-size:8px; letter-spacing:0.12em; color:var(--text3); font-weight:700; }
.imp-val { font-family:'Outfit',sans-serif; font-size:20px; font-weight:800; color:var(--green); line-height:1.3; }
.imp-base { font-size:10px; color:var(--text3); }

.preview-photos { display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:14px; }
.preview-photo-box { background:var(--card); border:1px solid var(--border); border-radius:12px; height:140px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:6px; }
.preview-photo-label { font-size:9px; letter-spacing:0.12em; color:var(--text3); font-weight:600; }
.preview-photo-emoji { font-size:36px; }

.preview-chart-wrap { background:var(--card); border:1px solid var(--border); border-radius:12px; padding:16px; margin-top:10px; }
.preview-chart-head { display:flex; align-items:center; justify-content:space-between; margin-bottom:12px; }
.preview-chart-label { font-size:9px; letter-spacing:0.12em; color:var(--text3); font-weight:700; }
.preview-chart-pills { display:flex; gap:4px; }
.preview-pill { font-size:10px; padding:3px 10px; border-radius:100px; font-weight:600; }
.preview-pill.active { background:var(--green); color:#000; }
.preview-pill.inactive { background:var(--card2); color:var(--text3); border:1px solid var(--border); }

.results-section { background:var(--card); border-top:1px solid var(--border); border-bottom:1px solid var(--border); overflow:hidden; }
.results-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:16px; margin-top:48px; }
.proof-card { background:var(--card2); border:1px solid var(--border); border-radius:16px; overflow:hidden; transition:all 0.3s cubic-bezier(0.16,1,0.3,1); }
.proof-card:hover { transform:translateY(-6px); border-color:rgba(0,200,83,0.3); box-shadow:0 24px 64px rgba(0,0,0,0.4),0 0 40px rgba(0,200,83,0.05); }
.proof-photos { display:grid; grid-template-columns:1fr 1fr; height:150px; }
.proof-photo { background:var(--card); display:flex; flex-direction:column; align-items:center; justify-content:center; gap:6px; }
.proof-photo-label { font-size:8px; letter-spacing:0.12em; color:rgba(255,255,255,0.3); font-weight:600; }
.proof-photo-emoji { font-size:36px; }
.proof-body { padding:16px; }
.proof-name { font-weight:600; font-size:13px; color:var(--text2); margin-bottom:12px; }
.proof-metrics { display:grid; grid-template-columns:repeat(2,1fr); gap:8px; }
.pm-val { font-family:'Outfit',sans-serif; font-size:18px; font-weight:800; color:var(--green); }
.pm-label { font-size:9px; color:var(--text3); letter-spacing:0.06em; font-weight:600; }

.steps-grid { display:grid; grid-template-columns:repeat(4,1fr); margin-top:52px; border:1px solid var(--border); border-radius:16px; overflow:hidden; }
.step { padding:32px 24px; background:var(--card); border-right:1px solid var(--border); transition:all 0.25s; position:relative; }
.step:last-child { border-right:none; }
.step:hover { background:var(--card2); }
.step-num { font-family:'Outfit',sans-serif; font-size:52px; font-weight:900; color:rgba(255,255,255,0.03); line-height:1; position:absolute; top:18px; right:18px; }
.step-icon { width:44px; height:44px; border-radius:12px; background:var(--green-soft); border:1px solid rgba(0,200,83,0.12); display:flex; align-items:center; justify-content:center; font-size:20px; margin-bottom:16px; }
.step-title { font-weight:700; font-size:15px; margin-bottom:8px; }
.step-desc { color:var(--text3); font-size:13px; line-height:1.6; }

.quote-section { padding:0 clamp(20px,4vw,48px) 80px; overflow:hidden; }
.quote-inner { max-width:1200px; margin:0 auto; background:linear-gradient(145deg,rgba(0,200,83,0.05),rgba(16,185,129,0.02)); border:1px solid rgba(0,200,83,0.15); border-radius:20px; padding:44px; display:grid; grid-template-columns:auto 1fr; gap:32px; align-items:center; }
.quote-avatar { width:60px; height:60px; background:var(--card2); border:2px solid rgba(0,200,83,0.3); border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:26px; flex-shrink:0; }
.quote-text { font-family:'Outfit',sans-serif; font-size:18px; font-weight:600; line-height:1.55; color:var(--text); margin-bottom:12px; }
.quote-attr { font-size:13px; color:var(--text3); }
.quote-attr strong { color:var(--text2); }

.pricing-section { background:var(--card); border-top:1px solid var(--border); }
.pricing-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:20px; margin-top:44px; align-items:start; max-width:720px; margin-left:auto; margin-right:auto; }
.price-card { background:var(--card2); border:1px solid var(--border); border-radius:16px; padding:32px 26px; position:relative; transition:all 0.25s; }
.price-card:hover { transform:translateY(-3px); }
.price-card.featured { background:linear-gradient(155deg,#0A1F15,#081810); border-color:rgba(0,200,83,0.35); box-shadow:0 0 60px rgba(0,200,83,0.06),inset 0 1px 0 rgba(0,200,83,0.12); }
.price-badge { position:absolute; top:-11px; left:50%; transform:translateX(-50%); background:var(--green); color:#000; font-size:10px; font-weight:700; letter-spacing:0.08em; text-transform:uppercase; padding:4px 14px; border-radius:100px; white-space:nowrap; }
.price-tier { font-size:11px; letter-spacing:0.1em; color:var(--text3); text-transform:uppercase; font-weight:700; margin-bottom:8px; }
.price-amount { font-family:'Outfit',sans-serif; font-size:38px; font-weight:900; line-height:1; margin-bottom:4px; letter-spacing:-1px; }
.price-period { font-size:12px; color:var(--text3); margin-bottom:24px; }
.price-features { list-style:none; display:flex; flex-direction:column; gap:10px; margin-bottom:28px; padding:0; }
.price-features li { font-size:13px; color:var(--text2); display:flex; gap:10px; align-items:flex-start; }
.price-features li::before { content:'✓'; color:var(--green); font-weight:700; flex-shrink:0; }
.price-btn { display:block; text-align:center; text-decoration:none; padding:13px; border-radius:10px; font-size:14px; font-weight:600; transition:all 0.25s; cursor:pointer; }
.price-btn-outline { border:1px solid var(--border2); color:var(--text2); background:transparent; }
.price-btn-outline:hover { border-color:var(--green2); color:var(--text); }
.price-btn-solid { background:var(--green); color:#000; border:none; }
.price-btn-solid:hover { box-shadow:0 8px 24px rgba(0,200,83,0.3); transform:translateY(-1px); }
.price-note { text-align:center; margin-top:20px; font-size:12px; color:var(--text3); }

.cta-section { padding:100px clamp(20px,4vw,48px); text-align:center; position:relative; overflow:hidden; }
.cta-glow { position:absolute; inset:0; pointer-events:none; background:radial-gradient(ellipse 50% 70% at 50% 100%,rgba(0,200,83,0.06),transparent 70%); }
.cta-inner { max-width:600px; margin:0 auto; position:relative; z-index:1; }
.cta-title { font-family:'Outfit',sans-serif; font-size:clamp(32px,4.5vw,52px); font-weight:900; letter-spacing:-1.5px; line-height:1.1; margin-bottom:18px; }
.cta-title .green { color:var(--green); }
.cta-sub { color:var(--text2); font-size:15px; margin-bottom:32px; line-height:1.7; }
.cta-buttons { display:flex; gap:12px; justify-content:center; flex-wrap:wrap; }
.line-btn { display:inline-flex; align-items:center; gap:10px; background:var(--line-green); color:white; padding:14px 28px; border-radius:10px; font-size:14px; font-weight:700; text-decoration:none; transition:all 0.25s; box-shadow:0 4px 16px rgba(6,199,85,0.2); }
.line-btn:hover { transform:translateY(-2px); box-shadow:0 12px 36px rgba(6,199,85,0.35); }
.email-btn { display:inline-flex; align-items:center; gap:8px; border:1px solid var(--border2); color:var(--text2); padding:14px 28px; border-radius:10px; font-size:14px; font-weight:500; text-decoration:none; transition:all 0.25s; background:rgba(22,31,51,0.4); }
.email-btn:hover { border-color:var(--green2); color:var(--text); }
.cta-small { font-size:12px; color:var(--text3); margin-top:16px; }

.cp-footer { border-top:1px solid var(--border); padding:28px clamp(20px,4vw,48px); display:flex; align-items:center; justify-content:space-between; }
.footer-logo { font-family:'Outfit',sans-serif; font-weight:800; font-size:16px; letter-spacing:-0.3px; }
.footer-logo span { color:var(--green); }
.footer-links { display:flex; gap:24px; }
.footer-links a { font-size:13px; color:var(--text3); text-decoration:none; transition:color 0.2s; }
.footer-links a:hover { color:var(--text); }
.footer-copy { font-size:12px; color:var(--text3); }

@media(max-width:1024px){
  .hero-inner{grid-template-columns:1fr;gap:48px;}
  .hero-visual{order:-1;}
  .phone-wrap{width:250px;}
  .features-layout{grid-template-columns:1fr;}
  .feature-preview{position:static;}
  .results-grid{grid-template-columns:1fr 1fr;}
  .steps-grid{grid-template-columns:1fr 1fr;}
  .step{border-bottom:1px solid var(--border);}
  .step:nth-child(2){border-right:none;}
  .step:nth-child(3){border-right:1px solid var(--border);}
  .pricing-grid{grid-template-columns:1fr;max-width:380px;}
  .audience-inner{grid-template-columns:1fr;gap:40px;}
}
@media(max-width:768px){
  .nav-links{display:none;}
  .nav-links.open{display:flex;flex-direction:column;position:fixed;top:64px;left:0;right:0;background:rgba(6,11,22,0.97);backdrop-filter:blur(20px);padding:24px;gap:20px;border-bottom:1px solid var(--border);animation:slideDown 0.3s ease;}
  @keyframes slideDown{from{opacity:0;transform:translateY(-8px);}to{opacity:1;transform:translateY(0);}}
  .nav-links.open a{font-size:16px;}
  .nav-cta{width:100%;text-align:center;}
  .hamburger{display:flex;}
  .hero{min-height:auto;padding-top:100px;padding-bottom:60px;}
  .hero-inner{text-align:center;}
  .hero-sub{margin-left:auto;margin-right:auto;}
  .hero-ctas{justify-content:center;}
  .hero-stats{justify-content:center;flex-wrap:wrap;gap:24px;}
  .hero-badge{margin-left:auto;margin-right:auto;}
  .float-badge,.float-badge2{display:none;}
  .phone-wrap{width:220px;}
  .results-grid{grid-template-columns:1fr;max-width:400px;margin-left:auto;margin-right:auto;}
  .steps-grid{grid-template-columns:1fr;}
  .step{border-right:none!important;}
  .quote-inner{grid-template-columns:1fr;text-align:center;padding:32px 24px;}
  .quote-avatar{margin:0 auto;}
  .cp-footer{flex-direction:column;gap:16px;text-align:center;}
  .audience-cards{grid-template-columns:1fr;}
}
@media(max-width:480px){
  .hero-title{letter-spacing:-1px;}
  .btn-primary,.btn-secondary,.line-btn,.email-btn{width:100%;justify-content:center;}
  .hero-ctas{flex-direction:column;width:100%;}
  .cta-buttons{flex-direction:column;}
  .imp-grid{grid-template-columns:repeat(2,1fr);}
  .proof-metrics{grid-template-columns:repeat(2,1fr);}
}
`;

// ── Feature preview components ──
const PreviewBodyComp = () => (
  <>
    <div className="imp-grid">
      <div className="imp-card"><div className="imp-label">WEIGHT</div><div className="imp-val">−17 kg</div><div className="imp-base">78 kg</div></div>
      <div className="imp-card"><div className="imp-label">FAT %</div><div className="imp-val">−13%</div><div className="imp-base">22%</div></div>
      <div className="imp-card"><div className="imp-label">VISC FAT</div><div className="imp-val">−5</div><div className="imp-base">7</div></div>
      <div className="imp-card"><div className="imp-label">MUSCLE %</div><div className="imp-val" style={{color:'#3B82F6'}}>+7%</div><div className="imp-base">35%</div></div>
      <div className="imp-card"><div className="imp-label">BMI</div><div className="imp-val">−5.8</div><div className="imp-base">25.6</div></div>
      <div className="imp-card"><div className="imp-label">BODY AGE</div><div className="imp-val">−12</div><div className="imp-base">42 (Real: 54)</div></div>
    </div>
    <div className="preview-chart-wrap">
      <div className="preview-chart-head">
        <div className="preview-chart-label">PROGRESS</div>
        <div className="preview-chart-pills">
          <span className="preview-pill active">Fat %</span>
          <span className="preview-pill inactive">Weight</span>
          <span className="preview-pill inactive">BMI</span>
        </div>
      </div>
      <svg viewBox="0 0 300 55" style={{width:'100%',height:55}}>
        <defs><linearGradient id="pg" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#00C853" stopOpacity="0.2"/><stop offset="100%" stopColor="#00C853" stopOpacity="0"/></linearGradient></defs>
        <path d="M0,4 C50,4 100,14 150,26 C200,38 250,48 300,52 L300,55 L0,55 Z" fill="url(#pg)"/>
        <path d="M0,4 C50,4 100,14 150,26 C200,38 250,48 300,52" fill="none" stroke="#00C853" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="0" cy="4" r="3.5" fill="#00C853"/><circle cx="300" cy="52" r="3.5" fill="#00C853"/>
      </svg>
    </div>
  </>
);

const PreviewPhotos = () => (
  <>
    <div className="preview-photos">
      <div className="preview-photo-box"><div className="preview-photo-label">BEFORE · FRONT</div><div className="preview-photo-emoji">🧍</div></div>
      <div className="preview-photo-box"><div className="preview-photo-label">AFTER · FRONT</div><div className="preview-photo-emoji">🏃</div></div>
      <div className="preview-photo-box"><div className="preview-photo-label">BEFORE · SIDE</div><div className="preview-photo-emoji">🧍</div></div>
      <div className="preview-photo-box"><div className="preview-photo-label">AFTER · SIDE</div><div className="preview-photo-emoji">🏃</div></div>
    </div>
    <div style={{background:'var(--card)',border:'1px solid var(--border)',borderRadius:10,padding:12,textAlign:'center'}}>
      <div style={{fontSize:9,letterSpacing:'0.12em',color:'var(--text3)',fontWeight:700,marginBottom:4}}>4 ANGLES PER SESSION</div>
      <div style={{fontSize:13,color:'var(--text2)'}}>Front · Right · Left · Back</div>
    </div>
  </>
);

const PreviewCoachProofs = () => (
  <>
    <div style={{background:'linear-gradient(145deg,rgba(0,200,83,0.06),rgba(16,185,129,0.02))',border:'1px solid rgba(0,200,83,0.15)',borderRadius:14,padding:18,marginBottom:10}}>
      <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:12}}><span style={{fontSize:18}}>🏆</span><span style={{fontWeight:700,fontSize:14}}>Featured CoachProof</span></div>
      <div style={{fontSize:22,fontWeight:900,fontFamily:"'Outfit',sans-serif",color:'var(--green)',marginBottom:4}}>สมชาย ว.</div>
      <div style={{fontSize:12,color:'var(--text3)',marginBottom:14}}>12-week program · June – Aug 2024</div>
      <div className="imp-grid">
        <div className="imp-card"><div className="imp-label">WEIGHT</div><div className="imp-val">−17 kg</div></div>
        <div className="imp-card"><div className="imp-label">FAT %</div><div className="imp-val">−13%</div></div>
        <div className="imp-card"><div className="imp-label">BODY AGE</div><div className="imp-val">−12 yrs</div></div>
      </div>
    </div>
    <div style={{fontSize:11,color:'var(--text3)',textAlign:'center',padding:8}}>Pin any client transformation → instant sales tool</div>
  </>
);

const PreviewLegacy = () => (
  <>
    <div style={{background:'var(--card)',border:'1px solid var(--border)',borderRadius:14,padding:18,marginBottom:10}}>
      <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:14}}>
        <span style={{background:'rgba(0,200,83,0.1)',border:'1px solid rgba(0,200,83,0.2)',color:'var(--green)',fontSize:10,fontWeight:700,padding:'3px 10px',borderRadius:100,letterSpacing:'0.06em'}}>LEGACY</span>
        <span style={{fontSize:13,color:'var(--text2)',fontWeight:600}}>ผลงานเดิม</span>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8,marginBottom:12}}>
        <div><div style={{fontSize:9,color:'var(--text3)',fontWeight:600,letterSpacing:'0.1em'}}>START DATE</div><div style={{fontSize:14,fontWeight:700}}>Jun 1, 2024</div></div>
        <div><div style={{fontSize:9,color:'var(--text3)',fontWeight:600,letterSpacing:'0.1em'}}>END DATE</div><div style={{fontSize:14,fontWeight:700}}>Aug 30, 2024</div></div>
      </div>
      <div style={{fontSize:12,color:'var(--text3)',lineHeight:1.6}}>Enter historical dates, metrics, and photos from any past client. No date restrictions — digitize results from 2020, 2023, anytime.</div>
    </div>
    <div style={{display:'flex',gap:6}}>
      {['Info + Photos','Before Data','After Data'].map((t,i) => (
        <div key={i} style={{flex:1,background:'var(--card)',border:'1px solid var(--border)',borderRadius:10,padding:12,textAlign:'center'}}>
          <div style={{fontSize:9,color:'var(--text3)',fontWeight:600,letterSpacing:'0.1em'}}>STEP {i+1}</div>
          <div style={{fontSize:12,fontWeight:600,marginTop:2}}>{t}</div>
        </div>
      ))}
    </div>
  </>
);

const PreviewReminders = () => (
  <>
    <div style={{display:'flex',flexDirection:'column',gap:8}}>
      {[
        {icon:'🔔',bg:'rgba(59,130,246,0.1)',border:'rgba(59,130,246,0.15)',title:'Check-in due: วิภา ส.',sub:'Week 4 milestone · Last check-in: 8 days ago'},
        {icon:'✅',bg:'rgba(0,200,83,0.1)',border:'rgba(0,200,83,0.15)',title:'สมชาย ว. checked in',sub:'Week 8 · Weight −14 kg so far'},
        {icon:'⚠️',bg:'rgba(239,68,68,0.1)',border:'rgba(239,68,68,0.15)',title:'Overdue: กานต์ ป.',sub:'14 days since last check-in · Program at risk'},
      ].map((r,i) => (
        <div key={i} style={{background:'var(--card)',border:'1px solid var(--border)',borderRadius:12,padding:14,display:'flex',alignItems:'center',gap:12}}>
          <div style={{width:40,height:40,borderRadius:10,background:r.bg,border:`1px solid ${r.border}`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:18,flexShrink:0}}>{r.icon}</div>
          <div><div style={{fontWeight:600,fontSize:13}}>{r.title}</div><div style={{fontSize:11,color:'var(--text3)'}}>{r.sub}</div></div>
        </div>
      ))}
    </div>
    <div style={{fontSize:11,color:'var(--text3)',textAlign:'center',padding:'10px 0 0'}}>Automatic reminders · No manual tracking needed</div>
  </>
);

const FEATURES = [
  { icon:'📊', title:'Body Composition Tracking', desc:'Log weight, fat%, visceral fat, muscle mass, BMI, body age, and BMR from your Tanita or InBody scale. Every metric, every session.', label:'Live Preview — Body Composition', Preview: PreviewBodyComp },
  { icon:'📸', title:'Before / After Photos', desc:'4-angle photo capture per session. Swipeable before/after that your clients and prospects will actually want to see.', label:'Live Preview — Before / After Photos', Preview: PreviewPhotos },
  { icon:'🏆', title:'CoachProofs — Your Showcase', desc:'Pin your best transformations. Stats, charts, before/after photos — polished and ready for any prospect meeting.', label:'Live Preview — CoachProofs Showcase', Preview: PreviewCoachProofs },
  { icon:'📂', title:'Legacy Client Import', desc:"Already have great results? Digitize past client data and start using it in your pitch today. No starting from zero.", label:'Live Preview — Legacy Client Import', Preview: PreviewLegacy },
  { icon:'🔔', title:'Smart Reminders', desc:"Automated check-in reminders at key milestones. Stay top of mind without manually tracking who's overdue.", label:'Live Preview — Smart Reminders', Preview: PreviewReminders },
];

const MARQUEE_ITEMS = ['Body Composition Tracking','Before / After Photos','CoachProofs Showcase','Legacy Client Import','Automated Check-In Reminders','English + ภาษาไทย','Progress Charts','Tanita / InBody Ready'];

// ── Reveal hook ──
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    ref.current.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
  return ref;
}

// ── Main component ──
export default function CoachProofLanding() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const rootRef = useReveal();
  const ActivePreview = FEATURES[activeFeature].Preview;

  const scrollTo = useCallback((id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <div ref={rootRef} style={{overflowX:'clip',maxWidth:'100vw'}}>
      <style>{CSS}</style>

      {/* NAV */}
      <nav className="cp-nav">
        <div className="nav-logo"><div className="nav-icon">📊</div>Coach<span>Proof</span></div>
        <div className={`nav-links${menuOpen ? ' open' : ''}`}>
          <a href="#features" onClick={(e) => { e.preventDefault(); scrollTo('features'); }}>Features</a>
          <a href="#results" onClick={(e) => { e.preventDefault(); scrollTo('results'); }}>Results</a>
          <a href="#how" onClick={(e) => { e.preventDefault(); scrollTo('how'); }}>How it works</a>
          <a href="#pricing" onClick={(e) => { e.preventDefault(); scrollTo('pricing'); }}>Pricing</a>
          <a href="https://testflight.apple.com/join/BaS3HwKx" className="nav-cta" target="_blank" rel="noopener noreferrer">Download Beta</a>
        </div>
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span style={menuOpen ? {transform:'rotate(45deg) translate(5px,5px)'} : {}}/> 
          <span style={menuOpen ? {opacity:0} : {}}/> 
          <span style={menuOpen ? {transform:'rotate(-45deg) translate(5px,-5px)'} : {}}/>
        </button>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-bg"/>
        <div className="hero-grid"/>
        <div className="hero-noise"/>
        <div className="hero-inner">
          <div>
            <div className="hero-badge reveal">Now in Beta · iOS TestFlight</div>
            <h1 className="hero-title reveal reveal-d1">Close More.<br/><span className="green">Retain More.</span><br/><span className="dim">Prove Everything.</span></h1>
            <p className="hero-sub reveal reveal-d2">The CRM built for weight management coaches. Track body composition, capture before &amp; after photos, and turn your <strong>best results into a closing tool.</strong></p>
            <div className="hero-ctas reveal reveal-d3">
              <a href="https://testflight.apple.com/join/BaS3HwKx" className="btn-primary" target="_blank" rel="noopener noreferrer">Download Beta →</a>
              <a href="#features" className="btn-secondary" onClick={(e) => { e.preventDefault(); scrollTo('features'); }}>See Features</a>
            </div>
            <div className="hero-stats reveal reveal-d4">
              {[['8','Metrics tracked'],['4','Photo angles'],['2×','EN + ภาษาไทย'],['0','Spreadsheets needed']].map(([n,l],i) => (
                <div key={i}><div className="hero-stat-num">{n}</div><div className="hero-stat-label">{l}</div></div>
              ))}
            </div>
          </div>
          <div className="hero-visual reveal">
            <div className="phone-wrap">
              <div className="float-badge"><div className="badge-label">BODY AGE</div><div className="badge-val">−12 yrs</div><div className="badge-sub">Age 54 → Body age 42</div></div>
              <div className="float-badge2"><div className="badge-label">ACTIVE CLIENTS</div><div className="badge-val">18</div><div className="badge-sub">↑ 5 this month</div></div>
              <div className="phone-shell">
                <div className="phone-notch"/>
                <div className="phone-screen">
                  <div className="phone-bar">
                    <div className="phone-bar-left"><span className="back-btn">← Clients</span></div>
                    <span className="phone-title">สมชาย ว.</span>
                    <span style={{fontSize:14,color:'var(--text3)'}}>⋯</span>
                  </div>
                  <div className="phone-body">
                    <div className="ba-row">
                      <div className="ba-card"><div className="ba-label">BEFORE</div><span className="ba-emoji">🧍</span></div>
                      <div className="ba-card"><div className="ba-label">AFTER</div><span className="ba-emoji">🏃</span></div>
                    </div>
                    <div className="metric-grid">
                      <div className="m-card"><div className="m-label">WEIGHT</div><div className="m-val">−17 kg</div><div className="m-base">78 kg current</div></div>
                      <div className="m-card"><div className="m-label">FAT %</div><div className="m-val">−13%</div><div className="m-base">22% current</div></div>
                      <div className="m-card"><div className="m-label">VISC FAT</div><div className="m-val">−5</div><div className="m-base">7 current</div></div>
                      <div className="m-card"><div className="m-label">MUSCLE %</div><div className="m-val" style={{color:'#3B82F6'}}>+7%</div><div className="m-base">35% current</div></div>
                    </div>
                    <div className="mini-chart">
                      <div className="mini-chart-label">WEIGHT PROGRESS</div>
                      <svg className="chart-line" viewBox="0 0 240 30" preserveAspectRatio="none">
                        <defs><linearGradient id="cg" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#00C853" stopOpacity="0.3"/><stop offset="100%" stopColor="#00C853" stopOpacity="0"/></linearGradient></defs>
                        <path d="M0,2 C30,2 60,5 90,10 C120,15 150,20 180,24 C210,27 230,28 240,28 L240,30 L0,30 Z" fill="url(#cg)"/>
                        <path d="M0,2 C30,2 60,5 90,10 C120,15 150,20 180,24 C210,27 230,28 240,28" fill="none" stroke="#00C853" strokeWidth="2" strokeLinecap="round"/>
                        <circle cx="0" cy="2" r="3" fill="#00C853"/><circle cx="90" cy="10" r="2.5" fill="#00C853" opacity="0.6"/><circle cx="180" cy="24" r="2.5" fill="#00C853" opacity="0.6"/><circle cx="240" cy="28" r="3" fill="#00C853"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee-wrap">
        <div className="marquee-track">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <div className="marquee-item" key={i}><span className="marquee-dot"/>{item}</div>
          ))}
        </div>
      </div>

      {/* AUDIENCE */}
      <div className="audience-section">
        <div className="audience-inner reveal">
          <div>
            <div className="audience-label">Built for coaches</div>
            <div className="audience-title">Stop pitching with screenshots.<br/>Start closing with proof.</div>
            <p className="audience-desc">If you're a weight management coach who's ever scrolled through LINE chats to find a client's before photo during a meeting — CoachProof replaces that with a tap.</p>
            <div className="audience-checks">
              {['Health and weight management coaches running any program','Coaches with past results in LINE chats or paper records','Team leaders who need a showcase for Diamond meetings'].map((t,i) => (
                <div className="audience-check" key={i}><div className="audience-check-icon">✓</div><span>{t}</span></div>
              ))}
            </div>
          </div>
          <div className="audience-cards">
            {[
              {icon:'📉',title:'The Problem',desc:'Client results scattered across LINE chats, spreadsheets, and InBody printouts. Impossible to present professionally.'},
              {icon:'✨',title:'The Fix',desc:'One app. All your client data, photos, and charts. Pull up any client transformation in 2 seconds, mid-conversation.'},
              {icon:'⏱️',title:'Legacy Import',desc:'Already have great results? Import past clients immediately — no waiting 90 days to build new showcase data.'},
              {icon:'🤝',title:'Close Rate',desc:'Real numbers close prospects. When they see tracked, measured transformations — not just talk — they sign up.'},
            ].map((c,i) => (
              <div className={`audience-card reveal reveal-d${i+1}`} key={i}>
                <div className="audience-card-icon">{c.icon}</div>
                <div className="audience-card-title">{c.title}</div>
                <div className="audience-card-desc">{c.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FEATURES */}
      <section className="cp-section" id="features">
        <div className="section-inner">
          <div className="section-tag reveal">Features</div>
          <h2 className="section-title reveal">Everything a coach needs<br/>to close and retain.</h2>
          <p className="section-sub reveal">Built for weight management coaches in Thailand. Not a generic fitness app — a closing tool.</p>
          <div className="features-layout">
            <div className="feature-list">
              {FEATURES.map((f, i) => (
                <div key={i} className={`feature-item reveal${i === activeFeature ? ' active' : ''}`} onClick={() => setActiveFeature(i)}>
                  <div className="fi-header"><div className="fi-icon">{f.icon}</div><div className="fi-title">{f.title}</div></div>
                  <div className="fi-desc">{f.desc}</div>
                </div>
              ))}
            </div>
            <div className="feature-preview reveal">
              <div className="preview-label">{FEATURES[activeFeature].label}</div>
              <div className="preview-content" key={activeFeature}><ActivePreview/></div>
            </div>
          </div>
        </div>
      </section>

      {/* RESULTS */}
      <section className="cp-section results-section" id="results">
        <div className="section-inner">
          <div className="section-tag reveal">Results</div>
          <h2 className="section-title reveal">Real transformations.<br/>Real data.</h2>
          <p className="section-sub reveal">These aren't testimonials. They're tracked, measured results — the kind that close prospects on the spot.</p>
          <div className="results-grid">
            {[
              {name:'Client A · 12-week program',before:'🧍‍♀️',after:'🏃‍♀️',metrics:[['−17 kg','WEIGHT'],['−13%','BODY FAT'],['−12 yrs','BODY AGE'],['−5','VISCERAL FAT']]},
              {name:'Client B · 8-week program',before:'🧍',after:'🏋️',metrics:[['−9 kg','WEIGHT'],['−8.5%','BODY FAT'],['−8 yrs','BODY AGE'],['−4','VISCERAL FAT']]},
              {name:'Client C · 16-week program',before:'🧍‍♀️',after:'💪',metrics:[['−22 kg','WEIGHT'],['−14%','BODY FAT'],['−18 yrs','BODY AGE'],['−8','VISCERAL FAT']]},
            ].map((c,i) => (
              <div className={`proof-card reveal reveal-d${i+1}`} key={i}>
                <div className="proof-photos">
                  <div className="proof-photo" style={{borderRight:'1px solid var(--border)'}}><div className="proof-photo-label">BEFORE</div><div className="proof-photo-emoji">{c.before}</div></div>
                  <div className="proof-photo"><div className="proof-photo-label">AFTER</div><div className="proof-photo-emoji">{c.after}</div></div>
                </div>
                <div className="proof-body">
                  <div className="proof-name">{c.name}</div>
                  <div className="proof-metrics">
                    {c.metrics.map(([v,l],j) => <div key={j}><div className="pm-val">{v}</div><div className="pm-label">{l}</div></div>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p style={{textAlign:'center',marginTop:24,fontSize:13,color:'var(--text3)'}}>Replace these with your real client results — legacy import makes it instant.</p>
        </div>
      </section>

      {/* QUOTE */}
      <div className="quote-section" style={{paddingTop:80}}>
        <div className="quote-inner reveal">
          <div className="quote-avatar">👤</div>
          <div>
            <div className="quote-text">{"\u201C"}Before CoachProof, I was scrolling through LINE chats to find client photos during meetings. Now I open the app and the numbers speak for themselves. It closes for me.{"\u201D"}</div>
            <div className="quote-attr"><strong>Beta Coach</strong> · Weight Management Program, Bangkok</div>
          </div>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <section className="cp-section" id="how">
        <div className="section-inner">
          <div className="section-tag reveal">How it works</div>
          <h2 className="section-title reveal">Simple for you.<br/>Impressive for prospects.</h2>
          <div className="steps-grid">
            {[
              {num:'01',icon:'➕',title:'Add a client',desc:'Create a profile in seconds. Add starting body comp measurements and first set of 4-angle photos.'},
              {num:'02',icon:'📏',title:'Track every session',desc:'Log body composition after each scan. Add photos. CoachProof handles the math, deltas, and charts.'},
              {num:'03',icon:'⭐',title:'Feature your best',desc:'Pin top transformations as CoachProofs. A polished showcase ready for any sales conversation.'},
              {num:'04',icon:'🤝',title:'Close the deal',desc:'Pull up your CoachProofs mid-meeting. Real numbers, real photos. Let the data do the selling.'},
            ].map((s,i) => (
              <div className={`step reveal reveal-d${i+1}`} key={i}>
                <div className="step-num">{s.num}</div>
                <div className="step-icon">{s.icon}</div>
                <div className="step-title">{s.title}</div>
                <div className="step-desc">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="cp-section pricing-section" id="pricing">
        <div className="section-inner">
          <div className="section-tag reveal">Pricing</div>
          <h2 className="section-title reveal">One tool. Pays for itself<br/>with one new client.</h2>
          <p className="reveal" style={{display:'inline-flex',alignItems:'center',gap:8,fontSize:12,color:'var(--green)',background:'var(--green-soft)',border:'1px solid rgba(0,200,83,0.18)',padding:'6px 14px',borderRadius:100,marginTop:12}}>✓ Early access pricing — locked in for life</p>
          <div className="pricing-grid">
            <div className="price-card reveal reveal-d1">
              <div className="price-tier">Free</div>
              <div className="price-amount">฿0</div>
              <div className="price-period">During beta</div>
              <ul className="price-features">
                <li>Up to 10 new clients</li>
                <li>5 legacy client imports</li>
                <li>Full CoachProofs showcase (beta only)</li>
                <li>Body composition tracking</li>
                <li>Before/after photos</li>
                <li>Progress charts</li>
                <li>English + Thai</li>
              </ul>
              <a href="https://testflight.apple.com/join/BaS3HwKx" className="price-btn price-btn-outline" target="_blank" rel="noopener noreferrer">Join Beta Free</a>
            </div>
            <div className="price-card featured reveal reveal-d2">
              <div className="price-badge">Best Value</div>
              <div className="price-tier" style={{color:'var(--green2)'}}>Pro Coach</div>
              <div className="price-amount">฿150</div>
              <div className="price-period">per month · cancel anytime</div>
              <ul className="price-features">
                <li>Unlimited clients</li>
                <li>Unlimited legacy imports</li>
                <li>Full CoachProofs showcase</li>
                <li>Automated check-in reminders</li>
                <li>Priority support via LINE</li>
                <li>English + Thai</li>
              </ul>
              <a href="https://testflight.apple.com/join/BaS3HwKx" className="price-btn price-btn-solid" target="_blank" rel="noopener noreferrer">Get Early Access</a>
            </div>
          </div>
          <div className="price-note">No credit card required · Free during beta · Cancel anytime</div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section" id="cta">
        <div className="cta-glow"/>
        <div className="cta-inner">
          <div className="section-tag reveal" style={{justifyContent:'center',marginBottom:16}}>Early Access</div>
          <h2 className="cta-title reveal">Your results deserve<br/><span className="green">better than a LINE chat.</span></h2>
          <p className="cta-sub reveal">CoachProof is launching on iOS. Join the beta now — early access members get Pro pricing locked in for life.</p>
          <div className="cta-buttons reveal">
            <a href="https://testflight.apple.com/join/BaS3HwKx" className="line-btn" target="_blank" rel="noopener noreferrer">📲 Download on TestFlight</a>
            <a href="mailto:hello@coachproof.app" className="email-btn">✉️ Email us</a>
          </div>
          <p className="cta-small reveal">ไม่ต้องใช้บัตรเครดิต · ฟรีช่วง Beta · ยกเลิกได้ตลอด</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="cp-footer">
        <div className="footer-logo">Coach<span>Proof</span></div>
        <div className="footer-links">
          <a href="#features" onClick={(e) => { e.preventDefault(); scrollTo('features'); }}>Features</a>
          <a href="#results" onClick={(e) => { e.preventDefault(); scrollTo('results'); }}>Results</a>
          <a href="#pricing" onClick={(e) => { e.preventDefault(); scrollTo('pricing'); }}>Pricing</a>
          <a href="mailto:hello@coachproof.app">Contact</a>
        </div>
        <div className="footer-copy">© 2026 CoachProof · Built in Bangkok 🇹🇭</div>
      </footer>
    </div>
  );
}