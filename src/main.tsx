
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './App.css'
import { initGA } from './utils/analytics'

// Use requestIdleCallback to initialize Google Analytics during browser idle time
if ('requestIdleCallback' in window) {
  window.requestIdleCallback(() => {
    initGA();
  });
} else {
  // Fallback for browsers that don't support requestIdleCallback
  setTimeout(() => {
    initGA();
  }, 1000);
}

createRoot(document.getElementById("root")!).render(<App />);
