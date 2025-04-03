import React, { useState, useEffect } from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [isMobile, setIsMobile] = useState(false);

  // Check if screen width is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Initial check
    checkMobile();

    // Add event listener for window resize
    window.addEventListener('resize', checkMobile);

    // Clean up
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const styles = {
    footer: {
      width: '100%',
      padding: '0',
      backgroundColor: "#F5F5F5"
    },
    logoContainer: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: '20px',
      marginBottom: isMobile ? "0" : '20px'
    },
    logo: {
      fontSize: isMobile ? "32px" : '36px',
      fontWeight: 'bold',
      color: '#000'
    },
    divider: {
      width: isMobile ? "100%" : '80%',
      height: '1px',
      backgroundColor: '#eaeaea',
      margin: '10px auto'
    },
    footerMainContainer: {
      width: '100%',
      padding: '0 20px',
      boxSizing: 'border-box'
    },
    // 容器使用相对定位以便于绝对定位子元素
    footerFlexContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
      maxWidth: '1400px',
      margin: '0 auto',
      position: 'relative' // 为绝对定位做准备
    },
    menuItems: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: 'var(--font-size-base)',
      margin: '10px auto',
      flexWrap: isMobile ? 'wrap' : 'nowrap',
      width: '100%',
      textAlign: 'center',
      position: 'relative', // 为了保持在文档流中
      zIndex: 1 // 确保不被其他元素遮挡
    },
    menuItem: {
      color: 'var(--color-text)',
      textDecoration: 'none',
      padding: '0 15px',
      fontSize: 'var(--font-size-base)',
      whiteSpace: 'nowrap'
    },
   
    socialIcons: {
      display: 'flex',
      gap: '20px',
      justifyContent: isMobile ? 'center' : 'flex-end',
      margin: isMobile ? '10px 0' : '0',
      padding: isMobile ? '0' : '0 20px',
      position: isMobile ? 'static' : 'absolute', // 桌面端使用绝对定位
      right: isMobile ? 'auto' : '0', // 桌面端靠右
      top: isMobile ? 'auto' : '10px' // 桌面端顶部位置
    },
    socialIcon: {
      width: '20px',
      height: '20px',
      opacity: '0.8'
    },
    copyright: {
      margin: '20px 0 10px 0',
      color: '#707070',
      fontSize: 'var(--font-size-xs)',
      lineHeight: '1.4',
      textAlign: 'center',
      width: '100%'
    },
    copyrightText: {
      margin: '5px 0'
    },
    mobileDivider: {
      width: '100%',
      height: '1px',
      backgroundColor: '#eaeaea',
      margin: '15px 0'
    }
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.logoContainer}>
        <h1 style={styles.logo}>PTag</h1>
      </div>

      {/* Divider Line - only show on desktop */}
      {!isMobile && <div style={styles.divider}></div>}

      <div style={styles.footerMainContainer}>
        <div style={styles.footerFlexContainer}>
          {/* Mobile: Social Icons above menu */}
          {isMobile && (
            <>
              <div style={styles.socialIcons}>
                <a href="https://instagram.com">
                  <img src="/icons/ins.png" alt="Instagram" style={styles.socialIcon} />
                </a>
                <a href="https://www.facebook.com/petboysclub">
                  <img src="/icons/facebook.png" alt="Facebook" style={styles.socialIcon} />
                </a>
                <a href="mailto:info@ptag.com">
                  <img src="/icons/email.png" alt="Email" style={styles.socialIcon} />
                </a>
              </div>
              <div style={styles.mobileDivider}></div>
            </>
          )}

          {/* Menu Items 保持居中 */}
          <div style={styles.menuItems}>
            <a href="/login" style={styles.menuItem}>會員登入</a>
            <a href="/register" style={styles.menuItem}>會員註冊</a>
            <a href="/privacy" style={styles.menuItem}>私隱聲明</a>
            <a href="/terms" style={styles.menuItem}>服務條款</a>
          </div>

          {/* Desktop: Social Icons - 使用绝对定位确保在右侧 */}
          {!isMobile && (
            <div style={styles.socialIcons}>
              <a href="https://instagram.com">
                <img src="/icons/ins.png" alt="Instagram" style={styles.socialIcon} />
              </a>
              <a href="https://www.facebook.com/petboysclub">
                <img src="/icons/facebook.png" alt="Facebook" style={styles.socialIcon} />
              </a>
              <a href="mailto:info@ptag.com">
                <img src="/icons/email.png" alt="Email" style={styles.socialIcon} />
              </a>
            </div>
          )}

          {/* Copyright */}
          <div style={styles.copyright}>
            <p style={styles.copyrightText}>Copyright© {currentYear} MLHWKT Ltd.</p>
            <p style={styles.copyrightText}>All Rights Reserved 版權所有 不得轉載</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;