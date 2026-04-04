import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://sepomduzcpuwmarjvqth.supabase.co',
  'sb_publishable_4KO7yLJE3bX-CisShQbokw_3Ny0cS5a'
);

// TODO: When client-photos bucket goes private, use a Vercel API route
// or Supabase Edge Function to generate signed URLs on demand.

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
    return <div style={styles.photoPlaceholder}>📷</div>;
  }
  return <img src={src} alt={alt} style={style} onError={() => setFailed(true)} />;
}

export default function SharePage({ token }) {
  const [data, setData] = useState(null);
  const [checkin, setCheckin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
          .order('checked_in_at', { ascending: false })
          .limit(1)
          .maybeSingle();
        if (ci) setCheckin(ci);
      }
    } catch (err) {
      console.warn('[share]', err.message);
      setError('error');
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div style={styles.page}>
        <div style={styles.loader}>
          <div style={styles.spinner} />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.page}>
        <div style={styles.errorCard}>
          <div style={styles.brandRow}>
            <img src="/favicon.png" alt="CoachProof" style={styles.brandIcon} />
            <span style={styles.brandName}>Coach<span style={{ color: '#10B981' }}>Proof</span></span>
          </div>
          <div style={{ fontSize: 48, marginBottom: 16, marginTop: 24 }}>🔗</div>
          <h2 style={styles.errorTitle}>
            {error === 'expired' ? 'This link is no longer active' : 'Something went wrong'}
          </h2>
          <p style={styles.errorSub}>
            {error === 'expired'
              ? 'The coach may have deactivated this share link.'
              : 'Please try again later.'}
          </p>
          <a href="/" style={styles.errorLink}>Visit CoachProof →</a>
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
    <div style={styles.page}>
      <div style={styles.card}>

        {/* Brand header */}
        <div style={styles.topBar}>
          <div style={styles.brandRow}>
            <img src="/favicon.png" alt="CoachProof" style={styles.brandIcon} />
            <span style={styles.brandName}>Coach<span style={{ color: '#10B981' }}>Proof</span></span>
          </div>
          <div style={styles.verifiedBadge}>Verified Results</div>
        </div>

        {/* Program header */}
        <div style={styles.header}>
          <div>
            <div style={styles.programName}>{programName}</div>
            <div style={styles.coachName}>Coach {coachName}</div>
          </div>
          {weeks && <div style={styles.duration}>{weeks}-week program</div>}
        </div>

        {/* Photos */}
        <div style={styles.photoRow}>
          <div style={styles.photoCol}>
            <div style={styles.photoLabel}>BEFORE</div>
            <PhotoWithFallback src={beforePhoto} alt="Before" style={styles.photo} />
            {data.initial_weight != null && (
              <div style={styles.weightLabel}>{data.initial_weight} KG</div>
            )}
          </div>
          <div style={styles.photoCol}>
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
        <div style={styles.infoRow}>
          <span style={styles.infoText}>
            {data.age != null ? `${data.age} yrs` : ''}
          </span>
          {weight?.text && (
            <span style={styles.infoDelta}>{weight.text} in {weeks} weeks</span>
          )}
        </div>

        {/* Metrics */}
        {metrics.length > 0 && (
          <div style={styles.metricsGrid}>
            {metrics.map(m => (
              <div key={m.label} style={styles.metricCell}>
                <div style={styles.metricValue}>{m.text}</div>
                <div style={styles.metricLabel}>{m.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        <div style={styles.cta}>
          <div style={styles.ctaText}>Want results like this?</div>
          <a
            href="https://testflight.apple.com/join/BaS3HwKx"
            style={styles.ctaButton}
            target="_blank"
            rel="noopener noreferrer"
          >
            Download CoachProof →
          </a>
        </div>

        {/* Footer branding */}
        <div style={styles.footer}>
          <span style={styles.footerText}>Tracked & verified with</span>
          <span style={styles.footerBrand}>CoachProof</span>
        </div>
      </div>
    </div>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = {
  page: {
    minHeight: '100vh',
    background: '#060B16',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '16px',
    fontFamily: "'Instrument Sans', system-ui, sans-serif",
  },
  loader: {
    display: 'flex', alignItems: 'center', justifyContent: 'center',
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

  // Card
  card: {
    width: '100%', maxWidth: 420,
    background: '#111827', borderRadius: 20,
    overflow: 'hidden',
    boxShadow: '0 16px 48px rgba(0,0,0,0.5), 0 0 0 1px rgba(16,185,129,0.1)',
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
