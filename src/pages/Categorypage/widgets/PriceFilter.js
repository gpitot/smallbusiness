import React from 'react';


export default function PriceFilter(props) {
	return (
		<div data-role="rangeslider">
			<label htmlFor="price-min">Price:</label>

			<input 
				type = "text" 
				id = "price-min"
				name = "pricefilter_low"
				value = {props.pricefilter_low}
				onChange = {props.handleFilterChange}
			/>
			<input 
				type="range" 
				name = "pricefilter_low" 
				value={props.pricefilter_low} 
				onChange = {props.handleFilterChange}
				min="0" 
				max="1000" 
			/>


			<label htmlFor="price-max">Price:</label>
			<input 
				type = "text" 
				id = "price-max"
				name = "pricefilter_high"
				value = {props.pricefilter_high}
				onChange = {props.handleFilterChange}
			/>
			<input 
				type="range" 
				name="pricefilter_high" 
				value = {props.pricefilter_high} 
				onChange = {props.handleFilterChange}
				min="0" 
				max="1000" 
			/>
		</div>

	);
}