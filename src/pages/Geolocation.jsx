import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Geolocation = () => {
    const [searchParams] = useSearchParams();
    const qrCode = searchParams.get('qr') || '';
    const [location, setLocation] = useState(null);
    const [error, setError] = useState(null);
    const [mapLoaded, setMapLoaded] = useState(false);
    const mapRef = useRef(null);
    const googleMapRef = useRef(null);
    const navigate = useNavigate();

    // 加载谷歌地图API
    useEffect(() => {
        const loadGoogleMapsAPI = () => {
            const googleMapScript = document.createElement('script');
            googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyC-wHGq_fUmHZlgl44t1Nlc4O7Rn4VAf2I&libraries=places`;
            googleMapScript.async = true;
            googleMapScript.defer = true;
            window.document.body.appendChild(googleMapScript);

            googleMapScript.addEventListener('load', () => {
                setMapLoaded(true);
            });
        };

        loadGoogleMapsAPI();

        // 页面加载时自动请求定位权限
        requestLocation();

        return () => {
            // 清理可能的脚本加载
            const scriptTags = document.querySelectorAll('script[src*="maps.googleapis.com/maps/api"]');
            scriptTags.forEach(tag => {
                if (tag && tag.parentNode) {
                    tag.parentNode.removeChild(tag);
                }
            });
        };
    }, []);

    // 初始化地图
    useEffect(() => {
        if (!mapLoaded || !mapRef.current) return;

        const defaultLocation = { lat: 22.3193, lng: 114.1694 }; // 香港默认位置

        const mapOptions = {
            center: location?.coords ?
                { lat: location.coords.latitude, lng: location.coords.longitude } :
                defaultLocation,
            zoom: 15,
            mapTypeControl: true,
            streetViewControl: true,
            fullscreenControl: true,
        };

        googleMapRef.current = new window.google.maps.Map(mapRef.current, mapOptions);

        // 如果有位置信息，添加标记
        if (location?.coords) {
            new window.google.maps.Marker({
                position: {
                    lat: location.coords.latitude,
                    lng: location.coords.longitude
                },
                map: googleMapRef.current,
                title: "您的位置"
            });
        }
    }, [mapLoaded, location]);

    // 请求获取位置
    const requestLocation = () => {
        if (!navigator.geolocation) {
            setError('您的浏览器不支持地理定位功能');
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocation(position);
                setError(null);

                // 如果地图已加载，则更新中心点
                if (mapLoaded && googleMapRef.current) {
                    const userLocation = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };

                    googleMapRef.current.setCenter(userLocation);

                    // 添加标记
                    new window.google.maps.Marker({
                        position: userLocation,
                        map: googleMapRef.current,
                        title: "您的位置"
                    });
                }
            },
            (err) => {
                setError(`获取位置失败: ${err.message}`);
            },
            {
                enableHighAccuracy: true,
                timeout: 15000,
                maximumAge: 0
            }
        );
    };

    // 跳转到宠物详情页面
    const goToPetDetails = () => {
        // 这里可以替换为实际的宠物详情页面路径
        navigate(`/pet_detail_home?qr=${qrCode}`);
    };

    // 获取设备类型
    const getDeviceType = () => {
        const userAgent = navigator.userAgent.toLowerCase();
        if (/iphone|ipad|ipod/.test(userAgent)) {
            return 'iPhone';
        } else if (/android/.test(userAgent)) {
            return 'Android';
        }
        return 'Other';
    };

    const deviceType = getDeviceType();

    // 样式定义
    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'var(--color-background-light)',
        minHeight: '100vh',
    };

    const mapContainerStyle = {
        height: 'calc(100vh - 300px)',
        width: '80%',
        minHeight: '400px',
        position: 'relative',
        margin: '0 auto',
    };

    const titleStyle = {
        textAlign: 'center',
        fontSize: '44px',
        fontWeight: 'bold',
        margin: '20px 0',
    };

    const subtitleStyle = {
        textAlign: 'center',
        fontSize: '26px',
        margin: '0 20px 20px',
        lineHeight: '1.5',
    };

    // 黄色按钮
    const yellowButtonStyle = {
        display: 'block',
        width: '200px',
        margin: '20px auto',
        padding: '10px 15px',
        backgroundColor: "var(--color-button - primary)",
        color: 'black',
        border: 'none',
        borderRadius: '3px',
        fontSize: '16px',
        fontWeight: 'bold',
        cursor: 'pointer',
        textAlign: 'center',
    };

    const instructionContainerStyle = {
        margin: '30px 20px',
        padding: '20px',
        borderRadius: '8px',
    };

    const instructionTitleStyle = {
        textAlign: 'center',
        fontSize: '20px',
        fontWeight: 'bold',
        marginBottom: '20px',
    };

    const instructionListStyle = {
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
    };

    const deviceInstructionStyle = {
        flex: '1 1 300px',
        margin: '0 10px',
    };

    const deviceTitleStyle = {
        fontSize: '18px',
        fontWeight: 'bold',
        marginBottom: '10px',
    };

    const listStyle = {
        paddingLeft: '20px',
        lineHeight: '1.8',
    };

    return (
        <div style={containerStyle}>
            <Navbar />

            <div style={titleStyle}>PTag 智能寵物牌提提您</div>
            <div style={subtitleStyle}>
                請您開啟設備的定位功能，
                我們才能準確追蹤寵物的位置，並提供最佳的使用體驗。
            </div>

            <div style={mapContainerStyle} ref={mapRef}>
                {!mapLoaded && <div style={{ textAlign: 'center', padding: '50px' }}>加載地圖中...</div>}
            </div>

            {error && (
                <div style={{ color: 'red', textAlign: 'center', margin: '15px' }}>
                    {error}
                    <button
                        style={{ ...yellowButtonStyle, margin: '10px auto' }}
                        onClick={requestLocation}>
                        重新開啟定位服務
                    </button>
                </div>
            )}

            {/* 黄色"查看宠物详细资料"按钮 */}
            <button style={yellowButtonStyle} onClick={goToPetDetails}>
                查看寵物詳細資料
            </button>

            <div style={instructionContainerStyle}>
                <div style={instructionTitleStyle}>啟用定位服務</div>

                <div style={instructionListStyle}>
                    <div style={deviceInstructionStyle}>
                        <div style={deviceTitleStyle}>iPhone</div>
                        <ol style={listStyle}>
                            <li>前往「設定」→「私隱與保安」→「定位服務」。</li>
                            <li>確定已啟用「定位服務」。</li>
                            <li>向下捲動並找出所用的app。</li>
                        </ol>
                    </div>

                    <div style={deviceInstructionStyle}>
                        <div style={deviceTitleStyle}>Android</div>
                        <ol style={listStyle}>
                            <li>開啟「設定」應用程式。</li>
                            <li>轉到「位置」選項。</li>
                            <li>開啟位置開關「使用位置資訊」。</li>
                        </ol>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Geolocation;