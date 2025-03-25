
import React from 'react';

const Partnership = () => {
  const sectionStyle = {
    padding: '60px 20px',
    textAlign: 'center',
    backgroundColor: '#FCF8F3',
    width: '100vw',
    height:'698px',
    marginLeft: 'calc(-50vw + 50%)', 
    boxSizing: 'border-box',
  };

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
  };

  const headingStyle = {
    marginBottom: '30px',
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#000',
  };

  const paragraphStyle = {
    fontSize: '16px',
    color: '#333',
    marginBottom: '20px',
    lineHeight: '1.6',
    maxWidth: '800px',
    margin: '0 auto 20px',
  };

  const partnerImageStyle = {
    maxWidth: '100%',
    height: 'auto',
    margin: '40px auto 0',
    
  };

  return (
    <section style={sectionStyle}>
      <div style={containerStyle}>
        <h2 style={headingStyle}>愛護動物協會 X 寵物仔仔 聯乘系列</h2>

        <p style={paragraphStyle}>
          今次與愛協合作，推出愛協會員PTAG優惠，
          旨希望更多人使用"PTAG LOCATE PET TAG"，從而改善香港走失寵物既情況
        </p>

        <img
          src="/partner.png"
          alt="愛護動物協會 X PTag Pet Boys Club"
          style={partnerImageStyle}
        />
      </div>
    </section>
  );
};

export default Partnership;