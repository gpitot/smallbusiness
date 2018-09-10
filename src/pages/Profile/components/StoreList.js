import React from 'react';



function StoreList(props) {

	return (
		<div className = "profile-storelist">
			{
				props.stores.map((store) => {
					return (
						<div 
							key = {store.storeid}
							className = "profile-store"
							onClick = {()=>{props.changeCurrentStore(store)}}
						>
						{store.name}
						</div>

					);
				})
			}

			<div className = "addNew" onClick = {props.addStore}>Add store</div>
		</div>
	);
}


export default StoreList;