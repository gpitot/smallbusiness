import React, {Component} from 'react';
import { Link } from 'react-router-dom'


import Navigation from '../Navigation/Navigation';

import {
	api_create_account
} from '../../api/Api';

class CreateAccount extends Component {

	constructor(props) {
		super(props);

		if (localStorage.getItem('session') !== null) {
			this.props.history.push({
				pathname: process.env.PUBLIC_URL + '/profile'
		    })
		}

		this.state = {
			email:'',
			password:'',
			repeatpassword:'',

			errmsg:'',
			checkingDetails:false
		}


		this.create = this.create.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}


	handleChange(e) {
		let v = e.target.value;
		this.setState({
			[e.target.name]:v
		})
	}


	create(e) {
		e.preventDefault();
		//verifies create
		//returns error or success
		//on success add session and redirect to profile
		let email = this.state.email;
		let password = this.state.password;
		let rpassword = this.state.repeatpassword;

		let errmsg = '';
		
		if (password !== rpassword) {
			errmsg = 'Passwords do not match';
		} else if (password.length < 7) {
			errmsg = 'Password must be at least 7 characters long';
		} else  if (password.length > 100) {
			errmsg = 'Password cannot be over 100 characters long';
		} else if (email.length < 5 || !email.includes('@')) {
			errmsg = 'Please enter a valid email';
		}
		if (errmsg !== '') {
			this.setState({errmsg:errmsg});
			return;
		}
		
		this.setState({checkingDetails:true})
		api_create_account({email:email, password:password}, (data)=> {
			//redirect to profile
			if (data.data) {
				this.props.history.push({
					pathname: process.env.PUBLIC_URL + '/profile'
			    })
			} else {
				this.setState({errmsg:"That email is already in use or invalid", checkingDetails:false})
			}
		});

	}

	render() {
		return (
			<div>
				<Navigation history = {this.props.history} />


				<form className = "logcreate">
					

					<label>Email</label>
					<input
						type = "email"
						name = "email"
						value = {this.state.email}
						onChange = {this.handleChange}
					/>
					<label>Password</label>
					<input
						type = "password"
						name = "password"
						value = {this.state.password}
						onChange = {this.handleChange}
					/>

					<label>Repeat password</label>
					<input
						type = "password"
						name = "repeatpassword"
						value = {this.state.repeatpassword}
						onChange = {this.handleChange}
					/>

					<p>
						{this.state.errmsg}
					</p>

					

					{
						this.state.checkingDetails ?
						<h5>Checking details...</h5>
						:
						<input
							type = "submit"
							value = "Create Account"
							onClick = {this.create}
						/>
					}


					<p />
					<Link to = '/login'>Already have an account? Log in</Link>

				</form>

			</div>
		);
	}
}


export default CreateAccount;