import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';


const Landing = () => {
    const [petTagNumber, setPetTagNumber] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // 这里添加提交逻辑
        console.log('提交的宠物牌号码:', petTagNumber);
    };

    

    return (
        <div >
            <Navbar />
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                width:'100vw',
                backgroundColor: '#f5f5f5',
                padding: '20px'
            }}>
                <div style={{
                    display: 'flex',
                    maxWidth: '1200px',
                    width: '100%',
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
                }}>
                    {/* 左侧内容面板 */}
                    <div style={{
                        flex: '1',
                        padding: '40px',
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        <h1 style={{
                            fontSize: '28px',
                            marginBottom: '5px',
                            fontWeight: '600'
                        }}>查閱或啟用</h1>

                        <h2 style={{
                            fontSize: '36px',
                            marginTop: '0',
                            marginBottom: '30px',
                            fontWeight: 'bold'
                        }}>PTag 寵物牌</h2>

                        <div style={{ marginTop: '20px' }}>
                            <p style={{
                                fontSize: '16px',
                                marginBottom: '10px',
                                color: '#333'
                            }}>寵物牌上號碼</p>

                            <input
                                type="text"
                                value={petTagNumber}
                                onChange={(e) => setPetTagNumber(e.target.value)}
                                placeholder="寵物牌上號碼"
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    border: '1px solid #ddd',
                                    borderRadius: '4px',
                                    marginBottom: '20px',
                                    fontSize: '16px'
                                }}
                            />

                            <div style={{
                                display: 'flex',
                                gap: '15px',
                                marginBottom: '20px'
                            }}>
                                <button
                                    onClick={handleSubmit}
                                    style={{
                                        padding: '10px 25px',
                                        backgroundColor: '#FFA500',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                        fontWeight: 'bold',
                                        fontSize: '16px'
                                    }}
                                >確認</button>

                                <button
                                    style={{
                                        padding: '10px 25px',
                                        backgroundColor: 'transparent',
                                        color: '#333',
                                        border: 'none',
                                        cursor: 'pointer',
                                        fontSize: '16px'
                                    }}
                                >取消</button>
                            </div>

                            <p style={{
                                color: '#0066cc',
                                fontSize: '14px',
                                cursor: 'pointer',
                                marginTop: '20px'
                            }}>PTag寵物牌使用手冊</p>
                        </div>
                    </div>

                    {/* 右侧图片面板 */}
                    <div style={{
                        flex: '1.5',
                        overflow: 'hidden'
                    }}>
                        <img
                            src="/atlas/tagId.png"
                            alt="宠物狗"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover'
                            }}
                        />
                    </div>
                </div>
            </div>
            

            <Footer />
            
        </div>
    );
};

export default Landing;