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
        width: '100vw',
        marginLeft: 'calc(-50vw + 50%)', // 确保宽度占满
        padding: isMobile ? '20px 0' : '40px 0',
        backgroundColor: '#FCF8F3',
        overflow: 'hidden',
      },

      // 移动设备使用垂直排列布局
      mobileContainerStyle: {
        display: isMobile ? 'flex' : 'none',
        flexDirection: 'column',
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px',
        alignItems: 'center',
        gap: '20px',
        opacity: isVisible ? 1 : 0.8,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
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
        padding: '20px 0',
      },

      mobileTitleStyle: {
        fontSize: '28px',
        fontWeight: 'bold',
        color: '#000',
        marginBottom: '16px',
        fontFamily: 'Helvetica',
      },

      mobileParagraphStyle: {
        fontSize: '16px',
        lineHeight: 1.6,
        color: '#333',
        fontFamily: 'Helvetica',
      },

      // 平板和桌面使用原有的叠加布局
      desktopContainerStyle: {
        display: isMobile ? 'none' : 'block',
        width: '100%',
        maxWidth: '1400px',
        margin: '0 auto',
        overflow: 'hidden',
        position: 'relative',
        opacity: isVisible ? 1 : 0.8,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
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
        // 特殊圆角设置：左上、右上和右下是圆角，左下是直角(0)
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
        padding: '40px 5%', // 保持适当的内边距
        // 确保叠加层也使用相同的圆角
        borderTopLeftRadius: '37.52px',
        borderTopRightRadius: '37.52px',
        borderBottomRightRadius: '37.52px',
        borderBottomLeftRadius: '0',
      },

      titleStyle: {
        fontSize: isTablet ? '32px' : '34px',
        fontWeight: 'bold',
        color: 'white',
        marginBottom: '0',
        fontFamily: 'Helvetica',
        maxWidth: '600px',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(-20px)',
        transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
        textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
      },

      paragraphContainerStyle: {
        maxWidth: '550px',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.8s ease-out 0.2s, transform 0.8s ease-out 0.2s',
      },

      paragraphStyle: {
        fontSize: isTablet ? '16px' : '21px',
        fontWeight:'400',
        lineHeight: 1.2,
        color: 'white',
        marginBottom: '5px',
        fontFamily: 'Helvetica',
        textShadow: '0 1px 2px rgba(0, 0, 0, 0.4)',
        letterSpacing: '0px',
      }
    };
  };

  const styles = getResponsiveStyles();

  return (
    <section id="ai-section" style={styles.sectionStyle}>
      {/* 移动设备布局 */}
      <div style={styles.mobileContainerStyle}>
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
      <div style={styles.desktopContainerStyle}>
        <div style={styles.imageContainerStyle}>
          <img
            src="/atlas/cat1.png"
            alt="貓眼睛特寫"
            style={styles.imageStyle}
          />
          <div style={styles.contentOverlayStyle}>
            <h2 style={styles.titleStyle}>什麼是智能尋寵？</h2>
            <div style={styles.paragraphContainerStyle}>
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