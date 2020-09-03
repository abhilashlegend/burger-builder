import React, { Component } from 'react'
import Aux from '../../hoc/auxilary';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

	state = {
		showSideDrawer: false
	}

	sideDrawerClosedHandler = () => {
		this.setState({ showSideDrawer: false })
	}	

	toggleDrawerHandler = () => {
		/*
		let dstatus = this.state.showSideDrawer
		this.setState({ showSideDrawer: !dstatus })
		*/
		
		this.setState((prevState) => {
			return { showSideDrawer: !prevState.showSideDrawer};
		});
	}

	render() {
		return (
			<Aux>
			<Toolbar toggleDrawer={this.toggleDrawerHandler} />
			<SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler} />
			<main className={classes.Content}>
	 			{this.props.children}
			</main>
			</Aux>
		);
	}
}


export default Layout;