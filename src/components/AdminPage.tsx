import React, { useState } from 'react';
import { useAdmin } from '../contexts/AdminContext';
import AddProductForm from './AddProductForm';
import '../styles/AdminPage.css';

const AdminPage: React.FC = () => {
  const { user, isAdmin, loading, signInWithGoogle, logout } = useAdmin();
  const [showAddProduct, setShowAddProduct] = useState(false);

  if (loading) {
    return (
      <div className="admin-page">
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="admin-page">
        <div className="login-container">
          <div className="login-card">
            <h1>Frift Admin Portal</h1>
            <p>Please sign in with your Google account to access the admin panel.</p>
            <button className="google-signin-btn" onClick={signInWithGoogle}>
              <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google" />
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="admin-page">
        <div className="unauthorized-container">
          <div className="unauthorized-card">
            <h1>Access Denied</h1>
            <p>You are signed in as <strong>{user.email}</strong>, but you don't have admin privileges.</p>
            <p>Please contact the system administrator if you believe this is an error.</p>
            <div className="action-buttons">
              <button className="logout-btn" onClick={logout}>
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <header className="admin-header">
        <div className="header-content">
          <h1>Frift Admin Portal</h1>
          <div className="user-info">
            <img src={user.photoURL || ''} alt="Profile" className="profile-pic" />
            <span>{user.displayName || user.email}</span>
            <button className="logout-btn" onClick={logout}>
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="admin-content">
        <div className="welcome-section">
          <h2>Welcome to the Admin Panel</h2>
          <p>You have successfully authenticated as an administrator.</p>
        </div>

        <div className="admin-grid">
          <div className="admin-card">
            <h3>🔒 Authentication Status</h3>
            <div className="status-info">
              <p><strong>User ID:</strong> {user.uid}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Admin Status:</strong> <span className="admin-badge">✅ Authorized</span></p>
            </div>
          </div>

          <div className="admin-card">
            <h3>📊 Quick Stats</h3>
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-number">2</span>
                <span className="stat-label">Admin Users</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">Active</span>
                <span className="stat-label">System Status</span>
              </div>
            </div>
          </div>

          <div className="admin-card">
            <h3>⚙️ Admin Actions</h3>
            <div className="action-grid">
              <button className="action-btn primary" onClick={() => setShowAddProduct(true)}>
                ➕ Add Product
              </button>
              <button className="action-btn" onClick={() => alert('Feature coming soon!')}>
                Manage Users
              </button>
              <button className="action-btn" onClick={() => alert('Feature coming soon!')}>
                View Analytics
              </button>
              <button className="action-btn" onClick={() => alert('Feature coming soon!')}>
                System Settings
              </button>
            </div>
          </div>

          <div className="admin-card">
            <h3>🔗 Quick Links</h3>
            <div className="links-grid">
              <a href="https://frift.uk" className="quick-link" target="_blank" rel="noopener noreferrer">
                🏠 Main Website
              </a>
              <a href="https://console.firebase.google.com/project/campus-connect-c56a9" className="quick-link" target="_blank" rel="noopener noreferrer">
                🔥 Firebase Console
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Add Product Modal */}
      {showAddProduct && (
        <div className="modal-overlay">
          <div className="modal-container">
            <AddProductForm 
              onProductCreated={(productId) => {
                console.log('Product created:', productId);
                setShowAddProduct(false);
              }}
              onClose={() => setShowAddProduct(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;