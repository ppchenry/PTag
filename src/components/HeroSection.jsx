import React, { useState, useEffect } from 'react';

const HeroSection = () => {
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
  const [scrollPosition, setScrollPosition] = useState(0);
  
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const heroContainerStyle = {
    width: '100vw',
    marginLeft: 'calc(-50vw + 50%)',
    position: 'relative',
    overflow: 'hidden',
    height: '100vh',
    marginTop: '-77px',
    paddingTop: '77px',
  };
  
  const heroImageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
    transform: `scale(${1 + scrollPosition * 0.0003})`, // Subtle zoom effect on scroll
    transition: 'transform 0.2s ease-out',
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
  };
  
  const innerContainerStyle = {
    maxWidth: '1440px',
    width: '100%',
    height: '100%',
    position: 'relative',
  };
  
  const productTitleStyle = {
    position: 'absolute',
    top: '32%',
    right: '10%',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    transform: `translateY(${-scrollPosition * 0.2}px)`, // Move up faster when scrolling
    opacity: 1 - scrollPosition * 0.003, // Fade out when scrolling
    transition: 'transform 0.2s ease-out, opacity 0.2s ease-out',
  };
  
  const ptagStyle = {
    color: 'white',
    marginRight: '10px',
    fontFamily: 'Helvetica',
    fontSize: '80px',
    fontWeight: 'bold',
  };
  
  const airStyle = {
    color: '#4a90e2',
    fontFamily: 'Helvetica',
    fontSize: '80px',
    fontWeight: 'bold',
  };
  
  const subtitleStyle = {
    position: 'absolute',
    top: '42%',
    right: '10%',
    display: 'flex',
    flexDirection: 'row', // Changed to row to display text on the same line
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Helvetica',
    fontWeight: 700,
    fontSize: '36px',
    letterSpacing: '0.05em',
    color: 'black',
    transform: `translateY(${-scrollPosition * 0.15}px)`, // Move up when scrolling
    opacity: 1 - scrollPosition * 0.003, // Fade out when scrolling
    transition: 'transform 0.2s ease-out, opacity 0.2s ease-out',
  };
  
  const buttonStyle = {
    position: 'absolute',
    top: '55%',
    right: '10%',
    transform: `translateY(${-scrollPosition * 0.1}px)`, // Move up slower when scrolling
    backgroundColor: '#4a90e2',
    color: 'white',
    border: 'none',
    padding: '12px 30px',
    borderRadius: '25px',
    cursor: 'pointer',
    fontSize: '18px',
    fontWeight: '500',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    opacity: 1 - scrollPosition * 0.003, // Fade out when scrolling
    transition: 'transform 0.2s ease-out, opacity 0.2s ease-out',
  };
  
  const scrollArrowStyle = {
    position: 'absolute',
    bottom: '40px',
    left: '50%',
    transform: `translateX(-50%) translateY(${scrollPosition > 50 ? '20px' : '0px'})`,
    cursor: 'pointer',
    opacity: scrollPosition > 100 ? 0 : 1 - scrollPosition * 0.01,
    transition: 'transform 0.3s ease-in-out, opacity 0.3s ease-in-out',
    animation: 'bounce 2s infinite',
  };

  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };
  
  return (
    <section style={heroContainerStyle}>
      <img
        src="/hero.png"
        alt="拉布拉多犬佩戴PTag Air"
        style={heroImageStyle}
      />
      <div style={contentWrapperStyle}>
        <div style={innerContainerStyle}>
          <div style={productTitleStyle}>
            <span style={ptagStyle}>PTag</span>
            <span style={airStyle}>Air</span>
          </div>
          <div style={subtitleStyle}>
            <span>輕巧設計 全面守護</span>
          </div>
          <button style={buttonStyle}>立即購買</button>
          
          <div 
            style={scrollArrowStyle} 
            onClick={handleScrollDown}
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 10L12 15L17 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
      
      <style jsx>{`
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
    </section>
  );
};

export default HeroSection;