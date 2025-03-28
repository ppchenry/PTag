import React from 'react';
import '../fonts.css'; 



const MajorFunctions = () => {
  const functions = [
    {
      id: 1,
      title: '輕巧如羽',
      description: '耐用塑膠材質僅重 3 克，舒適貼合，免除氧化困擾',
      mobileDescription: '耐用塑膠材質僅重 3 克，舒適貼合，免除氧化困擾',
    },
    {
      id: 2,
      title: '定位功能',
      description: '掃描 PTag 上的 QR Code，即時提供寵物位置及資料',
      mobileDescription: '掃描QR Code，即時提供寵物位置及資料'
    },
    {
      id: 3,
      title: '自訂照片',
      description: '不只是刻字，PTag 還能自訂喜愛照片',
      mobileDescription:'不只是刻字，還能自訂喜愛照片'
    },
    {
      id: 4,
      title: '智能尋寵',
      description: '路人只需拍攝流浪寵物照片，AI 即可自動識別寵物身份',
      mobileDescription:'只需拍攝流浪寵物照片，AI 即可自動識別寵物身份'
    },
    {
      id: 5,
      title: '社交媒體尋寵',
      description: '連結 Facebook 及 Instagram 千人協尋群組，快速找回走失的寵物',
      mobileDescription:'連結千人協尋群組，快速找回走失的寵物'
    },
    
  ];

  // Base styles
  const styles = {
    section: {
      width: '100vw',
      backgroundColor: '#FCF8F3',
      padding: '2rem 1rem',
      boxSizing: 'border-box',
    },
    container: {
      maxWidth: '1400px',
      margin: '0 auto',
      boxSizing: 'border-box',
    },
    titleContainer: {
      marginBottom: '2rem',
      textAlign: 'left',
    },
    brandName: {
      fontSize: '44px',
      fontWeight: 'bold',
      lineHeight: '1.1',
      fontFamily: '"Helvetica", sans-serif',
      margin: '0',
      color: '#000',
    },
    highlight: {
      color: '#65A8FB',
    },
    subTitle: {
      fontSize: '44px',
      fontWeight: 'bold',
      lineHeight: '1.1',
      fontFamily: '"Helvetica", sans-serif',
      margin: '10px 0 0 0',
      color: '#000',
    },
    // Mobile layout (default)
    functionsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '10px',
      width: '100%',
    },
    functionCard: {
      backgroundColor: '#fff',
      borderRadius: '10px',
      padding: '1.5rem',
      height: '100%',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
    },
    functionTitle: {
      fontFamily: '"Helvetica", sans-serif',
      fontSize: '25px',
      fontWeight: 'bold',
      textAlign:'center',
      color: '#65A8FB',
      marginBottom: '0.75rem',
      
    },
    functionDesc: {
      fontSize: '18px',
      fontWeight: 'normal',
      color: '#050505',
      
      lineHeight: '1.4',
      fontFamily: '"Helvetica", sans-serif',
      margin: '0',
    }
  };

  // Create a style tag with responsive CSS
  React.useEffect(() => {
    const styleTag = document.createElement('style');
    styleTag.innerHTML = `
      /* Mobile layout (default) */
      .ptag-mobile-view {
        display: block;
      }
      .ptag-desktop-view {
        display: none;
      }
      
      /* Tablet and Desktop layout */
      @media (min-width: 768px) {
        .ptag-mobile-view {
          display: none;
        }
        .ptag-desktop-view {
          display: block;
        }
        
        .ptag-desktop-container {
          display: flex;
          flex-direction: row;
          align-items: flex-start;
        }
        
        .ptag-desktop-title {
          width: 20%;
          padding-right: 40px;
          padding-top: 60px; /* 增加顶部间距，使标题更往下移动 */
        }
        
        .ptag-desktop-functions {
          width: 80%;
          display: flex;
          flex-wrap: wrap;
        }
        
        .ptag-desktop-function {
          width: calc(33.33% - 1px);
          box-sizing: border-box;
          padding: 20px 10px;
          position: relative;
        }
        
        .ptag-vertical-divider {
          position: absolute;
          top: 50%;
          right: 0;
          width: 1px;
          height: 120px; /* 设置竖线高度为120px */
          background-color: #e0e0e0;
          transform: translateY(-50%); /* 使竖线垂直居中 */
        }
        
        .ptag-desktop-title h2 {
          font-size: 3.5rem;
        }
        
        .ptag-desktop-title h3 {
          font-size: 3.5rem;
        }
        
        .ptag-desktop-function h3 {
          font-size: 2rem;
          margin-bottom: 1rem;
          color: #65A8FB;
        }
        
        .ptag-desktop-function p {
          font-size: 1.1rem;
          line-height: 1.6;
        }
      }
      
      @media (min-width: 1024px) {
        .ptag-desktop-function {
          padding: 20px 10px;
        }
      }
    `;
    document.head.appendChild(styleTag);

    return () => {
      document.head.removeChild(styleTag);
    };
  }, []);

  return (
    <section id="majorFunction" style={styles.section}>
      {/* Mobile View (Card Grid) */}
      
      <div className="ptag-mobile-view">
        <div style={styles.container}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
            {/* 左侧标题区域 */}
            <div style={{ ...styles.functionCard, display: 'flex', flexDirection: 'column', justifyContent: 'center', backgroundColor: '#FCF8F3', }}>
              <h2 style={{ ...styles.brandName, fontSize: '30px' }}>
                PTag <span style={styles.highlight}>Air</span>
              </h2>
              <h3 style={{ ...styles.subTitle, fontSize: '30px', marginTop: '5px' }}>
                五大功能
              </h3>
            </div>

            {/* 右侧第一个功能 */}
            <div style={styles.functionCard}>
              <h3 style={styles.functionTitle}>
                {functions[0].id}. {functions[0].title}
              </h3>
              <p style={styles.functionDesc}>
                {functions[0].mobileDescription}
              </p>
            </div>

            {/* 其余功能 */}
            {functions.slice(1).map((func) => (
              <div key={func.id} style={styles.functionCard}>
                <h3 style={styles.functionTitle}>
                  {func.id}. {func.title}
                </h3>
                <p style={styles.functionDesc}>
                  {func.mobileDescription}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop/Tablet View (Horizontal Layout) */}
      <div className="ptag-desktop-view">
        <div style={styles.container} className="ptag-desktop-container">
          {/* Title section */}
          <div className="ptag-desktop-title">
            <h2 style={styles.brandName}>
              PTag <span style={styles.highlight}>Air</span>
            </h2>
            <h3 style={styles.subTitle}>
              五大功能
            </h3>
          </div>

          {/* Functions section */}
          <div className="ptag-desktop-functions">
            {functions.map((func, index) => {
             
              const needsVerticalDivider = index === 0 || index === 1 || index === 3;

              return (
                <div key={func.id} className="ptag-desktop-function">
                  <h3 style={{ fontSize: '2rem', color: '#65A8FB', marginBottom: '1rem', fontFamily: 'Helvetica', fontWeight: 'bold' }}>
                    {func.id}. {func.title}
                  </h3>
                  <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: '#050505', fontFamily: 'Helvetica', fontWeight: 'normal' }}>
                    {func.description}
                  </p>

                  {/* 条件性显示垂直分隔线 */}
                  {needsVerticalDivider && <div className="ptag-vertical-divider"></div>}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MajorFunctions;