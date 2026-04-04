import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import SharePage from './SharePage.jsx'

// Simple path-based routing — no library needed
const path = window.location.pathname;
const shareMatch = path.match(/^\/s\/([a-z0-9]+)$/);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {shareMatch ? <SharePage token={shareMatch[1]} /> : <App />}
  </StrictMode>,
)
