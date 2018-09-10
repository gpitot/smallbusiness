import React, {Component} from 'react';



class SearchArea extends Component {
	constructor(props) {
		super(props);


		this.state = {
			
		}
	}



	render() {
		if (this.props.mode === 'stores') {
			return (
				<div className = "searchArea">
					<select 
						name = "countryfilter"
						value = {this.props.countryfilter}
						onChange = {this.props.handleFilterChange}
					>
					{
						this.props.countries.map((country) => {
							return (
								<option
									key = {country}
									value = {country}
								>{country}</option>
							)
						})
					}
					</select>

					<input
						type = "text"
						name = "searchfilter"
						value = {this.props.searchfilter}
						onChange = {this.props.handleFilterChange}
						placeholder = "Search..."
					/>


					<div 
						className = "togglemode"
						onClick = {()=>{this.props.changeMode('products')}}
					>View products
					</div>

				</div>
			)
		}

		//mode === products
		return (

			<div className = "searchArea">
				<select 
					name = "countryfilter"
					value = {this.props.countryfilter}
					onChange = {this.props.handleFilterChange}
				>
				{
					this.props.countries.map((country) => {
						return (
							<option
								key = {country}
								value = {country}
							>{country}</option>
						)
					})
				}
				</select>

				<select 
					name = "productcategoryfilter"
					value = {this.props.productcategoryfilter}
					onChange = {this.props.handleFilterChange}
				>
				{
					this.props.product_categories.map((category) => {
						return (
							<option
								key = {category}
								value = {category}
							>{category}</option>
						)
					})
				}
				</select>

				<select 
					name = "genderfilter"
					value = {this.props.genderfilter}
					onChange = {this.props.handleFilterChange}
				>
					<option value = "all">All</option>
					<option value = "unisex">Unisex</option>
					<option value = "male">Male</option>
					<option value = "female">Female</option>
				</select>

				<input
					type = "text"
					name = "searchfilter"
					value = {this.props.searchfilter}
					onChange = {this.props.handleFilterChange}
					placeholder = "Search..."
				/>

				<div 
					className = "togglemode"
					onClick = {()=>{this.props.changeMode('stores')}}
				>View stores
				</div>
				
			</div>

		)

	}
		
}


export default SearchArea;