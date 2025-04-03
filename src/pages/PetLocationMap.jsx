import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { fetchPetLocation } from '../services/petLocationApi';


const GOOGLE_MAPS_API_KEY = 'AIzaSyC-wHGq_fUmHZlgl44t1Nlc4O7Rn4VAf2I';


const LoadingView = () => (
    <div className="flex justify-center items-center h-96">
        <p>加载中...</p>
    </div>
);


const ErrorView = ({ message }) => (
    <div className="flex justify-center items-center h-96">
        <p className="text-red-500">Error: {message}</p>
    </div>
);


const PetInfoPanel = ({ petData, isMobile }) => {
    const infoContainerStyle = {
        flex: isMobile ? '1 0 auto' : '0 0 300px',
        padding: '20px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    };

    const headingStyle = {
        fontSize: isMobile ? '20px' : '24px',
        marginBottom: '20px',
        color: 'var(--color-black)',
    };

    const petImageStyle = {
        width: '100%',
        height: 'auto',
        borderRadius: '8px',
        marginBottom: '15px',
    };

    const infoRowStyle = {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '10px',
    };

    const infoLabelStyle = {
        flex: '0 0 90px',
        fontSize: '14px',
        color: '#666',
    };

    const infoValueStyle = {
        fontSize: '16px',
        fontWeight: '500',
        color: '#333',
    };

    const buttonStyle = {
        backgroundColor: 'var(--color-button-primary)',
        color: 'var(--color-black)',
        border: 'none',
        padding: '12px 20px',
        fontSize: 'var(--font-size-base)',
        fontWeight: 'bold',
        borderRadius: '3px',
        cursor: 'pointer',
        width: '100%',
        marginTop: '15px',
    };

    return (
        <div style={infoContainerStyle}>
            <h2 style={headingStyle}>{petData.petName} 的位置</h2>

            {petData.photoUrl && (
                <img
                    src={petData.photoUrl}
                    alt={petData.petName}
                    style={petImageStyle}
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/img/default-pet.jpg";
                    }}
                />
            )}

            <div style={infoRowStyle}>
                <span style={infoLabelStyle}>位置:</span>
                <span style={infoValueStyle}>{petData.address}</span>
            </div>

            <div style={infoRowStyle}>
                <span style={infoLabelStyle}>最后更新:</span>
                <span style={infoValueStyle}>
                    {new Date(petData.lastUpdate).toLocaleString()}
                </span>
            </div>

            <div style={infoRowStyle}>
                <span style={infoLabelStyle}>联系电话:</span>
                <span style={infoValueStyle}>{petData.contact}</span>
            </div>

            {petData.ownerName && petData.ownerName !== "未知" && (
                <div style={infoRowStyle}>
                    <span style={infoLabelStyle}>主人:</span>
                    <span style={infoValueStyle}>{petData.ownerName}</span>
                </div>
            )}

            {petData.contact && petData.contact !== "未提供联系方式" && (
                <button
                    style={buttonStyle}
                    onClick={() => window.location.href = `tel:${petData.contact.replace(/\s+/g, '')}`}
                >
                    联系主人
                </button>
            )}
        </div>
    );
};

// Map utilities
const MapUtils = {
    loadScript: (src, callbackName, callback) => {
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.defer = true;

        // 设置全局回调函数
        if (callbackName && callback) {
            window[callbackName] = callback;
        }

        document.head.appendChild(script);
        return script;
    },

    createInfoWindowContent: (petInfo) => {
        return `
      <div style="padding: 10px; max-width: 200px;">
        <h3 style="margin-top: 0;">${petInfo.petName || '我的宠物'}</h3>
        <p style="margin-bottom: 5px;">最后更新: ${new Date(petInfo.lastUpdate).toLocaleString()}</p>
        ${petInfo.photoUrl ? `<img src="${petInfo.photoUrl}" alt="${petInfo.petName}" style="width: 100%; border-radius: 4px;">` : ''}
      </div>
    `;
    }
};

