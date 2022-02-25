import * as ActionTypes from '../actions/actionTypes';

const initalState = {
    ingredients: {
        salad: 0,
        cheese: 0,
        bacon: 0,
        meat: 0
    },
    price: 4,
    error: false,
    building: false
}

const PRICE_CONFIG = {
	salad: 5,
	cheese: 10,
	bacon: 30,
	meat: 50
}

const reducer = (state = initalState, action) => {

    switch(action.type) {
        case ActionTypes.INIT_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    salad: 0,
                    cheese: 0,
                    bacon: 0,
                    meat: 0
                },
                price: 4,
                building: false
            }
        case ActionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                price: state.price + PRICE_CONFIG[action.ingredientName],
                building: true
                
            }
        case ActionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                price: state.price - PRICE_CONFIG[action.ingredientName],
                building: true
            }
        default:
            return state;
    }
}

export default reducer;