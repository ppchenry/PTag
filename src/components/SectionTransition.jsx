//预留的loading特效组件
import React from 'react';

const SectionTransition = ({ type = 'wave', fromColor = '#ffffff', toColor = '#f5f5f5' }) => {
    const waveStyle = {
        width: '100%',
        height: '100px',
        position: 'relative',
        marginTop: '-50px',
        zIndex: 1,
        overflow: 'hidden',
    };

    const arrowStyle = {
        width: '100%',
        height: '50px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '-25px',
        zIndex: 5,
    };

    const gradientStyle = {
        width: '100%',
        height: '100px',
        background: `linear-gradient(to bottom, ${fromColor} 0%, ${toColor} 100%)`,
        marginTop: '-50px',
        zIndex: 1,
    };

    const renderTransition = () => {
        switch (type) {
            case 'wave':
                return (
                    <div style={waveStyle}>
                        <svg viewBox="0 0 1440 100" preserveAspectRatio="none" style={{ position: 'absolute', bottom: 0 }}>
                            <path
                                fill={toColor}
                                d="M0,50 C150,100 350,0 500,50 C650,100 800,0 1000,50 C1200,100 1350,0 1440,50 L1440,100 L0,100 Z"
                            ></path>
                        </svg>
                    </div>
                );
            case 'arrow':
                return (
                    <div style={arrowStyle}>
                        <svg width="40" height="40" viewBox="0 0 24 24">
                            <path d="M7 10l5 5 5-5" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </div>
                );
            case 'gradient':
            default:
                return <div style={gradientStyle}></div>;
        }
    };

    return renderTransition();
};

export default SectionTransition;