import React, { useState, useEffect } from 'react';

const AiSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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

  // 监测鼠标移动，实现视差效果
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const sectionStyle = {
    padding: '0',
    maxWidth: '100%',
    overflow: 'hidden',
    backgroundColor: '#FBF7F4',
  };
  
  const containerStyle = {
    position: 'relative',
    width: '100%',
    maxWidth: '1919px',
    margin: '0 auto',
    borderRadius: '24px',
    height: '698.3px',
    overflow: 'hidden',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease-out, box-shadow 0.3s ease-out',
    transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
  };
  
  const imageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '24px',
    position: 'absolute',
    top: 0,
    left: 0,
    transition: 'transform 0.5s ease-out',
    transform: `scale(1.05) translate(${mousePosition.x * -15}px, ${mousePosition.y * -15}px)`,
    filter: isVisible ? 'brightness(1)' : 'brightness(0.8)',
  };
  
  const contentStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    padding: '120px 120px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    zIndex: 1,
  };
  
  const titleStyle = {
    fontSize: '54px',
    fontWeight: 'bold',
    color: 'white',
    marginBottom: '40px',
    fontFamily: 'Helvetica, Arial, sans-serif',
    letterSpacing: '-0.5px',
    maxWidth: '50%',
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateX(0)' : 'translateX(-50px)',
    transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
    textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
  };
  
  const textStyle = {
    fontSize: '18px',
    lineHeight: 1.8,
    color: 'white',
    maxWidth: '47%',
    fontFamily: 'Helvetica, Arial, sans-serif',
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateX(0)' : 'translateX(-30px)',
    transition: 'opacity 0.8s ease-out 0.2s, transform 0.8s ease-out 0.2s',
    textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
  };
  
  const disclaimerStyle = {
    fontSize: '14px',
    color: 'white',
    opacity: isVisible ? 0.7 : 0,
    marginTop: '30px',
    fontStyle: 'italic',
    fontFamily: 'Helvetica, Arial, sans-serif',
    transition: 'opacity 0.8s ease-out 0.4s',
  };

  // 为猫眼添加轻微闪光效果
  const eyeGlowStyle = {
    position: 'absolute',
    top: '37%',
    right: '28%',
    width: '80px',
    height: '40px',
    background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 70%)',
    borderRadius: '50%',
    filter: 'blur(5px)',
    opacity: 0.7,
    animation: 'eyeGlow 3s infinite alternate',
  };

  // 第二只眼睛
  const eyeGlowStyle2 = {
    ...eyeGlowStyle,
    top: '37%',
    right: '43%',
  };

  return (
    <section id="ai-section" style={sectionStyle}>
      <div style={containerStyle} 
           onMouseEnter={() => document.body.style.cursor = 'pointer'}
           onMouseLeave={() => document.body.style.cursor = 'default'}>
        <img 
          src="/cat.png" 
          alt="貓眼睛特寫" 
          style={imageStyle} 
        />
        <div style={eyeGlowStyle}></div>
        <div style={eyeGlowStyle2}></div>
        <div style={contentStyle}>
          <h2 style={titleStyle}>為何有 AI 眼疾篩查？</h2>
          <div style={textStyle}>
            <p style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.8s ease-out 0.3s, transform 0.8s ease-out 0.3s',
            }}>
              寵物很多時候無法表達身體不適，但牠們會透過一些細微的徵狀或疾病先兆來反映。
              然而，大部分主人難以察覺，結果導致一些原本可以預防的疾病發生。
            </p>
            <p style={{
              marginTop: '20px',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.8s ease-out 0.5s, transform 0.8s ease-out 0.5s',
            }}>
              眼疾便是其中一種常見的寵物病。PTag 的 AI 眼疾篩查技術，只需手機拍攝，
              即可評估健康風險發現問題，減少醫療費用，提供貼心護理。
            </p>
            <p style={disclaimerStyle}>
              *此健康篩查及建議僅供參考，無法替代專業獸醫意見。請諮詢您的主診獸醫*
            </p>
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes eyeGlow {
          0% { opacity: 0.5; }
          50% { opacity: 0.7; }
          100% { opacity: 0.9; }
        }
      `}</style>
    </section>
  );
};

export default AiSection;