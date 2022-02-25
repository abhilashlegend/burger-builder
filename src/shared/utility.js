export const validateField = (rule, value) => {
    let isValid = true;
    if(rule.isRequired) {
        isValid = value.trim() !== '' && isValid;
    }
    if(rule.minLength) {
        isValid = value.trim().length >= rule.minLength && isValid;
    }
    if(rule.maxLength) {
        isValid = value.length <= rule.maxLength && isValid;
    }
    if(rule.isEmail) {
        const pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        isValid = pattern.test(value) && isValid;
    }
    if(rule.isNumeric) {
        const pattern = /^\d+$/;
        isValid = pattern.test(value) && isValid;
    }
    
    return isValid;
}