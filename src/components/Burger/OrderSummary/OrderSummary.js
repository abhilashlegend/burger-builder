import React from 'react';
import Aux from '../../../hoc/auxilary';
import Button from '../../UI/Button/Button';

const OrderSummary = props => {

	
		const ingredientsList = Object.keys(props.ingredients)
		.map((ingKey) => {
			return <li key={ingKey}><span style={{textTransform: 'capitalize' }}>{ingKey}</span> : {props.ingredients[ingKey]}</li>
		})

		return (
			<Aux>
				<h3>Your Order</h3>
				<p>A delicious burger with the following ingredients:</p>
				<ul>
					{ ingredientsList }

				</ul>
				<p><strong>Your Total Price: {props.price}</strong></p>
				<p>Continue to Checkout ? </p>
				<Button clicked={props.orderCancelled} btntype="Danger">CANCEL</Button>
				<Button clicked={props.orderContinued} btntype="Success">CONTINUE</Button>
			</Aux>
		);			
};

export default OrderSummary;