import React, { useState } from 'react';

const FeaturesOverview = () => {
  const features = [
    {
      icon: '/icons/icon1.png',
      title: '僅重 3 克',
      description: '輕巧如羽，是一般寵物牌的五分之一'
    },
    {
      icon: '/icons/icon2.png',
      title: '舒適貼合',
      description: '耐用塑膠材質，免除氧化困擾'
    },
    {
      icon: '/icons/icon3.png',
      title: '內建 QR Code 及寵物照片',
      description: '走失即時定位'
    },
    {
      icon: '/icons/icon4.png',
      title: '更搭載 PHealth 智慧眼疾篩查',
      description: '輕鬆守護愛寵健康'
    }
  ];
  
  // State to track which feature is being hovered
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const sectionStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '40px 20px',
    backgroundColor: '#FBF7F4',
    width: '100%',
    height: '402px',
    textAlign: 'center'
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    maxWidth: '1200px'
  };

  const featureItemStyle = (index) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    flex: '1',
    padding: '0 15px',
    position: 'relative',
    transition: 'transform 0.3s ease',
    transform: hoveredIndex === index ? 'translateY(-5px)' : 'translateY(0)',
    cursor: 'pointer'
  });

  const iconContainerStyle = (index) => ({
    width: '100px', // Increased size
    height: '100px', // Increased size
    backgroundColor: '#F1E7D4',
    borderRadius: '16px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '20px',
    transition: 'all 0.3s ease',
    boxShadow: hoveredIndex === index ? '0 10px 20px rgba(0, 0, 0, 0.1)' : 'none',
    transform: hoveredIndex === index ? 'scale(1.05)' : 'scale(1)'
  });

  const iconStyle = {
    width: '50px', // Increased size
    height: '50px', // Increased size
    transition: 'transform 0.3s ease'
  };

  const titleStyle = (index) => ({
    fontSize: '16px',
    fontWeight: hoveredIndex === index ? 'bold' : 'normal',
    marginBottom: '10px',
    color: '#333',
    lineHeight: '1.4',
    transition: 'color 0.3s ease, font-weight 0.3s ease',
    color: hoveredIndex === index ? '#000' : '#333'
  });

  const descStyle = {
    fontSize: '14px',
    color: '#666',
    lineHeight: '1.4'
  };

  const headerStyle = {
    position: 'absolute',
    top: '20px',
    textAlign: 'center',
    width: '100%'
  };

  const logoStyle = {
    fontSize: '48px',
    fontWeight: 'bold'
  };

  const dividerStyle = {
    position: 'absolute',
    right: '0',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '3px',
    height: '100px',
    backgroundColor: '#F1E7D4',
    borderRadius: '1.5px'
  };

  return (
    <div style={{ width: '100%', position: 'relative' }}>
      <div style={headerStyle}>
        <div style={logoStyle}>
          <span style={{ color: '#000' }}>PTag</span> 
          <span style={{ color: '#4f9de8' }}>Air</span>
        </div>
      </div>
      
      <div style={sectionStyle}>
        <div style={containerStyle}>
          {features.map((feature, index) => (
            <div 
              key={index} 
              style={featureItemStyle(index)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div style={iconContainerStyle(index)}>
                <img 
                  src={feature.icon} 
                  alt={feature.title} 
                  style={iconStyle} 
                />
              </div>
              <div style={titleStyle(index)}>{feature.title}</div>
              <div style={descStyle}>{feature.description}</div>
              {index < features.length - 1 && <div style={dividerStyle}></div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesOverview;