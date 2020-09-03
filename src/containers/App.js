import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import BurgerBuilder from './BurgerBuilder/BurgerBuilder';
import Checkout from './Checkout/Checkout';
import Orders from './Orders/Orders';

class App extends Component {
	render() {

		return (
			<Layout>
				<Switch>
					<Route path="/checkout" component={Checkout} />
					<Route path="/orders" component={Orders} />
					<Route path="/" component={BurgerBuilder} />
				</Switch>
			</Layout>
		);
	}
}



export default App;
