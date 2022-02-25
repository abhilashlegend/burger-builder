import * as actionTypes from './actionTypes';


export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    };
};

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        id: id,
        orderData: orderData
    }
}

export const purchaseBurgerFail = error => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
}

export const purchaseBurger = (orderData, token) => {
    return {
        type: actionTypes.PURCHASE_BURGER,
        orderData,
        token
    }
}

export const purchaseBurgerInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}

export const fetchOrdersFailure = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAILURE,
        error: error
    }
}

export const fetchOrders = (token, userId) => {
    return {
        type: actionTypes.FETCH_ORDERS,
        token,
        userId
    }
}