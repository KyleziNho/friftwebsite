import React from 'react';
import '../styles/Privacy.css';
import SplineBackground from './SplineBackground';

const Privacy: React.FC = () => {
  return (
    <div className="privacy-container">
      <header className="header">
        <nav className="navbar">
          <div className="nav-container">
            <div className="logo">
              <a href="/">
                <img src="/friftlogo.png" alt="Frift Logo" className="logo-image" />
              </a>
            </div>
            <ul className="nav-links">
              <li><a href="/#features">Features</a></li>
              <li><a href="mailto:kyle@frift.uk">Contact</a></li>
            </ul>
          </div>
        </nav>
      </header>

      <section className="privacy-hero">
        <div className="background-wrapper">
          <SplineBackground />
        </div>
        <div className="container privacy-hero-overlay">
          <div className="privacy-header">
            <h1 className="privacy-title">Privacy Policy</h1>
            <p className="privacy-date">Thursday 24th April, 2025</p>
          </div>
        </div>
      </section>

      <section className="privacy-content">
        <div className="container">
          <div className="privacy-text">
            <p className="privacy-intro">
              Thank you for using our app. Your privacy is important to us. This Privacy Policy explains what information we collect, how we use it, and the measures we take to keep it safe.
            </p>

            <div className="privacy-section">
              <h2>Information We Collect</h2>
              <p>We collect the following types of data when you use our app:</p>
              <ul>
                <li><strong>User Content:</strong> Photos of items you upload for sale.</li>
                <li><strong>Contact Information:</strong> University email addresses, associated societies, name, and gender.</li>
                <li><strong>User Identifiers:</strong> Unique user IDs for authentication and login purposes.</li>
                <li><strong>Sensitive Information:</strong> Login credentials, authentication tokens, and in-app messages.</li>
              </ul>
            </div>

            <div className="privacy-section">
              <h2>How We Use Your Data</h2>
              <p>Your data is used for the following purposes:</p>
              <ul>
                <li><strong>App Functionality:</strong> To allow item uploads, user authentication, and communication within the app.</li>
                <li><strong>Analytics:</strong> To improve the app experience by understanding usage trends and behaviour.</li>
              </ul>
            </div>

            <div className="privacy-section">
              <h2>Data Processing and Storage</h2>
              <p>All data is securely processed and stored using Firebase services, including Firebase Authentication, Firestore, and Firebase Storage. We follow industry best practices to ensure your data is handled safely.</p>
              <ul>
                <li><strong>Encryption:</strong> Sensitive information, including login credentials and in-app messaging data, is encrypted in transit and at rest using Firebase's encryption protocols.</li>
              </ul>
            </div>

            <div className="privacy-section">
              <h2>User Controls and Rights</h2>
              <p>You can manage your personal information and request deletion of your account or data at any time via the app settings. Once a request is made, we will delete your data within a reasonable time frame.</p>
            </div>

            <div className="privacy-section">
              <h2>Third-Party Services</h2>
              <p>We do not sell or share your personal data with third parties for marketing purposes. Your data is only shared with Firebase, our cloud provider, strictly for the purposes outlined above.</p>
            </div>

            <div className="privacy-section">
              <h2>Changes to This Policy</h2>
              <p>We may update this Privacy Policy from time to time. Any changes will be posted within the app and on our website if applicable.</p>
            </div>

            <div className="privacy-section">
              <h2>Contact Us</h2>
              <p>If you have any questions or concerns about this Privacy Policy or your data, please contact us at <a href="mailto:kyle@frift.uk" className="privacy-email">kyle@frift.uk</a></p>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <div className="footer-main">
            <div className="footer-left">
              <img src="/friftlogo.png" alt="Frift" className="footer-logo" />
              <p className="footer-description">
                Your campus marketplace, simplified. Buy, sell,<br />
                and connect with students around you.
              </p>
              <a href="mailto:kyle@frift.uk" className="footer-email-small">kyle@frift.uk</a>
            </div>

            <div className="footer-right">
              <div className="footer-column">
                <h4>Socials</h4>
                <ul>
                  <li><a href="https://www.instagram.com/friftofficial/" target="_blank" rel="noopener noreferrer">Instagram</a></li>
                  <li><a href="https://www.linkedin.com/company/friftuk/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                </ul>
              </div>

              <div className="footer-column">
                <h4>Download</h4>
                <ul>
                  <li><a href="https://apps.apple.com/gb/app/frift-student-marketplace/id6745021634" target="_blank" rel="noopener noreferrer">iOS App</a></li>
                </ul>
              </div>

              <div className="footer-column">
                <h4>Company</h4>
                <ul>
                  <li><a href="mailto:kyle@frift.uk">Contact</a></li>
                  <li><a href="/privacy">Privacy</a></li>
                  <li><a href="#terms">Terms</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="footer-copyright">
            <p>&copy; 2025 Frift App. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Privacy;

