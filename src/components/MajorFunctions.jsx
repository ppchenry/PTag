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
    width: '100%',
    backgroundColor: '#FCF8F3',
    height: '650px', // 增加高度
    display: 'flex',
    flexDirection: 'column',
  };

  const contentContainerStyle = {
    maxWidth: '1400px', // 增加最大宽度
    width: '100%',
    margin: '0 auto',
    padding: '60px 40px', // 增加内边距
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  };

  const titleAreaStyle = {
    width: '25%',
    paddingRight: '20px',
  };

  const mainTitleStyle = {
    fontSize: '46px', // 增大字体
    fontWeight: '800', // 加粗
    lineHeight: '1.2',
    fontFamily: 'Helvetica, Arial, sans-serif',
    margin: '0 0 10px 0', // 增加底部外边距
  };

  const subTitleStyle = {
    fontSize: '46px', // 增大字体
    fontWeight: '800', // 加粗
    lineHeight: '1.2',
    fontFamily: 'Helvetica, Arial, sans-serif',
    margin: '0',
  };

  const highlightStyle = {
    color: '#4A90E2',
  };

  const gridContainerStyle = {
    display: 'flex',
    width: '100%',
    height: '100%',
    marginTop: '20px',
  };

  const columnStyle = {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    borderRight: '1px solid #E0E0E0',
    margin: '0 10px', // 添加水平外边距
  };

  const lastColumnStyle = {
    borderRight: 'none',
  };

  const functionItemStyle = {
    padding: '0 30px', // 增加水平内边距
    flex: '1',
    borderBottom: '1px solid #E0E0E0',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: '15px 0', // 添加垂直外边距
  };

  const bottomFunctionStyle = {
    borderBottom: 'none',
  };

  const functionTitleStyle = {
    fontSize: '28px', // 增大字体
    fontWeight: '700', // 加粗
    color: '#4A90E2',
    marginBottom: '20px', // 增加底部外边距
    fontFamily: 'Helvetica, Arial, sans-serif',
  };

  const functionDescStyle = {
    fontSize: '18px', // 增大字体
    fontWeight: '500', // 增加字重
    color: '#333',
    lineHeight: '1.7', // 增加行高
    fontFamily: 'Helvetica, Arial, sans-serif',
  };

  return (
    <section style={sectionStyle}>
      <div style={contentContainerStyle}>
        <div style={gridContainerStyle}>
          {/* Left Title Column */}
          <div style={{...columnStyle, flex: '0 0 25%'}}>
            <div style={{padding: '0 20px'}}>
              <h2 style={mainTitleStyle}>
                PTag <span style={highlightStyle}>Air</span>
              </h2>
              <h3 style={subTitleStyle}>五大功能</h3>
            </div>
          </div>
          
          {/* Middle Column (Functions 1, 4) */}
          <div style={columnStyle}>
            {/* Function 1 */}
            <div style={functionItemStyle}>
              <h3 style={functionTitleStyle}>
                {functions[0].id}. {functions[0].title}
              </h3>
              <p style={functionDescStyle}>{functions[0].description}</p>
            </div>
            
            {/* Function 4 */}
            <div style={{...functionItemStyle, ...bottomFunctionStyle}}>
              <h3 style={functionTitleStyle}>
                {functions[3].id}. {functions[3].title}
              </h3>
              <p style={functionDescStyle}>{functions[3].description}</p>
            </div>
          </div>
          
          {/* Middle Column (Functions 2, 5) */}
          <div style={columnStyle}>
            {/* Function 2 */}
            <div style={functionItemStyle}>
              <h3 style={functionTitleStyle}>
                {functions[1].id}. {functions[1].title}
              </h3>
              <p style={functionDescStyle}>{functions[1].description}</p>
            </div>
            
            {/* Function 5 */}
            <div style={{...functionItemStyle, ...bottomFunctionStyle}}>
              <h3 style={functionTitleStyle}>
                {functions[4].id}. {functions[4].title}
              </h3>
              <p style={functionDescStyle}>{functions[4].description}</p>
            </div>
          </div>
          
          {/* Right Column (Function 3) */}
          <div style={{...columnStyle, ...lastColumnStyle}}>
            {/* Function 3 */}
            <div style={functionItemStyle}>
              <h3 style={functionTitleStyle}>
                {functions[2].id}. {functions[2].title}
              </h3>
              <p style={functionDescStyle}>{functions[2].description}</p>
            </div>
            
            {/* Empty space to maintain grid structure */}
            <div style={{...functionItemStyle, ...bottomFunctionStyle}}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MajorFunctions;