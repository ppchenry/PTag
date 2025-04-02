// src/utils/validation.js
export const validateRegisterForm = (data) => {
    const errors = {};

    if (!data.Last_name) {
        errors.Last_name = '請輸入姓名';
    }

    if (!data.emailsignup) {
        errors.emailsignup = '請輸入電子郵件信箱';
    } else if (!/\S+@\S+\.\S+/.test(data.emailsignup)) {
        errors.emailsignup = '請輸入有效的電子郵件信箱';
    }

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

    if (data.passwordsignup !== data.passwordsignup_confirm) {
        errors.passwordsignup_confirm = '兩次輸入的密碼不一致';
    }

    if (!data.agreepolicy) {
        errors.agreepolicy = '請同意服務條款和隱私權聲明';
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};