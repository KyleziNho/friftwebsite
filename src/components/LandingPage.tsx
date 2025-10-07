import React from 'react';
import '../styles/LandingPage.css';
import Aurora from './Aurora';
import CardNav from './CardNav';

const LandingPage: React.FC = () => {
  const navItems = [
    {
      label: "Features",
      bgColor: "#1181E4",
      textColor: "#fff",
      links: [
        { label: "Why Students Love Frift", ariaLabel: "Features", href: "#features" },
        { label: "How It Works", ariaLabel: "How It Works", href: "#how-it-works" },
        { label: "Post Stories", ariaLabel: "Post Stories", href: "#connect" }
      ]
    },
    {
      label: "Company",
      bgColor: "#0d6efd",
      textColor: "#fff",
      links: [
        { label: "Privacy Policy", ariaLabel: "Privacy Policy", href: "/privacy.html" },
        { label: "Terms & Conditions", ariaLabel: "Terms and Conditions", href: "#terms" }
      ]
    },
    {
      label: "Contact",
      bgColor: "#0a58ca",
      textColor: "#fff",
      links: [
        { label: "Email", ariaLabel: "Email us", href: "mailto:kyle@frift.uk" },
        { label: "Instagram", ariaLabel: "Instagram", href: "https://www.instagram.com/friftofficial/" },
        { label: "LinkedIn", ariaLabel: "LinkedIn", href: "https://www.linkedin.com/company/friftuk/" }
      ]
    }
  ];

  return (
    <div className="landing-container" id="top">
      <CardNav
        logo="/friftnobg.png"
        logoAlt="Frift Logo"
        items={navItems}
        baseColor="rgba(0, 0, 0, 0.6)"
        menuColor="#fff"
        buttonBgColor="#1181E4"
        buttonTextColor="#fff"
        buttonText="Download App"
        buttonHref="https://apps.apple.com/gb/app/frift-student-marketplace/id6745021634"
      />

      <section className="hero">
        <div className="aurora-background">
          <Aurora
            colorStops={["#1081e4", "#1081e4", "#1081e4"]}
            blend={0.6}
            amplitude={1.0}
            speed={0.5}
          />
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
            <img src="/two-phones.png?v=3" alt="Frift App on Two Phones" className="two-phones-image" />
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
                  <p>Connect with buyers and sellers instantly through our built-in messaging system and stories feature.</p>
                </div>
                
                <div className="feature-item">
                  <h3>Campus Meetups</h3>
                  <p>Arrange safe meetups on campus to inspect items and complete transactions in person.</p>
                </div>
              </div>
            </div>
            
            <div className="how-it-works-phone">
              <div className="phone-container">
                <img src="/friftapp-phone.png?v=2" alt="How Frift Works" className="phone-mockup-image" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="connect" className="events-social">
        <div className="container">
          <div className="events-content">
            <div className="events-phone">
              <img src="/dogstory.png?v=2" alt="Frift on Mobile" className="grandma-phone-image" />
            </div>
            
            <div className="events-text">
              <div className="section-badge-small">
                <span className="badge-icon">🤝</span>
                <span>Post Stories</span>
              </div>
              <h2 className="events-title">No more awkwardly posting your unwanted club tickets on stories or group chats.</h2>
              <p className="events-description">
                
              </p>
              
              <div className="events-features">
                <div className="events-feature-item">
                  <p>Buy and sell tickets with ease</p>
                </div>

                <div className="events-feature-item">
                  <p>Stay plugged in to campus life - don't get FOMO!</p>
                </div>

                <div className="events-feature-item">
                  <p>Score last-minute tickets to sold-out events</p>
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
                  <li><a href="/privacy.html">Privacy</a></li>
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