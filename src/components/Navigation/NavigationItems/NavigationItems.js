import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
	<ul className={classes.NavigationItems}>
		<NavigationItem link="/" exact>Burger Builder</NavigationItem>
		{ props.authenticated ? <NavigationItem link="/orders">Order</NavigationItem> : null }
		{ !props.authenticated ? <NavigationItem link="/auth">Authenticate</NavigationItem> :
		<NavigationItem link="/logout">Logout</NavigationItem> }
		
	</ul>
);

export default navigationItems;