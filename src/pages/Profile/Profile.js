import React, {Component} from 'react';

import StoreList from './components/StoreList';
import Dashboard from './components/Dashboard';
import Navigation from '../Navigation/Navigation';

import {
	api_get_users_stores,
	api_get_membership,
	api_get_all_countries,
	api_get_all_store_categories
} from '../../api/Api';


class Profile extends Component {
	constructor(props) {
		super(props);


		let newstore = {
			name:'',
			website:'',
			description:'',
			country:'Afghanistan',
			category:'Clothing',
			tags:[],
			small_image:'',
			large_image:'',
			products:[]
		}

		this.state = {
			stores:[],
			membership:'free',
			currentStore:newstore,
			loading:true,
			countries:[],
			categories:[],
			product_categories:[]
		}

		this.changeCurrentStore = this.changeCurrentStore.bind(this);	
		this.addStore = this.addStore.bind(this);
		
	}


	componentWillMount() {
		//document.body.style.background = "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(45,140,241,1) 25%, rgba(41,134,153,0.9996148117450105) 72%)";
	}

	componentWillUnmount() {

	}


	componentDidMount() {	
		
		api_get_membership((data) => {
		
			if (data.data !== null) {
				this.setState({membership:data.data});

				
				api_get_users_stores((data) => {
			
					if (data.data === null) {
						this.props.history.push({
							pathname: process.env.PUBLIC_URL + '/login'
					    })
					} else {
						let stores = data.data;

						if (stores.length > 0) {
							let currentStore = stores[0];
							this.setState({currentStore:currentStore})
						}

						this.setState({
							stores:stores,
							loading:false
						})
					}

				})

			} else {
				this.props.history.push({
					pathname: process.env.PUBLIC_URL + '/login'
			    })
			}

		})
		

		

		api_get_all_countries((data) => {
			if (data.data) {
				this.setState({
					countries:data.data
				})
			}
		})


		api_get_all_store_categories((data) => {
			if (data.data) {
				this.setState({
					categories:data.data
				})
			}
		})

		
		
	}


	addStore() {
		let stores = this.state.stores;
		let newstore = {
			name:'',
			website:'',
			description:'',
			country:'Afghanistan',
			category:'Clothing',
			tags:[],
			small_image:'',
			large_image:'',
			products:[]
		}
		stores.push(newstore);
		this.setState({
			currentStore:newstore,
			stores:stores
		})
	}

	changeCurrentStore(store) {
		this.setState({currentStore:store})
	}




	

	render() {
		if (this.state.loading) {
			return (
				<React.Fragment>
					<Navigation history = {this.props.history} />
					<div className = "profile">
						<h3 className = "loading">Loading</h3>
					</div>
				</React.Fragment>
			);
		}

		return (
			<React.Fragment>
				<Navigation history = {this.props.history} />
				<div className = "profile">
					{
						this.state.membership !== 'free' ?
						<StoreList 
							stores = {this.state.stores} 
							changeCurrentStore = {this.changeCurrentStore} 
							addStore={this.addStore}
						/>
						:
						null
					}

					<Dashboard 
						store = {this.state.currentStore}
						countries = {this.state.countries}
						categories = {this.state.categories}

						membership = {this.state.membership}
					/>

				</div>
			</React.Fragment>

		);
	}
}





export default Profile;