/* Fields Validation helper */

/* check if phone number - only numbers and space,-,+,(,),/ */
const isTel = (value) => /^[+]?[0-9 ]+$/.test(value);

/* Check if e-mail */
const isEmail = (value) => {
    const re = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return re.test(value.toLowerCase());
}

/* Check if name/surname - only text accepted */
const isName = (value) => /^[a-zA-Z -]+$/.test(value.toLowerCase());

/* Check password for minimum requirements - at least 8 long and contain at least 1 special character */
const isCorrectPassword = (value) => {
    const regularExpression = /^(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    return regularExpression.test(value);
}

// if value is not valid return { message: 'error message' }
export const validateField = (type, value) => {
    const validationStatus = {
        message: ''
    };
    if (type === 'text') {
            if (!isName(value)) {
            validationStatus.message = 'Please enter correct name'
        }
    } else if (type === 'email') {
        if (!isEmail(value)) {
            validationStatus.message = 'Please enter correct email'
        }
    } else if (type === 'tel') {
        if (!isTel(value)) {
            validationStatus.message = 'Please enter correct phone number'
        }
    } else if ( type === 'password') {
        if (!isCorrectPassword(value)) {
            validationStatus.message = 'Password should be at least 8 symbols long and should contain at least one special character'
        }
    }
    return validationStatus;
}
