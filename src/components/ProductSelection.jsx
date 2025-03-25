
import React, { useState } from 'react';

const ProductSelection = () => {
  const [hoveredId, setHoveredId] = useState(null);

  const products = [
    {
      id: 1,
      name: 'PTag',
      subTitle: '金屬材質',
      isAir: false,
      image: '/product/metal.png'
    },
    {
      id: 2,
      name: 'PTag Air',
      subTitle: '塑膠材質',
      isAir: true,
      image: '/product/plastic.png'
    }
  ];

  // 基础样式
  const styles = {
    section: {
      width: '100%',
      padding: '60px 20px',
      textAlign: 'center',
      backgroundColor: '#ffffff'
    },
    heading: {
      fontSize: '28px',
      fontWeight: 'bold',
      marginBottom: '30px',
      color: '#000'
    },
    button: {
      backgroundColor: '#ffc107',
      color: '#000',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '20px',
      fontSize: '16px',
      fontWeight: '500',
      cursor: 'pointer',
      marginBottom: '40px',
      transition: 'background-color 0.3s'
    },
    productContainer: {
      display: 'flex',
      justifyContent: 'center',
      gap: '80px',
      flexWrap: 'wrap',
      maxWidth: '1200px',
      margin: '0 auto'
    },
    productCard: (isHovered) => ({
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '250px',
      transition: 'transform 0.3s ease',
      transform: isHovered ? 'translateY(-5px)' : 'translateY(0)'
    }),
    imageContainer: (isHovered) => ({
      width: '200px',
      height: '200px',
      marginBottom: '25px',
      borderRadius: '50%',
      overflow: 'hidden',
      boxShadow: isHovered
        ? '0 8px 20px rgba(0, 0, 0, 0.15)'
        : '0 4px 12px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s ease',
      transform: isHovered ? 'scale(1.05)' : 'scale(1)'
    }),
    image: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    },
    title: {
      fontSize: '22px',
      fontWeight: 'bold',
      marginBottom: '8px',
      color: '#000'
    },
    subtitle: {
      fontSize: '16px',
      color: '#666',
      marginTop: '0'
    },
    highlight: {
      color: '#4a90e2'
    }
  };

  return (
    <section style={styles.section}>
      <h2 style={styles.heading}>選擇不同 PTag</h2>

      <button
        style={styles.button}
        onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#e6ad06' }}
        onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#ffc107' }}
      >
        進一步了解 &gt;
      </button>

      <div style={styles.productContainer}>
        {products.map((product) => (
          <div
            key={product.id}
            style={styles.productCard(hoveredId === product.id)}
            onMouseOver={() => setHoveredId(product.id)}
            onMouseOut={() => setHoveredId(null)}
          >
            <div style={styles.imageContainer(hoveredId === product.id)}>
              <img
                src={product.image}
                alt={`${product.name} 图片`}
                style={styles.image}
              />
            </div>

            <h3 style={styles.title}>
              {product.isAir ? (
                <>
                  PTag <span style={styles.highlight}>Air</span>
                </>
              ) : (
                product.name
              )}
            </h3>
            <p style={styles.subtitle}>{product.subTitle}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductSelection;