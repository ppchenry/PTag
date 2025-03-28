// src/pages/Home.jsx
import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import AiSection from '../components/AiSection';
import MajorFunctions from '../components/MajorFunctions';
import ProductSelection from '../components/ProductSelection';
import Footer from '../components/Footer';
import Sponsors from '../components/Sponsors';



const Home = () => {
  const pageStyle = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  };

  const contentStyle = {
    flex: '1 0 auto',
  };

  return (
    <div style={pageStyle}>
      <Navbar />
      <div style={contentStyle}>
        <HeroSection />
        <MajorFunctions />
        <AiSection />
        <ProductSelection />
        
        <Sponsors />
      </div>
      <Footer />
    </div>
  );
};

export default Home;