import { delay } from 'redux-saga/effects';
import { put } from 'redux-saga/effects';
import * as actions from '../actions/index';
import axios from 'axios';

export function* sagaLogout(action) {
    yield localStorage.removeItem("token");
    yield localStorage.removeItem("userId");
    yield localStorage.removeItem("expiresIn");
    yield put(actions.logoutSucceed())
}

export function* sagaCheckAuthTimeout(action) {
    yield delay(action.expirationTime * 1000);
    yield put(actions.logout());
}

export function* sagaAuthUser(action) {
    yield put(actions.authStart());
    const authData = {
        email: action.email,
        password: action.password,
        returnSecureToken: true
    };
    let url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD5deo1vPrLJX6H9f8JeiZl8X-Ic4dYrOc";
        if(!action.isSignUp) {
            url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD5deo1vPrLJX6H9f8JeiZl8X-Ic4dYrOc";
        }
        try {
            const response = yield axios.post(url, authData)
            yield localStorage.setItem("token", response.data.idToken);
            yield localStorage.setItem("userId", response.data.localId);
            const expirationDate = yield new Date(new Date().getTime() + response.data.expiresIn * 1000);
            yield localStorage.setItem("expiresIn", expirationDate);
            yield put(actions.authSuccess(response.data.idToken, response.data.localId));
            yield put(actions.checkAuthTimeout(response.data.expiresIn))
        } catch (error) {
            yield put(actions.authFail(error.response.data.error.message));
        }
}

export function* sagaCheckAuthState(action) {
    const token = yield localStorage.getItem("token");
        if(!token) {
           yield put(actions.logout());
        } else {
            const expirationDate = yield new Date(localStorage.getItem("expiresIn"));
            if(expirationDate <= new Date()){
               yield put(actions.logout());
            } else {
                const userId = yield localStorage.getItem("userId");
                yield put(actions.authSuccess(token, userId));
                yield put(actions.checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000 ));
            }
            
        }
}