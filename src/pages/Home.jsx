// src/pages/Home.jsx
import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import FeaturesOverview from '../components/FeaturesOverview';
import AiSection from '../components/AiSection';
import MajorFunctions from '../components/MajorFunctions';
import ProductSelection from '../components/ProductSelection';
import Partnership from '../components/Partnership';
import Footer from '../components/Footer';
import Sponsors from '../components/Sponsors';

const Home = () => {
  return (
    <div >
      <Navbar />
      <HeroSection />
      <div >
        <FeaturesOverview />
        <AiSection />
        <MajorFunctions />
        <ProductSelection />
        <Partnership />
        <Sponsors />
      </div>
      <Footer />
    </div>
  );
};

export default Home;