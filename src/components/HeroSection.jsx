import React, { useState, useEffect, useRef } from 'react';
import { throttle } from 'lodash';
import '../fonts.css';

const HeroSection = () => {
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const requestRef = useRef(null);
  const previousTimeRef = useRef(null);
  const targetScrollRef = useRef(0);

  // 判断是否为移动设备（屏幕宽度小于768px）
  const isMobile = windowWidth < 768;

  // 初始加载动画
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const animate = time => {
    if (previousTimeRef.current !== undefined) {
      const currentScroll = scrollPosition;
      const targetScroll = targetScrollRef.current;
      const delta = targetScroll - currentScroll;

      if (Math.abs(delta) > 0.5) {
        setScrollPosition(currentScroll + delta * 0.15);
      } else {
        setScrollPosition(targetScroll);
      }
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    const handleResize = throttle(() => {
      setWindowWidth(window.innerWidth);
    }, 200);

    const handleScroll = throttle(() => {
      targetScrollRef.current = window.scrollY;
    }, 16);

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll, { passive: true });

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      handleResize.cancel();
      handleScroll.cancel();
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  // 桌面版英雄区域样式
  const desktopHeroContainerStyle = {
    width: '100vw',
    height: '100vh',
    position: 'relative',
    overflow: 'hidden',
    marginTop: '-77px',
    paddingTop: '77px',
    marginLeft: 'calc(-50vw + 50%)',
    boxSizing: 'border-box',
  };

  // 移动版整体容器样式 - 包括主图和底部区域
  const mobileContainerStyle = {
    width: '100vw',
    marginLeft: 'calc(-50vw + 50%)',
    boxSizing: 'border-box',
    position: 'relative',
    overflow: 'hidden',
  };

  // 移动版主图区域样式
  const mobileHeroContainerStyle = {
    width: '100%',
    height: '72vh', // 设置为视口高度，留出底部空间
    position: 'relative',
    overflow: 'hidden',
    marginTop: '-77px',
    paddingTop: '77px',
    boxSizing: 'border-box',
  };

  // 移动版底部内容区域样式
  const mobileBottomSectionStyle = {
    width: '100%',
    padding: '30px 20px',
    backgroundColor: '#D8CFBC',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    marginTop: '-1px', 
  };

  const heroImageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: isMobile ? '22% center' : 'center center',
    display: 'block',
    transform: `translate3d(0, 0, 0) scale(${1 + scrollPosition * 0.0003})`,
    transition: 'transform 0.2s linear',
    willChange: 'transform',
  };

  const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(to right, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0) 100%)',
    pointerEvents: 'none',
  };

  const contentWrapperStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '77px',
    boxSizing: 'border-box',
  };

  const innerContainerStyle = {
    maxWidth: '1440px',
    width: '100%',
    height: '100%',
    position: 'relative',
    padding: '0 20px',
    boxSizing: 'border-box',
  };

  // 桌面/平板版文本容器样式
  const desktopTextGroupStyle = {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    top: '30%',
    right: '8%',
    transform: `translate3d(0, ${-scrollPosition * 0.15}px, 0)`,
    opacity: Math.max(0, 1 - scrollPosition * 0.003),
    transition: 'transform 0.2s linear, opacity 0.2s linear',
    willChange: 'transform, opacity',
  };

  // 移动版布局的标题样式
  const mobileTitleContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
    transition: 'opacity 0.8s, transform 0.8s',
  };

  // 桌面版布局的标题样式
  const titleContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: '10px',
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
    transition: 'opacity 0.8s, transform 0.8s',
  };

  const ptagStyle = {
    color: isMobile ? '#000000' : 'white', // 移动版使用黑色，桌面版使用白色
    marginRight: '10px',
    fontFamily: '"Helvetica", sans-serif',
    fontSize: isMobile ? '32px' : '56px',
    fontWeight: 'bold',
    lineHeight: 1,
    textShadow: isMobile ? 'none' : '0 2px 4px rgba(0,0,0,0.3)', // 移动版不需要文字阴影
  };

  const airStyle = {
    color: '#65A8FB',
    fontFamily: '"Helvetica", sans-serif',
    fontSize: isMobile ? '32px' : '56px',
    fontWeight: 'bold',
    lineHeight: 1,
    textShadow: isMobile ? 'none' : '0 2px 4px rgba(0,0,0,0.2)', // 移动版不需要文字阴影
  };

  const subtitleContainerStyle = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
    transition: 'opacity 0.8s 0.2s, transform 0.8s 0.2s',
    marginBottom: '20px',
  };

  const subtitleStyle = {
    fontFamily: '"Helvetica", sans-serif',
    fontWeight: 'bold',
    fontSize: isMobile ? '18px' : '34px',
    letterSpacing: '0.05em',
    color: '#050505',
    padding: '4px 0',
    textShadow: isMobile ? 'none' : '0 2px 4px rgba(0,0,0,0.4)', // 移动版不需要文字阴影
  };

  const buttonContainerStyle = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
    transition: 'opacity 0.8s 0.4s, transform 0.8s 0.4s',
    display: 'flex',
    alignItems: 'center',
  };

  const buttonStyle = {
    backgroundColor: '#FFA500',
    color: 'black',
    border: 'none',
    fontFamily: '"Helvetica", sans-serif',
    padding: '14px 34px',
    borderRadius: '3px',
    cursor: 'pointer',
    fontSize: '18px',
    fontWeight: 'bold',
    transition: 'all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)',
    letterSpacing: '0.5px',
  };

  const buttonHoverStyle = {
    ...buttonStyle,
    backgroundColor: '#FF8C00',
    opacity: 0.9,
  };

  // 移动版底部区域样式
  const mobileBottomContentStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width:'100%',
    backgroundColor:'#D8CFBC',
  };

  // 移动版左侧文本区域样式
  const mobileLeftContentStyle = {
    flex: '1',
  };

  // 产品图片样式 (仅在移动设备显示)
  const productImageStyle = {
    height: '154px',
    width:'162px'
  };

  const scrollArrowStyle = {
    position: 'absolute',
    bottom: '40px',
    left: '50%',
    transform: `translateX(-50%) translateY(${scrollPosition > 50 ? '20px' : '0px'})`,
    cursor: 'pointer',
    opacity: Math.max(0, scrollPosition > 100 ? 0 : 1 - scrollPosition * 0.01),
    transition: 'transform 0.4s cubic-bezier(0.25, 0.1, 0.25, 1), opacity 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)',
    animation: 'bounce 2s infinite',
    willChange: 'transform, opacity',
  };

  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <>
      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
          overflow-x: hidden;
        }
        * {
          box-sizing: border-box;
        }
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateX(-50%) translateY(0);
          }
          40% {
            transform: translateX(-50%) translateY(-10px);
          }
          60% {
            transform: translateX(-50%) translateY(-5px);
          }
        }
      `}</style>

      {/* 桌面/平板布局 */}
      {!isMobile && (
        <section style={desktopHeroContainerStyle}>
          <img
            src="/atlas/hero.png"
            alt="拉布拉多犬佩戴PTag Air"
            style={heroImageStyle}
            loading="eager"
          />
          <div style={overlayStyle}></div>
          <div style={contentWrapperStyle}>
            <div style={innerContainerStyle}>
              <div style={desktopTextGroupStyle}>
                <div style={titleContainerStyle}>
                  <span style={ptagStyle}>PTag</span>
                  <span style={airStyle}>Air</span>
                </div>

                <div style={subtitleContainerStyle}>
                  <div style={subtitleStyle}>
                    輕巧設計 讓愛不再走失
                  </div>
                </div>

                <div style={buttonContainerStyle}>
                  <button
                    style={isButtonHovered ? buttonHoverStyle : buttonStyle}
                    onMouseEnter={() => setIsButtonHovered(true)}
                    onMouseLeave={() => setIsButtonHovered(false)}
                  >
                    立即購買
                  </button>
                </div>
              </div>

              <div
                style={scrollArrowStyle}
                onClick={handleScrollDown}
              >
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 10L12 15L17 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 移动设备布局 */}
      {isMobile && (
        <div style={mobileContainerStyle}>
          {/* 主图区域 */}
          <section style={mobileHeroContainerStyle}>
            <img
              src="/atlas/hero.png"
              alt="拉布拉多犬佩戴PTag Air"
              style={heroImageStyle}
              loading="eager"
            />
            <div style={{ ...overlayStyle, background: 'none' }}></div>
          </section>

          {/* 底部内容区域 */}
          <section style={mobileBottomSectionStyle}>
            <div style={mobileBottomContentStyle}>
              {/* 左侧文本内容 */}
              <div style={mobileLeftContentStyle}>
                <div style={mobileTitleContainerStyle}>
                  <span style={ptagStyle}>PTag</span>
                  <span style={airStyle}>Air</span>
                </div>

                <div style={subtitleContainerStyle}>
                  <div style={subtitleStyle}>
                    輕巧設計 讓愛不再走失
                  </div>
                </div>

                <div style={buttonContainerStyle}>
                  <button
                    style={isButtonHovered ? buttonHoverStyle : buttonStyle}
                    onMouseEnter={() => setIsButtonHovered(true)}
                    onMouseLeave={() => setIsButtonHovered(false)}
                  >
                    立即購買
                  </button>
                </div>
              </div>

              {/* 右侧产品图片 */}
              <img
                src="/icons/scan.png"
                alt="PTag Air 吊牌正反面"
                style={productImageStyle}
              />
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default HeroSection;