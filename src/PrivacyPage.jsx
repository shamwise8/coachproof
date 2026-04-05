const PRIVACY_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Instrument+Sans:wght@400;500;600;700&display=swap');

.privacy-page {
  min-height: 100vh;
  background: #060B16;
  color: #F1F5F9;
  font-family: 'Instrument Sans', system-ui, sans-serif;
  font-size: 15px;
  line-height: 1.75;
  -webkit-font-smoothing: antialiased;
}
.privacy-nav {
  position: sticky; top: 0; z-index: 10;
  display: flex; align-items: center; gap: 10px;
  padding: 0 clamp(20px,4vw,48px); height: 64px;
  background: rgba(6,11,22,0.85);
  backdrop-filter: blur(20px) saturate(1.4);
  border-bottom: 1px solid rgba(28,42,66,0.6);
  font-family: 'Outfit', sans-serif; font-weight: 800; font-size: 19px;
  text-decoration: none; color: #F1F5F9;
}
.privacy-nav img { height: 28px; width: 28px; border-radius: 6px; }
.privacy-nav a { text-decoration: none; color: inherit; display: flex; align-items: center; gap: 10px; }
.privacy-nav span span { color: #00C853; }
.privacy-content {
  max-width: 720px;
  margin: 0 auto;
  padding: 48px clamp(20px,4vw,48px) 80px;
}
.privacy-content h1 {
  font-family: 'Outfit', sans-serif;
  font-size: clamp(28px, 5vw, 40px);
  font-weight: 800;
  letter-spacing: -1px;
  margin-bottom: 8px;
}
.privacy-content .updated {
  color: #64748B;
  font-size: 14px;
  margin-bottom: 40px;
}
.privacy-content h2 {
  font-family: 'Outfit', sans-serif;
  font-size: 20px;
  font-weight: 700;
  color: #00C853;
  margin-top: 36px;
  margin-bottom: 12px;
}
.privacy-content p {
  color: #94A3B8;
  margin-bottom: 16px;
}
.privacy-content ul {
  color: #94A3B8;
  margin-bottom: 16px;
  padding-left: 24px;
}
.privacy-content ul li {
  margin-bottom: 6px;
}
.privacy-content a {
  color: #00C853;
  text-decoration: underline;
  text-underline-offset: 2px;
}
.privacy-content strong {
  color: #F1F5F9;
  font-weight: 600;
}
`;

export default function PrivacyPage() {
  return (
    <>
      <style>{PRIVACY_CSS}</style>
      <div className="privacy-page">
        <nav className="privacy-nav">
          <a href="/">
            <img src="/favicon.png" alt="CoachProof" />
            <span>Coach<span>Proof</span></span>
          </a>
        </nav>
        <div className="privacy-content">
          <h1>Privacy Policy</h1>
          <p className="updated">Last updated: April 5, 2026</p>

          <h2>Overview</h2>
          <p>
            CoachProof ("we", "us", "our") is a fitness coaching tool that helps personal trainers track client progress with verified photo check-ins. We take your privacy seriously and collect only what is necessary to provide the service.
          </p>

          <h2>Information We Collect</h2>
          <p><strong>Account Information</strong></p>
          <ul>
            <li>Name, email address, and profile photo (via Apple Sign-In or email registration)</li>
            <li>Role selection (coach or client)</li>
          </ul>
          <p><strong>Client Progress Data</strong></p>
          <ul>
            <li>Body measurements and weight entries</li>
            <li>Progress photos (front and side views)</li>
            <li>Check-in dates and timestamps</li>
          </ul>
          <p><strong>Coach Data</strong></p>
          <ul>
            <li>Client roster and program assignments</li>
            <li>Program names and descriptions</li>
          </ul>
          <p><strong>Technical Data</strong></p>
          <ul>
            <li>Device type, OS version, and app version</li>
            <li>Crash logs and performance metrics (anonymized)</li>
          </ul>

          <h2>How We Use Your Information</h2>
          <ul>
            <li>To provide and maintain the CoachProof service</li>
            <li>To enable coaches to view client progress securely</li>
            <li>To generate progress comparisons and milestone detection</li>
            <li>To send reminders and notifications you have opted into</li>
            <li>To improve app performance and fix bugs</li>
          </ul>

          <h2>Photo Storage & Security</h2>
          <p>
            Progress photos are stored securely using Supabase Storage with row-level security (RLS) policies. Photos are only accessible to the client who uploaded them and their assigned coach. Shareable progress links expose only the data the client has explicitly chosen to share.
          </p>

          <h2>Data Sharing</h2>
          <p>
            We do <strong>not</strong> sell, rent, or share your personal data with third parties for marketing purposes. Data is shared only in these cases:
          </p>
          <ul>
            <li><strong>Coach–Client relationship:</strong> Clients' check-in data is visible to their assigned coach</li>
            <li><strong>Shareable links:</strong> When a client or coach generates a share link, the selected progress data is viewable via that link</li>
            <li><strong>Service providers:</strong> We use Supabase (database & storage) and Vercel (hosting) to operate the service</li>
            <li><strong>Legal requirements:</strong> If required by law or to protect our rights</li>
          </ul>

          <h2>Data Retention</h2>
          <p>
            Your data is retained as long as your account is active. You can request deletion of your account and all associated data at any time by contacting us. Upon deletion, all personal data, photos, and check-in records are permanently removed within 30 days.
          </p>

          <h2>Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access your personal data</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion of your account and data</li>
            <li>Export your data in a portable format</li>
            <li>Withdraw consent for optional data processing</li>
          </ul>

          <h2>Children's Privacy</h2>
          <p>
            CoachProof is not intended for use by anyone under the age of 17. We do not knowingly collect personal information from children.
          </p>

          <h2>Changes to This Policy</h2>
          <p>
            We may update this policy from time to time. We will notify you of any material changes through the app or via email.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have questions about this privacy policy or your data, contact us at <a href="mailto:hello@coachproof.app">hello@coachproof.app</a>.
          </p>
        </div>
      </div>
    </>
  );
}
