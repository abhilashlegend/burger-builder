import { put } from 'redux-saga/effects';
import * as actions from '../actions/index';
import axios from '../../axios';

export function* sagaPurchaseBurger(action) {
    yield put(actions.purchaseBurgerStart());
    try {
        const response = yield axios.post('orders.json?auth=' + action.token, action.orderData);
        yield put(actions.purchaseBurgerSuccess(response.data, action.orderData ))
    } catch (error) {
        yield put(actions.purchaseBurgerFail(error));
    }
}

export function* sagaFetchOrders(action) {
    yield put(actions.fetchOrdersStart());
    try {
        const queryParams = '?auth=' + action.token + '&orderBy="userId"&equalTo="' + action.userId + '"';
        const response = yield axios.get('orders.json' + queryParams);
        const fetchedOrders = [];

        for(let key in response.data) {
            fetchedOrders.push({
                ...response.data[key],
                id: key
            });
        }
        yield put(actions.fetchOrdersSuccess(fetchedOrders));
    } catch (error) {
        yield put(actions.fetchOrdersFailure(error));
    }  
}