import React, { useState } from 'react'
import Aux from '../../hoc/auxilary';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import { connect } from 'react-redux';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

const Layout = props => {

	const [showSideDrawer, setShowSideDrawer] = useState(false);

	const sideDrawerClosedHandler = () => {
		setShowSideDrawer(!showSideDrawer)
	}	

	const toggleDrawerHandler = () => {
		/*
		let dstatus = this.state.showSideDrawer
		this.setState({ showSideDrawer: !dstatus })
		*/

		sideDrawerClosedHandler();
		
		/*
		this.setState((prevState) => {
			return { showSideDrawer: !prevState.showSideDrawer};
		});
		*/
	}

	
		return (
			<Aux>
			<Toolbar auth={props.isAuthenticated} toggleDrawer={toggleDrawerHandler} />
			<SideDrawer auth={props.isAuthenticated} open={showSideDrawer} closed={sideDrawerClosedHandler} />
			<main className={classes.Content}>
	 			{props.children}
			</main>
			</Aux>
		);
}

const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.auth.tokenId != null
	}
}

export default connect(mapStateToProps)(Layout);