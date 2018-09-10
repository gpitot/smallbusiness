import React from 'react';

import { Link } from 'react-router-dom'

import artsandcrafts from '../../../images/artsandcrafts.jpeg';
import clothing from '../../../images/clothing.jpeg';
import electronics from '../../../images/electronics.jpeg';
import food from '../../../images/food.jpeg';
import healthandbeauty from '../../../images/healthandbeauty.jpeg';
import sportsandfitness from '../../../images/sportsandfitness.jpeg';
import toys2 from '../../../images/toys2.jpg';

function CategoryList(props) {

	const categories = [
		{image: artsandcrafts, name: "Arts and Crafts", webpath: "artsandcrafts"},
		{image: clothing, name: "Clothing", webpath: "clothing"},
		{image: electronics, name: "Electronics", webpath: "electronics"},
		{image: food, name: "Food", webpath: "food"},
		{image: healthandbeauty, name: "Health and Beauty", webpath: "healthandbeauty"},
		{image: sportsandfitness, name: "Sports and Fitness", webpath: "sportsandfitness"},
		{image: toys2, name: "Toys", webpath: "toys"}
	];


	return (
		<div className = "categorylist">
			{
				categories.map((category) => {
					return (
						<Link 
							className = "category"
							to = {"/category/" + category.webpath}
							key = {category.webpath}
						>
							<div className="category-image-container">
								<img src = {category.image} alt = "" />
							</div>
							
							<div className = "name">
								{category.name}
							</div>
						</Link>

					);
				})
			}

		</div>
	);
}


export default CategoryList;