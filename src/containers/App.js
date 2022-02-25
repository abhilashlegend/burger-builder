import React, { useEffect, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import BurgerBuilder from './BurgerBuilder/BurgerBuilder';
import Logout from '../containers/Auth/Logout/Logout';
import * as actions from '../store/actions/index';
import { connect } from 'react-redux';

const Checkout = React.lazy(() => {
	return import('./Checkout/Checkout')
});

const Orders = React.lazy(() => {
	return import('./Orders/Orders')
});

const Auth = React.lazy(() => {
	return import('../containers/Auth/Auth')
});

const App = (props) => {

	const {checkAuthState} = props;

	useEffect(() => {
		checkAuthState();
	},[checkAuthState])

	let route = (
		<Switch>
			<Route path="/auth" render={(props) => <Auth {...props}  />} />
			<Route path="/" component={BurgerBuilder} />	
			<Redirect to="/" />
		</Switch>		
	)

	if(props.isAuthorized){
		route = (
			<Switch>
				<Route path="/checkout" render={(props) => <Checkout {...props} />} />
				<Route path="/orders" render={(props) => <Orders {...props} />} />
				<Route path="/auth" render={(props) => <Auth {...props} />} />
				<Route path="/logout" component={Logout} />
				<Route path="/" component={BurgerBuilder} />
				<Redirect to="/" />
			</Switch>	
		)
	}

	return (
		<Layout>
			<Suspense fallback={<p>Loading...</p>}>
				{route}
			</Suspense>
		</Layout>
	);
	
}

const mapDispatchToActions = dispatch => {
	return {
		checkAuthState: () => dispatch(actions.checkAuthState())		
	}
}

const mapStateToProps = state => {
	return {
		isAuthorized: state.auth.tokenId
	}
}

export default connect(mapStateToProps, mapDispatchToActions)(App);
