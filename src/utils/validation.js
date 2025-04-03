// src/utils/validation.js

/**
 * 验证注册表单数据
 * @param {Object} data - 包含表单字段的对象
 * @returns {Object} 包含验证结果和错误信息的对象
 */
export const validateRegisterForm = (data) => {
    const errors = {};

    // 验证姓名
    if (!data.Last_name) {
        errors.Last_name = '請輸入姓名';
    }

    // 验证电子邮件
    if (!data.emailsignup) {
        errors.emailsignup = '請輸入電子郵件信箱';
    } else if (!/\S+@\S+\.\S+/.test(data.emailsignup)) {
        errors.emailsignup = '請輸入有效的電子郵件信箱';
    }

    // 验证密码
    if (!data.passwordsignup) {
        errors.passwordsignup = '請輸入密碼';
    } else {
        const passwordLength = data.passwordsignup.length;
        const hasUpperCase = /[A-Z]/.test(data.passwordsignup);
        const hasLowerCase = /[a-z]/.test(data.passwordsignup);
        const hasNumber = /[0-9]/.test(data.passwordsignup);

        if (passwordLength < 8 || passwordLength > 12) {
            errors.passwordsignup = '密碼長度必須為8-12位';
        } else if (!(hasUpperCase && hasLowerCase && hasNumber)) {
            errors.passwordsignup = '密碼必須包含大寫字母、小寫字母和數字';
        }
    }

    // 验证确认密码
    if (data.passwordsignup !== data.passwordsignup_confirm) {
        errors.passwordsignup_confirm = '兩次輸入的密碼不一致';
    }

    // 验证服务条款同意
    if (!data.agreepolicy) {
        errors.agreepolicy = '請同意服務條款和隱私權聲明';
    }

    // 返回验证结果
    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};

/**
 * 验证登录表单数据
 * @param {Object} data - 包含登录表单字段的对象
 * @returns {Object} 包含验证结果和错误信息的对象
 */
export const validateLoginForm = (data) => {
    const errors = {};

    // 验证用户名/邮箱
    if (!data.username) {
        errors.username = '請輸入電子郵件信箱';
    }

    // 验证密码
    if (!data.password) {
        errors.password = '請輸入密碼';
    }

    // 返回验证结果
    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};

/**
 * 验证忘记密码表单
 * @param {Object} data - 包含忘记密码表单字段的对象
 * @returns {Object} 包含验证结果和错误信息的对象
 */
export const validateForgotPasswordForm = (data) => {
    const errors = {};

    // 验证用户名/邮箱
    if (!data.username) {
        errors.username = '請輸入電子郵件信箱';
    } else if (!/\S+@\S+\.\S+/.test(data.username)) {
        errors.username = '請輸入有效的電子郵件信箱';
    }

    // 返回验证结果
    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};