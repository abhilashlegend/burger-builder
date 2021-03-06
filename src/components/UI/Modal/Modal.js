import React from 'react';
import classes from './Modal.module.css';
import Aux from '../../../hoc/auxilary';
import BackDrop from '../BackDrop/BackDrop';


const Modal = props => {

	/*
	shouldComponentUpdate(nextProps, nextState) {
		if(nextProps.show !== this.props.show || nextProps.children !== this.props.children) {
			return true;
		}
		return false;
	}
	*/
		return (
			<Aux>
				<BackDrop show={props.show} clicked={props.modalClosed}></BackDrop>
				<div className={classes.Modal} style={{
					transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
					opacity: props.show ? '1' : '0'
				}}>
					{props.children}
				</div>
			</Aux>
		);	
}



export default React.memo(Modal,(prevProps,nextProps) => {
	return nextProps.show === prevProps.show && nextProps.children === prevProps.children
});