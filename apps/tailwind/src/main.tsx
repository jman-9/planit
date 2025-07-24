import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';


declare global {
  interface Window {
    elecPlanit?: {
      bucket: any;
      todo: any;
    };
  }

  const _USE_ELECTRON_: boolean;
}


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
