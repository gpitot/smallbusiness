import React, {Component} from 'react';


import CategoryList from './components/CategoryList';
import Navigation from '../Navigation/Navigation';



class Home extends Component {
	

	componentDidMount() {
		/*
		api_get_all_store_categories((data)=> {
			console.log(data);
			if (data.data) {
				this.setState({categories:data.data})
			}
			
		})
		*/

		document.title = "abc"
	}


	render() {
		/*
		<div className = "banner">
			<img src = "https://d2v9y0dukr6mq2.cloudfront.net/video/thumbnail/8k4lb58/woman-sitting-on-rock-on-beach-at-sunset_qyzaf-ec__F0000.png" />
		</div>
		*/
		return (
			<React.Fragment>
				<Navigation history = {this.props.history} />
				
				

				<h1 className = "homepagetitle">Find the best online stores from around the world</h1>
				<CategoryList />
				
			</React.Fragment>
		);
	}
}


export default Home;