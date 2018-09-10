import React, {Component} from 'react';

import { Link } from 'react-router-dom'

import AddYours from '../widgets/AddYours';

class StoreList extends Component {
	

	render() {
		let storeindex = 0;
		if (this.props.loading) {
			return null;
		}
		return (
			<div className = "storelist">
				{
					this.props.stores.map((store) => {
						storeindex += 1;
						if (storeindex === 31) {
							storeindex = 1;
							return (
								<React.Fragment key = {store.storeid}>
									<AddYours mode = "store" />
									<Link
										to = {{
											pathname: process.env.PUBLIC_URL + '/store/' + store.webpath,
											query : {store:store}
										}}
										className = "store"
									>
									
										<img src = {store.small_image} alt = ""/>

										<div className = "store-info">
											
											<h3>{store.name}</h3>
											
											<div className = "country">{store.country}</div>

											<div className = "tags">
											{
												store.tags.map((tag, index) => {
													return (
														<div key = {index} className = "tag">#{tag}</div>
													);
												})
											}
											</div>
											
											<div className = "store-description">
											{store.description}
											</div>
											

										</div>
									</Link>
								</React.Fragment>
							)
						}


						return (
							<Link
								key = {store.storeid}
								to = {{
									pathname: process.env.PUBLIC_URL + '/store/' + store.webpath,
									query : {store:store}
								}}
								className = "store"
							>
							
								<img src = {store.small_image} alt = ""/>

								<div className = "store-info">
									
									<h3>{store.name}</h3>
									<div className = "country">{store.country}</div>
									<div className = "tags">
									{
										store.tags.map((tag, index) => {
											return (
												<div key = {index} className = "tag">#{tag}</div>
											);
										})
									}
									</div>
									
									<div className = "store-description">
									{store.description}
									</div>
									

								</div>
							</Link>
						)
					})
					
				}

				{
					this.props.stores.length === 0 ?
					<h2>There are no stores in this category yet</h2>
					:
					null
				}

				
				{
					this.props.displayAddYoursAtEnd && !this.props.loading ?
					<AddYours mode = "store" />
					:
					null
				}


			</div>

		);
	}
}


export default StoreList;