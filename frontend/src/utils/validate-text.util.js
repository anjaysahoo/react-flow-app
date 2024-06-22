const validateTextUtil = (text, rules) => {
    if (rules.maxLength && text.length > rules.maxLength) {
        return `Text exceeds maximum length of ${rules.maxLength}`;
    }
    if (rules.specialCharactersAllowed === false && /[^a-zA-Z0-9\s]/.test(text)) {
        return 'Special characters are not allowed';
    }
    return null;
};

export default validateTextUtil
