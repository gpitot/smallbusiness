import React from 'react';



export default function ProductList(props) {

	if (props.products.length === 0) {
		return <div className = "storefront-productlist"><h3>No products on display</h3></div>;
	}

	return (
		<div className = "storefront-productlist">

			{
				props.products.map((product) => {
					return (
						<a
							key = {product.productid}
							href = {product.url}
							className = "product"
							target = "_blank"
						>
							
							<img src = {product.small_image} alt = ""/>

							<div className = "product-info">
								
								<h3>{product.name}</h3>

								<div className = "price">
									${product.price}
								</div>
								
								<div className = "tags">
								{
									product.tags.map((tag, index) => {
										return (
											<div key = {index} className = "tag">{tag}</div>
										);
									})
								}
								</div>
							</div>
						</a>
					)
				})
			}

		</div>
	);
}