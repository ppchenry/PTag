// src/components/Partnership.jsx
import React from 'react';

const Partnership = () => {
  const sectionStyle = {
    padding: '60px 20px',
    textAlign: 'center',
    backgroundColor: 'white',
  };

  const headingStyle = {
    marginBottom: '20px',
    fontSize: '24px',
  };

  const paragraphStyle = {
    fontSize: '14px',
    color: '#666',
    marginBottom: '10px',
  };

  return (
    <section style={sectionStyle}>
      <h2 style={headingStyle}>愛護動物協會 X 寵物仔仔 聯乘系列</h2>
      <p style={paragraphStyle}>各宠物协会推广使用，专为宠物安全考虑</p>
      <p style={paragraphStyle}>每售出一个PTag LOCATE PET TAG，将会有金额回馈至动物协会</p>
    </section>
  );
};

export default Partnership;