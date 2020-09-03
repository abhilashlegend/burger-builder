import React, { Component } from 'react';
import Aux from '../../../hoc/auxilary';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {

	componentWillUpdate() {
		console.log("[Order Summary");
	}

	render() {
		const ingredientsList = Object.keys(this.props.ingredients)
		.map((ingKey) => {
			return <li key={ingKey}><span style={{textTransform: 'capitalize' }}>{ingKey}</span> : {this.props.ingredients[ingKey]}</li>
		})



		return (
			<Aux>
				<h3>Your Order</h3>
				<p>A delicious burger with the following ingredients:</p>
				<ul>
					{ ingredientsList }

				</ul>
				<p><strong>Your Total Price: {this.props.price}</strong></p>
				<p>Continue to Checkout ? </p>
				<Button clicked={this.props.orderCancelled} btntype="Danger">CANCEL</Button>
				<Button clicked={this.props.orderContinued} btntype="Success">CONTINUE</Button>
			</Aux>
		);	
	}
	
	
};

export default OrderSummary;