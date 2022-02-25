import React, { useEffect, useState, useCallback } from 'react';
import Aux from '../../hoc/auxilary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
// import Spinner from '../../components/UI/Spinner/spinner';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect, useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions/index';


const BurgerBuilder = props => {

	//const [purchasable, setPurchasable] = useState(false);
	const [purchasing, setPurchasing] = useState(false);
	// const [loading, setLoading] = useState(false);

	const dispatch = useDispatch();

	const initIngredient = useCallback(() => dispatch(actions.initIngredient()),[]);
	const addIngredient = (ingName) => dispatch(actions.addIngredient(ingName));
	const removeIngredient = (ingName) => dispatch(actions.removeIngredient(ingName));
	const purchaseInit = () => dispatch(actions.purchaseBurgerInit());
	const onAuthRedirectPath = (path) => dispatch(actions.setAuthRedirectPath(path));
	
	const ing = useSelector(state => {
		return state.burgerBuilder.ingredients;
	});

	const price = useSelector(state => {
		return state.burgerBuilder.price;
	});

	const purchased = useSelector(state => {
		return state.order.purchased;
	});

	const error = useSelector(state => {
		return state.burgerBuilder.error;
	});

	const isAuthenticated = useSelector(state => {
		return state.auth.tokenId !== null;
	});


	useEffect(() => {
		initIngredient();
	}, [initIngredient]);
	
	const updatePurchasable = (ingredients) => {
		const sum = Object.keys(ingredients)
		.map((ingKey) => {
			return ingredients[ingKey];
		}).reduce((sum, el) => {
			return sum = sum + el;
		}, 0)
		if(sum > 0) {
			return true;
		} else {
			return false;
		}
	}
	
	const purchaseHandler = () => {
		if(isAuthenticated) {
			purchaseInit();
			setPurchasing(true);
		} else {
			onAuthRedirectPath("/checkout");
			props.history.push("/auth");
		}
	}

	const purchaseCancelHandler = () => {
		setPurchasing(false);
	}

	const purchaseContinueHandler = () => {


		/*
		this.setState({
			loading: true
		})	
		const order = {
			ingredients: this.state.ingredients,
			price: this.state.price,
			customer: {
				name: 'Abhilash N',
				address: {
					street: 'abc street',
					zipCode: '41325',
					country: 'India'
				},
			email: 'test@test.com'
			},
			deliveryMethod: 'fastest'
		}

		
		axios.post('orders', order).then(response => {
			
			this.setState({
				loading: false,
				purchasing: false
			})
		}).catch(error => {
		
			this.setState({
				loading: false,
				purchasing: false
			})
		})
		*/
		
		props.history.push({
			pathname: '/checkout'
		});

	}

		const infoDisabled = {
			...ing
		}

		for(let key in infoDisabled) {
			infoDisabled[key] = infoDisabled[key] <= 0;
		}

		let orderSummary = <OrderSummary ingredients={ing}
						orderCancelled={purchaseCancelHandler}
						orderContinued={purchaseContinueHandler}
						price={price}
					 />;
		/*if(loading) {
			orderSummary = <Spinner />;
		}	*/	
		
		let burger = error ? <p>Ingredients can't be loaded</p> : null;

		if(ing) {
			burger = (
				<Aux>
				<Modal show={purchasing} modalClosed={purchaseCancelHandler}>
					{orderSummary}
				</Modal>
				<Burger ingredients={ing} />
				<BuildControls addIngredient={addIngredient}
					removeIngredient={removeIngredient}
					infoDisabled={infoDisabled}
					price={price}
					purchasable={updatePurchasable(ing)}
					ordered={purchaseHandler}
					authenticated={isAuthenticated}
				 />
			</Aux>	
			)
		}

		return burger;
}

const mapStateToProps = (state) => {
	return {
		ing: state.burgerBuilder.ingredients,
		price: state.burgerBuilder.price,
		purchased: state.order.purchased,
		error: state.burgerBuilder.error,
		isAuthenticated: state.auth.tokenId !== null
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		initIngredient: () => dispatch(actions.initIngredient()),
		addIngredient: (ingName) => dispatch(actions.addIngredient(ingName)),
		removeIngredient: (ingName) => dispatch(actions.removeIngredient(ingName)),
		purchaseInit: () => dispatch(actions.purchaseBurgerInit()),
		onAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));