import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import * as cheerio from 'cheerio';

const Info = () => {
    const [searchParams] = useSearchParams();
    const qrCode = searchParams.get('qr') || '';
    const [petInfo, setPetInfo] = useState({
        name: '',
        type: '',
        breed: '',
        gender: '',
        feature: '',
        other: '',
        ownerName: '',
        phone: '',
        otherPhone: '',
        altPhone: '',
        photoUrl: '',
        locationUrl: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 从后端获取宠物信息
    useEffect(() => {
        const fetchPetInfo = async () => {
            if (!qrCode) {
                setError('无效的QR码');
                setLoading(false);
                return;
            }

            try {
                // 直接请求现有的PHP页面
                const response = await axios.get(`https://www.ptag.com.hk/php/qr_info_n.php?qr=${qrCode}`, {
                    responseType: 'text'
                });

                // 使用cheerio解析HTML响应
                const $ = cheerio.load(response.data);

                // 从HTML中提取宠物信息
                // 查找图片URL - 在avatar span内的img标签
                let photoUrl = '';
                const imgElement = $('.avatar img');
                if (imgElement.length > 0) {
                    photoUrl = imgElement.attr('src') || '';

                    // 如果是相对路径，转换为绝对路径
                    if (photoUrl.startsWith('../')) {
                        photoUrl = `https://www.ptag.com.hk/${photoUrl.replace('../', '')}`;
                    } else if (!photoUrl.startsWith('http') && !photoUrl.startsWith('/')) {
                        photoUrl = `https://www.ptag.com.hk/${photoUrl}`;
                    }

                    console.log('Found image URL:', photoUrl);
                }

                // 提取位置链接
                let locationUrl = '';
                $('a').each((i, el) => {
                    const href = $(el).attr('href') || '';
                    if (href.includes('maps.google.com')) {
                        locationUrl = href;
                    }
                });

                // 提取宠物信息 - 这些在h1标签内的p标签中
                let name = '';
                let type = '';
                let breed = '';
                let gender = '';
                let feature = '';
                let other = '';
                let ownerName = '';
                let phone = '';
                let otherPhone = '';
                let altPhone = '';

                $('h1 p').each((i, el) => {
                    const text = $(el).text();

                    if (text.includes('名字:')) {
                        name = text.replace('名字:', '').trim();
                    }
                    else if (text.includes('類型:')) {
                        type = text.replace('類型:', '').trim();
                    }
                    else if (text.includes('品種:')) {
                        breed = text.replace('品種:', '').trim();
                    }
                    else if (text.includes('性別:')) {
                        gender = text.replace('性別:', '').trim();
                    }
                    else if (text.includes('特徵:')) {
                        feature = text.replace('特徵:', '').trim();
                    }
                    else if (text.includes('其它資訊:')) {
                        other = text.replace('其它資訊:', '').trim();
                    }
                    else if (text.includes('聯絡人:')) {
                        ownerName = text.replace('聯絡人:', '').trim();
                    }
                    else if (text.includes('聯絡電話:')) {
                        phone = text.replace('聯絡電話:', '').trim();
                    }
                    else if (text.includes('其他聯絡電話:')) {
                        altPhone = text.replace('其他聯絡電話:', '').trim();
                    }
                });

                // 设置提取的数据
                setPetInfo({
                    name,
                    type,
                    breed,
                    gender,
                    feature,
                    other,
                    ownerName,
                    phone,
                    altPhone,
                    photoUrl,
                    locationUrl
                });

                setLoading(false);
            } catch (err) {
                console.error('获取宠物信息失败:', err);
                setError('无法获取宠物信息，请稍后再试');
                setLoading(false);
            }
        };

        fetchPetInfo();
    }, [qrCode]);

    // 图片加载错误处理
    const handleImageError = (e) => {
        console.error('图片加载失败:', e.target.src);
        e.target.onerror = null; // 防止无限循环

        // 尝试替代URL
        const originalSrc = e.target.src;
        let newSrc = '';

        if (originalSrc.includes('pet_images')) {
            // 尝试另一种路径格式
            newSrc = originalSrc.replace('pet_images', 'images/pets');
            console.log('尝试替代URL:', newSrc);
            e.target.src = newSrc;

            // 如果替代也失败，使用默认图片
            e.target.onerror = () => {
                console.log('使用默认图片');
                e.target.src = '/icons/placeholder.png';
            };
        } else {
            e.target.src = '/icons/placeholder.png';
        }
    };

    // Facebook分享功能
    const handleShare = () => {
        const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;
        window.open(shareUrl, '_blank', 'width=600,height=400');
    };

    // 样式定义
    const pageStyle = {
        backgroundColor: '#f9f9f9',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
    };

    const containerStyle = {
        backgroundColor: 'white',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '1000px',
        padding: '30px',
        marginBottom: '20px',
    };

    const headerStyle = {
        textAlign: 'center',
        marginBottom: '20px',
    };

    const titleStyle = {
        fontSize: '28px',
        fontWeight: 'bold',
        margin: '10px 0',
    };

    const subtitleStyle = {
        fontSize: '16px',
        color: '#555',
        lineHeight: '1.5',
        margin: '10px 0 30px 0',
    };

    const contentStyle = {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: '30px',
    };

    const imageContainerStyle = {
        flex: '1',
        minWidth: '300px',
    };

    const imageStyle = {
        width: '100%',
        borderRadius: '8px',
        objectFit: 'cover',
    };

    const infoContainerStyle = {
        flex: '1',
        minWidth: '300px',
    };

    const petNameStyle = {
        fontSize: '24px',
        fontWeight: 'bold',
        marginBottom: '20px',
    };

    const infoLineStyle = {
        display: 'flex',
        marginBottom: '10px',
        fontSize: '16px',
        lineHeight: '1.6',
    };

    const infoLabelStyle = {
        fontWeight: 'bold',
        minWidth: '70px',
        marginRight: '10px',
    };

    const contactSectionStyle = {
        marginTop: '30px',
        borderTop: '1px solid #eee',
        paddingTop: '20px',
    };

    const contactTitleStyle = {
        fontSize: '18px',
        fontWeight: 'bold',
        marginBottom: '15px',
    };

    const shareButtonStyle = {
        backgroundColor: '#1877f2', // Facebook蓝
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        padding: '8px 16px',
        fontSize: '14px',
        fontWeight: 'bold',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '20px',
        width: 'fit-content',
    };

    const locationSectionStyle = {
        marginTop: '20px',
        textAlign: 'center',
    };

    const locationLinkStyle = {
        color: '#1877f2',
        textDecoration: 'underline',
        fontWeight: 'bold',
    };

    if (loading) {
        return (
            <div style={pageStyle}>
                <div style={{ ...containerStyle, textAlign: 'center', padding: '50px' }}>
                    加載中...
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div style={pageStyle}>
                <div style={{ ...containerStyle, textAlign: 'center', padding: '50px' }}>
                    <div style={{ color: 'red' }}>{error}</div>
                    <button
                        onClick={() => window.history.back()}
                        style={{
                            marginTop: '20px',
                            padding: '10px 15px',
                            backgroundColor: '#4CAF50',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                        }}
                    >
                        返回上一頁
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div style={pageStyle}>
            <div style={containerStyle}>
                <header style={headerStyle}>
                    <h1 style={titleStyle}>PTag 智能寵物牌提提您</h1>
                    <p style={subtitleStyle}>
                        請您通過以下資料暫時照顧寵物及聯絡寵物主人，幫助寵物回家！十分感謝！
                    </p>
                </header>

                <div style={contentStyle}>
                    <div style={imageContainerStyle}>
                        {petInfo.photoUrl ? (
                            <img
                                src={petInfo.photoUrl}
                                alt={`${petInfo.name}的照片`}
                                style={imageStyle}
                                onError={handleImageError}
                            />
                        ) : (
                            <div style={{
                                ...imageStyle,
                                height: '300px',
                                backgroundColor: '#f0f0f0',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#999'
                            }}>
                                無寵物照片
                            </div>
                        )}
                    </div>

                    <div style={infoContainerStyle}>
                        <h2 style={petNameStyle}>{petInfo.name || '未知名字'}</h2>

                        <div style={infoLineStyle}>
                            <span style={infoLabelStyle}>種類：</span>
                            <span>{petInfo.type || '未知'}</span>
                        </div>

                        <div style={infoLineStyle}>
                            <span style={infoLabelStyle}>品種：</span>
                            <span>{petInfo.breed || '未知'}</span>
                        </div>

                        <div style={infoLineStyle}>
                            <span style={infoLabelStyle}>性別：</span>
                            <span>{petInfo.gender || '未知'}</span>
                        </div>

                        {petInfo.feature && (
                            <div style={infoLineStyle}>
                                <span style={infoLabelStyle}>特徵：</span>
                                <span>{petInfo.feature}</span>
                            </div>
                        )}

                        {petInfo.other && (
                            <div style={infoLineStyle}>
                                <span style={infoLabelStyle}>其它資訊：</span>
                                <span>{petInfo.other}</span>
                            </div>
                        )}

                        <div style={contactSectionStyle}>
                            <h3 style={contactTitleStyle}>聯絡資訊</h3>

                            <div style={infoLineStyle}>
                                <span style={infoLabelStyle}>聯絡人：</span>
                                <span>{petInfo.ownerName || '未知'}</span>
                            </div>

                            <div style={infoLineStyle}>
                                <span style={infoLabelStyle}>聯絡電話：</span>
                                <span>{petInfo.phone || '未知'}</span>
                            </div>

                            {petInfo.altPhone && (
                                <div style={infoLineStyle}>
                                    <span style={infoLabelStyle}>其他聯絡電話：</span>
                                    <span>{petInfo.altPhone}</span>
                                </div>
                            )}
                        </div>

                        <button style={shareButtonStyle} onClick={handleShare}>
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="white"
                                style={{ marginRight: '8px' }}
                            >
                                <path d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm13 2h-2.5C13 5 11 7 11 9.5V11h-2v3h2v7h3v-7h2.5l.5-3h-3V9.5c0-.8.7-1.5 1.5-1.5H18V5z" />
                            </svg>
                            分享
                        </button>
                    </div>
                </div>

                <div style={locationSectionStyle}>
                    <p>
                        請檢查{' '}
                        <a
                            href={petInfo.locationUrl || '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={locationLinkStyle}
                        >
                            你現時的位置
                        </a>{' '}
                        是否正確
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Info;