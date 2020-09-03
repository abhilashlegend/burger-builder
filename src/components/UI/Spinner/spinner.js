import React from 'react';
import classes from './spinner.module.css';

const spinner = (props) => {
	return (
		<div style={{textAlign: 'center'}}>
			<div className={classes["lds-ring"]}><div></div><div></div><div></div><div></div></div>
		</div>
	);
}

export default spinner;