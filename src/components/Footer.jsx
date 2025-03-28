import React from 'react';
import '../fonts.css';

const Footer = () => {
  // 共享样式
  const commonStyles = {
    footer: {
      backgroundColor: '#f5f5f5',
      color: '#333',
      width: '100vw',
      borderTop: '1px solid #e0e0e0',
      padding: '20px 0',
    },
    container: {
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '0 20px',
      boxSizing: 'border-box',
    },
    logo: {
      fontFamily: 'Helvetica',
      fontSize: '28px',
      fontWeight: 'bold',
      color: '#000',
      textAlign: 'center',
      margin: '0 0 20px 0',
    },
    linkList: {
      fontFamily:'Helvetica',
      color:'#050505',
      fontWeight:'normal',
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      margin: '0 0 20px 0',
      padding: 0,
      listStyle: 'none',
    },
    linkItem: {
      margin: '5px 12px',
    },
    link: {
      color: '#333',
      textDecoration: 'none',
      fontSize: '14px',
    },
    copyright: {
      fontSize: '13px',
      color: '#666',
      textAlign: 'center',
      lineHeight: '1.5',
      margin: '0',
    },
    socialIcons: {
      display: 'flex',
      justifyContent: 'center',
      gap: '20px',
      margin: '15px 0',
      padding: 0,
      listStyle: 'none',
    },
    iconLink: {
      color: '#000',
      textDecoration: 'none',
      display: 'block',
    },
    iconImage: {
      width: '22px',
      height: '22px',
      display: 'block',
    }
  };

  // 桌面版特定样式
  const desktopStyles = {
    container: {
      ...commonStyles.container,
      position: 'relative',
    },
    socialIcons: {
      ...commonStyles.socialIcons,
      position: 'absolute',
      right: '20px',
      top: '50%',
      transform: 'translateY(-50%)',
      margin: '0',
      justifyContent: 'flex-end',
    }
  };

  // 链接数据
  const mobileLinks = [
    { text: '會員登入', url: '#' },
    { text: '會員注冊', url: '#' },
    { text: '私隱聲明', url: '#' },
    { text: '服務條款', url: '#' },
  ];

  const desktopLinks = [
    { text: '會員登入', url: '#' },
    { text: '會員注冊', url: '#' },
    { text: '私隱聲明', url: '#' },
    { text: '服務條款', url: '#' },
    
  ];

  // 社交图标数据 - 使用PNG图标
  const socialIcons = [
    {
      name: 'Instagram',
      url: '#',
      imageSrc: '/icons/ins.png'
    },
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/petboysclub',
      imageSrc: '/icons/facebook.png'
    },
    {
      name: 'Email',
      url: '#',
      imageSrc: '/icons/email.png'
    }
  ];

  // 媒体查询检测
  const [isDesktop, setIsDesktop] = React.useState(window.innerWidth >= 768);

  React.useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // 渲染社交图标
  const renderSocialIcons = () => (
    <ul style={isDesktop ? desktopStyles.socialIcons : commonStyles.socialIcons}>
      {socialIcons.map((icon, index) => (
        <li key={index}>
          <a href={icon.url} style={commonStyles.iconLink} aria-label={icon.name}>
            <img
              src={icon.imageSrc}
              alt={icon.name}
              style={commonStyles.iconImage}
            />
          </a>
        </li>
      ))}
    </ul>
  );

  return (
    <footer style={commonStyles.footer}>
      <div style={isDesktop ? desktopStyles.container : commonStyles.container}>
        <h2 style={commonStyles.logo}>PTag</h2>

        {!isDesktop && renderSocialIcons()}

        <ul style={commonStyles.linkList}>
          {(isDesktop ? desktopLinks : mobileLinks).map((link, index) => (
            <li key={index} style={commonStyles.linkItem}>
              <a href={link.url} style={commonStyles.link}>
                {link.text}
              </a>
            </li>
          ))}
        </ul>

        <div style={commonStyles.copyright}>
          <p style={{ margin: '0', fontFamily: 'Helvetica',fontWeight:'normal' }}>Copyright© 2025 MLHWKT Ltd.</p>
          <p style={{ margin: '0',fontFamily: 'Helvetica',fontWeight:'normal' }}>All Rights Reserved 版權所有 不得轉載</p>
        </div>

        {isDesktop && renderSocialIcons()}
      </div>
    </footer>
  );
};

export default Footer;