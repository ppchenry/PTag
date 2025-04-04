import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Landing = () => {
    const [petTagNumber, setPetTagNumber] = useState('');
    const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
    const [showHelpImage, setShowHelpImage] = useState(false); // 控制帮助图片的显示
    const helpImageRef = useRef(null); // 用于检测点击外部区域
    const formRef = useRef(null); // 用于表单提交引用

    // 监听窗口大小变化
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // 添加点击外部关闭图片的逻辑
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (helpImageRef.current && !helpImageRef.current.contains(event.target)) {
                setShowHelpImage(false);
            }
        };

        // 只有当图片显示时才添加事件监听
        if (showHelpImage) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showHelpImage]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!petTagNumber.trim()) {
            alert('请输入宠物牌号码');
            return;
        }

        // 直接提交表单到ptagair_active.php
        formRef.current.submit();
    };

    // 处理图标点击
    const handleInfoClick = (e) => {
        e.stopPropagation(); // 阻止事件冒泡
        setShowHelpImage(!showHelpImage);
    };

    // 响应式布局断点
    const isMobile = windowWidth < 768;
    const isTablet = windowWidth >= 768 && windowWidth < 1024;

    // 普通版
    const pageStyle = {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
    };

    const ContainerStyle = {
        width: '100vw',
        height: isMobile ? 'calc(100vh - 77px)' : '100vh', // 在移动端减去navbar高度
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
        objectPosition: isMobile ? '75% center' : 'center center',
        display: 'block',
        transition: 'transform 0.2s linear',
        willChange: 'transform',
    };

    const formContainerStyle = {
        position: 'absolute',
        top: isMobile ? '50%' : '50%',
        left: isMobile ? '50%' : isTablet ? '25%' : '15%',
        transform: isMobile ? 'translate(-50%, -50%)' : 'translateY(-50%)',
        width: isMobile ? '85%' : isTablet ? '450px' : '449px',
        height: 'auto',
        padding: isMobile ? '25px 20px' : '20px',
        zIndex: 10,
        backgroundColor: isMobile ? '#FCF8F3CC' : 'transparent', // 移动端添加半透明背景
        borderRadius: isMobile ? '10px' : '0',
        boxShadow: isMobile ? '0 2px 10px rgba(0,0,0,0.1)' : 'none',
    };

    const formHeaderStyle = {
        fontSize: isMobile ? '26px' : 'var(--font-subtitle-desktop)',
        color: 'var(--color-black)',
        marginBottom: isMobile ? '20px' : '30px',
        textAlign: isMobile ? 'center' : 'left',
        fontWeight: 'bold',
    };

    const formGroupStyle = {
        marginBottom: '20px',
        position: 'relative', // 为帮助图片定位
    };

    // 标签容器样式，用于将标签和图标并排放置
    const labelContainerStyle = {
        display: 'flex',
        alignItems: 'center',
        marginBottom: isMobile ? '12px' : '16px',
    };

    // 标签文本样式
    const labelTextStyle = {
        fontSize: isMobile ? "13px" : 'var(--font-size-lg)',
        color: 'var(--color-black)',
        lineHeight: '24px',
        margin: 0,
    };

    // 图标样式
    const iconStyle = {
        width: isMobile ? "13px" : '20px',
        height: isMobile ? "13px" : '20px',
        marginLeft: '8px',
        cursor: 'pointer',
        verticalAlign: 'middle',
    };

    // 帮助图片样式
    const helpImageStyle = {
        position: 'absolute',
        top: isMobile ? '-160px' : '-200px', // 将图片移动到上方
        left: isMobile ? '54%' : '56%', // 水平居中
        transform: 'translateX(-50%)', // 确保居中对齐
        maxWidth: '300px', // 根据实际图片调整宽度
        boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
        zIndex: 100,
        border: '1px solid #ddd',
        borderRadius: '4px',
        backgroundColor: '#fff',
        padding: '5px',
        display: showHelpImage ? 'block' : 'none',
    };

    const inputStyle = {
        width: '100%',
        padding: isMobile ? '12px' : '12px',
        border: '1px solid #ddd',
        borderRadius: '3px',
        fontSize: isMobile ? '12px' : 'var(--font-size-lg)',
        boxSizing: 'border-box',
        textTransform: 'uppercase', // 添加大写转换，与原HTML一致
    };

    const buttonContainerStyle = {
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        gap: '10px',
        marginTop: isMobile ? '15px' : '30px', // 在移动端减少上边距，为链接腾出空间
    };

    const primaryButtonStyle = {
        backgroundColor: 'var(--color-button-primary)',
        color: 'var(--color-black)',
        border: 'none',
        padding: '14px 23px',
        fontSize: 'var(--font-size-base)',
        fontWeight: 'bold',
        borderRadius: '3px',
        cursor: 'pointer',
        width: isMobile ? '100%' : 'auto',
    };

    const linkStyle = {
        display: 'block',
        marginTop: isMobile ? '20px' : '20px', // 移动端和桌面端的上边距
        marginBottom: isMobile ? '15px' : '0', // 移动端添加下边距
        color: 'var(--color-primary)',
        fontSize: 'var(--font-size-xs)',
        textDecoration: 'underline',
        textAlign: isMobile ? 'center' : 'left',
    };

    return (
        <div style={pageStyle}>
            <Navbar />
            <section style={ContainerStyle}>
                <img
                    src="/atlas/tagId.png"
                    alt="登记你的tagId"
                    style={dogImageStyle}
                    loading="eager"
                />

                <div style={formContainerStyle}>
                    <h1 style={formHeaderStyle}>
                        {isMobile ? "查閱或啟用 PTag 寵物牌" : (
                            <>查閱或啟用PTag 寵物牌</>
                        )}
                    </h1>

                    <form
                        ref={formRef}
                        action="https://www.ptag.com.hk/php/ptagair_active.php"
                        method="POST"
                        autoComplete="on"
                    >
                        <div style={formGroupStyle}>
                            <div style={labelContainerStyle}>
                                <label style={labelTextStyle} htmlFor="petTag">寵物牌上號碼</label>
                                <img
                                    src="/icons/number.png"
                                    alt="更多信息"
                                    style={iconStyle}
                                    onClick={handleInfoClick}
                                    title="点击查看帮助图片"
                                />

                                {/* 帮助图片，点击感叹号时显示 */}
                                {showHelpImage && (
                                    <div
                                        ref={helpImageRef}
                                        style={helpImageStyle}
                                    >
                                        <img
                                            src="/icons/numberPosition.png"
                                            alt="宠物牌号码位置示例"
                                            style={{ width: '100%' }}
                                        />
                                    </div>
                                )}
                            </div>
                            <input
                                style={inputStyle}
                                type="text"
                                id="petTag"
                                name="ptagcode" // 修改为与PHP脚本匹配的名称
                                placeholder="寵物牌上號碼"
                                value={petTagNumber}
                                onChange={(e) => setPetTagNumber(e.target.value)}
                                maxLength="6" // 限制为6个字符
                                required
                            />
                        </div>

                        {/* 移动端在按钮上方显示链接 */}
                        {isMobile && (
                            <div style={{ textAlign: 'center' }}>
                                <a href="../downloads/PTag寵物牌使用手冊_v2.1.pdf" target="_blank" style={linkStyle}>PTag寵物牌使用手冊</a>
                            </div>
                        )}

                        <div style={buttonContainerStyle}>
                            <button
                                style={primaryButtonStyle}
                                type="button"
                                onClick={() => formRef.current.submit()}
                            >
                                啟用/查閱 PTag
                            </button>
                        </div>

                        {/* 桌面端在按钮下方显示链接 */}
                        {!isMobile && (
                            <a href="../downloads/PTag寵物牌使用手冊_v2.1.pdf" target="_blank" style={linkStyle}>PTag寵物牌使用手冊</a>
                        )}
                    </form>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Landing;