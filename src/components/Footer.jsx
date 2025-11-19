import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Mail, Facebook, Twitter, Instagram, Youtube, Heart } from 'lucide-react';

const Footer = () => {
  const footerStyles = {
    //backgroundColor: '#0f172a',
    backgroundColor: '#000000',
    borderTop: '1px solid #1e293b',
    padding: '40px 20px 20px',
    marginTop: '60px'
  };

  const containerStyles = {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '40px',
    marginBottom: '30px'
  };

  const sectionStyles = {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  };

  const headingStyles = {
    color: '#00d4ff',
    fontSize: '18px',
    fontWeight: '600',
    marginBottom: '10px'
  };

  const linkStyles = {
    color: '#cbd5e1',
    textDecoration: 'none',
    fontSize: '14px',
    transition: 'color 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  };

  const textStyles = {
    color: '#94a3b8',
    fontSize: '14px',
    lineHeight: '1.6'
  };

  const bottomStyles = {
    borderTop: '1px solid #1e293b',
    paddingTop: '20px',
    textAlign: 'center',
    color: '#64748b',
    fontSize: '14px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '15px'
  };

  const socialLinksStyles = {
    display: 'flex',
    gap: '15px',
    justifyContent: 'center'
  };

  const socialIconStyles = {
    color: '#94a3b8',
    transition: 'color 0.3s ease',
    cursor: 'pointer'
  };

  return (
    <footer style={footerStyles}>
      <div style={containerStyles}>
        {/* Brand Section */}
        <div style={sectionStyles}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              backgroundColor: '#00d4ff',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Play size={18} fill="white" color="white" />
            </div>
            <span style={{
              fontSize: '20px',
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #00d4ff, #0066ff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              WishList Series
            </span>
          </div>
          <p style={textStyles}>
            Your ultimate destination for unlimited entertainment. Watch the latest movies, TV shows, and exclusive content anytime, anywhere.
          </p>
          <div style={{ display: 'flex', gap: '10px' }}>
            <a 
              href="#" 
              style={linkStyles}
              onMouseEnter={(e) => e.target.style.color = '#00d4ff'}
              onMouseLeave={(e) => e.target.style.color = '#cbd5e1'}
            >
              <Facebook size={18} />
            </a>
            <a 
              href="#" 
              style={linkStyles}
              onMouseEnter={(e) => e.target.style.color = '#00d4ff'}
              onMouseLeave={(e) => e.target.style.color = '#cbd5e1'}
            >
              <Twitter size={18} />
            </a>
            <a 
              href="#" 
              style={linkStyles}
              onMouseEnter={(e) => e.target.style.color = '#00d4ff'}
              onMouseLeave={(e) => e.target.style.color = '#cbd5e1'}
            >
              <Instagram size={18} />
            </a>
            <a 
              href="#" 
              style={linkStyles}
              onMouseEnter={(e) => e.target.style.color = '#00d4ff'}
              onMouseLeave={(e) => e.target.style.color = '#cbd5e1'}
            >
              <Youtube size={18} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div style={sectionStyles}>
          <h3 style={headingStyles}>Quick Links</h3>
          <Link 
            to="/" 
            style={linkStyles}
            onMouseEnter={(e) => e.target.style.color = '#00d4ff'}
            onMouseLeave={(e) => e.target.style.color = '#cbd5e1'}
          >
            Home
          </Link>
          <Link 
            to="/movies" 
            style={linkStyles}
            onMouseEnter={(e) => e.target.style.color = '#00d4ff'}
            onMouseLeave={(e) => e.target.style.color = '#cbd5e1'}
          >
            Movies
          </Link>
          <Link 
            to="/series" 
            style={linkStyles}
            onMouseEnter={(e) => e.target.style.color = '#00d4ff'}
            onMouseLeave={(e) => e.target.style.color = '#cbd5e1'}
          >
            TV Series
          </Link>
          <Link 
            to="/new" 
            style={linkStyles}
            onMouseEnter={(e) => e.target.style.color = '#00d4ff'}
            onMouseLeave={(e) => e.target.style.color = '#cbd5e1'}
          >
            New Releases
          </Link>
          <Link 
            to="/trending" 
            style={linkStyles}
            onMouseEnter={(e) => e.target.style.color = '#00d4ff'}
            onMouseLeave={(e) => e.target.style.color = '#cbd5e1'}
          >
            Trending
          </Link>
        </div>

        {/* Categories */}
        <div style={sectionStyles}>
          <h3 style={headingStyles}>Categories</h3>
          <Link 
            to="/category/action" 
            style={linkStyles}
            onMouseEnter={(e) => e.target.style.color = '#00d4ff'}
            onMouseLeave={(e) => e.target.style.color = '#cbd5e1'}
          >
            Action
          </Link>
          <Link 
            to="/category/comedy" 
            style={linkStyles}
            onMouseEnter={(e) => e.target.style.color = '#00d4ff'}
            onMouseLeave={(e) => e.target.style.color = '#cbd5e1'}
          >
            Comedy
          </Link>
          <Link 
            to="/category/drama" 
            style={linkStyles}
            onMouseEnter={(e) => e.target.style.color = '#00d4ff'}
            onMouseLeave={(e) => e.target.style.color = '#cbd5e1'}
          >
            Drama
          </Link>
          <Link 
            to="/category/sci-fi" 
            style={linkStyles}
            onMouseEnter={(e) => e.target.style.color = '#00d4ff'}
            onMouseLeave={(e) => e.target.style.color = '#cbd5e1'}
          >
            Sci-Fi
          </Link>
          <Link 
            to="/category/animation" 
            style={linkStyles}
            onMouseEnter={(e) => e.target.style.color = '#00d4ff'}
            onMouseLeave={(e) => e.target.style.color = '#cbd5e1'}
          >
            Animation
          </Link>
        </div>

        {/* Support */}
        <div style={sectionStyles}>
          <h3 style={headingStyles}>Support</h3>
          <Link 
            to="/help" 
            style={linkStyles}
            onMouseEnter={(e) => e.target.style.color = '#00d4ff'}
            onMouseLeave={(e) => e.target.style.color = '#cbd5e1'}
          >
            Help Center
          </Link>
          <Link 
            to="/contact" 
            style={linkStyles}
            onMouseEnter={(e) => e.target.style.color = '#00d4ff'}
            onMouseLeave={(e) => e.target.style.color = '#cbd5e1'}
          >
            Contact Us
          </Link>
          <Link 
            to="/faq" 
            style={linkStyles}
            onMouseEnter={(e) => e.target.style.color = '#00d4ff'}
            onMouseLeave={(e) => e.target.style.color = '#cbd5e1'}
          >
            FAQ
          </Link>
          <Link 
            to="/privacy" 
            style={linkStyles}
            onMouseEnter={(e) => e.target.style.color = '#00d4ff'}
            onMouseLeave={(e) => e.target.style.color = '#cbd5e1'}
          >
            Privacy Policy
          </Link>
          <Link 
            to="/terms" 
            style={linkStyles}
            onMouseEnter={(e) => e.target.style.color = '#00d4ff'}
            onMouseLeave={(e) => e.target.style.color = '#cbd5e1'}
          >
            Terms of Service
          </Link>
        </div>

        {/* Newsletter */}
        <div style={sectionStyles}>
          <h3 style={headingStyles}>Stay Updated</h3>
          <p style={textStyles}>
            Subscribe to our newsletter for the latest updates and exclusive content.
          </p>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input 
              type="email" 
              placeholder="Enter your email"
              style={{
                flex: '1',
                padding: '10px 12px',
                backgroundColor: '#1e293b',
                border: '1px solid #334155',
                borderRadius: '6px',
                color: 'white',
                fontSize: '14px',
                outline: 'none'
              }}
            />
            <button
              style={{
                padding: '10px 20px',
                backgroundColor: '#00d4ff',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '600',
                transition: 'background-color 0.3s ease'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#0099cc'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#00d4ff'}
            >
              <Mail size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div style={bottomStyles}>
        <div style={socialLinksStyles}>
          <a 
            href="#" 
            style={socialIconStyles}
            onMouseEnter={(e) => e.target.style.color = '#00d4ff'}
            onMouseLeave={(e) => e.target.style.color = '#94a3b8'}
          >
            <Facebook size={20} />
          </a>
          <a 
            href="#" 
            style={socialIconStyles}
            onMouseEnter={(e) => e.target.style.color = '#00d4ff'}
            onMouseLeave={(e) => e.target.style.color = '#94a3b8'}
          >
            <Twitter size={20} />
          </a>
          <a 
            href="#" 
            style={socialIconStyles}
            onMouseEnter={(e) => e.target.style.color = '#00d4ff'}
            onMouseLeave={(e) => e.target.style.color = '#94a3b8'}
          >
            <Instagram size={20} />
          </a>
          <a 
            href="#" 
            style={socialIconStyles}
            onMouseEnter={(e) => e.target.style.color = '#00d4ff'}
            onMouseLeave={(e) => e.target.style.color = '#94a3b8'}
          >
            <Youtube size={20} />
          </a>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>Made with</span>
          <Heart size={16} color="#ef4444" fill="#ef4444" />
          <span>for movie lovers</span>
        </div>
        
        <p style={{ margin: 0 }}>
          © 2025 wishlist. All rights reserved. | 
          <span style={{ color: '#00d4ff', margin: '0 5px' }}>
            anime world watch to free
          </span>
        </p>
        
        <p style={{ margin: 0, fontSize: '12px', color: '#64748b' }}>
          This is a demo streaming platform. All content is for demonstration purposes only.
        </p>
      </div>
    </footer>
  );
};

export default Footer;