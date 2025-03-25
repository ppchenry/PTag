import React from 'react';

const MajorFunctions = () => {
  const functions = [
    {
      id: 1,
      title: '輕巧設計',
      description: 'PTag Air 僅重約 3 克，讓您的愛寵自在活動'
    },
    {
      id: 2,
      title: '定位功能',
      description: '寵物走失掃描PTag上的QR Code，即時提供寵物位置及資料'
    },
    {
      id: 3,
      title: '自訂照片',
      description: '不只是刻字，PTag 還能刻上您喜愛的照片'
    },
    {
      id: 4,
      title: '智慧健康管理',
      description: '三步驟輕鬆註冊全面記錄寵物資料，掃描 QR Code即時查看健康狀況及聯絡方法'
    },
    {
      id: 5,
      title: '社交媒體尋寵',
      description: '連結 Facebook 及 Instagram 千人協尋群組，即時傳遞訊息，幫你快啲搵返愛寵'
    }
  ];

  const sectionStyle = {
    width: '100vw',
    backgroundColor: '#FCF8F3',
    height: '548px',
    display: 'flex',
    marginLeft: 'calc(-50vw + 50%)',
    boxSizing: 'border-box',
  };

  const contentContainerStyle = {
    maxWidth: '1400px',
    width: '100%',
    margin: '0 auto',
    padding: '40px 40px',
    display: 'flex',
    height: '100%',
  };

  const titleColumnStyle = {
    width: '18%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingTop: '20px',
    paddingRight: '30px',
  };

  const mainTitleStyle = {
    fontSize: '46px',
    fontWeight: '800',
    lineHeight: '1.1',
    fontFamily: 'Helvetica, Arial, sans-serif',
    margin: '0 0 0 0',
    color: '#000',
  };

  const subTitleStyle = {
    fontSize: '46px',
    fontWeight: '800',
    lineHeight: '1.1',
    fontFamily: 'Helvetica, Arial, sans-serif',
    margin: '0',
    color: '#000',
  };

  const highlightStyle = {
    color: '#4A90E2',
  };

  const functionsGridStyle = {
    display: 'flex',
    width: '82%',
    height: '100%',
    position: 'relative',
  };

  const functionColumnStyle = {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    padding: '0 30px',
    position: 'relative',
  };

  const verticalLineStyle = {
    position: 'absolute',
    top: '0',
    bottom: '0',
    width: '1px',
    backgroundColor: '#e0e0e0',
  };

  const horizontalLineStyle = {
    position: 'absolute',
    left: '0',
    right: '0',
    height: '1px',
    backgroundColor: '#e0e0e0',
    top: '50%',
  };

  const functionItemStyle = {
    height: '50%',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '30px 0',
  };

  const functionNumberStyle = {
    fontSize: '28px',
    fontWeight: '700',
    color: '#4A90E2',
    marginBottom: '10px',
    fontFamily: 'Helvetica, Arial, sans-serif',
  };

  const functionTitleStyle = {
    fontSize: '28px',
    fontWeight: '700',
    color: '#4A90E2',
    marginBottom: '15px',
    fontFamily: 'Helvetica, Arial, sans-serif',
  };

  const functionDescStyle = {
    fontSize: '16px',
    fontWeight: '400',
    color: '#333',
    lineHeight: '1.6',
    fontFamily: 'Helvetica, Arial, sans-serif',
  };

  return (
    <section style={sectionStyle}>
      <div style={contentContainerStyle}>
        {/* 左侧标题列 */}
        <div style={titleColumnStyle}>
          <h2 style={mainTitleStyle}>
            PTag <span style={highlightStyle}>Air</span>
          </h2>
          <h3 style={subTitleStyle}>五大功能</h3>
        </div>

        {/* 功能列表网格 */}
        <div style={functionsGridStyle}>
          
          <div style={{ ...verticalLineStyle, left: '33.33%' }}></div>
          <div style={{ ...verticalLineStyle, left: '66.66%' }}></div>

          {/* 水平分隔线 */}
          {/* <div style={horizontalLineStyle}></div> */}

          {/* 第一列：功能1和4 */}
          <div style={functionColumnStyle}>
            <div style={functionItemStyle}>
              <h3 style={functionTitleStyle}>
                {functions[0].id}. {functions[0].title}
              </h3>
              <p style={functionDescStyle}>{functions[0].description}</p>
            </div>
            <div style={functionItemStyle}>
              <h3 style={functionTitleStyle}>
                {functions[3].id}. {functions[3].title}
              </h3>
              <p style={functionDescStyle}>{functions[3].description}</p>
            </div>
          </div>

          {/* 第二列：功能2和5 */}
          <div style={functionColumnStyle}>
            <div style={functionItemStyle}>
              <h3 style={functionTitleStyle}>
                {functions[1].id}. {functions[1].title}
              </h3>
              <p style={functionDescStyle}>{functions[1].description}</p>
            </div>
            <div style={functionItemStyle}>
              <h3 style={functionTitleStyle}>
                {functions[4].id}. {functions[4].title}
              </h3>
              <p style={functionDescStyle}>{functions[4].description}</p>
            </div>
          </div>

          {/* 第三列：功能3和空白区域 */}
          <div style={functionColumnStyle}>
            <div style={functionItemStyle}>
              <h3 style={functionTitleStyle}>
                {functions[2].id}. {functions[2].title}
              </h3>
              <p style={functionDescStyle}>{functions[2].description}</p>
            </div>
            <div style={functionItemStyle}>
              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MajorFunctions;