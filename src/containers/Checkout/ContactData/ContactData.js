import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/spinner';
import Input from '../../../components/UI/Input/Input';
import classes from './ContactData.module.css';
import axios from '../../../axios';

class ContactData extends Component {
    state = {
        orderForm: {
				name: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your Name'
                    },
                    value: ''
                },
				street: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Street'
                    },
                    value: ''
                },
				zipCode: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Zip Code'
                    },
                    value: ''
                },
				country: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Country'
                    },
                    value: ''
                },
			    email: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'email',
                        placeholder: 'Your E-mail'
                    },
                    value: ''
                },
			    deliveryMethod: {
                    elementType: 'select',
                    elementConfig: {
                        options: [
                            {value: 'fastest', displayValue: 'Fastest'},
                            {value: 'cheapest', displayValue: 'Cheapest'}
                        ]
                    },
                    value: ''
                },
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        console.log(this.props.ingredients);

        this.setState({
			loading: true
		})	
		const order = {
			ingredients: this.props.ingredients,
			price: this.props.price,
		}

		
		axios.post('orders.json', order).then(response => {
			console.log(response);
			this.setState({
				loading: false
            });
            this.props.history.push("/");
		}).catch(error => {
			console.log(error);
			this.setState({
				loading: false
			})
		})
    }

    render() {
        let form = null;
        if(this.state.loading) {
            form = <Spinner />;
        } else {
            form = (
                <form>
                    <Input elementType="..." elementConfig="..." value="..." />
                    <Input inputtype="input" type="text" name="email" placeholder="Your email" />
                    <Input inputtype="input" type="text" name="street" placeholder="Street" />
                    <Input inputtype="input" type="text" name="postal" placeholder="Postal Code" />
                    <Button btntype="Success" clicked={event => this.orderHandler(event)}>ORDER</Button>
                </form>
            );
        }
        return (
            <div className={classes.ContactData}>
                <h3>Enter Your Contact Data</h3>
                {form}  
            </div>
        )
    }
}

export default ContactData;