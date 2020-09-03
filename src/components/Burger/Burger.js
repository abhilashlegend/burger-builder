import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.module.css';

const burger = (props) => {

	let transformedIngredients = Object.keys(props.ingredients)
	.map(keyIn => {
		return [...Array(props.ingredients[keyIn])].map((_,ind) => {
			return <BurgerIngredient key={keyIn + ind} type={keyIn} />
		})
	}).reduce((prev, curv) => {
		return prev.concat(curv);
	},[]);

	if(transformedIngredients.length === 0) {
		transformedIngredients = <p>Please start adding ingredients!</p>
	}


	return (
		<div className={classes.Burger}>
			<BurgerIngredient type="bread-top" />
				{transformedIngredients}
			<BurgerIngredient type="bread-bottom" />
		</div>
	);
}

export default burger;