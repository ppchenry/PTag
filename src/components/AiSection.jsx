import React, { useState, useEffect } from 'react';
import '../fonts.css';

const AiSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  // 监测元素是否进入视口   
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setIsVisible(true);
      }
    }, { threshold: 0.2 });

    const section = document.getElementById('ai-section');
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  // 添加响应式窗口宽度检测
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // 根据窗口宽度应用响应式样式
  const getResponsiveStyles = () => {
    const isMobile = windowWidth < 768;
    const isTablet = windowWidth >= 768 && windowWidth < 1024;

    // 图片区域的最小高度，确保在小屏幕上也有足够空间显示文字
    const minHeight = isMobile ? 240 : (isTablet ? 300 : 400);

    return {
      sectionStyle: {
        padding: isMobile ? `var(--spacing-medium) 0` : `var(--spacing-large) 0`,
        backgroundColor: 'var(--color-background-light)',
        overflow: 'hidden',
      },

      // 移动设备使用垂直排列布局
      mobileContainerStyle: {
        display: isMobile ? 'flex' : 'none',
        flexDirection: 'column',
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: `0 var(--spacing-medium)`,
        alignItems: 'center',
        gap: `var(--spacing-medium)`,
      },

      mobileImageStyle: {
        width: '100%',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        borderTopLeftRadius: '37.52px',
        borderTopRightRadius: '37.52px',
        borderBottomRightRadius: '37.52px',
        borderBottomLeftRadius: '0',
      },

      mobileContentStyle: {
        width: '100%',
        textAlign: 'center',
        padding: `var(--spacing-medium) 0`,
      },

      mobileTitleStyle: {
        fontSize: 'var(--font-size-xl)',
        fontWeight: 'bold',
        color: 'var(--color-text)',
        marginBottom: 'var(--spacing-small)',
      },

      mobileParagraphStyle: {
        fontSize: 'var(--font-size-base)',
        lineHeight: 1.6,
        color: 'var(--color-text-secondary)',
      },

      // 平板和桌面使用原有的叠加布局
      desktopContainerStyle: {
        display: isMobile ? 'none' : 'block',
        width: '100%',
        maxWidth: '1400px',
        margin: '0 auto',
        overflow: 'hidden',
        position: 'relative',
        // 特殊圆角设置：左上、右上和右下是圆角，左下是直角
        borderTopLeftRadius: '37.52px',
        borderTopRightRadius: '37.52px',
        borderBottomRightRadius: '37.52px',
        borderBottomLeftRadius: '0',
      },

      // 确保圆角正确设置
      imageContainerStyle: {
        width: '100%',
        minHeight: minHeight,
        position: 'relative',
        overflow: 'hidden',
        // 特殊圆角设置：左上、右上和右下是圆角，左下是直角
        borderTopLeftRadius: '37.52px',
        borderTopRightRadius: '37.52px',
        borderBottomRightRadius: '37.52px',
        borderBottomLeftRadius: '0',
      },

      imageStyle: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition: 'center',
        // 确保图片本身也遵循容器的圆角
        borderTopLeftRadius: '37.52px',
        borderTopRightRadius: '37.52px',
        borderBottomRightRadius: '37.52px',
        borderBottomLeftRadius: '0',
      },

      contentOverlayStyle: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'none',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end', // 将内容放置在底部
        alignItems: 'flex-start', // 靠左对齐
        padding: `var(--spacing-large) 5%`, // 保持适当的内边距
        // 确保叠加层也使用相同的圆角
        borderTopLeftRadius: '37.52px',
        borderTopRightRadius: '37.52px',
        borderBottomRightRadius: '37.52px',
        borderBottomLeftRadius: '0',
      },

      titleStyle: {
        fontSize: isTablet ? 'var(--font-size-xl)' : 'var(--font-size-xxl)',
        fontWeight: 'bold',
        color: 'white',
        marginBottom: '0',
        maxWidth: '600px',
        textShadow: 'var(--shadow-text)',
      },

      paragraphContainerStyle: {
        maxWidth: '550px',
      },

      paragraphStyle: {
        fontSize: isTablet ? 'var(--font-size-base)' : 'var(--font-size-lg)',
        fontWeight: '400',
        lineHeight: 1.2,
        color: 'white',
        marginBottom: '5px',
        textShadow: 'var(--shadow-subtitle)',
        letterSpacing: '0px',
      }
    };
  };

  const styles = getResponsiveStyles();

  return (
    <section id="ai-section" className="full-width" style={styles.sectionStyle}>
      {/* 移动设备布局 */}
      <div className={`fade-in ${isVisible ? 'visible' : ''}`} style={styles.mobileContainerStyle}>
        <div style={styles.mobileImageStyle}>
          <img
            src="/atlas/cat1.png"
            alt="拍摄猫咪照片"
            style={{ width: '100%', display: 'block' }}
          />
        </div>
        <div style={styles.mobileContentStyle}>
          <h2 style={styles.mobileTitleStyle}>什麼是智能尋寵？</h2>
          <p style={styles.mobileParagraphStyle}>
            路人只需拍攝流浪寵物照片，AI 即可自動識別寵物身份，
            並與失蹤紀錄對比，快速找回走失的寵物
          </p>
        </div>
      </div>

      {/* 平板和桌面布局（特殊圆角样式） */}
      <div className={`fade-in ${isVisible ? 'visible' : ''}`} style={styles.desktopContainerStyle}>
        <div style={styles.imageContainerStyle}>
          <img
            src="/atlas/cat1.png"
            alt="貓眼睛特寫"
            style={styles.imageStyle}
          />
          <div style={styles.contentOverlayStyle}>
            <h2 style={styles.titleStyle} className={isVisible ? 'fade-in visible' : 'fade-in'}>什麼是智能尋寵？</h2>
            <div style={styles.paragraphContainerStyle} className={isVisible ? 'fade-in visible' : 'fade-in'}>
              <p style={styles.paragraphStyle}>
                智能尋寵於2025年推出，路人只需拍攝流浪寵物照片，
                AI 即可自動識別寵物身份並與失蹤紀錄對比，
                快速找回走失的寵物
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AiSection;