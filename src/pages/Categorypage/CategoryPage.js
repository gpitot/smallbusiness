import React, {Component} from 'react';

import ProductList from './components/ProductList';
import StoreList from './components/StoreList';
import Navigation from '../Navigation/Navigation';

import SearchArea from './components/SearchArea';

import {
	api_get_all_stores,
	api_get_all_products
} from '../../api/Api';


class CategoryPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			stores:[],
			products:[],
			filtered_stores:[],
			filtered_products:[],
			visible_stores:[],
			visible_products:[],

			countries:[],
			countryfilter:'All countries',

			genderfilter:'All',

			
			product_categories:[],
			productcategoryfilter:'All categories',

			searchfilter:'',

			mode:'stores',


			loading:true

		}


		this.handleFilterChange = this.handleFilterChange.bind(this);
		this.filter = this.filter.bind(this);
		this.changeMode = this.changeMode.bind(this);
		this.handleScroll = this.handleScroll.bind(this);
	}

	componentDidMount() {
		
		this.changeMode(this.state.mode);

		window.addEventListener('scroll', this.handleScroll);
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.handleScroll);
	}

	handleScroll(e) {
		//console.log(e);
		var d = document.documentElement;
		var offset = d.scrollTop + window.innerHeight;
		var height = d.offsetHeight;
		
		if (height - offset < 50) {
			let mode = this.state.mode;
			let visible = this.state['visible_'+mode];
			let filtered = this.state['filtered_'+mode];
		
			
			visible = visible.concat(filtered.splice(visible.length, 11));
		
			this.setState({
				['visible_'+mode]:visible
			})

		}
	}



	changeMode(mode) {
		
		this.setState({
			loading:true,
			mode:mode
		});

		let category = this.props.match.params.category;
		if (mode === 'stores') {
			api_get_all_stores(category, (data) => {
				this.setState({loading:false});
				if (data.data) {
					let countries = getUniqueCountries(data.data);
					
					countries.unshift('All countries');

					this.setState({
						stores:data.data,
						filtered_stores:data.data.slice(),
						visible_stores:data.data.slice(0,11),
						countries:countries,


						filtered_products:[],
						visible_products:[],
						products:[]
					});
				}
			});
		} else {
			api_get_all_products(category, (data) => {
				this.setState({loading:false});
				if (data.data) {
						
					let countries = getUniqueCountries(data.data);
					countries.unshift('All countries');
					let categories = getUniqueCategories(data.data);
					categories.unshift('All categories');
					
					
					this.setState({
						products:data.data,
						filtered_products:data.data.slice(),
						visible_products:data.data.slice(0,11),
						countries:countries,

						product_categories:categories,

						stores:[],
						filtered_stores:[],
						visible_stores:[]
					});
				}
			})
		}		
	}



	handleFilterChange(e) {
		let name = e.target.name;
		this.setState({[name]:e.target.value}, ()=> {this.filter()})
	}


	filter() {
		let data;
		if (this.state.mode === 'stores') {
			data = this.state.stores.slice();

		} else {
			data = this.state.products.slice();
			//filter by gender
			let genderfilter = this.state.genderfilter;
			if (genderfilter.toLowerCase() !== 'all') {
				for (let i=data.length-1; i>=0;i--) {
					if (data[i].gender !== genderfilter) {
						data.splice(i, 1);
					}
				}
			}


			//filter by product category
			let productcategoryfilter = this.state.productcategoryfilter;
			if (productcategoryfilter.toLowerCase() !== 'all categories') {
				for (let i=data.length-1; i>=0;i--) {
					if (data[i].category !== productcategoryfilter) {
						data.splice(i, 1);
					}
				}
			}
			
			
		}

		//filter by country
		let countryfilter = this.state.countryfilter;
		console.log(countryfilter);
		if (countryfilter.toLowerCase() !== 'all countries') {
			for (let i=data.length-1; i>=0;i--) {
				if (data[i].country !== countryfilter) {
					data.splice(i, 1);
				}
			}
		}
		
		//filter by search
		let searchfilter = this.state.searchfilter.toLowerCase().split(' ');
		if (searchfilter.length > 0) {
			for (let i=data.length-1; i>=0;i--) {
				let match = true;
				for (let s of searchfilter) {
					if (match) {
						if (!data[i].name.toLowerCase().includes(s)) {
							match = false;
							for (let t of data[i].tags) {
								if (t.toLowerCase().includes(s)) {
									match = true;
								}
							}
						} 
					}
				}

				if (!match) {
					//not included in all search terms
					data.splice(i, 1);
				}
				
			
			}
		}



		this.setState({
			['filtered_'+this.state.mode]: data,
			['visible_'+this.state.mode]: data.slice(0,10),
		});

		console.log('FILTERED');
		
	}


	render() {
		return (
			<React.Fragment>
				<Navigation history = {this.props.history} />


				<h1 className = "categoryheading">{returnPageName(this.props.match.params.category)}</h1>


				<SearchArea 
					mode = {this.state.mode}

					countries = {this.state.countries}
					countryfilter = {this.state.countryfilter}

					product_categories = {this.state.product_categories}
					productcategory_filter = {this.state.productcategoryfilter}

					handleFilterChange = {this.handleFilterChange}

					changeMode = {this.changeMode}

				/>
				{
					this.state.mode === 'products' ? 
					<ProductList 
						products = {this.state.visible_products}
						displayAddYoursAtEnd = {this.state.products.length < 40}
						loading = {this.state.loading}
					/>
					:
					null
				}

				{
					this.state.mode === 'stores' ? 
					<StoreList 
						stores = {this.state.visible_stores}
						displayAddYoursAtEnd = {this.state.stores.length < 30}
						loading = {this.state.loading}
					/>
					:
					null
				}
				
				
			</React.Fragment>
		);
	}
}


function getUniqueCountries(data) {
	let countries = new Set()
	for (let d of data) {
		countries.add(d.country);
	}
	let cList = [];
	for (let c of countries) {
		cList.push(c);
	}

	cList.sort();
	return cList;
}

function getUniqueCategories(data) {
	let categories = new Set()
	for (let d of data) {
		categories.add(d.category);
	}
	let cList = [];
	for (let c of categories) {
		cList.push(c);
	}

	cList.sort();
	return cList;
}



function returnPageName(category) {
	switch(category) {
		case 'artsandcrafts':
			return 'Arts and Crafts';
		case 'clothing':
			return 'Clothing';
		case 'electronics':
			return 'Electronics';
		case 'food':
			return 'Food';
		case 'healthandbeauty':
			return 'Health and Beauty';
		case 'sportsandfitness':
			return 'Sports and Fitness';
		case 'toys':
			return 'Toys';

		default:
			return '';
	}
	
}

export default CategoryPage;