import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Landing = () => {
    const [petTagNumber, setPetTagNumber] = useState('');
    const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

    // 监听窗口大小变化
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        // 这里添加提交逻辑（还没有）
        console.log('提交的宠物牌号码:', petTagNumber);
    };

    // 响应式布局断点
    const isMobile = windowWidth < 768;
    const isTablet = windowWidth >= 768 && windowWidth < 1024;

    // 普通版
    const ContainerStyle = {
        width: '100vw',
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',
        marginTop: '-77px',
        paddingTop: '77px',
        marginLeft: '0',  
        marginRight: '0',
        boxSizing: 'border-box',
    };

    const dogImageStyle = {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition: 'center center',
        display: 'block',
        transition: 'transform 0.2s linear',
        willChange: 'transform',
    };

    const formContainerStyle = {
        position: 'absolute',
        top: '50%',
        left: isMobile ? '50%' : isTablet ? '25%' : '15%',
        transform: isMobile ? 'translate(-50%, -50%)' : 'translateY(-50%)',
        width: isMobile ? '90%' : isTablet ? '450px' : '449px',
        height: 'auto',
        padding: '20px',
        zIndex: 10,
    };

    const formHeaderStyle = {
        fontSize: isMobile ? 'calc(var(--font-subtitle-desktop) * 0.8)' : 'var(--font-subtitle-desktop)',
        color: 'var(--color-black)',
        marginBottom: isMobile ? '20px' : '30px',
    };

    const formGroupStyle = {
        marginBottom: '20px',
    };

    const labelStyle = {
        display: 'block',
        marginBottom: isMobile ? '12px' : '16px',
        fontSize: 'var(--font-size-lg)',
        color: 'var(--color-black)',
    };

    const inputStyle = {
        width: '100%',
        padding: isMobile ? '10px' : '12px',
        border: '1px solid #ddd',
        borderRadius: '3px',
        fontSize: 'var(--font-size-lg)',
        boxSizing: 'border-box',
    };

    const buttonContainerStyle = {
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        gap: '10px',
        marginTop: isMobile ? '20px' : '30px',
    };

    const primaryButtonStyle = {
        backgroundColor: 'var(--color-button-primary)',
        color: 'var(--color-black)',
        border: 'none',
        padding: '12px 24px',
        fontSize: 'var(--font-size-base)',
        fontWeight: 'bold',
        borderRadius: '3px',
        cursor: 'pointer',
        width: isMobile ? '100%' : 'auto',
    };

    const secondaryButtonStyle = {
        backgroundColor: 'transparent',
        color: '#969696',
        border: 'none',
        padding: '12px 24px',
        fontSize: 'var(--font-size-base)',
        cursor: 'pointer',
        width: isMobile ? '100%' : 'auto',
        textAlign: isMobile ? 'center' : 'left',
    };

    const linkStyle = {
        display: 'block',
        marginTop: '20px',
        color: 'var(--color-primary)',
        fontSize: 'var(--font-size-xs)',
        textDecoration: 'underline',
    };

    return (
        <div >
            <Navbar />
            <section style={ContainerStyle}>
                <img
                    src="/atlas/tagId.png"
                    alt="登记你的tagId"
                    style={dogImageStyle}
                    loading="eager"
                />

                <div style={formContainerStyle}>
                    <h1 style={formHeaderStyle}>查閱或啟用<br /> PTag 寵物牌</h1>

                    <form onSubmit={handleSubmit}>
                        <div style={formGroupStyle}>
                            <label style={labelStyle} htmlFor="petTag">寵物牌上號碼</label>
                            <input
                                style={inputStyle}
                                type="text"
                                id="petTag"
                                placeholder="寵物牌上號碼"
                                value={petTagNumber}
                                onChange={(e) => setPetTagNumber(e.target.value)}
                            />
                        </div>

                        <div style={buttonContainerStyle}>
                            <button style={primaryButtonStyle} type="submit">確認</button>
                            <button style={secondaryButtonStyle} type="button">取消</button>
                        </div>
                    </form>

                    <a href="#" style={linkStyle}>PTag寵物牌使用手冊</a>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Landing;