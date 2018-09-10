import React, {Component} from 'react';
import Navigation from '../Navigation/Navigation';

import ProductList from './components/ProductList';

import {
	api_get_individual_store
} from '../../api/Api';

class Storefront extends Component {
	constructor(props) {
		super(props);

		//check if store data is present
		let q = this.props.location;
		let loading = false;
		let store = {
			storeid:null
		};
		if (q.query === undefined || q.query.store === undefined) {
			loading = true;
		} else {
			store = q.query.store;
			store.products = [];
		}

		this.state = {
			loading:loading,
			store:store
		}
		

	}	


	componentDidMount() {
		let storeid = this.state.store.storeid;
		let webpath = this.props.match.params.webpath;
		api_get_individual_store(storeid, webpath, (data) => {
			this.setState({store:data.data, loading:false})
		});

		window.scrollTo(0, 0)
	}


	render() {
		if (this.state.loading) {
			return <h4>Loading</h4>;
		}
		let store = this.state.store;

		let navStyle = {
			position:'fixed',
			width:'100%'
		}
		return (
			<React.Fragment>
				<Navigation history = {this.props.history} style = {navStyle}/>
				
				<img
					className = "storefront-image"
					src = {store.large_image}
					alt = ""
				/>

				<div className = "storefront">
					<div className = "storefront-about">
						<a href = {store.website} target="_blank">
							<h1>{store.name}</h1>
						</a>

						{store.description}
					</div>

					<ProductList products = {store.products} />

				</div>
				


			</React.Fragment>

		);
	}
}


export default Storefront;