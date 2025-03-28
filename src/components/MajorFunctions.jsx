import React from 'react';
import '../fonts.css';

// 提取颜色和尺寸为常量，减少重复
const COLORS = {
  background: '#FCF8F3',
  primary: '#65A8FB',
  text: '#050505',
  white: '#fff',
  divider: '#e0e0e0'
};

const FONT_SIZES = {
  small: '16px',
  medium: '24px',
  large: '30px',
  xlarge: '44px'
};

const MajorFunctions = () => {
  // 功能数据保持不变
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
      mobileDescription: '不只是刻字，還能自訂喜愛照片'
    },
    {
      id: 4,
      title: '智能尋寵',
      description: '路人只需拍攝流浪寵物照片，AI 即可自動識別寵物身份',
      mobileDescription: '只需拍攝流浪寵物照片，AI 即可自動識別寵物身份'
    },
    {
      id: 5,
      title: '社交媒體尋寵',
      description: '連結 Facebook 及 Instagram 千人協尋群組，快速找回走失的寵物',
      mobileDescription: '連結千人協尋群組，快速找回走失的寵物'
    },
  ];

  // 提取公共样式，减少重复定义
  const styles = {
    // 通用样式
    section: {
      width: '100vw',
      backgroundColor: COLORS.background,
      padding: '2rem 1rem',
      boxSizing: 'border-box',
    },
    container: {
      maxWidth: '1400px',
      margin: '0 auto',
      boxSizing: 'border-box',
    },

    // 标题样式
    brandName: {
      fontWeight: 'bold',
      lineHeight: '1.1',
      margin: '0',
      color: '#000',
    },
    highlight: {
      color: COLORS.primary,
    },
    subTitle: {
      fontWeight: 'bold',
      lineHeight: '1.1',
      margin: '10px 0 0 0',
      color: '#000',
    },

    // 移动端样式
    mobileTitle: {
      fontSize: '30px',
    },
    mobileTitleCard: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      backgroundColor: COLORS.background,
    },

    // 功能卡片基础样式
    functionCard: {
      backgroundColor: COLORS.white,
      borderRadius: '10px',
      padding: '1.5rem', // 桌面端使用的默认内边距
      height: '100%',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
    },
    // 移动端卡片特殊样式
    mobileFunctionCard: {
      padding: '1em', // 移动端使用1em的内边距
    },
    functionTitle: {
      fontSize: FONT_SIZES.medium,
      fontWeight: 'bold',
      textAlign: 'center',
      color: COLORS.primary,
      marginBottom: '0.75rem',
    },
    functionDesc: {
      fontSize: FONT_SIZES.small,
      fontWeight: 'normal',
      color: COLORS.text,
      lineHeight: '1.4',
      margin: '0',
    },

    // 移动端网格
    mobileGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '10px'
    }
  };

  // 创建响应式CSS样式
  React.useEffect(() => {
    const styleId = 'ptag-responsive-styles';

    // 检查样式是否已存在，避免重复添加
    if (!document.getElementById(styleId)) {
      const styleTag = document.createElement('style');
      styleTag.id = styleId;
      styleTag.innerHTML = `
        /* 移动端样式 (默认) */
        .ptag-mobile-view {
          display: block;
        }
        .ptag-desktop-view {
          display: none;
        }
        
        /* 平板和桌面端样式 */
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
            padding-top: 60px;
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
            height: 120px;
            background-color: ${COLORS.divider};
            transform: translateY(-50%);
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
            color: ${COLORS.primary};
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
    }

    // 清理函数
    return () => {
      const existingStyle = document.getElementById(styleId);
      if (existingStyle) {
        document.head.removeChild(existingStyle);
      }
    };
  }, []);

  // 功能卡片组件
  const FunctionCard = ({ func, isMobile }) => (
    <div style={isMobile ? { ...styles.functionCard, ...styles.mobileFunctionCard } : styles.functionCard}>
      <h3 style={styles.functionTitle}>
        {func.id}. {func.title}
      </h3>
      <p style={styles.functionDesc}>
        {isMobile ? func.mobileDescription : func.description}
      </p>
    </div>
  );

  return (
    <section id="majorFunction" style={styles.section}>
      {/* 移动端视图 (卡片网格) */}
      <div className="ptag-mobile-view">
        <div style={styles.container}>
          <div style={styles.mobileGrid}>
            {/* 左侧标题区域 */}
            <div style={{ ...styles.functionCard, ...styles.mobileTitleCard, ...styles.mobileFunctionCard }}>
              <h2 style={{ ...styles.brandName, ...styles.mobileTitle }}>
                PTag <span style={styles.highlight}>Air</span>
              </h2>
              <h3 style={{ ...styles.subTitle, ...styles.mobileTitle, marginTop: '5px' }}>
                五大功能
              </h3>
            </div>

            {/* 功能卡片 */}
            {functions.map((func) => (
              <FunctionCard
                key={func.id}
                func={func}
                isMobile={true}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 桌面/平板视图 */}
      <div className="ptag-desktop-view">
        <div style={styles.container} className="ptag-desktop-container">
          {/* 标题部分 */}
          <div className="ptag-desktop-title">
            <h2 style={{ ...styles.brandName, fontSize: FONT_SIZES.xlarge }}>
              PTag <span style={styles.highlight}>Air</span>
            </h2>
            <h3 style={{ ...styles.subTitle, fontSize: FONT_SIZES.xlarge }}>
              五大功能
            </h3>
          </div>

          {/* 功能部分 */}
          <div className="ptag-desktop-functions">
            {functions.map((func, index) => {
              const needsVerticalDivider = index === 0 || index === 1 || index === 3;

              return (
                <div key={func.id} className="ptag-desktop-function">
                  <h3 style={{ fontSize: '2rem', color: COLORS.primary, marginBottom: '1rem', fontFamily: 'Helvetica', fontWeight: 'bold' }}>
                    {func.id}. {func.title}
                  </h3>
                  <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: COLORS.text, fontFamily: 'Helvetica', fontWeight: 'normal' }}>
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