import React from 'react';
import classes from './Order.module.css';

const order = (props) => {
    const ingredients = [];

    for(let ing in props.ingredients) {
        ingredients.push({
            name: ing,
            amount: props.ingredients[ing]
        });
    }


    const ingredientsOutput = ingredients.map(ingredient => {
        return <span className={classes.Ingredient} key={ingredient.name}>{ingredient.name} ({ingredient.amount})</span>
    })

    return (
        <div className={classes.Order}>
            <p>ingredients: {ingredientsOutput}</p>
            <p>Price: <strong>USD {props.price}</strong></p>
        </div>
    );
}

export default order;