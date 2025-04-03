import axios from 'axios';
// The import { parseResponse } from './api' is unused, so I've removed it

// 创建一个新的 axios 实例用于宠物位置 API
const API_BASE_URL = 'https://www.ptag.com.hk';
const petLocationClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'multipart/form-data',
    }
});

// 获取宠物位置信息
export const fetchPetLocation = async (qrCode) => {
    try {
        // 首先尝试直接获取qr_info_n.php页面
        // Using petLocationClient instead of axios for consistency
        const response = await petLocationClient.get(`/php/qr_info_n.php`, {
            params: { qr: qrCode }
        });

        // 解析页面中的信息
        const html = response.data;
        // parsePetLocationFromHTML function was not defined, using extractPetInfoFromHTML instead
        const petInfo = extractPetInfoFromHTML(html);
        return petInfo;
    } catch (error) {
        console.error('获取宠物位置失败:', error);
        throw error;
    }
};

// 在前端请求
export const fetchPetInfo = async (qrCode, location = '') => {
    try {
        // 使用 petLocationClient 而不是直接使用 axios
        const response = await petLocationClient.get(`/php/qr_info_n.php`, {
            params: {
                qr: qrCode,
                location: location // 允许传递用户的实际位置
            }
        });

        // 解析HTML响应以提取宠物信息
        const html = response.data;
        return extractPetInfoFromHTML(html);
    } catch (error) {
        console.error('获取宠物信息失败:', error);
        throw error;
    }
};

// 从HTML中提取宠物信息的函数
const extractPetInfoFromHTML = (html) => {
    // 根据HTML的结构提取宠物信息
    // Note: The comment mentioned qr_info_image.php but the code uses qr_info_n.php

    // 例如，提取名字、类型等
    const petInfo = {
        petName: extractTextBetween(html, '名字：', '<'),
        petType: extractTextBetween(html, '類型：', '<'),
        petBreed: extractTextBetween(html, '品種：', '<'),
        petGender: extractTextBetween(html, '性別：', '<'),
        petFeatures: extractTextBetween(html, '特徵：', '<'),
        petOtherInfo: extractTextBetween(html, '其它資訊：', '<'),
    };

    return petInfo;
};

// 辅助函数，从文本中提取两个标记之间的内容
const extractTextBetween = (text, startMark, endMark) => {
    const startIndex = text.indexOf(startMark);
    if (startIndex === -1) return '';

    const contentStart = startIndex + startMark.length;
    const contentEnd = text.indexOf(endMark, contentStart);
    if (contentEnd === -1) return '';

    return text.substring(contentStart, contentEnd).trim();
};

// Export the helper function for potential use elsewhere
export { extractTextBetween };