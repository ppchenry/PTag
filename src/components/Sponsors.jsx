import React from 'react';

const Sponsors = () => {
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
        height: '1204px',
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginLeft: 'calc(-50vw + 50%)', 
        boxSizing: 'border-box',
    };

    const contentContainerStyle = {
        maxWidth: '1400px',
        width: '100%',
        padding: '80px 20px',
        display: 'flex',
        flexDirection: 'column',
    };

    const titleStyle = {
        fontSize: '32px',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: '60px',
        fontFamily: 'Helvetica, Arial, sans-serif',
    };

    const logosContainerStyle = {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '50px',
        marginBottom: '100px',
    };

    const logoItemStyle = {
        width: '150px',
        height: '150px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    };

    const logoImageStyle = {
        maxWidth: '100%',
        maxHeight: '100%',
        objectFit: 'contain',
    };

    const secondSectionStyle = {
        marginTop: '50px',
    };

    const partnersContainerStyle = {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '60px 80px', 
    };

    const partnerItemStyle = {
        width: '220px',
        height: '120px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
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
                    <div style={partnersContainerStyle}>
                        {partners.map(partner => (
                            <div key={partner.id} style={partnerItemStyle}>
                                <img
                                    src={partner.image}
                                    alt={partner.name}
                                    style={logoImageStyle}
                                    
                                    onError={(e) => { e.target.src = '/api/placeholder/220/100' }}
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