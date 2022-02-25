import * as actionTypes from '../actions/actionTypes';

const initialState = {
    userId: null,
    tokenId: null,
    loading: false,
    error: null,
    authRedirect: "/"
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.AUTH_START:
            return {
                ...state,
                loading: true,
                error: null
            }
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                userId: action.userId,
                tokenId: action.tokenId,
                loading: false,
                error: null
            }
        case actionTypes.AUTH_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case actionTypes.AUTH_LOGOUT:
            return {
                ...state,
                userId: null,
                tokenId: null
            }
        case actionTypes.SET_AUTH_REDIRECT_PATH:
            return {
                ...state,
                authRedirect: action.path
            }
        default:
            return state;
    }
}

export default reducer;