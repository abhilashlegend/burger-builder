import React from 'react';
import classes from './Input.module.css';

const input = (props) => {

    let inputElement = null;

    const elementClass = [classes.InputElement];
    
    if(!props.isValid && props.hasValidation && props.touched) {
       
        elementClass.push(classes.Invalid);
    }


    switch(props.elementType) {
        case ( 'input' ):
            inputElement = <input className={elementClass.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed} />;
            break;
        case ( 'textarea' ):
            inputElement = <textarea  className={elementClass.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed} />;
            break;
        case ( 'select' ):
            inputElement = <select className={elementClass.join(' ')} onChange={props.changed} value={props.value}>
                {props.elementConfig.options.map(option => {
                    return <option key={option.value} value={option.value}>{option.displayValue}</option>
                })}
            </select>    
            break;
        default:
            inputElement = <input  className={elementClass.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed} />;
    }
    
    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
            { !props.isValid && props.hasValidation && props.touched ? (<p className={classes.errorMessage}> {props.error} </p>) : null }
        </div>
    )
}

export default input;