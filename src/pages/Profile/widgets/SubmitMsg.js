import React from 'react';



export default function SubmitMsg(props) {
	let style;
	if (props.error) {
		style = {
			backgroundColor:'red'
		}
	} else {
		style = {
			backgroundColor:'lightgreen'
		}
	}
	return (
		<div 
			className = "submitMsg"
			onClick = {props.close}
			style = {style}
		>
			<div className = "exit">X</div>
			{props.msg}
		</div>
	);
}