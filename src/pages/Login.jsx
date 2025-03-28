import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Login = () => {
    const [activeTab, setActiveTab] = useState('login'); // 'login' 或 'register' 或 'forgot'
    // 添加密码可见性状态
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    const containerStyle = {
        width: '100vw',
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',
        marginTop: '-77px',
        paddingTop: '77px',
        marginLeft: 'calc(-50vw + 50%)',
        boxSizing: 'border-box',
    };

    const catImageStyle = {
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
        left: '25%', // 左侧25%的位置，远离猫的头部
        transform: 'translate(-50%, -50%)',
        width: '420px',
        backgroundColor: '#FCF8F3A6', // 透明度
        borderRadius: '10px',
        padding: '30px 40px',
        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
    };

    const formTitleStyle = {
        fontSize: 'var(--font-size-xxl)',
        fontWeight: 'bold',
        marginBottom: '5px',
        marginTop: '0',
    };

    const toggleLinkStyle = {
        fontSize: 'var(--font-size-base)',
        color: 'var(--color-text)',
        marginBottom: '20px',
        display: 'block',
    };

    const toggleLinkSpanStyle = {
        color: 'var(--color-primary)',
        cursor: 'pointer',
    };

    const labelStyle = {
        display: 'block',
        fontSize: 'var(--font-size-lg)',

        marginBottom: '8px',
    };

    const inputStyle = {
        width: '100%',
        padding: '10px 12px',
        marginBottom: '20px',
        border: '1px solid #e0e0e0',
        borderRadius: '4px',
        fontSize: 'var(--font-size-base)',
        boxSizing: 'border-box',
    };

    const passwordInputContainerStyle = {
        position: 'relative',
        marginBottom: '20px',
    };

    const passwordVisibilityStyle = {
        position: 'absolute',
        right: '12px',
        top: '50%',
        transform: 'translateY(-50%)',
        cursor: 'pointer',
        color: '#888',
    };

    const buttonStyle = {
        width: '100%',
        padding: '12px',
        backgroundColor: 'var(--color-button-primary)',
        color: 'var(--color-black)',
        border: 'none',
        borderRadius: '3px',
        fontSize: 'var(--font-size-base)',
        fontWeight: 'bold',
        cursor: 'pointer',
        marginTop: '10px',
    };

    const checkboxContainerStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '20px',
    };

    const checkboxLabelStyle = {
        display: 'flex',
        alignItems: 'center',
        fontSize: 'var(--font-size-base)',
        color: 'var(--color-text)',
        cursor: 'pointer',
    };

    const forgotPasswordStyle = {
        fontSize: 'var(--font-size-base)',
        color: 'var(--color-text)',
        cursor: 'pointer',
    };

    const termsStyle = {
        fontSize: '13px',
        color: 'var(--color-text)',
        marginTop: '20px',
        textAlign: 'center',
    };

    const termsLinkStyle = {
        color: 'var(--color-primary)',
        cursor: 'pointer',
    };

    const backButtonStyle = {
        display: 'flex',
        alignItems: 'center',
        fontSize: 'var(--font-size-xxl)',
        fontWeight: 'bold',
        marginBottom: '20px',
        cursor: 'pointer',
    };

    // 返回箭头图标
    const ArrowLeft = () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '8px' }}>
            <path d="M15 19L8 12L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );

    // 密码可见图标
    const EyeIcon = ({ visible }) => (
        visible ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M3 3L21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        )
    );

    // 渲染登录表单
    const renderLoginForm = () => (
        <>
            <h2 style={formTitleStyle}>會員登入</h2>
            <p style={toggleLinkStyle}>
                未有帳號？ <span style={toggleLinkSpanStyle} onClick={() => setActiveTab('register')}>註冊</span>
            </p>

            <label style={labelStyle}>電郵</label>
            <input
                type="email"
                placeholder="example@mail.com"
                style={inputStyle}
            />

            <label style={labelStyle}>密碼</label>
            <div style={passwordInputContainerStyle}>
                <input
                    type={passwordVisible ? "text" : "password"}
                    placeholder="6-18位數密碼"
                    style={{ ...inputStyle, marginBottom: 0 }}
                />
                <div
                    style={passwordVisibilityStyle}
                    onClick={() => setPasswordVisible(!passwordVisible)}
                >
                    <EyeIcon visible={passwordVisible} />
                </div>
            </div>

            <div style={checkboxContainerStyle}>
                <label style={checkboxLabelStyle}>
                    <input type="checkbox" style={{ marginRight: '8px' }} />
                    記住帳號
                </label>
                <span style={forgotPasswordStyle} onClick={() => setActiveTab('forgot')}>忘記密碼</span>
            </div>

            <button style={buttonStyle}>登入</button>
        </>
    );

    // 渲染注册表单
    const renderRegisterForm = () => (
        <>
            <h2 style={formTitleStyle}>會員註冊</h2>
            <p style={toggleLinkStyle}>
                已經有帳號？ <span style={toggleLinkSpanStyle} onClick={() => setActiveTab('login')}>登入</span>
            </p>

            <label style={labelStyle}>姓名</label>
            <input
                type="text"
                placeholder="中文全名"
                style={inputStyle}
            />

            <label style={labelStyle}>電郵</label>
            <input
                type="email"
                placeholder="example@mail.com"
                style={inputStyle}
            />

            <label style={labelStyle}>設定密碼</label>
            <div style={passwordInputContainerStyle}>
                <input
                    type={passwordVisible ? "text" : "password"}
                    placeholder="6-18位數密碼"
                    style={{ ...inputStyle, marginBottom: 0 }}
                />
                <div
                    style={passwordVisibilityStyle}
                    onClick={() => setPasswordVisible(!passwordVisible)}
                >
                    <EyeIcon visible={passwordVisible} />
                </div>
            </div>

            <label style={labelStyle}>確認密碼</label>
            <div style={passwordInputContainerStyle}>
                <input
                    type={confirmPasswordVisible ? "text" : "password"}
                    placeholder="再次輸入密碼"
                    style={{ ...inputStyle, marginBottom: 0 }}
                />
                <div
                    style={passwordVisibilityStyle}
                    onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                >
                    <EyeIcon visible={confirmPasswordVisible} />
                </div>
            </div>

            <button style={buttonStyle}>註冊</button>

            <p style={termsStyle}>
                註冊即表示您已閱讀並同意 <span style={termsLinkStyle}>服務條款</span> 及 <span style={termsLinkStyle}>私隱聲明</span>
            </p>
        </>
    );

    // 渲染忘记密码表单
    const renderForgotPasswordForm = () => (
        <>
            <div style={backButtonStyle} onClick={() => setActiveTab('login')}>
                <ArrowLeft /> 忘記密碼
            </div>

            <label style={labelStyle}>電郵</label>
            <input
                type="email"
                placeholder="example@mail.com"
                style={inputStyle}
            />

            <button style={buttonStyle}>確認</button>
        </>
    );

    // 根据当前激活的选项卡渲染相应的表单
    const renderActiveForm = () => {
        switch (activeTab) {
            case 'register':
                return renderRegisterForm();
            case 'forgot':
                return renderForgotPasswordForm();
            default:
                return renderLoginForm();
        }
    };

    return (
        <div>
            <Navbar />
            
            <section style={containerStyle} className="full-width">
                <img
                    src="/atlas/cat.png"
                    alt="登录注册猫"
                    style={catImageStyle}
                    loading="eager"
                />

                <div style={formContainerStyle}>
                    {renderActiveForm()}
                </div>
                
            </section>
            <Footer />
            
        </div>
    );
};

export default Login;