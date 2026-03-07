import { useState, useEffect, useRef } from "react";

const C = {
  bg: "#0B1121", bg2: "#0F1729", card: "#1A2235", card2: "#111827",
  border: "#1E2D45", border2: "#243044",
  green: "#00C853", green2: "#10B981", green3: "#00FF6A",
  glow: "rgba(0,200,83,0.15)", text: "#FFFFFF",
  muted: "#6B7280", muted2: "#9CA3AF", red: "#EF4444",
};

function useReveal() {
  const ref = useRef();
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.08 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, delay = 0, style = {} }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(20px)", transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`, ...style }}>
      {children}
    </div>
  );
}

const FEATURES = [
  { icon: "📊", title: "Body Composition Tracking", desc: "Log weight, fat%, visceral fat, muscle mass, BMI, body age, and BMR from your Tanita scale. Every metric in one place, every session." },
  { icon: "📸", title: "Before / After Photos", desc: "4-angle photo capture (front, right, left, back) for every session. Swipeable before/after view your clients will actually want to see." },
  { icon: "🏆", title: "CoachProofs — Your Showcase", desc: "Feature your best client transformations. Improvement stats, progress charts, and before/after photos — ready to show any prospect." },
  { icon: "📂", title: "Legacy Client Import", desc: "Already have results? Digitize your past client data and start using it in your pitch immediately. No starting from zero." },
  { icon: "🔔", title: "Automated Check-In Reminders", desc: "Reminders go out at key program milestones automatically. Stay top of mind without manually tracking who's due for a check-in." },
];

const STEPS = [
  { num: "01", icon: "➕", title: "Add a client", desc: "Create a client profile in seconds. Add their starting Tanita measurements and first set of photos." },
  { num: "02", icon: "📏", title: "Track every session", desc: "Log body composition after each Tanita scan. Add 4-angle photos. CoachProof handles the math and charts." },
  { num: "03", icon: "✨", title: "Feature your best results", desc: "Pin top transformations as CoachProofs. A polished, swipeable showcase ready for any sales conversation." },
  { num: "04", icon: "🤝", title: "Close the prospect", desc: "Pull up your CoachProofs in the meeting. Real numbers, real photos, real results. Let the data do the talking." },
];

const PROOF_CARDS = [
  { name: "Client A · 12-week program", before: "🧍‍♀️", after: "🏃‍♀️", stats: [{ val: "-84 kg", label: "WEIGHT LOST" }, { val: "-31%", label: "FAT REDUCED" }, { val: "-56 yrs", label: "BODY AGE" }, { val: "-19", label: "VISCERAL FAT" }] },
  { name: "Client B · 8-week program", before: "🧍", after: "🏋️", stats: [{ val: "-12 kg", label: "WEIGHT LOST" }, { val: "-8.5%", label: "FAT REDUCED" }, { val: "-14 yrs", label: "BODY AGE" }, { val: "-7", label: "VISCERAL FAT" }] },
  { name: "Client C · 16-week program", before: "🧍‍♀️", after: "💪", stats: [{ val: "-22 kg", label: "WEIGHT LOST" }, { val: "-14%", label: "FAT REDUCED" }, { val: "-28 yrs", label: "BODY AGE" }, { val: "-11", label: "VISCERAL FAT" }] },
];

const PRICING = [
  { name: "Starter", amount: "Free", period: "During beta", featured: false, btn: "Join Beta", btnStyle: "outline", features: ["Up to 5 clients", "Body composition tracking", "Before/after photos", "Progress charts", "English + Thai"] },
  { name: "Pro Coach", amount: "฿590", period: "per month · cancel anytime", featured: true, btn: "Get Early Access", btnStyle: "green", features: ["Unlimited clients", "Full CoachProofs showcase", "Legacy client import", "Automated check-in reminders", "Priority support via LINE", "English + Thai"] },
  { name: "Team", amount: "฿1,490", period: "per month · up to 5 coaches", featured: false, btn: "Contact us", btnStyle: "outline", features: ["Everything in Pro", "Up to 5 coach accounts", "Shared client showcase", "Team performance overview", "Onboarding support", "Custom LINE integration"] },
];

