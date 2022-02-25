import React, { useState } from 'react';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/spinner';
import Input from '../../../components/UI/Input/Input';
import classes from './ContactData.module.css';
import axios from '../../../axios';
import { connect } from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import { purchaseBurger } from '../../../store/actions/index';
import { validateField } from '../../../shared/utility';

const ContactData = props => {
   const [orderForm, setOrderForm] = useState( {
				name: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your Name'
                    },
                    validation: {
                        isRequired: true
                    },
                    touched: false,
                    valid: false,
                    errorMessage: null,
                    value: ''
                },
				street: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Street'
                    },
                    validation: {
                        isRequired: true
                    },
                    touched: false,
                    valid: false,
                    errorMessage: null,
                    value: ''
                },
				zipCode: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Zip Code'
                    },
                    validation: {
                        isRequired: true,
                        minLength: 5,
                        maxLength: 5
                    },
                    touched: false,
                    valid: false,
                    errorMessage: null,
                    value: ''
                },
				country: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Country'
                    },
                    validation: {
                        isRequired: true
                    },
                    touched: false,
                    valid: false,
                    errorMessage: null,
                    value: ''
                },
			    email: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'email',
                        placeholder: 'Your E-mail'
                    },
                    validation: {
                        isRequired: true
                    },
                    touched: false,
                    valid: false,
                    errorMessage: null,
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
                    validation: {
                        isRequired: false,
                    },
                    valid: true,
                    value: 'fastest'
                },
        });
        
    
    const [formIsValid, setFormIsValid] = useState(false);


    const orderHandler = (event) => {
        event.preventDefault();

        /*this.setState({
			loading: true
        });
        */

        const formData = {};

        for(const elementIdentifier in orderForm) {
            formData[elementIdentifier] = orderForm[elementIdentifier].value;
        }


		const order = {
			ingredients: props.ings,
            price: props.price,
                orderData: formData,
            userId: props.userId
        }
        
        props.onBurgerOrder(order, props.token);
	
    }

    const onChangeHandler = (event, elementIdentifier) => {
        let updatedOrderForm = {
            ...orderForm
        }

        const updatedFormElement = {
            ...updatedOrderForm[elementIdentifier]
        }

        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = validateField(updatedFormElement.validation, event.target.value);
        updatedFormElement.touched = true;
        updatedFormElement.errorMessage = "Please enter valid " + elementIdentifier;

        updatedOrderForm[elementIdentifier] = updatedFormElement;

        let formValid = true;

        for(let element in updatedOrderForm) {
            formValid = updatedOrderForm[element].valid && formValid;
        }

        setOrderForm(updatedOrderForm);
        setFormIsValid(formValid);
       
    }

   
        let form = null;
        const formElements = [];
        for(let element in orderForm) {
            formElements.push({
                id: element,
                config: orderForm[element]
            });
        }
        if(props.loading) {
            form = <Spinner />;
        } else {
            form = (
                <form onSubmit={orderHandler}>
                     { formElements.map(formElement => {
                         return <Input elementType={formElement.config.elementType} key={formElement.id} 
                         elementConfig={formElement.config.elementConfig} 
                         changed={(event) => onChangeHandler(event, formElement.id)} 
                         value={formElement.config.value} isValid={formElement.config.valid}
                         hasValidation={formElement.config.validation} 
                         touched={formElement.config.touched}
                         error={formElement.config.errorMessage} />
                     })}        
                    <Button btntype="Success" disabled={!formIsValid}>ORDER</Button>
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

const mapStateToProps = (state) => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.price,
        loading: state.order.loading,
        token: state.auth.tokenId,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onBurgerOrder: (orderData, token) => dispatch(purchaseBurger(orderData, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));