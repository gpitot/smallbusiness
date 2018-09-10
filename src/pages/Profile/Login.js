import React, {Component} from 'react';
import { Link } from 'react-router-dom'

import Navigation from '../Navigation/Navigation';

import {
	api_login
} from '../../api/Api';


class Login extends Component {

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
			errormsg:'',
			checkingDetails:false
		}


		this.login = this.login.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}


	login(e) {
		e.preventDefault();
		//verifies login
		//returns error or success
		//on success add session and redirect to profile
		let email = this.state.email;
		let password = this.state.password;
		
		
		if (email.length < 5 || !email.includes > '@') {
			this.setState({errormsg:"That is not a valid email"});
			return
		}

		if (password.length < 7 || password.length > 100) {
			this.setState({errormsg:"Password must be between 7 and 100 characters long"});
			return
		}

		this.setState({checkingDetails:true})
		
		api_login({email:email, password:password}, (data)=> {
			
			//redirect to profile
			if (data.data) {
				this.props.history.push({
					pathname: process.env.PUBLIC_URL + '/profile'
			    })
			} else {
				this.setState({errormsg:"Incorrect details", checkingDetails:false})
			}
		});
	}

	handleChange(e) {
		let v = e.target.value;
		this.setState({
			[e.target.name]:v
		})
	}


	render() {
		if (this.state.checkingDetails) {

		}
		return (
			<div>
				
				<Navigation history = {this.props.history} />

				<form className = "logcreate">
					<label>Email</label>
					<input
						type = "text"
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

					<p>
					{this.state.errormsg}
					</p>

					{
						this.state.checkingDetails ?
						<h5>Checking details...</h5>
						:
						<input
							type = "submit"
							value = "Login"
							onClick = {this.login}
						/>
					}
					
					
					<p />
					<Link to = '/createaccount'>Don't have an account? Create one</Link>

				</form>

			</div>
		);
	}
}


export default Login;