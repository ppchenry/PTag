import React, { useState, useEffect, useRef } from 'react';
import { throttle } from 'lodash';
import '../fonts.css';

// 提取颜色和尺寸为常量
const COLORS = {
  primary: '#65A8FB',
  text: '#050505',
  background: '#D8CFBC',
  buttonPrimary: '#FFA500',
  buttonHover: '#FF8C00',
  white: 'white',
  black: 'black',
};

const FONTS = {
  titleMobile: '32px',
  titleDesktop: '56px',
  subtitleMobile: '18px',
  subtitleDesktop: '34px',
  button: '18px',
};

const SHADOWS = {
  text: '0 2px 4px rgba(0,0,0,0.3)',
  subtitleText: '0 2px 4px rgba(0,0,0,0.4)',
  none: 'none',
};

const HeroSection = () => {
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const requestRef = useRef(null);
  const previousTimeRef = useRef(null);
  const targetScrollRef = useRef(0);

  // 判断设备类型
  const isMobile = windowWidth < 768;
  const isIpad = windowWidth >= 768 && windowWidth <= 1024;

  // 初始加载动画
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // 动画函数
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

  // 设置事件监听
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

  // 通用样式
  const commonStyles = {
    // 容器相关通用样式
    fullWidth: {
      width: '100vw',
      marginLeft: 'calc(-50vw + 50%)',
      boxSizing: 'border-box',
    },

    // 文本相关通用样式
    textContainer: {
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
      transition: 'opacity 0.8s, transform 0.8s',
    },

    // 文本样式
    brandText: {
      fontWeight: 'bold',
      lineHeight: 1,
    },
  };

  // 根据设备类型选择不同的对象位置
  const getObjectPosition = () => {
    if (isMobile) return '22% center';
    if (isIpad) return '35% center';
    return 'center center';
  };

  // 桌面版英雄区域样式
  const desktopHeroContainerStyle = {
    ...commonStyles.fullWidth,
    height: '100vh',
    position: 'relative',
    overflow: 'hidden',
    marginTop: '-77px',
    paddingTop: '77px',
  };

  // 移动版整体容器样式
  const mobileContainerStyle = {
    ...commonStyles.fullWidth,
    position: 'relative',
    overflow: 'hidden',
  };

  // 移动版主图区域样式
  const mobileHeroContainerStyle = {
    width: '100%',
    height: '72vh',
    position: 'relative',
    overflow: 'hidden',
    marginTop: '-77px',
    paddingTop: '77px',
    boxSizing: 'border-box',
  };

  // 英雄图片样式
  const heroImageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: getObjectPosition(),
    display: 'block',
    transform: `translate3d(0, 0, 0) scale(${1 + scrollPosition * 0.0003})`,
    transition: 'transform 0.2s linear',
    willChange: 'transform',
  };

  // 覆盖层样式
  const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(to right, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0) 100%)',
    pointerEvents: 'none',
  };

  // 内容包装样式
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

  // 内部容器样式
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
    right: isIpad ? '10%' : '8%',
    transform: `translate3d(0, ${-scrollPosition * 0.15}px, 0)`,
    opacity: Math.max(0, 1 - scrollPosition * 0.003),
    transition: 'transform 0.2s linear, opacity 0.2s linear',
    willChange: 'transform, opacity',
  };

  // 标题容器样式 - 桌面和移动共用基础属性
  const titleContainerBaseStyle = {
    ...commonStyles.textContainer,
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
  };

  // 桌面版标题容器样式
  const titleContainerStyle = {
    ...titleContainerBaseStyle,
    justifyContent: 'flex-start',
  };

  // 移动版标题容器样式
  const mobileTitleContainerStyle = {
    ...titleContainerBaseStyle,
  };

  // PTag文本样式
  const ptagStyle = {
    ...commonStyles.brandText,
    color: COLORS.white,
    marginRight: '10px',
    fontSize: isMobile ? FONTS.titleMobile : FONTS.titleDesktop,
    textShadow: isMobile ? SHADOWS.none : SHADOWS.text,
  };

  // Air文本样式
  const airStyle = {
    ...commonStyles.brandText,
    color: COLORS.primary,
    fontSize: isMobile ? FONTS.titleMobile : FONTS.titleDesktop,
    textShadow: isMobile ? SHADOWS.none : SHADOWS.text,
  };

  // 副标题容器样式
  const subtitleContainerStyle = {
    ...commonStyles.textContainer,
    transition: 'opacity 0.8s 0.2s, transform 0.8s 0.2s',
    marginBottom: '20px',
  };

  // 副标题文本样式
  const subtitleStyle = {
    fontWeight: 'bold',
    fontSize: isMobile ? FONTS.subtitleMobile : FONTS.subtitleDesktop,
    letterSpacing: '0.05em',
    color: COLORS.text,
    padding: '4px 0',
    textShadow: isMobile ? SHADOWS.none : SHADOWS.subtitleText,
  };

  // 按钮容器样式
  const buttonContainerStyle = {
    ...commonStyles.textContainer,
    transition: 'opacity 0.8s 0.4s, transform 0.8s 0.4s',
    display: 'flex',
    alignItems: 'center',
  };

  // 按钮基础样式
  const buttonBaseStyle = {
    color: COLORS.black,
    border: 'none',
    padding: '14px 23px',
    borderRadius: '3px',
    cursor: 'pointer',
    fontSize: 'var(--font-size-base)',
    fontWeight: 'bold',
    transition: 'all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)',
    letterSpacing: '0.5px',
  };

  // 按钮样式
  const buttonStyle = {
    ...buttonBaseStyle,
    backgroundColor: COLORS.buttonPrimary,
  };

  // 按钮悬停样式
  const buttonHoverStyle = {
    ...buttonBaseStyle,
    backgroundColor: COLORS.buttonHover,
    opacity: 0.9,
  };

  // 移动版底部内容区域样式
  const mobileBottomSectionStyle = {
    width: '100%',
    padding: '30px 20px',
    backgroundColor: COLORS.background,
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    marginTop: '-1px',
  };

  // 移动版底部区域样式
  const mobileBottomContentStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    backgroundColor: COLORS.background,
  };

  // 移动版左侧文本区域样式
  const mobileLeftContentStyle = {
    flex: '1',
  };

  // 产品图片样式 (仅在移动设备显示)
  const productImageStyle = {
    height: '154px',
    width: '162px'
  };

  // 滚动箭头样式
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

  // 滚动处理函数
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