const PetLocationMap = () => {
    // Get URL parameters
    const [searchParams] = useSearchParams();
    const qrCode = searchParams.get('qr');
    const navigate = useNavigate();

    // State
    const [petInfo, setPetInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [map, setMap] = useState(null);
    const [marker, setMarker] = useState(null);
    const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
    const [isMapInitialized, setIsMapInitialized] = useState(false);

    // Responsive layout
    const isMobile = windowWidth < 768;
    const isTablet = windowWidth >= 768 && windowWidth < 1024;

    // Listen for window resize
    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Fetch pet information
    useEffect(() => {
        if (!qrCode) {
            setError('无效的宠物牌号码');
            return;
        }

        const getPetInfo = async () => {
            try {
                setLoading(true);
                const data = await fetchPetLocation(qrCode);
                setPetInfo(data);
                setLoading(false);
            } catch (err) {
                console.error('获取宠物信息出错:', err);

                // 创建后备数据
                const fallbackData = {
                    petName: `宠物#${qrCode}`,
                    petId: qrCode,
                    latitude: 22.3193,  // 默认香港位置
                    longitude: 114.1694,
                    lastUpdate: new Date().toISOString(),
                    address: '暂无地址信息',
                    contact: '暂无联系方式',
                    ownerName: '未知',
                    photoUrl: '/img/default-pet.jpg'
                };

                // 如果无法获取数据，使用后备数据而不是显示错误
                setPetInfo(fallbackData);
                setError(`无法获取实时位置信息：${err.message}`);
                setLoading(false);

                // 只有在完全无效的宠物标签情况下才重定向
                if (err.message.includes('无效') || err.message.includes('找不到')) {
                    setTimeout(() => navigate('/'), 3000);
                }
            }
        };

        getPetInfo();
    }, [qrCode, navigate]);

    // 使用修改后的初始化Google Maps函数
    const initMapWithElement = (mapElement) => {
        if (!petInfo) {
            console.warn('没有宠物信息，无法初始化地图');
            return;
        }

        // 检查地图是否已经初始化
        if (isMapInitialized) {
            console.log('地图已经初始化，跳过');
            return;
        }

        try {
            const mapOptions = {
                center: {
                    lat: petInfo.latitude || 22.3193,
                    lng: petInfo.longitude || 114.1694
                },
                zoom: 15,
                zoomControl: true,
                mapTypeControl: false,
                scaleControl: true,
                streetViewControl: false,
                rotateControl: false,
                fullscreenControl: true
            };

            console.log('初始化地图，中心点:', mapOptions.center);

            const newMap = new window.google.maps.Map(mapElement, mapOptions);

            // 创建宠物位置标记
            const newMarker = new window.google.maps.Marker({
                position: {
                    lat: petInfo.latitude || 22.3193,
                    lng: petInfo.longitude || 114.1694
                },
                map: newMap,
                title: petInfo.petName || '我的宠物',
                icon: {
                    url: '/icons/icon1.png',
                    scaledSize: new window.google.maps.Size(40, 40)
                },
                animation: window.google.maps.Animation.DROP
            });

            // 创建信息窗口
            const infoWindow = new window.google.maps.InfoWindow({
                content: MapUtils.createInfoWindowContent(petInfo)
            });

            newMarker.addListener('click', () => {
                infoWindow.open(newMap, newMarker);
            });

            // 自动打开信息窗口
            infoWindow.open(newMap, newMarker);

            setMap(newMap);
            setMarker(newMarker);
            setIsMapInitialized(true);

            console.log('地图初始化成功');
        } catch (error) {
            console.error('地图初始化失败:', error);
        }
    };

    // 初始化Google Maps
    const initGoogleMap = () => {
        if (!petInfo) {
            console.warn('没有宠物信息，无法初始化地图');
            return;
        }

        // 首先确认元素存在
        const mapElement = document.getElementById('pet-location-map');
        if (!mapElement) {
            console.error('找不到地图容器元素(#pet-location-map)');
            // 尝试延迟初始化
            setTimeout(() => {
                const retryElement = document.getElementById('pet-location-map');
                if (retryElement) {
                    console.log('延迟找到地图元素，重新尝试初始化');
                    initMapWithElement(retryElement);
                } else {
                    console.error('即使延迟后仍找不到地图元素');
                }
            }, 500);
            return;
        }

        initMapWithElement(mapElement);
    };

    // 加载Google Maps API和初始化地图
    useEffect(() => {
        if (!petInfo || loading) return;

        // 清理函数
        let mapScriptCleanup = null;

        // 移除任何现有的Google Maps脚本
        const existingScripts = document.querySelectorAll('script[src*="maps.googleapis.com"]');
        existingScripts.forEach(script => {
            if (script && script.parentNode) {
                script.parentNode.removeChild(script);
            }
        });

        // 清理全局回调
        if (window.initGoogleMap) {
            delete window.initGoogleMap;
        }

        // 检查Google Maps是否已加载
        if (window.google && window.google.maps) {
            console.log('Google Maps已加载，直接初始化地图');
            initGoogleMap();
        } else {
            console.log('加载Google Maps API');

            // 设置全局回调函数
            window.initGoogleMap = function () {
                console.log('Google Maps API回调被触发');
                setTimeout(() => {
                    if (window.google && window.google.maps) {
                        initGoogleMap();
                    } else {
                        console.error("Google Maps加载失败");
                    }
                }, 500);
            };

            // 加载新脚本 - 添加loading=async参数
            const script = MapUtils.loadScript(
                `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&callback=initGoogleMap&loading=async`,
                'initGoogleMap',
                window.initGoogleMap
            );

            mapScriptCleanup = () => {
                if (script && document.head.contains(script)) {
                    document.head.removeChild(script);
                }
                if (window.initGoogleMap) {
                    delete window.initGoogleMap;
                }
            };
        }

        // 清理函数
        return () => {
            if (mapScriptCleanup) mapScriptCleanup();
            if (map) {
                // 清理地图实例
                setIsMapInitialized(false);
            }
        };
    }, [petInfo, loading]);

    // Page styles
    const pageStyle = {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
    };

    const containerStyle = {
        flex: 1,
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        padding: isMobile ? '10px' : '20px',
        gap: '20px',
        maxWidth: '1200px',
        margin: '0 auto',
        width: '100%',
        boxSizing: 'border-box',
    };

    const mapContainerStyle = {
        flex: 1,
        minHeight: isMobile ? '400px' : '600px',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    };

    // Render loading state
    if (loading) {
        return (
            <div style={pageStyle}>
                <Navbar />
                <LoadingView />
                <Footer />
            </div>
        );
    }

    // 不再在error存在时返回错误视图，因为我们有后备数据
    const petData = {
        petName: petInfo?.petName || "未命名宠物",
        photoUrl: petInfo?.photoUrl || "/img/default-pet.jpg",
        lastUpdate: petInfo?.lastUpdate || new Date().toISOString(),
        address: petInfo?.address || "未知地址",
        contact: petInfo?.contact || "未提供联系方式",
        ownerName: petInfo?.ownerName || "未知"
    };

    return (
        <div style={pageStyle}>
            <Navbar />

            <div style={{ padding: '20px 0' }}>
                <div style={containerStyle}>
                    <PetInfoPanel petData={petData} isMobile={isMobile} />
                    <div style={mapContainerStyle} id="pet-location-map"></div>
                </div>

                {/* 如果有错误但仍显示UI，则在下方显示错误信息 */}
                {error && (
                    <div style={{
                        margin: '10px auto',
                        maxWidth: '1200px',
                        padding: '10px',
                        backgroundColor: '#fff3f3',
                        borderRadius: '8px',
                        color: '#d32f2f',
                        textAlign: 'center'
                    }}>
                        注意: {error}
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
};

export default PetLocationMap;