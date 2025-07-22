import React from 'react';
import '../styles/LandingPage.css';

const LandingPage: React.FC = () => {
  return (
    <div className="landing-container" id="top">
      <header className="header">
        <nav className="navbar">
          <div className="nav-container">
            <div className="logo">
              <a href="#top">
                <img src="/frift.svg" alt="Frift Logo" className="logo-image" />
              </a>
            </div>
            <ul className="nav-links">
              <li><a href="#features">Features</a></li>
              <li><a href="#how-it-works">How It Works</a></li>
              <li><a href="#connect">Beyond the Sale</a></li>
              <li><a href="mailto:kyle@frift.uk">Contact</a></li>
              <li>
                <a href="https://apps.apple.com/gb/app/frift-student-marketplace/id6745021634" className="nav-app-store-link" target="_blank" rel="noopener noreferrer">
                  <img src="/appstore-black.png" alt="Download on App Store" className="nav-app-store-badge" />
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </header>

      <section className="hero">
        <div className="animated-background">
          <div className="flowing-shape"></div>
          <div className="flowing-shape-2"></div>
        </div>
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              The app for university students to <span className="highlight-box">buy</span>, <span className="highlight-box">sell</span> and <span className="highlight-box">connect</span>
            </h1>
            <div className="hero-buttons">
              <a href="https://apps.apple.com/gb/app/frift-student-marketplace/id6745021634" className="app-store-link" target="_blank" rel="noopener noreferrer">
                <img src="/appstore-black.png" alt="Download on App Store" className="app-store-badge-hero" />
              </a>
            </div>
          </div>
          <div className="hero-image">
            <img src="/two-phones.png" alt="Frift App on Two Phones" className="two-phones-image" />
          </div>
        </div>
      </section>

      <section id="features" className="features">
        <div className="container">
          <h2 className="section-title">Why Students Love Frift</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">👕</div>
              <h3>New Wardrobe, Low Cost</h3>
              <p>Access amazing clothes from students around you at student-friendly prices</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎫</div>
              <h3>Never Miss an Event</h3>
              <p>Find tickets and discover what other students are attending on campus</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💸</div>
              <h3>Zero Fees</h3>
              <p>Buy and sell without any platform fees - keep 100% of your earnings</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🤝</div>
              <h3>Meet In Person</h3>
              <p>Safe, convenient meetups with students from your campus</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>Easy to Use</h3>
              <p>Simple interface designed for busy students on the go</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🌱</div>
              <h3>Eco-Friendly</h3>
              <p>Reduce waste by giving items a second life within your campus community</p>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="how-it-works">
        <div className="container">
          <div className="how-it-works-content">
            <div className="how-it-works-text">
              <div className="section-badge">
                <span className="badge-icon">📱</span>
                <span>Campus Marketplace</span>
              </div>
              <h2 className="section-title">How Frift Works</h2>
              <p className="section-description">
                Frift includes powerful features designed to help you buy and sell with fellow students. 
                Use our built-in messaging to connect with buyers and sellers on your campus.
              </p>
              
              <div className="feature-list">
                <div className="feature-item">
                  <h3>Browse & List Items</h3>
                  <p>Discover items from students nearby or list your own products in seconds with our simple interface.</p>
                </div>
                
                <div className="feature-item">
                  <h3>Direct Messaging</h3>
                  <p>Connect with buyers and sellers instantly through our built-in messaging system.</p>
                </div>
                
                <div className="feature-item">
                  <h3>Campus Meetups</h3>
                  <p>Arrange safe meetups on campus to inspect items and complete transactions in person.</p>
                </div>
              </div>
            </div>
            
            <div className="how-it-works-phone">
              <div className="phone-container">
                <img src="/phone-howfriftwork.png" alt="How Frift Works" className="phone-mockup-image" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="connect" className="events-social">
        <div className="container">
          <div className="events-content">
            <div className="events-phone">
              <img src="/grandma-nobackground.png" alt="Frift on Mobile" className="grandma-phone-image" />
            </div>
            
            <div className="events-text">
              <div className="section-badge-small">
                <span className="badge-icon">🤝</span>
                <span>Campus Events & Social</span>
              </div>
              <h2 className="events-title">Connect<br /><span className="events-subtitle">Beyond the Sale</span></h2>
              <p className="events-description">
                No more awkwardly posting your unwanted club tickets on stories or group chats.
              </p>
              
              <div className="events-features">
                <div className="events-feature-item">
                  <span className="check-icon">✓</span>
                  <p>Buy and sell tickets with ease</p>
                </div>
                
                <div className="events-feature-item">
                  <span className="check-icon">✓</span>
                  <p>See what your campus is doing and who's going</p>
                </div>
                
                <div className="events-feature-item">
                  <span className="check-icon">✓</span>
                  <p>Drop a story, send a DM, join the student scene</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container">
          <h2 className="cta-title">Join Your Campus Marketplace Today</h2>
          <p className="cta-subtitle">
            Start buying and selling with students around you - no fees, just convenience
          </p>
          <div className="cta-buttons">
            <a href="https://apps.apple.com/gb/app/frift-student-marketplace/id6745021634" className="app-store-link" target="_blank" rel="noopener noreferrer">
              <img src="/appstore-white.svg" alt="Download on App Store" className="app-store-badge-cta" />
            </a>
          </div>
        </div>
      </section>

      <section className="get-in-touch">
        <div className="container">
          <h2 className="touch-title">Get in Touch</h2>
          <p className="touch-description">
            Have questions or feedback? We're here to help you get the most out of Frift.
          </p>
          <a href="mailto:kyle@frift.uk" className="touch-email">kyle@frift.uk</a>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <div className="footer-main">
            <div className="footer-left">
              <img src="/frift.svg" alt="Frift" className="footer-logo" />
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
                  <li><a href="https://frift.uk/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy</a></li>
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

export default LandingPage;