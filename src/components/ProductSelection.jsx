// src/components/ProductSelection.jsx
import React from 'react';

const ProductSelection = () => {
  const products = [
    {
      id: 1,
      name: 'PTag',
      isAir: false,
      image: '/api/placeholder/200/200'
    },
    {
      id: 2,
      name: 'PTag',
      isAir: true,
      image: '/api/placeholder/200/200'
    }
  ];

  const sectionStyle = {
    padding: '60px 20px',
    backgroundColor: '#f9f9f9',
    textAlign: 'center',
  };

  const headingStyle = {
    marginBottom: '40px',
    fontSize: '28px',
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '50px',
    flexWrap: 'wrap',
  };

  const cardStyle = {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s',
    width: '250px',
  };

  const imageStyle = {
    width: '100%',
    height: 'auto',
    borderRadius: '50%',
    marginBottom: '20px',
  };

  const titleStyle = {
    marginBottom: '15px',
    fontSize: '20px',
  };

  const highlightStyle = {
    color: '#4a90e2',
  };

  const buttonStyle = {
    backgroundColor: '#4a90e2',
    color: 'white',
    border: 'none',
    padding: '8px 15px',
    borderRadius: '20px',
    cursor: 'pointer',
    fontSize: '14px',
  };

  return (
    <section style={sectionStyle}>
      <h2 style={headingStyle}>選擇不同 PTag</h2>
      
      <div style={containerStyle}>
        {products.map((product) => (
          <div 
            key={product.id} 
            style={cardStyle}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-10px)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <img 
              src={product.image} 
              alt={`PTag ${product.isAir ? 'Air' : '标准版'}`} 
              style={imageStyle} 
            />
            <h3 style={titleStyle}>
              {product.name} {product.isAir && 
                <span style={highlightStyle}>Air</span>}
            </h3>
            {!product.isAir && 
              <button style={buttonStyle}>了解更多</button>}
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductSelection;