// src/services/api.js
import axios from 'axios';

const API_BASE_URL = 'https://www.ptag.com.hk';

// 创建axios实例
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'multipart/form-data',
    }
});

// 登录API
export const login = async (username, password) => {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    return apiClient.post('/php/login.php', formData);
};

// 注册API
export const register = async (userData) => {
    const formData = new FormData();
    formData.append('Last_name', userData.Last_name);
    formData.append('emailsignup', userData.emailsignup);
    formData.append('passwordsignup', userData.passwordsignup);
    formData.append('passwordsignup_confirm', userData.passwordsignup_confirm);
    formData.append('agreepolicy', userData.agreepolicy ? 'on' : '');

    return apiClient.post('/php/register.php', formData);
};

// 忘记密码API
export const forgotPassword = async (username) => {
    const formData = new FormData();
    formData.append('username', username);

    return apiClient.post('/php/forgot.php', formData);
};

// 解析响应
export const parseResponse = (response) => {
    if (response.data.includes('alert')) {
        const alertMatch = response.data.match(/alert\("(.+?)"\)/);
        if (alertMatch && alertMatch[1]) {
            return {
                message: alertMatch[1],
                success: response.data.includes('成功') || response.data.includes('登入成功')
            };
        }
    }

    return {
        message: '操作完成',
        success: true
    };
};