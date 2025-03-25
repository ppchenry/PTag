// src/components/Footer.jsx
import React, { useState, useEffect } from 'react';

const Footer = () => {
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const footerStyle = {
    backgroundColor: '#333',
    color: 'white',
    padding: '40px 20px',
    textAlign: 'center',
    width: '100%',
  };

  const logoStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
  };

  const linksStyle = {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: '20px',
    flexDirection: windowWidth < 768 ? 'column' : 'row',
  };

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    margin: windowWidth < 768 ? '8px 0' : '0 15px',
    fontSize: '14px',
  };

  const copyrightStyle = {
    fontSize: '12px',
    color: '#aaa',
  };

  return (
    <footer style={footerStyle}>
      <div style={logoStyle}>PTag</div>
      <div style={linksStyle}>
        <a href="#" style={linkStyle}>关于我们</a>
        <a href="#" style={linkStyle}>宠物资讯</a>
        <a href="#" style={linkStyle}>联系我们</a>
        <a href="#" style={linkStyle}>隐私政策</a>
      </div>
      <div style={copyrightStyle}>© 2025 PTag. All rights reserved.</div>
    </footer>
  );
};

export default Footer;