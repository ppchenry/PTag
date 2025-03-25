import React, { useState, useEffect } from 'react';

const Navbar = () => {
  // Create a placeholder div with the same height as navbar to prevent content jump
  const navbarPlaceholderStyle = {
    height: '77px',
    width: '100%',
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
  const [hoveredNav, setHoveredNav] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
      }
    };

    const handleScroll = () => {
      // 当滚动超过100px时改变导航栏样式
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Main navbar container 
  const navbarStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '77px',
    width: '100%',
    backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.7)', 
    backdropFilter: 'blur(5px)', 
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 1000,
    borderBottom: isScrolled ? '1px solid rgba(238, 238, 238, 0.8)' : 'none', 
    transition: 'all 0.3s ease-in-out', 
  };

  // Inner container with proper spacing
  const containerStyle = {
    width: '100%',
    maxWidth: '1400px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 40px',
    height: '100%',
    margin: '0 auto',
  };

  const logoStyle = {
    fontFamily: 'Helvetica',
    fontWeight: 700,
    fontSize: '36px',
    lineHeight: '100%',
    color: '#000000',
    textDecoration: 'none',
    textShadow: '0 1px 2px rgba(255, 255, 255, 0.5)', 
  };

  const navLinksContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '30px',
  };

 
  const getNavLinkStyle = (navName) => {
    const isHovered = hoveredNav === navName;

    return {
      textDecoration: 'none',
      color: isHovered ? '#4a90e2' : '#000000',
      fontFamily: 'Helvetica',
      fontWeight: isHovered ? 500 : 400,
      fontSize: '16px',
      whiteSpace: 'nowrap',
      padding: '8px 12px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      borderRadius: '4px',
      backgroundColor: isHovered ? 'rgba(240, 247, 255, 0.8)' : 'transparent', 
      transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
      boxShadow: isHovered ? '0 2px 4px rgba(0, 0, 0, 0.1)' : 'none',
      textShadow: '0 1px 1px rgba(255, 255, 255, 0.5)', 
    };
  };

  const hamburgerStyle = {
    display: windowWidth > 768 ? 'none' : 'block',
    cursor: 'pointer',
    border: 'none',
    background: 'none',
    fontSize: '24px',
    marginLeft: 'auto',
  };

  const mobileNavLinksStyle = {
    display: windowWidth <= 768 && isMenuOpen ? 'flex' : 'none',
    flexDirection: 'column',
    position: 'absolute',
    top: '77px',
    left: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // 半透明背景
    backdropFilter: 'blur(10px)', // 更强的模糊效果
    width: '100%',
    padding: '20px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    zIndex: 100,
    gap: '20px',
  };

  // 渲染导航项
  const renderNavItem = (name, label) => {
    return (
      <div
        style={getNavLinkStyle(name)}
        role="button"
        tabIndex={0}
        onMouseEnter={() => setHoveredNav(name)}
        onMouseLeave={() => setHoveredNav(null)}
        onClick={() => console.log(`Clicked: ${name}`)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            console.log(`Keypress on: ${name}`);
          }
        }}
      >
        {label}
      </div>
    );
  };

  return (
    <>
      
      <div style={navbarPlaceholderStyle}></div>

      <nav style={navbarStyle}>
        <div style={containerStyle}>
          <a
            href="/"
            style={logoStyle}
            onMouseEnter={() => console.log('Logo hovered')}
          >
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
              {renderNavItem('features', '特點')}
              {renderNavItem('shop', '選購PTag')}
              {renderNavItem('member', '會員專區')}
              {renderNavItem('language', '繁/EN')}
            </div>
          ) : (
            <div style={mobileNavLinksStyle}>
              {renderNavItem('features', '特點')}
              {renderNavItem('shop', '選購PTag')}
              {renderNavItem('member', '會員專區')}
              {renderNavItem('language', '繁/EN')}
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;