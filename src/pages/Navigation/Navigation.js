import React, {Component} from 'react';
import { Link } from 'react-router-dom'

class Navigation extends Component {
	constructor(props) {
		super(props);
	
		let loggedin = localStorage.getItem('session') !== null ? true : false;
		this.state = {
			loggedin:loggedin
		}

		this.logout = this.logout.bind(this);
		this.loggedInRender = this.loggedInRender.bind(this);
	}


	logout() {
		localStorage.removeItem('session');
		this.setState({loggedin:false})
		this.props.history.push({
			pathname: process.env.PUBLIC_URL + '/'
	    })
	}


	loggedInRender() {
		if (this.state.loggedin) {
			return (
				<React.Fragment>
					<div><Link to = {process.env.PUBLIC_URL + '/profile'} className = "fas fa-user"></Link></div>
					<div onClick = {this.logout}>Logout</div>
				</React.Fragment>
			);
		}

		return <div><Link to = {process.env.PUBLIC_URL + '/login'}>Login</Link></div>
	}

	render() {
		return (
			<div className = "navigation" style = {this.props.style}>
				<div><Link to = {process.env.PUBLIC_URL + '/'} className = "fas fa-home"></Link></div>

				{this.loggedInRender()}

			</div>
		);
	}
}


export default Navigation