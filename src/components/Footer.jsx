// src/components/Footer.jsx
import React from 'react';

const Footer = () => {
  const footerStyle = {
    backgroundColor: '#f5f5f5',
    color: '#333',
    width: '100%',
    height: '143px', // 根据截图调整高度
    borderTop: '1px solid #e0e0e0',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '0',
    position: 'relative',
  };

  const containerStyle = {
    maxWidth: '1400px',
    width: '100%',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
    padding: '0 20px',
  };

  const logoStyle = {
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: '25px',
    color: '#000',
  };

  const linksContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    marginBottom: '20px',
  };

  const linkStyle = {
    color: '#333',
    textDecoration: 'none',
    margin: '0 12px',
    fontSize: '14px',
  };

  const copyrightStyle = {
    fontSize: '13px',
    color: '#666',
    textAlign: 'center',
    lineHeight: '1.5',
  };

  const socialContainerStyle = {
    position: 'absolute',
    right: '20px',
    top: '50%',
    transform: 'translateY(-50%)',
    display: 'flex',
    gap: '15px',
  };

  const socialIconStyle = {
    color: '#333',
    fontSize: '20px',
    textDecoration: 'none',
  };

  return (
    <footer style={footerStyle}>
      <div style={containerStyle}>
        <div style={logoStyle}>PTag</div>

        <div style={linksContainerStyle}>
          <a href="#" style={linkStyle}>會員登入</a>
          <a href="#" style={linkStyle}>會員注冊</a>
          <a href="#" style={linkStyle}>私隱聲明</a>
          <a href="#" style={linkStyle}>服務條款</a>
          <a href="#" style={linkStyle}>寵物展</a>
          <a href="#" style={linkStyle}>PBC資訊平台</a>
          <a href="#" style={linkStyle}>Facebook專頁</a>
          <a href="#" style={linkStyle}>聯絡我們</a>
        </div>

        <div style={copyrightStyle}>
          <div>Copyright© 2025 MLHWKT Ltd.</div>
          <div>All Rights Reserved 版權所有 不得轉載</div>
        </div>

        <div style={socialContainerStyle}>
          <a href="#" style={socialIconStyle} aria-label="Facebook">
            <span style={{ fontFamily: 'Arial', fontWeight: 'bold' }}>f</span>
          </a>
          <a href="#" style={socialIconStyle} aria-label="Email">
            <span>✉</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;