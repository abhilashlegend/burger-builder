import React from 'react'
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
	{ label: 'Salad', type: 'salad' },
	{ label: 'Bacon', type: 'bacon' },
	{ label: 'Cheese', type: 'cheese' },
	{ label: 'Meat', type: 'meat' }
];

const buildControls = (props) => {
	return (
		<div className={classes.BuildControls}>
			<div><strong>Price: {props.price}</strong></div>
			{controls.map((ctrl) => {
				return <BuildControl key={ctrl.label} label={ctrl.label} added={() => props.addIngredient(ctrl.type)}
					removed={() => props.removeIngredient(ctrl.type)}
					infoDisabled={props.infoDisabled[ctrl.type]}
				 />
			})
			}
			<button className={classes.OrderButton} disabled={!props.purchasable}
			onClick={props.ordered}
			>Order Now</button>
		</div>
	);
}

export default buildControls;