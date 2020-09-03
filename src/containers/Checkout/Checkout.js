import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import queryString from 'query-string';
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

    state = {
        ingredients: null,
        totalPrice: 0
    }

    componentWillMount() {
        
        /*
        const query = new URLSearchParams(this.props.location.search);

        const ingredients = {};

        for(let param of query.entries()) {
            // ['salad','1']
            ingredients[param[0]] = +param[1];
        }
        */

        const ingredients = queryString.parse(this.props.location.search);
        let price = 0;

        Object.keys(ingredients).map(ing => {
            if(ing === "price") {
                price = +ingredients[ing];
            } else {
                ingredients[ing] = +ingredients[ing];
            }
            
            return null;
        });

        delete ingredients.price; // Delete price inserted into ingredients

        this.setState({
            ingredients: ingredients,
            totalPrice: price
        });


       
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();    
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        
        return (
            <div>
                <CheckoutSummary 
                ingredients={this.state.ingredients} 
                checkoutCancelled={this.checkoutCancelledHandler} 
                checkoutContinued={this.checkoutContinuedHandler} />
                <Route path={this.props.match.path + '/contact-data'} 
                render={(props) => (<ContactData ingredients={this.state.ingredients} 
                price={this.state.totalPrice} {...props} />)} />
            </div>
        )
    }
}

export default Checkout;