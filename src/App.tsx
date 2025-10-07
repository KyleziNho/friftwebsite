import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LandingPage from './components/LandingPage';
import AdminPage from './components/AdminPage';
import { AdminProvider } from './contexts/AdminContext';

function App() {
  return (
    <AdminProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </div>
      </Router>
    </AdminProvider>
  );
}

export default App;