import React, {Component} from 'react';
import { Link } from 'react-router-dom'
import AddYours from '../widgets/AddYours';

class ProductList extends Component {
	


	render() {
		let prodindex = 0;
		if (this.props.loading) {
			return null;
		}
		return (

			<div className = "storelist">
				{
					this.props.products.map((product) => {
						prodindex += 1;
						if (prodindex === 41) {
							prodindex = 1;
							return (
								<React.Fragment key = {product.productid}>
									<AddYours mode = "products" />
									<Link
										to = {{
											pathname: process.env.PUBLIC_URL + '/store/' + product.webpath
										}}
										className = "product"
									>
										
										<img src = {product.small_image} alt=""/>

										<div className = "product-info">
											
											<h3>{product.name}</h3>

											<div className = "price">
												${product.price}
											</div>
											<div className = "country">{product.country}</div>
											<div className = "tags">
											{
												product.tags.map((tag, index) => {
													return (
														<div key = {index} className = "tag">#{tag}</div>
													);
												})
											}
											</div>
										</div>
									</Link>
								</React.Fragment>
							);	
						}

						return (
							<Link
								key = {product.productid}
								to = {{
									pathname: process.env.PUBLIC_URL + '/store/' + product.webpath
								}}
								className = "product"
							>
								
								<img src = {product.small_image} alt=""/>

								<div className = "product-info">
									
									<h3>{product.name}</h3>

									<div className = "price">
										${product.price}
									</div>
									<div className = "country">{product.country}</div>
									<div className = "tags">
									{
										product.tags.map((tag, index) => {
											return (
												<div key = {index} className = "tag">#{tag}</div>
											);
										})
									}
									</div>
								</div>
							</Link>
						)
					})
				}

				{
					this.props.products.length === 0 ?
					<h2>There are no products in this category yet</h2>
					:
					null
				}

				
				{
					this.props.displayAddYoursAtEnd && !this.props.loading ?
					<AddYours mode = "products" />
					:
					null
				}

			</div>
		);
	}
}


export default ProductList;