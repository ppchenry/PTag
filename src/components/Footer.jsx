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
      
      fontSize: 'var(--font-size-xl)',
      fontWeight: 'bold',
      color: 'var(--color-text)',
      textAlign: 'center',
      margin: '0 0 20px 0',
    },
    linkList: {
      
      color:'var(--color-text)',
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
      color: 'var(--color-text)',
      textDecoration: 'none',
      fontSize: 'var(--font-size-sm)',
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
      gap: '26px',
      margin: '15px 0',
      padding: 0,
      listStyle: 'none',
      
    },
    iconLink: {
      
      textDecoration: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      
    },
    svgIcon: {
      width: '24px',
      height: '24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'visible' // 允许内容超出边界
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
      width: '111px',
      left: '1161px',
      top: '23px',
      
      gap: '26px',
      margin: '0',
      justifyContent: 'flex-start',
      alignItems: 'center',
      transform: 'none',
    }
  };

  // 链接数据
  const mobileLinks = [
    { text: '會員登入', url: '/login' },
    { text: '會員注冊', url: '#' },
    { text: '私隱聲明', url: '#' },
    { text: '服務條款', url: '#' },
  ];

  const desktopLinks = [
    { text: '會員登入', url: '/login' },
    { text: '會員注冊', url: '#' },
    { text: '私隱聲明', url: '#' },
    { text: '服務條款', url: '#' },
    
  ];

  // 社交图标数据 
  const InstagramIcon = () => (
    <svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0.564453" width="22" height="22" fill="url(#pattern0_2425_550)" />
      <defs>
        <pattern id="pattern0_2425_550" patternContentUnits="objectBoundingBox" width="1" height="1">
          <use xlinkHref="#image0_2425_550" transform="scale(0.0111111)" />
        </pattern>
        <image id="image0_2425_550" width="90" height="90" preserveAspectRatio="none" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAACXBIWXMAAAsTAAALEwEAmpwYAAAE1ElEQVR4nO2cy49URRSHv1nA4Lp14QAmSIyiKI4zSgYlhqWJErc8tiQ+AHfiygkrCRpWDjoRloqS+HZUosQ/wGA0KGIC6hIRMIhxHKaZMpUcksmk7+3XOXWr69aX/JJJZ7rq1C/dp089bkEmk8lkMplMJpPJ1JRhYAuwH/gQOANcAa4DriLNSQw/SUw+tscl1oHjIWAa+KtCQ12X8ua/ATzIALAB+DwC01wfWgA+Ax4gQlYAh4D5CIxySvJjeU3GFgV3Ad9HYIwz0nfA2qpNHgcuRmCGM9ZlYKIqkx8G/o7ABBdIfqxjVaSLPyMYvAusP4A7Q5m8QvKWq6l+AG4JYfShCAbrKtZBa5PvT6yEcz1qXuYMZnwRwSBdJPrEyuRRmTW5hDQHvAiMiPbJa528d8Fquj4dgTFOWd7Ypezr4v2HtU0eHrAFIteh/Kd4KSNdTmSWaxq9JQJTXCCjV3bZxmZNo/dHYIoLlDpe6rKNSU2jP4rAFGegOTG7lx/Dm/pA0+gzFRlxDpgCtknV0wCWiRry2nb5UTpfUYw/ahp9KWDgTeAdYFOXMQ4BjwLHpI1Q8fo1HzW6/Tr1qhPA3QrxrgO+DhTzfyhiHey/wC70eQaYDRC/GpZBXpQNBCseCbCkq4alyfdgzzpjs9WwShfjHfR9B7AH+BI4C/wjOiuv7QZWd9DORsM0ooZFcLva9LkKONphBeH/54jM6sp4tm5Gn2jT39PAtR739ba2aftkXYxutinhXgBu9NG+f+/ekvbvNaizozT67Taf5H5MXmx22Sf7vToYvakkJ/eSLsrSSKvVOc9jqRt9TqbKrTiqPHivtwr68jH8lrLRUyUlnMX6RFO+Ka14M2WjtxW0v8fA5Jt6vqDPHSkbPVrB7vpMQZ9jKRvdKGj/F0Oj/QyyFbelbPTygvY1q42l8m0XbThno9Ez4WodjW4UtJ9Th7LRowVG5x9DZaO3Fxi92zBHP1fQ586UU8fhgvZXG01Y5ksmLNMpG32+ZAp+xMBob2YrfAy/p2y0kyMBrVip/EyMrzZuL+hrs/KYojT6WEk/TyilEL9M+lRJP8frYHRTNkuL2Kuw8O/XTopYr7TmHb3RDviqTX9be0wjPl08WdKuz83fGIwnWqOdHG4pY0TWk5sdVhfTJTnZuoxUwyK4WTnc0o5VstTpH+b/WdYursnfM1InF5Vwi5mQ41u1M9rJoZayfK3FfcYHNdVwxmZvxI6JAKdh1XDGmpXDLZoMSU62ShcmRoc6tntSzl30y3qj6sL82G7Ig+g3gHflSEDRdL0VQzLjO25QJwc7iF7VoxW/ym71Dtnja8gujdet8tpOKe00jw9U9mhFqg8LOQW9r2l0qo+/OQW9rGl0qg90OgX53xI1huVeuKoH5SLTJXkUTxXNI1QuEb2OASleI+H60ILlJYQzEQzQRSJfiZkuzlR5gauLRPMhrtR8NYKBuop1gAD4CuRUBIN1FenbkFcgr5XL9lzNdAFYQ2DGa3Zl5lW5F7sSxmryyb5QpcmL08ipxHPyGiJhWK6RTKn0uw68on0LmOaVmp8O+AxyAfhYaafHnA3yqNvlCIxzXSwQTVnfOWrFMtlempQF8tMyoFB7kK00JzGclpgmJUb1VbhMJpPJZDKZTCaTYRD4Hy2WYZFuOgQHAAAAAElFTkSuQmCC" />
      </defs>
    </svg>
  );
  const FacebookIcon = () => (
    <svg width="13" height="22" viewBox="0 0 13 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.8698 1.63184H9.05925C7.81691 1.63184 6.62545 2.12535 5.74698 3.00382C4.86852 3.88229 4.375 5.07374 4.375 6.31608V9.12663H1.56445V12.874H4.375V20.3688H8.1224V12.874H10.9329L11.8698 9.12663H8.1224V6.31608C8.1224 6.06761 8.2211 5.82932 8.39679 5.65363C8.57249 5.47794 8.81078 5.37923 9.05925 5.37923H11.8698V1.63184Z" fill="#050505" stroke="#050505" stroke-width="1.56141" stroke-linecap="round" stroke-linejoin="round" />
    </svg>

  );

  const EmailIcon = () => (
    <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.62671 0.973633H16.6794C17.6456 0.973633 18.436 1.7641 18.436 2.73022V13.2698C18.436 14.2359 17.6456 15.0264 16.6794 15.0264H2.62671C1.66058 15.0264 0.870117 14.2359 0.870117 13.2698V2.73022C0.870117 1.7641 1.66058 0.973633 2.62671 0.973633Z" stroke="#050505" stroke-width="1.56141" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M18.436 2.73145L9.65308 8.87952L0.870117 2.73145" stroke="#050505" strokeWidth="1.56141" strokeLinecap="round" strokeLinejoin="round" />
    </svg>

  );

  const socialIcons = [
    { name: 'Instagram', url: '#', icon: <InstagramIcon /> },
    { name: 'Facebook', url: '#', icon: <FacebookIcon /> },
    { name: 'Email', url: '#', icon: <EmailIcon /> }
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
            <div style={commonStyles.svgIcon}>
              {icon.icon}
            </div>
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
          <p style={{ margin: '0', fontFamily: 'Helvetica', fontWeight: 'normal' }}>Copyright© 2025 MLHWKT Ltd.</p>
          <p style={{ margin: '0', fontFamily: 'Helvetica', fontWeight: 'normal' }}>All Rights Reserved 版權所有 不得轉載</p>
        </div>

        {isDesktop && renderSocialIcons()}
      </div>
    </footer>
  );
};

export default Footer;