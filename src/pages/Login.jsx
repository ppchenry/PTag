import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { login, register, forgotPassword, parseResponse } from '../services/api';
import { validateRegisterForm } from '../utils/validation';

const Login = ({initialTab}) => {
    const [activeTab, setActiveTab] = useState(initialTab ||'login');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);


    // 添加表单错误状态
    const [formErrors, setFormErrors] = useState({});

    // 添加错误提示样式
    const errorMessageStyle = {
        color: '#F10000',
        fontSize: '14px',
        marginTop: '-15px',
        marginBottom: '10px',
        display: 'block'
    };

   

    // 表单状态
    const [loginData, setLoginData] = useState({ username: '', password: '' });
    const [registerData, setRegisterData] = useState({
        Last_name: '',
        emailsignup: '',
        passwordsignup: '',
        passwordsignup_confirm: '',
        agreepolicy: false
    });
    const [forgotData, setForgotData] = useState({ username: '' });
    const [message, setMessage] = useState('');

    // 处理登录表单提交
    const handleLogin = async (e) => {
        e.preventDefault();
        setMessage('');
        

        try {
            const response = await login(loginData.username, loginData.password);
            const result = parseResponse(response);
            setMessage(result.message);

            if (result.success) {
                window.location.href = 'https://www.ptag.com.hk/php/home.php';
            }
        } catch (error) {
            console.error('登录请求失败:', error);
            setMessage('登录请求失败，请稍后再试');
        }
    };

    // 处理注册表单提交
    const handleRegister = async (e) => {
        e.preventDefault();
        setMessage('');
        setFormErrors({});

        // 使用验证服务
        const validation = validateRegisterForm(registerData);
        if (!validation.isValid) {
            setFormErrors(validation.errors);
            return;
        }

        try {
            const response = await register(registerData);
            const result = parseResponse(response);
            setMessage(result.message);

            if (result.success) {
                setTimeout(() => setActiveTab('login'), 3000);
            }
        } catch (error) {
            console.error('注册请求失败:', error);
            setMessage('注册请求失败，请稍后再试');
        }
    };

    // 处理忘记密码表单提交
    const handleForgotPassword = async (e) => {
        e.preventDefault();
        setMessage('');

        try {
            const response = await forgotPassword(forgotData.username);
            const result = parseResponse(response);
            setMessage(result.message);
        } catch (error) {
            console.error('忘记密码请求失败:', error);
            setMessage('请求失败，请稍后再试');
        }
    };

    // 使用与Home页面相同的页面布局结构
    const pageStyle = {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        
    };

    const contentStyle = {
        flex: '1 0 auto',
        position: 'relative',
        width:"100%",
        marginTop: '-77px',
        paddingTop: '77px',
        
    };

    
    const catImageStyle = {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition: 'center center',
        display: 'block',
        transition: 'transform 0.2s linear',
        willChange: 'transform',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 0
    };

    const formContainerStyle = {
        position: 'absolute',
        top: '50%',
        left: '25%',
        transform: 'translate(-50%, -50%)',
        width: '420px',
        backgroundColor: '#FCF8F3A6',
        borderRadius: '10px',
        padding: '30px 40px',
        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
        zIndex: 1
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

    const messageStyle = {
        color: message && message.includes('成功') ? 'green' : 'red',
        marginBottom: '15px',
        fontSize: 'var(--font-size-base)',
        textAlign: 'center',
    };

    // SVG图标组件
    const ArrowLeft = () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '8px' }}>
            <path d="M15 19L8 12L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );

    const EyeIcon = ({ visible }) => (
        visible ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M3 3L21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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

            {message && <p style={messageStyle}>{message}</p>}

            <form onSubmit={handleLogin}>
                <label style={labelStyle}>電郵</label>
                <input
                    type="email"
                    placeholder="example@mail.com"
                    style={inputStyle}
                    className="input"
                    value={loginData.username}
                    onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                    required
                />
                

                <label style={labelStyle}>密碼</label>
                <div style={passwordInputContainerStyle}>
                    <input
                        type={passwordVisible ? "text" : "password"}
                        placeholder="8-12位混用大小寫字母和數字密碼"
                        className="input"
                        style={{ ...inputStyle, marginBottom: 0 }}
                        value={loginData.password}
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        required
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

                <button type="submit" style={buttonStyle}>登入</button>
            </form>
        </>
    );

    // 渲染注册表单
    const renderRegisterForm = () => (
        <>
            <h2 style={formTitleStyle}>會員註冊</h2>
            <p style={toggleLinkStyle}>
                已經有帳號？ <span style={toggleLinkSpanStyle} onClick={() => setActiveTab('login')}>登入</span>
            </p>

            {message && <p style={messageStyle}>{message}</p>}

            <form onSubmit={handleRegister}>
                <label style={labelStyle}>稱呼</label>
                <input
                    type="text"
                    placeholder="稱呼"
                    className="input"
                    style={inputStyle}
                    value={registerData.Last_name}
                    onChange={(e) => setRegisterData({ ...registerData, Last_name: e.target.value })}
                    required
                />
                {formErrors.Last_name && <span style={errorMessageStyle}>{formErrors.Last_name}</span>}

                <label style={labelStyle}>電郵</label>
                <input
                    type="email"
                    placeholder="example@mail.com"
                    style={inputStyle}
                    className="input"
                    value={loginData.username}
                    onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                    required
                />
                {formErrors.emailsignup && <span style={errorMessageStyle}>{formErrors.emailsignup}</span>}

                <label style={labelStyle}>設定密碼</label>
                <div style={passwordInputContainerStyle}>
                    <input
                        type={passwordVisible ? "text" : "password"}
                        placeholder="8-12位混用大小寫字母和數字密碼"
                        className="input"
                        style={{ ...inputStyle, marginBottom: 0 }}
                        value={registerData.passwordsignup}
                        onChange={(e) => setRegisterData({ ...registerData, passwordsignup: e.target.value })}
                        required
                    />
                    <div
                        style={passwordVisibilityStyle}
                        onClick={() => setPasswordVisible(!passwordVisible)}
                    >
                        <EyeIcon visible={passwordVisible} />
                    </div>
                </div>
                {formErrors.passwordsignup && <span style={errorMessageStyle}>{formErrors.passwordsignup}</span>}

                <label style={labelStyle}>確認密碼</label>
                <div style={passwordInputContainerStyle}>
                    <input
                        type={confirmPasswordVisible ? "text" : "password"}
                        placeholder="再次輸入密碼"
                        className="input"
                        style={{ ...inputStyle, marginBottom: 0 }}
                        value={registerData.passwordsignup_confirm}
                        onChange={(e) => setRegisterData({ ...registerData, passwordsignup_confirm: e.target.value })}
                        required
                    />
                    <div
                        style={passwordVisibilityStyle}
                        onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                    >
                        <EyeIcon visible={confirmPasswordVisible} />
                    </div>
                </div>
                {formErrors.passwordsignup_confirm && <span style={errorMessageStyle}>{formErrors.passwordsignup_confirm}</span>}

                <label style={checkboxLabelStyle}>
                    <input
                        type="checkbox"
                        style={{ marginRight: '8px' }}
                        checked={registerData.agreepolicy}
                        onChange={(e) => setRegisterData({ ...registerData, agreepolicy: e.target.checked })}
                    />
                    同意服務條款及私隱聲明
                </label>
                {formErrors.agreepolicy && <span style={errorMessageStyle}>{formErrors.agreepolicy}</span>}

                <button type="submit" style={buttonStyle}>註冊</button>

                <p style={termsStyle}>
                    註冊即表示您已閱讀並同意 <span style={termsLinkStyle}>服務條款</span> 及 <span style={termsLinkStyle}>私隱聲明</span>
                </p>
                
            </form>
        </>
    );

    // 渲染忘记密码表单
    const renderForgotPasswordForm = () => (
        <>
            <div style={backButtonStyle} onClick={() => setActiveTab('login')}>
                <ArrowLeft /> 忘記密碼
            </div>

            {message && <p style={messageStyle}>{message}</p>}

            <form onSubmit={handleForgotPassword}>
                <label style={labelStyle}>電郵</label>
                <input
                    type="email"
                    placeholder="example@mail.com"
                    className="input"
                    style={inputStyle}
                    value={forgotData.username}
                    onChange={(e) => setForgotData({ ...forgotData, username: e.target.value })}
                    required
                />

                <button type="submit" style={buttonStyle}>確認</button>
            </form>
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
        <div style={pageStyle}>
            <Navbar />

            <div style={contentStyle}>
                
                <div style={{ position: 'relative', height: '100vh' }}>
                    <img
                        src="/atlas/cat.png"
                        alt="登录注册猫"
                        style={catImageStyle}
                        loading="eager"
                    />
                    <div style={formContainerStyle}>
                        {renderActiveForm()}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Login;