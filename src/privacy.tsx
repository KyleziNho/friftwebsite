import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import PrivacyApp from './PrivacyApp';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <PrivacyApp />
  </React.StrictMode>
);