// src/App.jsx
import React from 'react';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';


import { Helmet } from 'react-helmet';
import './fonts.css';
import './App.css';
import PetLocationMap from './pages/PetLocationMap';

const App = () => {
  return (
    <div className="app">
      <Helmet>
        <title>PTag - 關懷原於這裡，一個混合科技與藝術的寵物名牌</title>
        <meta property="og:title" content="Ptag" />
        <meta property="og:site_name" content="Ptag" />
        <meta property="og:url" content="https://www.ptag.com.hk/" />
        <meta property="og:image" content="https://www.ptag.com.hk/img/fb_display.jpg" />
        <meta property="og:description" content="關懷原於這裡，一個混合科技與藝術的寵物牌" />
        <meta property="fb:app_id" content="607616469433776" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <link rel="alternate" hreflang="vi" href="https://vi-vn.facebook.com/" />
        <meta name="keywords" content="Pet, PTag, Pet Tag, Lost, Protect, Protection, 寵物, 寵物牌, 保護, 保障, 智能寵物牌, 健康, 失寵, 失狗, 失貓, 尋狗, 尋貓, 尋寵, 寵物展, 推介產品, 寵物名牌, 寵物走失, 自訂寵物牌" />
        <meta name="description" content="PTag - 關懷，原於這裡。一個混合科技與藝術的寵物名牌。體積很細，功能很大。PTag，一個寵物資料庫，給你的愛寵多一個保障。" />
        <meta name="robots" content="noodp,noydir" />
        <meta name="author" content="Pet Boys Club, 寵物仔仔" />
      </Helmet>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path='/pet-location' element={<PetLocationMap />} />
          <Route path="/register" element={<Login initialTab="register" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;