import React, { useEffect } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/spinner';
import { connect } from 'react-redux'
import * as actions from '../../store/actions/index';

const Orders = props => {

    const {onFetchOrders, token, userId} = props;

    useEffect(() => {
        onFetchOrders(token, userId);
    },[onFetchOrders, token, userId])

   
        let orders = <Spinner />
        if(!props.loading) {
            orders = (
                props.orders.map(order => {
                    return <Order key={order.id} ingredients={order.ingredients} price={order.price} />
                })
            );
        }
        return (
            <div>
                {orders}
            </div>
        );

}

const dispatchActionsToProps = (dispatch) => {
    return {
        onFetchOrders: (token, userId) => { dispatch(actions.fetchOrders(token, userId)) }
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.tokenId,
        userId: state.auth.userId
    }
}

export default connect(mapStateToProps ,dispatchActionsToProps)(withErrorHandler(Orders, axios));