// src/services/api.js
import axios from 'axios';

// 使用相对路径
const API_BASE_URL = '';

// 创建axios实例
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'multipart/form-data',
    }
});

// 登录API
export const login = async (username, password) => {
    try {
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);

        return await apiClient.post('/php/login.php', formData);
    } catch (error) {
        handleApiError(error);
    }
};

// 注册API
export const register = async (userData) => {
    try {
        const formData = new FormData();
        formData.append('Last_name', userData.Last_name);
        formData.append('emailsignup', userData.emailsignup);
        formData.append('passwordsignup', userData.passwordsignup);
        formData.append('passwordsignup_confirm', userData.passwordsignup_confirm);
        formData.append('agreepolicy', userData.agreepolicy ? 'on' : '');

        return await apiClient.post('/php/register.php', formData);
    } catch (error) {
        handleApiError(error);
    }
};

// 忘记密码API
export const forgotPassword = async (username) => {
    try {
        const formData = new FormData();
        formData.append('username', username);

        return await apiClient.post('/php/forgot.php', formData);
    } catch (error) {
        handleApiError(error);
    }
};

// 解析响应
export const parseResponse = (response) => {
    if (!response || !response.data) {
        return {
            message: '无响应数据',
            success: false
        };
    }

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

// 错误处理函数
const handleApiError = (error) => {
    if (error.response) {
        // 服务器响应了，但状态码不在2xx范围内
        console.error('响应错误:', error.response.status, error.response.data);
        throw {
            message: `服务器错误 (${error.response.status}): ${error.response.data || '未知错误'}`,
            status: error.response.status,
            data: error.response.data
        };
    } else if (error.request) {
        // 请求已发出，但没有收到响应
        console.error('请求错误，无响应:', error.request);
        throw {
            message: '无法连接到服务器，请检查网络连接',
            status: null,
            data: null
        };
    } else {
        // 在设置请求时发生了错误
        console.error('请求设置错误:', error.message);
        throw {
            message: `请求错误: ${error.message}`,
            status: null,
            data: null
        };
    }
};

// 请求拦截器
apiClient.interceptors.request.use(
    config => {
        // 可以在这里添加授权令牌等
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// 响应拦截器
apiClient.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        return Promise.reject(error);
    }
);