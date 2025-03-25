import React, { useState, useEffect, useRef } from 'react';
import { throttle } from 'lodash';

const HeroSection = () => {
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const requestRef = useRef(null);
  const previousTimeRef = useRef(null);
  const targetScrollRef = useRef(0);

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
    }, 200); // 窗口调整不需要太频繁的更新

    // 使用 throttle 限制滚动处理的频率
    const handleScroll = throttle(() => {
      
      targetScrollRef.current = window.scrollY;
    }, 16); 

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll, { passive: true });

    // 启动动画帧循环
    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      handleResize.cancel(); 
      handleScroll.cancel(); // 取消任何待处理的节流调用
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  
  const heroContainerStyle = {
    width: '100vw',
    height: '1080px', 
    position: 'relative',
    overflow: 'hidden',
    marginTop: '-77px',
    paddingTop: '77px',
    marginLeft: 'calc(-50vw + 50%)',
    boxSizing: 'border-box',
  };

  // 修改 heroImageStyle - 增加will-change提高性能
  const heroImageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center 15%',
    display: 'block',
    transform: `translate3d(0, 0, 0) scale(${1 + scrollPosition * 0.0003})`, // 使用translate3d触发GPU加速
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

  // 创建一个容器来包含所有文字和按钮，实现左对齐排版
  const textGroupStyle = {
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
    color: 'white',
    marginRight: '10px',
    fontFamily: 'Helvetica',
    fontSize: '80px',
    fontWeight: 'bold',
    lineHeight: 1,
    textShadow: '0 2px 4px rgba(0,0,0,0.3)', 
  };

  const airStyle = {
    color: '#4a90e2',
    fontFamily: 'Helvetica',
    fontSize: '80px',
    fontWeight: 'bold',
    lineHeight: 1,
    textShadow: '0 2px 4px rgba(0,0,0,0.2)', 
  };

  const subtitleContainerStyle = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(20px)', 
    transition: 'opacity 0.8s 0.2s, transform 0.8s 0.2s', 
    marginBottom: '30px',
  };

  const subtitleStyle = {
    fontFamily: 'Helvetica',
    fontWeight: 700,
    fontSize: '36px',
    letterSpacing: '0.05em',
    color: '#333',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: '4px 12px',
    borderRadius: '4px',
    textShadow: '0 1px 2px rgba(255, 255, 255, 0.5)',
  };

  const buttonContainerStyle = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
    transition: 'opacity 0.8s 0.4s, transform 0.8s 0.4s', 
  };

  const buttonStyle = {
    backgroundColor: '#4a90e2',
    color: 'white',
    border: 'none',
    padding: '14px 34px', 
    borderRadius: '25px',
    cursor: 'pointer',
    fontSize: '18px',
    fontWeight: '600',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.25)',
    transition: 'all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)',
    letterSpacing: '0.5px',
  };

  const buttonHoverStyle = {
    ...buttonStyle,
    backgroundColor: '#3a80d2',
    boxShadow: '0 6px 16px rgba(0, 0, 0, 0.35)',
    transform: 'translateY(-2px) scale(1.02)', 
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

      <section style={heroContainerStyle}>
        <img
          src="/hero.png"
          alt="拉布拉多犬佩戴PTag Air"
          style={heroImageStyle}
          loading="eager" // 优先加载图片
        />
        <div style={overlayStyle}></div>
        <div style={contentWrapperStyle}>
          <div style={innerContainerStyle}>
            {/* 使用新的文字组容器，实现左对齐排版 */}
            <div style={textGroupStyle}>
              <div style={titleContainerStyle}>
                <span style={ptagStyle}>PTag</span>
                <span style={airStyle}>Air</span>
              </div>

              <div style={subtitleContainerStyle}>
                <div style={subtitleStyle}>
                  輕巧設計 全面守護
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
    </>
  );
};

export default HeroSection;