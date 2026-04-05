import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import SharePage from './SharePage.jsx'
import PrivacyPage from './PrivacyPage.jsx'

// Simple path-based routing — no library needed
const path = window.location.pathname;
const shareMatch = path.match(/^\/s\/([a-z0-9]+)$/);

function Route() {
  if (shareMatch) return <SharePage token={shareMatch[1]} />;
  if (path === '/privacy') return <PrivacyPage />;
  return <App />;
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Route />
  </StrictMode>,
)
