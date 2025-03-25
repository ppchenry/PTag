import React, { useState, useEffect } from 'react';

const Navbar = () => {
  // Create a placeholder div with the same height as navbar to prevent content jump
  const navbarPlaceholderStyle = {
    height: '77px',
    width: '100%',
  };
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
  
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Main navbar container
  const navbarStyle = {
    display: 'flex',
    justifyContent: 'space-between', // Changed to space-between for layout in image
    alignItems: 'center',
    height: '77px',
    width: '100%',
    backgroundColor: '#FFFFFF',
    position: 'fixed', // Fixed position to stay at the top
    top: 0,
    left: 0,
    zIndex: 1000, // High z-index to stay above other content
    borderBottom: '1px solid #EEEEEE', // Light border at bottom
  };
  
  // Inner container with proper spacing
  const containerStyle = {
    width: '100%',
    maxWidth: '1400px', // Increased for better spacing
    display: 'flex',
    justifyContent: 'space-between', // Space between logo and nav items
    alignItems: 'center',
    padding: '0 40px',
    height: '100%',
    margin: '0 auto', // Center the container
  };
  
  const logoStyle = {
    fontFamily: 'Helvetica',
    fontWeight: 700,
    fontSize: '36px',
    lineHeight: '100%',
    color: '#000000',
    textDecoration: 'none',
  };
  
  const navLinksContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '30px', // Adjusted gap between nav items
  };
  
  const navLinkStyle = {
    textDecoration: 'none',
    color: '#000000',
    fontFamily: 'Helvetica',
    fontWeight: 400,
    fontSize: '16px',
    whiteSpace: 'nowrap',
  };
  
  const hamburgerStyle = {
    display: windowWidth > 768 ? 'none' : 'block',
    cursor: 'pointer',
    border: 'none',
    background: 'none',
    fontSize: '24px',
    marginLeft: 'auto', // Push to right side when visible
  };
  
  const mobileNavLinksStyle = {
    display: windowWidth <= 768 && isMenuOpen ? 'flex' : 'none',
    flexDirection: 'column',
    position: 'absolute',
    top: '77px',
    left: 0,
    backgroundColor: '#FFFFFF',
    width: '100%',
    padding: '20px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    zIndex: 100,
    gap: '20px',
  };
  
  return (
    <>
      {/* Placeholder div to prevent content jump when navbar is fixed */}
      <div style={navbarPlaceholderStyle}></div>
      
      {/* Fixed navbar */}
      <nav style={navbarStyle}>
        <div style={containerStyle}>
          <a href="/" style={logoStyle}>
            PTag
          </a>
          
          <button 
            style={hamburgerStyle}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? '✕' : '☰'}
          </button>
          
          {windowWidth > 768 ? (
            <div style={navLinksContainerStyle}>
              <a href="#" style={navLinkStyle}>特點</a>
              <a href="#" style={navLinkStyle}>選購PTag</a>
              <a href="#" style={navLinkStyle}>SPCA聯乘系列</a>
              <a href="#" style={navLinkStyle}>會員專區</a>
              <a href="#" style={navLinkStyle}>繁/EN</a>
            </div>
          ) : (
            <div style={mobileNavLinksStyle}>
              <a href="#" style={navLinkStyle}>特點</a>
              <a href="#" style={navLinkStyle}>選購PTag</a>
              <a href="#" style={navLinkStyle}>SPCA聯乘系列</a>
              <a href="#" style={navLinkStyle}>會員專區</a>
              <a href="#" style={navLinkStyle}>繁/EN</a>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;