import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import translations from './translations';

const supabase = createClient(
  'https://sepomduzcpuwmarjvqth.supabase.co',
  'sb_publishable_4KO7yLJE3bX-CisShQbokw_3Ny0cS5a'
);

// TODO: When client-photos bucket goes private, use a Vercel API route
// or Supabase Edge Function to generate signed URLs on demand.

const SHARE_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Instrument+Sans:wght@400;500;600;700&display=swap');

.share-page {
  min-height: 100vh;
  width: 100vw;
  background: #060B16;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  font-family: 'Instrument Sans', system-ui, sans-serif;
  position: relative;
  overflow: hidden;
}
.share-lang-toggle {
  position: fixed; top: 14px; right: 16px; z-index: 20;
  display: flex; gap: 0;
  background: rgba(17,24,39,0.85);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(28,42,66,0.6);
  border-radius: 8px; overflow: hidden;
}
.share-lang-btn {
  padding: 6px 14px; font-size: 12px; font-weight: 700;
  color: #64748B; background: transparent;
  border: none; cursor: pointer; letter-spacing: 0.5px;
  transition: all 0.2s;
}
.share-lang-btn.active {
  color: #fff; background: #00C853;
}
@media (min-width: 820px) {
  .share-page { padding: 24px 48px; }
}
@media (min-width: 1600px) {
  .share-page { padding: 32px 80px; }
}
.share-bg {
  position: absolute; inset: 0; pointer-events: none;
  background: radial-gradient(ellipse 50% 60% at 50% 40%, rgba(0,200,83,0.05) 0%, transparent 70%),
              radial-gradient(ellipse 40% 40% at 80% 70%, rgba(16,185,129,0.03) 0%, transparent 60%);
}
.share-grid-bg {
  position: absolute; inset: 0; pointer-events: none; opacity: 0.02;
  background-image: linear-gradient(#243044 1px, transparent 1px), linear-gradient(90deg, #243044 1px, transparent 1px);
  background-size: 64px 64px;
}

.share-layout {
  position: relative; z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 60px;
  max-width: 900px;
  width: 100%;
  margin: 0 auto;
}

.share-card {
  width: 100%; max-width: 420px;
  background: #111827; border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 16px 48px rgba(0,0,0,0.5), 0 0 0 1px rgba(16,185,129,0.1);
  flex-shrink: 0;
}

.share-side {
  display: none;
  flex-direction: column;
  max-width: 360px;
}
.share-side-logo {
  display: flex; align-items: center; gap: 12px; margin-bottom: 32px;
}
.share-side-logo img {
  width: 44px; height: 44px; border-radius: 12px;
}
.share-side-logo span {
  font-family: 'Outfit', sans-serif;
  font-weight: 800; font-size: 26px; color: #F1F5F9; letter-spacing: -0.5px;
}
.share-side-logo .green { color: #00C853; }
.share-side-tagline {
  font-family: 'Outfit', sans-serif;
  font-size: 28px; font-weight: 800; line-height: 1.2;
  letter-spacing: -0.5px; color: #F1F5F9; margin-bottom: 16px;
}
.share-side-tagline .green { color: #00C853; }
.share-side-desc {
  color: #94A3B8; font-size: 15px; line-height: 1.7; margin-bottom: 32px;
}
.share-side-features {
  display: flex; flex-direction: column; gap: 14px; margin-bottom: 36px;
}
.share-side-feature {
  display: flex; align-items: center; gap: 12px; font-size: 14px; color: #CBD5E1;
}
.share-side-feature-icon {
  width: 36px; height: 36px; border-radius: 10px;
  background: rgba(0,200,83,0.08); border: 1px solid rgba(0,200,83,0.12);
  display: flex; align-items: center; justify-content: center;
  font-size: 16px; flex-shrink: 0;
}
.share-side-cta {
  display: inline-flex; align-items: center; gap: 8px;
  background: #00C853; color: #000;
  padding: 14px 28px; border-radius: 10px;
  font-size: 14px; font-weight: 700;
  text-decoration: none;
  transition: all 0.25s;
  box-shadow: 0 4px 16px rgba(0,200,83,0.2);
  align-self: flex-start;
}
.share-side-cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 36px rgba(0,200,83,0.35);
}

@media (min-width: 820px) {
  .share-side { display: flex; }
  .share-layout { justify-content: center; gap: 60px; max-width: 960px; }
  .share-card { max-width: 480px; }
  .share-side { max-width: 380px; }
  .share-side-tagline { font-size: 34px; }
  .share-side-desc { font-size: 16px; }
  .share-side-feature { font-size: 15px; }
  .share-side-cta { padding: 16px 32px; font-size: 15px; }
}
@media (min-width: 1200px) {
  .share-layout { gap: 80px; max-width: 1140px; }
  .share-card { max-width: 560px; }
  .share-side { max-width: 440px; }
  .share-side-logo img { width: 52px; height: 52px; border-radius: 14px; }
  .share-side-logo span { font-size: 30px; }
  .share-side-tagline { font-size: 40px; }
  .share-side-desc { font-size: 17px; }
  .share-side-features { gap: 18px; }
  .share-side-feature { font-size: 16px; }
  .share-side-feature-icon { width: 42px; height: 42px; font-size: 18px; }
  .share-side-cta { padding: 18px 36px; font-size: 16px; border-radius: 12px; }
}
@media (min-width: 1600px) {
  .share-layout { gap: 120px; max-width: 1480px; }
  .share-card { width: 680px; max-width: 680px; }
  .share-side { width: 560px; max-width: 560px; }
  .share-side-logo img { width: 56px; height: 56px; }
  .share-side-logo span { font-size: 34px; }
  .share-side-tagline { font-size: 48px; margin-bottom: 20px; }
  .share-side-desc { font-size: 18px; line-height: 1.8; margin-bottom: 40px; }
  .share-side-features { gap: 20px; margin-bottom: 44px; }
  .share-side-feature { font-size: 17px; gap: 16px; }
  .share-side-feature-icon { width: 48px; height: 48px; font-size: 20px; border-radius: 12px; }
  .share-side-cta { padding: 20px 40px; font-size: 17px; border-radius: 14px; }
}
@media (min-width: 2200px) {
  .share-layout { gap: 160px; max-width: 1900px; }
  .share-card { width: 780px; max-width: 780px; }
  .share-side { width: 700px; max-width: 700px; }
  .share-side-tagline { font-size: 54px; }
  .share-side-desc { font-size: 20px; }
  .share-side-feature { font-size: 19px; }
  .share-side-feature-icon { width: 52px; height: 52px; font-size: 22px; }
  .share-side-cta { padding: 22px 44px; font-size: 18px; }
}

/* Scale card internals on desktop */
@media (min-width: 820px) {
  .share-card .share-photo-row { gap: 3px; }
  .share-card .share-photo-col img,
  .share-card .share-photo-col .share-photo-placeholder { height: 380px; }
  .share-card .share-metric-value { font-size: 20px; }
  .share-card .share-program-name { font-size: 18px; }
}
@media (min-width: 1200px) {
  .share-card .share-photo-col img,
  .share-card .share-photo-col .share-photo-placeholder { height: 440px; }
  .share-card .share-metric-value { font-size: 22px; }
  .share-card .share-top-bar { padding: 16px 22px; }
  .share-card .share-header { padding: 16px 22px 14px; }
  .share-card .share-info-row { padding: 12px 22px; }
  .share-card .share-metrics-grid { padding: 0 18px 18px; gap: 8px; }
  .share-card .share-cta { padding: 20px 22px; }
  .share-card .share-cta-btn { padding: 14px 32px; font-size: 15px; }
}
@media (min-width: 1600px) {
  .share-card .share-photo-col img,
  .share-card .share-photo-col .share-photo-placeholder { height: 480px; }
  .share-card .share-metric-value { font-size: 24px; }
  .share-card .share-top-bar { padding: 18px 26px; }
  .share-card .share-header { padding: 18px 26px 16px; }
  .share-card .share-program-name { font-size: 20px; }
  .share-card .share-info-row { padding: 14px 26px; }
  .share-card .share-metrics-grid { padding: 0 22px 22px; gap: 10px; }
  .share-card .share-cta { padding: 24px 26px; }
  .share-card .share-cta-btn { padding: 16px 36px; font-size: 16px; }
}
@media (min-width: 2200px) {
  .share-card .share-photo-col img,
  .share-card .share-photo-col .share-photo-placeholder { height: 540px; }
  .share-card .share-metric-value { font-size: 26px; }
  .share-card .share-top-bar { padding: 20px 28px; }
  .share-card .share-header { padding: 20px 28px 18px; }
  .share-card .share-program-name { font-size: 22px; }
  .share-card .share-info-row { padding: 16px 28px; font-size: 15px; }
  .share-card .share-metrics-grid { padding: 0 24px 24px; gap: 12px; }
  .share-card .share-cta { padding: 28px 28px; }
  .share-card .share-cta-btn { padding: 18px 40px; font-size: 17px; border-radius: 14px; }
}
`;

function deltaText(before, after, unit) {
  if (before == null || after == null) return null;
  const d = after - before;
  if (d === 0) return null;
  const sign = d > 0 ? '+' : '';
  return { text: `${sign}${d.toFixed(1)}${unit}`, isGood: d < 0 };
}

function programWeeks(startDate, endDate) {
  if (!startDate || !endDate) return null;
  const [y1, m1, d1] = startDate.split('-').map(Number);
  const [y2, m2, d2] = endDate.split('-').map(Number);
  const start = new Date(y1, m1 - 1, d1);
  const end = new Date(y2, m2 - 1, d2);
  const days = Math.max(0, Math.round((end - start) / 86400000));
  return Math.max(1, Math.round(days / 7));
}

function PhotoWithFallback({ src, alt, style }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) {
    return <div className="share-photo-placeholder" style={styles.photoPlaceholder}>📷</div>;
  }
  return <img src={src} alt={alt} style={style} onError={() => setFailed(true)} />;
}

export default function SharePage({ token }) {
  const [data, setData] = useState(null);
  const [checkin, setCheckin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lang, setLang] = useState(() => localStorage.getItem('cp-lang') || 'en');
  const t = translations[lang].share;

  useEffect(() => { localStorage.setItem('cp-lang', lang); }, [lang]);

  useEffect(() => {
    if (!token) { setError('invalid'); setLoading(false); return; }
    fetchData();
  }, [token]);

  async function fetchData() {
    try {
      const { data: row, error: viewErr } = await supabase
        .from('public_shared_client')
        .select('*')
        .eq('share_token', token)
        .maybeSingle();

      if (viewErr) throw viewErr;
      if (!row) { setError('expired'); setLoading(false); return; }
      setData(row);

      const { data: linkRow } = await supabase
        .from('shared_links')
        .select('client_id')
        .eq('share_token', token)
        .eq('is_active', true)
        .maybeSingle();

      if (linkRow?.client_id) {
        const { data: ci } = await supabase
          .from('check_ins')
          .select('*')
          .eq('client_id', linkRow.client_id)
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (ci) {
          if (!ci.photo_front_url) {
            const { data: ciWithPhoto } = await supabase
              .from('check_ins')
              .select('photo_front_url')
              .eq('client_id', linkRow.client_id)
              .not('photo_front_url', 'is', null)
              .order('created_at', { ascending: false })
              .limit(1)
              .maybeSingle();
            if (ciWithPhoto?.photo_front_url) {
              ci.photo_front_url = ciWithPhoto.photo_front_url;
            }
          }
          setCheckin(ci);
        }
      }
    } catch (err) {
      console.warn('[share]', err.message);
      setError('error');
    } finally {
      setLoading(false);
    }
  }

  const langToggle = (
    <div className="share-lang-toggle">
      <button className={`share-lang-btn ${lang === 'en' ? 'active' : ''}`} onClick={() => setLang('en')}>EN</button>
      <button className={`share-lang-btn ${lang === 'th' ? 'active' : ''}`} onClick={() => setLang('th')}>TH</button>
    </div>
  );

  if (loading) {
    return (
      <div className="share-page">
        <style>{SHARE_CSS}</style>
        <div style={styles.loader}>
          <div style={styles.spinner} />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="share-page">
        <style>{SHARE_CSS}</style>
        {langToggle}
        <div className="share-bg" />
        <div className="share-grid-bg" />
        <div style={{ ...styles.errorCard, position: 'relative', zIndex: 1 }}>
          <div style={styles.brandRow}>
            <img src="/favicon.png" alt="CoachProof" style={styles.brandIcon} />
            <span style={styles.brandName}>Coach<span style={{ color: '#10B981' }}>Proof</span></span>
          </div>
          <div style={{ fontSize: 48, marginBottom: 16, marginTop: 24 }}>🔗</div>
          <h2 style={styles.errorTitle}>
            {error === 'expired' ? t.linkInactive : t.somethingWrong}
          </h2>
          <p style={styles.errorSub}>
            {error === 'expired' ? t.linkInactiveSub : t.tryAgain}
          </p>
          <a href="/" style={styles.errorLink}>{t.visitSite}</a>
        </div>
      </div>
    );
  }

  const weeks = programWeeks(data.start_date, checkin?.checked_in_at);
  const programName = data.program_name || 'CoachProof';
  const coachName = data.coach_name || '';

  const beforePhoto = data.before_photo;
  const afterPhoto = checkin?.photo_front_url;

  const weight = deltaText(data.initial_weight, checkin?.weight_kg, ' kg');
  const fat = deltaText(data.initial_fat, checkin?.fat_percent, '%');
  const bodyAge = deltaText(data.initial_body_age, checkin?.body_age, '');
  const visceral = deltaText(data.initial_visceral, checkin?.visceral_fat, '');

  const metrics = [
    { label: 'Weight', ...weight },
    { label: 'Fat %', ...fat },
    { label: 'Body Age', ...bodyAge },
    { label: 'Visceral Fat', ...visceral },
  ].filter(m => m.text);

  return (
    <div className="share-page">
      <style>{SHARE_CSS}</style>
      {langToggle}
      <div className="share-bg" />
      <div className="share-grid-bg" />

      <div className="share-layout">

        {/* Desktop side panel */}
        <div className="share-side">
          <a href="/" className="share-side-logo" style={{ textDecoration: 'none' }}>
            <img src="/favicon.png" alt="CoachProof" />
            <span>Coach<span className="green">Proof</span></span>
          </a>
          <div className="share-side-tagline">
            {t.tagline1}<br/><span className="green">{t.tagline2}</span>
          </div>
          <p className="share-side-desc">{t.desc}</p>
          <div className="share-side-features">
            {['📊','📸','🏆','🔔'].map((icon, i) => (
              <div key={i} className="share-side-feature">
                <div className="share-side-feature-icon">{icon}</div>
                <span>{t.features[i]}</span>
              </div>
            ))}
          </div>
          <a
            href="https://testflight.apple.com/join/BaS3HwKx"
            className="share-side-cta"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.cta}
          </a>
        </div>

        {/* Card */}
        <div className="share-card">

          {/* Brand header */}
          <div className="share-top-bar" style={styles.topBar}>
            <a href="/" style={{ ...styles.brandRow, textDecoration: 'none' }}>
              <img src="/favicon.png" alt="CoachProof" style={styles.brandIcon} />
              <span style={styles.brandName}>Coach<span style={{ color: '#10B981' }}>Proof</span></span>
            </a>
            <div style={styles.verifiedBadge}>{t.verifiedBadge}</div>
          </div>

          {/* Program header */}
          <div className="share-header" style={styles.header}>
            <div style={styles.headerLeft}>
              {data.program_logo && data.program_logo !== '__coachproof_icon__' && (
                <img src={data.program_logo} alt="" style={styles.programLogo} />
              )}
              <div>
                <div className="share-program-name" style={styles.programName}>{programName}</div>
                <div style={styles.coachName}>Coach {coachName}</div>
              </div>
            </div>
            {weeks && <div style={styles.duration}>{weeks}{t.weekProgram}</div>}
          </div>

          {/* Photos */}
          <div className="share-photo-row" style={styles.photoRow}>
            <div className="share-photo-col" style={styles.photoCol}>
              <div style={styles.photoLabel}>BEFORE</div>
              <PhotoWithFallback src={beforePhoto} alt="Before" style={styles.photo} />
              {data.initial_weight != null && (
                <div style={styles.weightLabel}>{data.initial_weight} KG</div>
              )}
            </div>
            <div className="share-photo-col" style={styles.photoCol}>
              <div style={{ ...styles.photoLabel, ...styles.photoLabelAfter }}>AFTER</div>
              <PhotoWithFallback src={afterPhoto} alt="After" style={styles.photo} />
              {checkin?.weight_kg != null && (
                <div style={{ ...styles.weightLabel, color: '#10B981' }}>
                  {checkin.weight_kg} KG
                </div>
              )}
            </div>
          </div>

          {/* Info row */}
          <div className="share-info-row" style={styles.infoRow}>
            <span style={styles.infoText}>
              {data.age != null ? `${data.age} yrs` : ''}
            </span>
            {weight?.text && (
              <span style={styles.infoDelta}>{weight.text} in {weeks} weeks</span>
            )}
          </div>

          {/* Metrics */}
          {metrics.length > 0 && (
            <div className="share-metrics-grid" style={styles.metricsGrid}>
              {metrics.map(m => (
                <div key={m.label} style={styles.metricCell}>
                  <div className="share-metric-value" style={styles.metricValue}>{m.text}</div>
                  <div style={styles.metricLabel}>{m.label}</div>
                </div>
              ))}
            </div>
          )}

          {/* CTA */}
          <div className="share-cta" style={styles.cta}>
            <div style={styles.ctaText}>{t.wantResults}</div>
            <a
              href="https://testflight.apple.com/join/BaS3HwKx"
              className="share-cta-btn"
              style={styles.ctaButton}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.cta}
            </a>
          </div>

          {/* Footer branding */}
          <div style={styles.footer}>
            <span style={styles.footerText}>{t.footerText}</span>
            <span style={styles.footerBrand}>CoachProof</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Inline Styles (card internals) ──────────────────────────────────────────

const styles = {
  loader: {
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    position: 'relative', zIndex: 1,
  },
  spinner: {
    width: 32, height: 32, borderRadius: '50%',
    border: '3px solid #1E293B', borderTopColor: '#10B981',
    animation: 'spin 0.8s linear infinite',
  },

  // Error
  errorCard: {
    textAlign: 'center', padding: 40, maxWidth: 400,
  },
  errorTitle: {
    color: '#F1F5F9', fontSize: 20, fontWeight: 700, marginBottom: 8,
  },
  errorSub: {
    color: '#64748B', fontSize: 14, lineHeight: '1.5', marginBottom: 24,
  },
  errorLink: {
    color: '#10B981', fontSize: 14, fontWeight: 600, textDecoration: 'none',
  },

  // Top bar branding
  topBar: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '14px 18px',
    borderBottom: '1px solid rgba(16,185,129,0.1)',
    background: 'linear-gradient(180deg, rgba(16,185,129,0.04) 0%, transparent 100%)',
  },
  brandRow: {
    display: 'flex', alignItems: 'center', gap: 8,
  },
  brandIcon: {
    width: 24, height: 24, borderRadius: 6,
  },
  brandName: {
    fontFamily: "'Outfit', sans-serif",
    fontWeight: 800, fontSize: 15, color: '#F1F5F9', letterSpacing: -0.3,
  },
  verifiedBadge: {
    fontSize: 10, fontWeight: 600, letterSpacing: 0.5,
    color: '#10B981', background: 'rgba(16,185,129,0.1)',
    border: '1px solid rgba(16,185,129,0.2)',
    padding: '3px 10px', borderRadius: 100,
    textTransform: 'uppercase',
  },

  // Header
  header: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '14px 18px 12px',
  },
  headerLeft: {
    display: 'flex', alignItems: 'center', gap: 10,
  },
  programLogo: {
    width: 36, height: 36, borderRadius: 8, objectFit: 'contain',
    background: '#0B1121',
  },
  programName: {
    color: '#F1F5F9', fontSize: 16, fontWeight: 700,
  },
  coachName: {
    color: '#64748B', fontSize: 12, fontWeight: 500, marginTop: 2,
  },
  duration: {
    color: '#94A3B8', fontSize: 12, fontWeight: 500,
    background: 'rgba(255,255,255,0.05)', borderRadius: 10,
    padding: '4px 10px',
  },

  // Photos
  photoRow: {
    display: 'flex', gap: 2,
  },
  photoCol: {
    flex: 1, position: 'relative', overflow: 'hidden',
  },
  photo: {
    width: '100%', height: 320, objectFit: 'cover', display: 'block',
  },
  photoPlaceholder: {
    width: '100%', height: 320,
    background: '#1a1a2e', display: 'flex',
    alignItems: 'center', justifyContent: 'center',
    fontSize: 32, opacity: 0.2,
  },
  photoLabel: {
    position: 'absolute', top: 10, left: 10,
    background: 'rgba(107,114,128,0.6)', borderRadius: 4,
    padding: '3px 8px', fontSize: 9, fontWeight: 700,
    color: '#fff', letterSpacing: 1, zIndex: 2,
  },
  photoLabelAfter: {
    left: 'auto', right: 10,
    background: 'rgba(16,185,129,0.6)',
  },
  weightLabel: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    background: 'rgba(0,0,0,0.6)', textAlign: 'center',
    padding: '6px 0', fontSize: 14, fontWeight: 800,
    color: '#fff', letterSpacing: 0.5,
  },

  // Info row
  infoRow: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '10px 18px',
  },
  infoText: { color: '#94A3B8', fontSize: 13, fontWeight: 500 },
  infoDelta: { color: '#10B981', fontSize: 13, fontWeight: 700 },

  // Metrics
  metricsGrid: {
    display: 'grid', gridTemplateColumns: '1fr 1fr',
    gap: 6, padding: '0 14px 14px',
  },
  metricCell: {
    background: 'rgba(31,41,55,0.5)', borderRadius: 10,
    padding: '10px 12px',
  },
  metricValue: {
    color: '#10B981', fontSize: 18, fontWeight: 800, lineHeight: '1.2',
  },
  metricLabel: {
    color: '#64748B', fontSize: 10, fontWeight: 600,
    textTransform: 'uppercase', letterSpacing: 0.5, marginTop: 2,
  },

  // CTA
  cta: {
    textAlign: 'center', padding: '16px 18px 16px',
    borderTop: '1px solid #1C2A42',
  },
  ctaText: {
    color: '#64748B', fontSize: 12, marginBottom: 10,
  },
  ctaButton: {
    display: 'inline-block',
    background: '#10B981', color: '#fff',
    fontSize: 14, fontWeight: 700,
    padding: '12px 28px', borderRadius: 12,
    textDecoration: 'none',
  },

  // Footer branding
  footer: {
    textAlign: 'center', padding: '10px 18px 14px',
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
  },
  footerText: {
    color: '#475569', fontSize: 11, fontWeight: 500,
  },
  footerBrand: {
    color: '#10B981', fontSize: 11, fontWeight: 700,
  },
};
