import React, { useState, useEffect } from 'react';

const AiSection = () => {
  const [isVisible, setIsVisible] = useState(false);

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

  const sectionStyle = {
    width: '100vw',
    marginLeft: 'calc(-50vw + 50%)', // 确保宽度占满
    padding: '40px 0',
    backgroundColor: '#FBF7F4',
    overflow: 'hidden',
  };

  const containerStyle = {
    width: '100%',
    maxWidth: '1400px',
    margin: '0 auto',
    overflow: 'hidden',
    borderRadius: '16px',
    position: 'relative',
    opacity: isVisible ? 1 : 0.8,
    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
    transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
  };

  const imageContainerStyle = {
    width: '100%',
    height: '600px',
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '16px',
  };

  const imageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center',
    borderRadius: '16px',
  };

  const contentOverlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0) 100%)',
    borderRadius: '16px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '0 5%',
  };

  const titleStyle = {
    fontSize: '40px',
    fontWeight: 'bold',
    color: 'white',
    marginBottom: '30px',
    fontFamily: 'Helvetica, Arial, sans-serif',
    maxWidth: '600px',
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(-20px)',
    transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
    textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
  };

  const paragraphContainerStyle = {
    maxWidth: '550px',
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
    transition: 'opacity 0.8s ease-out 0.2s, transform 0.8s ease-out 0.2s',
  };

  const paragraphStyle = {
    fontSize: '16px',
    lineHeight: 1.7,
    color: 'white',
    marginBottom: '20px',
    fontFamily: 'Helvetica, Arial, sans-serif',
    textShadow: '0 1px 2px rgba(0, 0, 0, 0.4)',
  };

  const disclaimerStyle = {
    fontSize: '13px',
    color: 'rgba(255, 255, 255, 0.8)',
    fontStyle: 'italic',
    marginTop: '30px',
    fontFamily: 'Helvetica, Arial, sans-serif',
    maxWidth: '550px',
    opacity: isVisible ? 1 : 0,
    transition: 'opacity 0.8s ease-out 0.5s',
  };

  return (
    <section id="ai-section" style={sectionStyle}>
      <div style={containerStyle}>
        <div style={imageContainerStyle}>
          <img
            src="/cat.png"
            alt="貓眼睛特寫"
            style={imageStyle}
          />
          <div style={contentOverlayStyle}>
            <h2 style={titleStyle}>為何有 AI 眼疾篩查？</h2>
            <div style={paragraphContainerStyle}>
              <p style={paragraphStyle}>
                寵物很多時候無法表達身體不適，但牠們會透過一些細微的徵狀或疾病先兆來反映。
                然而，大部分主人難以察覺，結果導致一些原本可以預防的疾病發生。
              </p>
              <p style={paragraphStyle}>
                眼疾便是其中一種常見的寵物病。PTag 的 AI 眼疾篩查技術，只需手機拍攝，
                即可評估健康風險發現問題，減少醫療費用，提供貼心護理。
              </p>
              <p style={disclaimerStyle}>
                *此健康篩查及建議僅供參考，無法替代專業獸醫意見。請諮詢您的主診獸醫*
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AiSection;