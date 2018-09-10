import React from 'react';




export default function StepDisplay(props) {



	return (
		<div className = "stepDisplay">
			{returnStep(props.step, props.stepsValid, 0, props.goToStep)}
			
			{returnStep(props.step, props.stepsValid, 1, props.goToStep)}
			
			{returnStep(props.step, props.stepsValid, 2, props.goToStep)}
			
			{returnStep(props.step, props.stepsValid, 3, props.goToStep)}

			
		</div>
	);
}


function returnStep(current, valids, index, goToStep) {
	let css= "step";
	
	if (valids[index] === true) {
		css += ' step-valid fas fa-check-circle';
	} else {
		css += ' step-invalid fas fa-exclamation-circle';
	}

	if (index === current) {
		css += ' current';
	}



	if (index < 3) {
		
		return (
			<React.Fragment>
				<div className = {css}  onClick = {()=>{goToStep(index) }}>
					<div className = "stepindicator">Step {index + 1}</div>
				</div>
				<div className = "progressline" />
			</React.Fragment>
		);
	}




	return (
		
			<div className = {css}  onClick = {()=>{goToStep(index) }}>
					<div className = "stepindicator">Step {index + 1}</div>
			</div>
		
	);
}