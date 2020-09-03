import React, { Component } from 'react';
import Aux from '../../hoc/auxilary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/spinner';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


const PRICE_CONFIG = {
	salad: 5,
	cheese: 10,
	bacon: 30,
	meat: 50
}

class BurgerBuilder extends Component {

	state = {
		ingredients: {
			salad: 0,
			cheese: 0,
			bacon: 0,
			meat: 0
		},
		price: 4,
		purchasable: false,
		purchasing: false,
		loading: false
	}

	addIngredientHandler = (type) => {

		const oldCount = this.state.ingredients[type];
		const newCount = oldCount + 1;

		const updatedIngredients = {
			...this.state.ingredients
		}

		
		updatedIngredients[type] = newCount;

		const oldPrice = this.state.price;
		const addPrice = PRICE_CONFIG[type];
		const newPrice = oldPrice + addPrice;

		this.setState({
			ingredients: updatedIngredients,
			price: newPrice
		});	
		this.updatePurchasable(updatedIngredients);
	}

	updatePurchasable = (ingredients) => {
		const sum = Object.keys(ingredients)
		.map((ingKey) => {
			return ingredients[ingKey];
		}).reduce((sum, el) => {
			return sum = sum + el;
		}, 0)
		if(sum > 0) {
			this.setState({
				purchasable: true
			});
		} else {
			this.setState({
				purchasable: false
			});
		}
	}


	removeIngredientHandler = (type) => {

		const oldCount = this.state.ingredients[type];

		if(oldCount <= 0) {
			return;
		}
		const newCount = oldCount - 1;

		const updatedIngredients = {
			...this.state.ingredients
		}

		
		updatedIngredients[type] = newCount;

		const oldPrice = this.state.price;
		const addPrice = PRICE_CONFIG[type];
		const newPrice = oldPrice - addPrice;

		this.setState({
			ingredients: updatedIngredients,
			price: newPrice
		});	
		this.updatePurchasable(updatedIngredients);
	}

	purchaseHandler = () => {
		this.setState({
			purchasing: true
		})
	}

	purchaseCancelHandler = () => {
		this.setState({
			purchasing: false
		});
	}

	purchaseContinueHandler = () => {

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
			console.log(response);
			this.setState({
				loading: false,
				purchasing: false
			})
		}).catch(error => {
			console.log(error);
			this.setState({
				loading: false,
				purchasing: false
			})
		})
		*/
		const queryParams = [];

		for(let i in this.state.ingredients) {
			queryParams.push(encodeURIComponent(i) + "=" + encodeURIComponent(this.state.ingredients[i]));
		}

		queryParams.push('price=' + this.state.price);

		const queryString = queryParams.join('&');

		this.props.history.push({
			pathname: '/checkout',
			search: '?' + queryString
		});

		

	}



	render() {

		const infoDisabled = {
			...this.state.ingredients
		}

		for(let key in infoDisabled) {
			infoDisabled[key] = infoDisabled[key] <= 0;
		}

		let orderSummary = <OrderSummary ingredients={this.state.ingredients}
						orderCancelled={this.purchaseCancelHandler}
						orderContinued={this.purchaseContinueHandler}
						price={this.state.price}
					 />;
		if(this.state.loading) {
			orderSummary = <Spinner />;
		}			 

		return (
			<Aux>
				<Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
					{orderSummary}
				</Modal>
				<Burger ingredients={this.state.ingredients} />
				<BuildControls addIngredient={this.addIngredientHandler}
					removeIngredient={this.removeIngredientHandler}
					infoDisabled={infoDisabled}
					price={this.state.price}
					purchasable={this.state.purchasable}
					ordered={this.purchaseHandler}
				 />
			</Aux>
		);
	}
}

export default withErrorHandler(BurgerBuilder, axios);