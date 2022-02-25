import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import classes from './Auth.module.css';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/spinner';
import * as actions from '../../store/actions/index';
import { Redirect } from 'react-router-dom';
import { validateField } from '../../shared/utility';

const Auth = props => {

    const [controls, setControls] = useState({
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'E-Mail Address'
                },
                validation: {
                    isRequired: true,
                    isEmail: true
                },
                touched: false,
                valid: false,
                errorMessage: null,
                value: ''
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                validation: {
                    isRequired: true,
                    minLength: 6
                },
                touched: false,
                valid: false,
                errorMessage: null,
                value: ''
            },
        })
        const [isSignUp, setIsSignUp] = useState(true);

        const {burgerBuilding, authRedirectPath, onSetAuthRedirectPath} = props;
    
        useEffect(() => {
            if(!burgerBuilding && authRedirectPath !== "/"){
                onSetAuthRedirectPath();
            }
        }, [burgerBuilding, authRedirectPath, onSetAuthRedirectPath])

    

    const onChangeHandler = (event, controlName) => {
       
        const updatedControls = {
            ...controls,
            [controlName] : {
                ...controls[controlName],
                value: event.target.value,
                valid: validateField(controls[controlName].validation, event.target.value),
                touched: true,
                errorMessage: "Please enter valid " + controlName
            }
        }

        setControls(updatedControls);

    }

    const onSubmitHandler = (event) => {
        event.preventDefault();
        props.auth(controls.email.value, controls.password.value, isSignUp);
    }

    const switchAuthForm = (event) => {
        event.preventDefault();
        setIsSignUp(!isSignUp);
    }

    
        const formElementsArray = [];
        for(let key in controls) {
            formElementsArray.push({
                id: key,
                config: controls[key]
            })
        }

        let form =  formElementsArray.map(formElement => {
            return <Input elementType={formElement.config.elementType} key={formElement.id} 
            elementConfig={formElement.config.elementConfig} 
            changed={(event) => onChangeHandler(event, formElement.id)} 
            value={formElement.config.value} isValid={formElement.config.valid}
            hasValidation={formElement.config.validation} 
            touched={formElement.config.touched}
            error={formElement.config.errorMessage} />
        })

        if(props.loading){
            form = <Spinner />
        }

        let errorMessage = null;

        if(props.error) {
            errorMessage = props.error;
        }

        let authRedirect = null;

        if(props.authenticated) {
            authRedirect = <Redirect to={props.authRedirectPath} />
        }    
        

        return (
            <div className={classes.Auth}>
                {authRedirect}
                <p className={classes.error}> {errorMessage} </p>
                <form onSubmit={onSubmitHandler}>
                    {form}
                    <Button btntype="Success">SUBMIT</Button>
                    <Button clicked={switchAuthForm} btntype="Danger">Switch to { isSignUp ? 'Sign In' : 'Sign Up' }</Button>
                </form>
            </div>
        )
    
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        authenticated: state.auth.tokenId !== null,
        burgerBuilding: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirect
    }
}

const mapDispatchToProps = dispatch => {
    return {
        auth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/"))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);