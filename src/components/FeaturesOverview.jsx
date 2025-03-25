import React, { useState } from 'react';

const FeaturesOverview = () => {
  const features = [
    {
      icon: '/icons/icon1.png',
      title: '僅重 3 克,輕巧如羽',
      description: '是一般寵物牌的五分之一'
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
    width: '100vw',
    marginLeft: 'calc(-50vw + 50%)',
    padding: '60px 0',
    backgroundColor: '#FBF7F4',
    position: 'relative',
  };

  const titleContainerStyle = {
    textAlign: 'center',
    marginBottom: '50px',
  };

  const titleStyle = {
    fontSize: '46px',
    fontWeight: 'bold',
    margin: '0',
    padding: '0',
    lineHeight: '1.1',
  };

  const airStyle = {
    color: '#4a90e2',
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
  };

  const featureItemStyle = (index) => ({
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    textAlign: 'left',
    padding: '0 20px',
    position: 'relative',
    transition: 'transform 0.3s ease',
    transform: hoveredIndex === index ? 'translateY(-5px)' : 'translateY(0)',
  });

  const iconStyle = {
    width: '70px',
    height: '70px',
    marginBottom: '15px',
  };

  const featureTitleStyle = {
    fontSize: '18px',
    fontWeight: '700',
    color: '#333',
    marginBottom: '8px',
    lineHeight: '1.4',
  };

  const descriptionStyle = {
    fontSize: '16px',
    color: '#666',
    lineHeight: '1.5',
    marginTop: '0',
  };

  const dividerStyle = {
    position: 'absolute',
    top: '10%',
    right: '0',
    height: '80%',
    width: '1px',
    backgroundColor: '#E0E0E0',
  };

  return (
    <section style={sectionStyle}>
      <div style={titleContainerStyle}>
        <h2 style={titleStyle}>
          PTag <span style={airStyle}>Air</span>
        </h2>
      </div>

      <div style={containerStyle}>
        {features.map((feature, index) => (
          <div
            key={index}
            style={featureItemStyle(index)}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <img
              src={feature.icon}
              alt={feature.title}
              style={iconStyle}
            />
            <h3 style={featureTitleStyle}>{feature.title}</h3>
            <p style={descriptionStyle}>{feature.description}</p>

            {index < features.length - 1 && (
              <div style={dividerStyle}></div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesOverview;