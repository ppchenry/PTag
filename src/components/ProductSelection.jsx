import React, { useState, useEffect } from 'react';
import '../fonts.css';

const ProductSelection = () => {
  const [hoveredId, setHoveredId] = useState(null);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);

  // 添加窗口大小监听
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 检查是否为移动设备
  const isMobile = windowWidth <= 767;

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
      fontFamily: 'Helvetica',
      fontSize: isMobile ? '26px':'44px',
      fontWeight: 'bold',
      marginBottom: '30px',
      color: '#000'
    },
    button: {
      fontFamily: 'Helvetica',
      backgroundColor: '#FFB60C',
      color: '#000',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '3px',
      fontSize: isMobile ? '15px':'16px',
      fontWeight: 'bold',
      cursor: 'pointer',
      marginBottom: '40px',
      transition: 'background-color 0.3s'
    },
    productContainer: {
      display: 'flex',
      justifyContent: 'center',
      gap: isMobile ? '20px' : '4%', // 移动端减少间距
      flexWrap: 'nowrap',
      maxWidth: '1200px',
      margin: '0 auto'
    },
    productCard: (isHovered) => ({
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: isMobile ? '48%' : '250px', // 移动端减小宽度
      transition: 'transform 0.3s ease',
      transform: isHovered ? 'translateY(-5px)' : 'translateY(0)'
    }),
    imageContainer: (isHovered) => ({
      width: isMobile ? '150px' : '200px', // 移动端使用更小的尺寸
      height: isMobile ? '150px' : '200px', // 同上
      marginBottom: isMobile ? '15px' : '25px', // 减少移动端的底部边距
      aspectRatio: '1 / 1',
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
      fontFamily: 'Helvetica',
      fontSize: isMobile ? '20px' : '34px', // 移动端使用固定更小的字体
      fontWeight: 'bold',
      marginBottom: '8px',
      color: '#000'
    },
    subtitle: {
      fontFamily: 'Helvetica',
      fontSize: isMobile ? '16px' : '21px', // 移动端使用固定更小的字体
      color: '#050505',
      fontWeight: '400',
      marginTop: '0'
    },
    highlight: {
      color: '#65A8FB'
    }
  };

  return (
    <section style={styles.section}>
      <h2 style={styles.heading}>選擇不同 PTag</h2>

      <button
        style={styles.button}
        onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#e6ad06' }}
        onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#FFB60C' }}
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