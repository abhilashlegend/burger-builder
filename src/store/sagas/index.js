import { takeEvery } from 'redux-saga/effects';
import { sagaCheckAuthTimeout, sagaLogout, sagaAuthUser, sagaCheckAuthState } from './auth';
import { sagaPurchaseBurger, sagaFetchOrders } from './order'
import * as actionTypes from '../actions/actionTypes';


export function* watchAuth() {
    yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, sagaLogout);
    yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, sagaCheckAuthTimeout);
    yield takeEvery(actionTypes.AUTH_USER, sagaAuthUser);
    yield takeEvery(actionTypes.AUTH_CHECK_STATE, sagaCheckAuthState);
}

export function* watchOrder() {
    yield takeEvery(actionTypes.PURCHASE_BURGER, sagaPurchaseBurger);
    yield takeEvery(actionTypes.FETCH_ORDERS, sagaFetchOrders);
}