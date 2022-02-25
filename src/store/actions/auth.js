import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (tokenId, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        tokenId: tokenId,
        userId: userId
    }
}

export const logout = () => {
    return {
        type: actionTypes.AUTH_INITIATE_LOGOUT
    }
}

export const logoutSucceed = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return {
        type: actionTypes.AUTH_CHECK_TIMEOUT,
        expirationTime: expirationTime
    }
}

export const authFail = (error) => {
    const errorMessage = setErrorMessage(error);
    return {
        type: actionTypes.AUTH_FAIL,
        error: errorMessage
    }
}

export const auth = (email, password, isSignUp) => {
   return {
       type: actionTypes.AUTH_USER,
       email: email,
       password: password,
       isSignUp: isSignUp
   }
}

export const checkAuthState = () => {
    return {
        type: actionTypes.AUTH_CHECK_STATE
    }
}


export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

const setErrorMessage = error => {
    let message;

    switch(error){
        case 'INVALID_EMAIL':
            message = "Please enter valid email address";
            break;
        case 'EMAIL_NOT_FOUND':
            message = "User account does not exist";
            break;
        case 'INVALID_PASSWORD':
            message = "Password entered is invalid";
            break;
        case 'USER_DISABLED':
            message = "Your account has been disabled. Please contact admin";
            break;    
        case 'EMAIL_EXISTS':
            message = "Email already exists";
            break;
        case 'WEAK_PASSWORD':
            message = "Weak Password. Password should be atleast 6 characters";
            break;
        default:
            message = "Unknown error occured";
    }
    return message;
}