export default function CoachProof() {
  const [activeFeature, setActiveFeature] = useState(0);

  return (
    <div style={{ fontFamily: "'Outfit', sans-serif", background: C.bg, color: C.text, overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Syne+Mono&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:none; } }
        @keyframes blink { 0%,100% { opacity:1; } 50% { opacity:0.3; } }
        @keyframes marquee { from { transform:translateX(0); } to { transform:translateX(-50%); } }
        a { text-decoration: none; }
        .nav-link { color:${C.muted}; font-size:13px; font-weight:500; text-decoration:none; transition:color 0.2s; }
        .nav-link:hover { color:${C.text}; }
        .nav-link.cta { background:${C.green}; color:#000; padding:8px 20px; border-radius:8px; font-weight:600; }
        .nav-link.cta:hover { opacity:0.85; }
        .btn-primary { display:inline-flex; align-items:center; gap:8px; background:${C.green}; color:#000; padding:14px 28px; border-radius:10px; font-size:14px; font-weight:700; text-decoration:none; transition:transform 0.2s, box-shadow 0.2s; }
        .btn-primary:hover { transform:translateY(-2px); box-shadow:0 12px 32px rgba(0,200,83,0.3); }
        .btn-secondary { display:inline-flex; align-items:center; gap:8px; border:1px solid ${C.border2}; color:${C.muted2}; padding:14px 28px; border-radius:10px; font-size:14px; font-weight:500; transition:all 0.2s; }
        .btn-secondary:hover { border-color:${C.green2}; color:${C.text}; }
        .proof-card { background:${C.card}; border:1px solid ${C.border}; border-radius:14px; overflow:hidden; transition:transform 0.2s, border-color 0.2s; }
        .proof-card:hover { transform:translateY(-4px); border-color:rgba(0,200,83,0.3); }
        .metric-card { background:${C.card2}; border:1px solid ${C.border}; border-radius:10px; padding:14px 16px; transition:border-color 0.2s; }
        .metric-card:hover { border-color:rgba(0,200,83,0.3); }
        .step { background:${C.bg2}; padding:32px 28px; position:relative; transition:background 0.2s; }
        .step:hover { background:${C.card}; }
        .step:hover .step-num { color:rgba(0,200,83,0.2); }
        .price-card { background:${C.card}; border:1px solid ${C.border}; border-radius:16px; padding:32px 28px; position:relative; transition:transform 0.2s; }
        .price-card:hover { transform:translateY(-3px); }
        .price-card.featured { background:linear-gradient(145deg,#0D2218,#091A10); border-color:rgba(0,200,83,0.4); box-shadow:0 0 40px rgba(0,200,83,0.08), inset 0 1px 0 rgba(0,200,83,0.15); }
        .line-btn { display:inline-flex; align-items:center; gap:10px; background:#06C755; color:white; padding:14px 28px; border-radius:10px; font-size:14px; font-weight:700; transition:transform 0.2s, box-shadow 0.2s; }
        .line-btn:hover { transform:translateY(-2px); box-shadow:0 12px 32px rgba(6,199,85,0.3); }
        .feature-item { padding:20px; border-radius:12px; border:1px solid transparent; cursor:pointer; transition:all 0.2s; position:relative; }
        .feature-item:hover, .feature-item.active { background:${C.card}; border-color:${C.border2}; }
        .feature-item.active::before { content:''; position:absolute; left:0; top:12px; bottom:12px; width:3px; background:${C.green}; border-radius:0 2px 2px 0; }
      `}</style>

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "0 48px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(11,17,33,0.85)", backdropFilter: "blur(12px)", borderBottom: `1px solid ${C.border}` }}>
        <a href="#" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <div style={{ width: 32, height: 32, background: "linear-gradient(135deg,#0D2010,#0A2818)", border: `1px solid ${C.green2}`, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, boxShadow: `0 0 12px ${C.glow}` }}>📊</div>
          <span style={{ fontWeight: 700, fontSize: 16, color: C.text, letterSpacing: -0.3 }}>Coach<span style={{ color: C.green }}>Proof</span></span>
        </a>
        <div style={{ display: "flex", gap: 32 }}>
          {[["#features", "Features"], ["#proof", "Results"], ["#how", "How it works"], ["#pricing", "Pricing"]].map(([href, label]) => (
            <a key={href} href={href} className="nav-link">{label}</a>
          ))}
        </div>
        <a href="#contact" className="nav-link cta">Get Early Access</a>
      </nav>

      {/* HERO */}
      <section style={{ minHeight: "100vh", padding: "120px 48px 80px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", width: 600, height: 600, background: "radial-gradient(circle,rgba(0,200,83,0.08) 0%,transparent 70%)", top: "50%", left: "30%", transform: "translate(-50%,-50%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(rgba(30,45,69,0.3) 1px,transparent 1px),linear-gradient(90deg,rgba(30,45,69,0.3) 1px,transparent 1px)`, backgroundSize: "40px 40px", pointerEvents: "none", maskImage: "radial-gradient(ellipse at center,black 30%,transparent 80%)" }} />

        <div style={{ position: "relative" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(0,200,83,0.1)", border: "1px solid rgba(0,200,83,0.25)", borderRadius: 100, padding: "6px 14px", fontSize: 11, fontWeight: 600, color: C.green, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 24, animation: "fadeUp 0.7s ease 0.1s both" }}>
            <span style={{ width: 6, height: 6, background: C.green, borderRadius: "50%", animation: "blink 2s ease-in-out infinite" }} />
            Now in TestFlight
          </div>
          <h1 style={{ fontSize: "clamp(40px,4.5vw,64px)", fontWeight: 900, lineHeight: 1.05, letterSpacing: -2, marginBottom: 20, animation: "fadeUp 0.7s ease 0.2s both" }}>
            Close More.<br />
            <span style={{ color: C.green }}>Retain More.</span><br />
            <span style={{ color: C.muted, fontWeight: 300 }}>Track Everything.</span>
          </h1>
          <p style={{ fontSize: 16, lineHeight: 1.7, color: C.muted2, maxWidth: 440, marginBottom: 36, fontWeight: 300, animation: "fadeUp 0.7s ease 0.3s both" }}>
            CoachProof is the CRM built for weight management coaches. Track Tanita body composition, capture before/after photos, and turn your best results into a closing tool.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", animation: "fadeUp 0.7s ease 0.4s both" }}>
            <a href="#contact" className="btn-primary">Get Early Access →</a>
            <a href="#features" className="btn-secondary">See Features</a>
          </div>
        </div>

        {/* Phone mockup */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", position: "relative", animation: "fadeUp 0.8s ease 0.5s both" }}>
          <div style={{ width: 260, background: C.card, borderRadius: 32, border: `1px solid ${C.border2}`, overflow: "hidden", boxShadow: `0 0 0 6px rgba(26,34,53,0.8), 0 40px 80px rgba(0,0,0,0.6), 0 0 60px rgba(0,200,83,0.08)`, position: "relative", zIndex: 2 }}>
            <div style={{ background: "#0D1829", padding: "10px 16px 8px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: `1px solid ${C.border}` }}>
              <span style={{ fontSize: 11, color: C.green, fontWeight: 500 }}>← Clients</span>
              <span style={{ fontSize: 12, fontWeight: 600 }}>Client Profile</span>
              <span style={{ fontSize: 11, color: C.muted }}>•••</span>
            </div>
            <div style={{ display: "flex", gap: 12, padding: "8px 16px", background: "#0D1829", borderBottom: `1px solid ${C.border}` }}>
              {["OVERVIEW", "PHOTOS", "HISTORY"].map((t, i) => (
                <span key={t} style={{ fontSize: 10, fontWeight: 600, letterSpacing: 1, color: i === 0 ? C.green : C.muted, paddingBottom: 6, borderBottom: i === 0 ? `2px solid ${C.green}` : "none" }}>{t}</span>
              ))}
            </div>
            {/* Before/after */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", height: 140, position: "relative" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "rgba(255,255,255,0.05)", position: "relative" }}>
                <span style={{ position: "absolute", top: 6, fontSize: 8, fontWeight: 700, letterSpacing: 2, color: C.muted }}>BEFORE</span>
                <span style={{ fontSize: 48 }}>🧍‍♀️</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "rgba(0,200,83,0.05)", position: "relative" }}>
                <span style={{ position: "absolute", top: 6, fontSize: 8, fontWeight: 700, letterSpacing: 2, color: C.muted }}>AFTER</span>
                <span style={{ fontSize: 48, filter: "drop-shadow(0 0 8px rgba(0,200,83,0.3))" }}>🏃‍♀️</span>
              </div>
              <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 2, background: C.green, boxShadow: `0 0 8px ${C.green}` }}>
                <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 20, height: 20, background: C.green, borderRadius: "50%", border: "2px solid white", boxShadow: `0 0 12px ${C.green}` }} />
              </div>
            </div>
            {/* Metrics */}
            <div style={{ padding: "10px 10px 6px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
              {[["WEIGHT", "-84.0 kg", "96 kg current"], ["FAT %", "-31.0%", "24% current"], ["VISCERAL FAT", "-19", "11 current"], ["BODY AGE", "-56", "43 (Real: 78)"]].map(([label, val, sub]) => (
                <div key={label} style={{ background: C.card2, border: `1px solid ${C.border}`, borderRadius: 8, padding: "8px 10px" }}>
                  <div style={{ fontSize: 7, color: C.muted, letterSpacing: 1, fontWeight: 600, marginBottom: 3, fontFamily: "monospace" }}>{label}</div>
                  <div style={{ fontSize: 16, fontWeight: 800, lineHeight: 1, color: C.green }}>{val}</div>
                  <div style={{ fontSize: 8, color: C.muted, marginTop: 2 }}>{sub}</div>
                </div>
              ))}
            </div>
            {/* Mini chart */}
            <div style={{ padding: "6px 10px 12px" }}>
              <div style={{ background: C.card2, border: `1px solid ${C.border}`, borderRadius: 8, padding: 10 }}>
                <div style={{ fontSize: 8, color: C.muted, letterSpacing: 1, fontWeight: 700, marginBottom: 8, fontFamily: "monospace" }}>PROGRESS</div>
                <svg width="100%" height="40" viewBox="0 0 220 40" preserveAspectRatio="none">
                  <defs><linearGradient id="cg1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#00C853" stopOpacity="0.3"/><stop offset="100%" stopColor="#00C853" stopOpacity="0"/></linearGradient></defs>
                  <path d="M0,5 C30,5 50,30 80,32 C110,34 150,35 220,36" stroke="#00C853" strokeWidth="2" fill="none"/>
                  <path d="M0,5 C30,5 50,30 80,32 C110,34 150,35 220,36 L220,40 L0,40 Z" fill="url(#cg1)"/>
                  <circle cx="0" cy="5" r="3" fill="#00C853"/><circle cx="80" cy="32" r="3" fill="#00C853"/><circle cx="220" cy="36" r="3" fill="#00C853"/>
                </svg>
              </div>
            </div>
          </div>
          {/* Floating badges */}
          <div style={{ position: "absolute", right: -20, top: "30%", background: C.card, border: `1px solid ${C.border2}`, borderRadius: 12, padding: "12px 14px", zIndex: 3, boxShadow: "0 8px 24px rgba(0,0,0,0.4)", minWidth: 140 }}>
            <div style={{ fontSize: 9, color: C.muted, letterSpacing: 1, fontWeight: 600, marginBottom: 4 }}>BODY AGE REDUCED</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: C.green, lineHeight: 1 }}>-56 yrs</div>
            <div style={{ fontSize: 10, color: C.muted2, marginTop: 2 }}>Real age: 78 → looks 43</div>
          </div>
          <div style={{ position: "absolute", left: -30, bottom: "20%", background: C.card, border: `1px solid ${C.border2}`, borderRadius: 12, padding: "10px 14px", zIndex: 3, boxShadow: "0 8px 24px rgba(0,0,0,0.4)" }}>
            <div style={{ fontSize: 9, color: C.muted, letterSpacing: 1, fontWeight: 700, marginBottom: 3 }}>COACH CLIENTS</div>
            <div style={{ fontSize: 18, fontWeight: 800 }}>24 active</div>
            <div style={{ fontSize: 10, color: C.green, marginTop: 2 }}>↑ 8 this month</div>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <div style={{ background: C.card, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: "32px 48px", display: "grid", gridTemplateColumns: "repeat(4,1fr)" }}>
        {[["8", "Body composition\nmetrics tracked"], ["4", "Photo angles per\ncheck-in session"], ["2x", "Languages — English\n& Thai built-in"], ["0", "Spreadsheets needed.\nEver."]].map(([num, label], i) => (
          <Reveal key={num + i} delay={i * 0.1}>
            <div style={{ textAlign: "center", padding: "0 24px", borderRight: i < 3 ? `1px solid ${C.border}` : "none" }}>
              <div style={{ fontSize: 36, fontWeight: 900, letterSpacing: -1.5, color: C.green, lineHeight: 1, marginBottom: 4 }}>{num}</div>
              <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.4 }}>{label.split("\n").map((l, j) => <span key={j}>{l}{j === 0 && <br />}</span>)}</div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* FEATURES */}
      <section id="features" style={{ padding: "96px 48px", background: C.bg2 }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3, color: C.green, textTransform: "uppercase", marginBottom: 20, display: "flex", alignItems: "center", gap: 8, fontFamily: "monospace" }}>
          <span style={{ width: 20, height: 1, background: C.green, display: "inline-block" }} /> Features
        </div>
        <Reveal><h2 style={{ fontSize: "clamp(30px,3.5vw,48px)", fontWeight: 800, letterSpacing: -1.5, lineHeight: 1.1, marginBottom: 16 }}>Everything a coach needs<br />to close and retain.</h2></Reveal>
        <Reveal delay={0.1}><p style={{ fontSize: 15, color: C.muted2, lineHeight: 1.7, fontWeight: 300, maxWidth: 480, marginBottom: 0 }}>Built specifically for weight management coaches in Thailand's Amway network. Not a generic fitness app — a closing tool.</p></Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start", marginTop: 56 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {FEATURES.map((f, i) => (
              <div key={i} className={`feature-item${activeFeature === i ? " active" : ""}`} onClick={() => setActiveFeature(i)}>
                <div style={{ fontSize: 20, marginBottom: 8 }}>{f.icon}</div>
                <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 6, letterSpacing: -0.3 }}>{f.title}</div>
                <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.6, fontWeight: 300 }}>{f.desc}</div>
              </div>
            ))}
          </div>
          <div style={{ position: "sticky", top: 100 }}>
            <Reveal>
              <div style={{ background: C.card, border: `1px solid ${C.border2}`, borderRadius: 16, overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.4)" }}>
                <div style={{ background: "#0D1829", padding: "12px 16px", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", gap: 8 }}>
                  {["#FF5F57", "#FEBC2E", "#28C840"].map(c => <div key={c} style={{ width: 8, height: 8, borderRadius: "50%", background: c }} />)}
                  <span style={{ fontSize: 11, color: C.muted, marginLeft: 8 }}>IMPROVEMENTS</span>
                </div>
                <div style={{ padding: 20 }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                    {[["WEIGHT", "-84.0 kg", "96 kg", "pos"], ["FAT %", "-31.0%", "24%", "pos"], ["VISCERAL FAT", "-19", "11", "pos"], ["MUSCLE:FAT", "+1.49", "1.61", "pos"], ["BMI", "-42.8", "49", "pos"], ["BODY AGE", "-56", "43 (Real: 78)", "pos"]].map(([label, val, base]) => (
                      <div key={label} className="metric-card">
                        <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 2, color: C.muted, marginBottom: 6, fontFamily: "monospace" }}>{label}</div>
                        <div style={{ fontSize: 24, fontWeight: 800, lineHeight: 1, letterSpacing: -0.5, color: C.green }}>{val}</div>
                        <div style={{ fontSize: 11, color: C.muted, marginTop: 3 }}>{base}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: 12, padding: 14, background: C.card2, border: `1px solid ${C.border}`, borderRadius: 10 }}>
                    <div style={{ fontSize: 9, color: C.muted, letterSpacing: 2, fontWeight: 700, marginBottom: 10, fontFamily: "monospace" }}>PROGRESS</div>
                    <div style={{ display: "flex", gap: 6, marginBottom: 12, flexWrap: "wrap" }}>
                      <div style={{ background: C.green, color: "#000", fontSize: 9, fontWeight: 700, padding: "4px 10px", borderRadius: 100 }}>Fat %</div>
                      {["Weight", "BMI"].map(l => <div key={l} style={{ background: C.card, border: `1px solid ${C.border}`, color: C.muted, fontSize: 9, padding: "4px 10px", borderRadius: 100 }}>{l}</div>)}
                    </div>
                    <svg width="100%" height="80" viewBox="0 0 300 80" preserveAspectRatio="none">
                      <defs><linearGradient id="cg2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#00C853" stopOpacity="0.25"/><stop offset="100%" stopColor="#00C853" stopOpacity="0"/></linearGradient></defs>
                      <path d="M0,8 C40,8 70,60 110,64 C150,68 200,70 300,72" stroke="#00C853" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
                      <path d="M0,8 C40,8 70,60 110,64 C150,68 200,70 300,72 L300,80 L0,80 Z" fill="url(#cg2)"/>
                      {[[0, 8], [110, 64], [220, 70], [300, 72]].map(([cx, cy]) => <circle key={cx} cx={cx} cy={cy} r="4" fill="#00C853" stroke={C.card2} strokeWidth="2"/>)}
                      {[26, 44, 62].map(y => <line key={y} x1="0" y1={y} x2="300" y2={y} stroke={C.border} strokeWidth="0.5"/>)}
                    </svg>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* PROOF */}
      <section id="proof" style={{ padding: "96px 48px", background: C.bg }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3, color: C.green, textTransform: "uppercase", marginBottom: 20, display: "flex", alignItems: "center", gap: 8, fontFamily: "monospace" }}>
          <span style={{ width: 20, height: 1, background: C.green, display: "inline-block" }} /> Results
        </div>
        <Reveal><h2 style={{ fontSize: "clamp(30px,3.5vw,48px)", fontWeight: 800, letterSpacing: -1.5, lineHeight: 1.1, marginBottom: 16 }}>Real transformations.<br />Real data.</h2></Reveal>
        <Reveal delay={0.1}><p style={{ fontSize: 15, color: C.muted2, lineHeight: 1.7, fontWeight: 300, maxWidth: 480 }}>These aren't testimonials. They're tracked, measured results — the kind that close prospects on the spot.</p></Reveal>

        <div style={{ marginTop: 56, display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
          {PROOF_CARDS.map((card, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="proof-card">
                <div style={{ height: 140, display: "grid", gridTemplateColumns: "1fr 1fr", position: "relative", background: "#1A1A2E" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", fontSize: 42, background: "rgba(255,255,255,0.05)" }}>{card.before}</div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", fontSize: 42, background: "rgba(0,200,83,0.05)" }}>{card.after}</div>
                  <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 1, background: C.green, opacity: 0.5 }} />
                  <div style={{ position: "absolute", bottom: 8, left: 0, right: 0, display: "grid", gridTemplateColumns: "1fr 1fr", textAlign: "center" }}>
                    {["BEFORE", "AFTER"].map(l => <span key={l} style={{ fontSize: 8, fontWeight: 700, letterSpacing: 2, color: C.muted }}>{l}</span>)}
                  </div>
                </div>
                <div style={{ padding: 16 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 10, color: C.muted2 }}>{card.name}</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                    {card.stats.map(s => (
                      <div key={s.label}>
                        <div style={{ fontSize: 18, fontWeight: 800, color: C.green, lineHeight: 1, letterSpacing: -0.5 }}>{s.val}</div>
                        <div style={{ fontSize: 9, color: C.muted, letterSpacing: 1, fontWeight: 600, marginTop: 2, fontFamily: "monospace" }}>{s.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" style={{ padding: "96px 48px", background: C.bg2 }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3, color: C.green, textTransform: "uppercase", marginBottom: 20, display: "flex", alignItems: "center", gap: 8, fontFamily: "monospace" }}>
          <span style={{ width: 20, height: 1, background: C.green, display: "inline-block" }} /> How It Works
        </div>
        <Reveal><h2 style={{ fontSize: "clamp(30px,3.5vw,48px)", fontWeight: 800, letterSpacing: -1.5, lineHeight: 1.1 }}>Simple for you.<br />Impressive for clients.</h2></Reveal>
        <div style={{ marginTop: 56, display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 2, background: C.border, borderRadius: 16, overflow: "hidden" }}>
          {STEPS.map((s, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="step" style={{ height: "100%" }}>
                <div className="step-num" style={{ fontSize: 48, fontWeight: 900, color: C.border2, lineHeight: 1, marginBottom: 16, fontFamily: "monospace", transition: "color 0.2s" }}>{s.num}</div>
                <div style={{ fontSize: 24, marginBottom: 12 }}>{s.icon}</div>
                <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 8, letterSpacing: -0.3 }}>{s.title}</div>
                <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.6, fontWeight: 300 }}>{s.desc}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" style={{ padding: "96px 48px", background: C.bg }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3, color: C.green, textTransform: "uppercase", marginBottom: 20, display: "flex", alignItems: "center", gap: 8, fontFamily: "monospace" }}>
          <span style={{ width: 20, height: 1, background: C.green, display: "inline-block" }} /> Pricing
        </div>
        <Reveal><h2 style={{ fontSize: "clamp(30px,3.5vw,48px)", fontWeight: 800, letterSpacing: -1.5, lineHeight: 1.1, marginBottom: 16 }}>One tool. Pays for itself<br />with one new client.</h2></Reveal>
        <Reveal delay={0.1}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(0,200,83,0.08)", border: "1px solid rgba(0,200,83,0.2)", borderRadius: 100, padding: "6px 14px", fontSize: 12, color: C.green2, fontWeight: 500, marginTop: 12 }}>
            <span style={{ color: C.green }}>✓</span> Early access pricing — locked in for life
          </div>
        </Reveal>
        <div style={{ marginTop: 48, display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, alignItems: "start" }}>
          {PRICING.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.1}>
              <div className={`price-card${p.featured ? " featured" : ""}`}>
                {p.featured && <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: C.green, color: "#000", fontSize: 10, fontWeight: 700, letterSpacing: 1.5, padding: "5px 16px", borderRadius: 100, whiteSpace: "nowrap" }}>MOST POPULAR</div>}
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, color: p.featured ? C.green2 : C.muted, textTransform: "uppercase", marginBottom: 16, fontFamily: "monospace" }}>{p.name}</div>
                <div style={{ fontSize: 40, fontWeight: 900, letterSpacing: -2, lineHeight: 1, marginBottom: 4 }}>{p.amount}</div>
                <div style={{ fontSize: 12, color: C.muted, marginBottom: 28 }}>{p.period}</div>
                <div style={{ height: 1, background: p.featured ? "rgba(0,200,83,0.15)" : C.border, marginBottom: 24 }} />
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
                  {p.features.map(f => (
                    <li key={f} style={{ fontSize: 13, color: C.muted2, display: "flex", gap: 8, alignItems: "flex-start", fontWeight: 300 }}>
                      <span style={{ color: C.green, fontWeight: 700, flexShrink: 0 }}>✓</span> {f}
                    </li>
                  ))}
                </ul>
                <a href="#contact" style={{ display: "block", width: "100%", padding: 13, borderRadius: 10, textAlign: "center", fontSize: 13, fontWeight: 600, textDecoration: "none", background: p.btnStyle === "green" ? C.green : "transparent", color: p.btnStyle === "green" ? "#000" : C.muted2, border: p.btnStyle === "green" ? "none" : `1px solid ${C.border2}`, cursor: "pointer" }}>{p.btn}</a>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section id="contact" style={{ background: "linear-gradient(135deg,#091510,#0B1121)", borderTop: "1px solid rgba(0,200,83,0.15)", borderBottom: "1px solid rgba(0,200,83,0.15)", textAlign: "center", padding: "96px 48px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 500, height: 300, background: "radial-gradient(ellipse,rgba(0,200,83,0.12) 0%,transparent 70%)", pointerEvents: "none" }} />
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3, color: C.green, textTransform: "uppercase", marginBottom: 20, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontFamily: "monospace", position: "relative" }}>
          <span style={{ width: 20, height: 1, background: C.green, display: "inline-block" }} /> Early Access
        </div>
        <Reveal>
          <h2 style={{ fontSize: "clamp(36px,5vw,64px)", fontWeight: 900, letterSpacing: -2, lineHeight: 1.05, marginBottom: 16, position: "relative" }}>
            Your results deserve<br /><span style={{ color: C.green }}>better than a spreadsheet.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p style={{ fontSize: 16, color: C.muted2, maxWidth: 440, margin: "0 auto 40px", lineHeight: 1.7, fontWeight: 300, position: "relative" }}>
            CoachProof is launching soon on iOS and Android. Join early access and get Pro pricing locked in for life.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", position: "relative" }}>
            <a href="https://line.me/ti/p/coachproof" className="line-btn">
              <span style={{ fontSize: 18 }}>💬</span> สมัครผ่าน LINE / Join via LINE
            </a>
            <a href="mailto:hello@shamwise.co" className="btn-secondary">✉️ Email us</a>
          </div>
        </Reveal>
        <div style={{ marginTop: 28, fontSize: 12, color: C.muted, position: "relative" }}>No credit card required · Free during beta · Cancel anytime</div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: C.card2, borderTop: `1px solid ${C.border}`, padding: "32px 48px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
        <div style={{ fontWeight: 700, fontSize: 15 }}>Coach<span style={{ color: C.green }}>Proof</span></div>
        <ul style={{ display: "flex", gap: 24, listStyle: "none" }}>
          {[["#features", "Features"], ["#proof", "Results"], ["#pricing", "Pricing"], ["#contact", "Contact"]].map(([href, label]) => (
            <li key={href}><a href={href} style={{ fontSize: 12, color: C.muted, textDecoration: "none" }}>{label}</a></li>
          ))}
        </ul>
        <div style={{ fontSize: 12, color: C.muted }}>© 2026 CoachProof · Built in Bangkok 🇹🇭</div>
      </footer>
    </div>
  );
}