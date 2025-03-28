import React, { useState, useEffect } from 'react';
import '../fonts.css';

const Sponsors = () => {
    // 添加响应式状态
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    // 监听窗口大小变化
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // 判断是否为手机屏幕
    const isMobile = windowWidth < 768;

    // 支持者数据
    const supporters = [
        { id: 1, name: 'ALVA', image: '/sponsors/alva.png' },
        { id: 2, name: 'OneDegree', image: '/sponsors/oneDegree.png' },
        { id: 3, name: 'M+', image: '/sponsors/mplus.png' },
        { id: 4, name: 'ConviFire', image: '/sponsors/coryfire.png' },
        { id: 5, name: 'Supporter 5', image: '/sponsors/sponsor5.png' },
        { id: 6, name: 'Supporter 6', image: '/sponsors/sponsor6.png' },
        { id: 7, name: 'Supporter 7', image: '/sponsors/sponsor7.png' }
    ];

    // 商业合作伙伴数据
    const partners = [
        { id: 1, name: 'HKSTP', image: '/sponsors/hkstp.png' },
        { id: 2, name: 'PolyVenture', image: '/sponsors/poly.png' },
        { id: 3, name: 'AWS', image: '/sponsors/aws.png' },
        { id: 4, name: 'HKTDC', image: '/sponsors/hkdc.png' },
        { id: 5, name: 'PIECE FUTURE', image: '/sponsors/ip.png' },
        { id: 6, name: 'IPHATCH', image: '/sponsors/pf.png' },
        { id: 7, name: 'Pet Boys Club', image: '/sponsors/pbc.png' },
        { id: 8, name: 'HKSTIA', image: '/sponsors/hky.png' }
    ];

    const sectionStyle = {
        width: '100vw',
        backgroundColor: '#FCF8F3',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxSizing: 'border-box',
        overflow: 'hidden', // 防止内容溢出
        // 移除固定高度，使用内容自适应高度
        // 移除负边距，避免布局问题
    };

    const contentContainerStyle = {
        maxWidth: '1400px',
        width: '100%',
        padding: isMobile ? '40px 15px' : '80px 20px',
        display: 'flex',
        flexDirection: 'column',
    };

    const titleStyle = {
        fontSize: isMobile ? '24px' : '44px',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: isMobile ? '30px' : '60px',
        fontFamily: 'Helvetica',
    };

    // 响应式布局 - 大屏幕一排显示，小屏幕网格显示
    const logosContainerStyle = {
        display: 'flex',
        flexWrap: 'wrap', // 始终允许换行
        justifyContent: 'center',
        alignItems: 'center',
        gap: isMobile ? '15px' : '50px',
        marginBottom: isMobile ? '50px' : '100px',
    };
    const logoItemStyle = {
        // 改变移动设备的布局方式
        flex: isMobile ? '0 0 auto' : '0 0 auto',
        width: isMobile ? '30%' : 'auto', // 移动设备上使用固定比例
        aspectRatio: '1/1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: isMobile ? '80px' : '150px',
        margin: isMobile ? '0 auto 10px' : '0 auto', // 确保移动设备上底部有足够间距
        boxSizing: 'border-box', // 确保内边距不会影响总宽度
    };

    const logoImageStyle = {
        maxWidth: '100%',
        maxHeight: '100%',
        objectFit: 'contain',
    };

    const secondSectionStyle = {
        marginTop: isMobile ? '20px' : '50px',
    };

    const partnersContainerStyle = {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        gap: isMobile ? '30px 20px' : '60px 80px',
    };

    const partnerItemStyle = {
        flex: isMobile ? '0 0 calc(50% - 20px)' : '0 0 220px', // 手机屏幕2列，大屏幕固定宽度
        aspectRatio: '16/9', // 宽屏比例
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: isMobile ? '120px' : '220px',
        margin: '0 auto',
    };

    // 添加商业合作的分隔线样式
    const dividerStyle = {
        width: isMobile ? '200px' : '300px',
        height: '1px',
        backgroundColor: '#ccc',
        margin: '0 auto 30px',
    };


    return (
        <section style={sectionStyle}>
            <div style={contentContainerStyle}>
                {/* 支持者部分 */}
                <h2 style={titleStyle}>我們的支持者</h2>
                <div style={logosContainerStyle}>
                    {supporters.map(supporter => (
                        <div key={supporter.id} style={logoItemStyle}>
                            <img
                                src={supporter.image}
                                alt={supporter.name}
                                style={logoImageStyle}
                                onError={(e) => { e.target.src = '/api/placeholder/150/150' }}
                            />
                        </div>
                    ))}
                </div>

                {/* 商业合作部分 */}
                <div style={secondSectionStyle}>
                    <h2 style={titleStyle}>商業合作</h2>
                    {/* 添加分隔线 */}
                    <div ></div>
                    <div style={partnersContainerStyle}>
                        {partners.map(partner => (
                            <div key={partner.id} style={partnerItemStyle}>
                                <img
                                    src={partner.image}
                                    alt={partner.name}
                                    style={logoImageStyle}
                                    onError={(e) => {
                                        e.target.src = isMobile
                                            ? '/api/placeholder/120/70'
                                            : '/api/placeholder/220/100'
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Sponsors;