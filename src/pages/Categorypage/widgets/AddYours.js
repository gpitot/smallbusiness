import React from 'react';
import { Link } from 'react-router-dom'

export default function AddYours(props) {
	return (
		<Link 
			className = "addyours"
			to =  {process.env.PUBLIC_URL + '/profile'}
		>

			Add your {props.mode}


		</Link>
	);
}