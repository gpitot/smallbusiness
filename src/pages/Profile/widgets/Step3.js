

import React, {Component} from 'react';

import {uploadImage_API} from '../../../imgur/api';


class Step3 extends Component {
	
	constructor(props) {
		super(props);

		this.state = {
			validation : {
				small_image:{
					min_length:1,
					regex:/www.*|http.*/i,
					outcome:false
				},
				large_image:{
					min_length:1,
					regex:/www.*|http.*/i,
					outcome:false
				}
			},

			formValid:false
		}

		this.uploadImage = this.uploadImage.bind(this);


	}


	componentDidMount() {
		let formValid = false;

		let validation = this.state.validation;

		if (this.props.store.large_image.length > 0) {
			validation['large_image'].outcome = true;
		}

		if (this.props.store.small_image.length > 0) {
			validation['small_image'].outcome = true;
		}

		if (this.props.store.small_image.length > 0 && this.props.store.large_image.length > 0) {
			formValid = true;
			this.props.formStateChange(formValid);
		}


		this.setState({validation:validation, formValid:formValid});
	}

	

	errorMsg(validation) {
		if (validation['outcome'] === true) return <div className = "success fas fa-check-circle" />;

		return (
			<React.Fragment>
				<div className = "fas fa-exclamation-circle failure" />
				<div className="msg">{validation['outcome']}</div>
			</React.Fragment>
		);
	}


	uploadImage(e) {
		let file = e.target.files[0];
		if (file === undefined) return null;

		let name = e.target.name;



		let validation = this.state.validation;
		validation[name].outcome = 'Uploading image...';
		this.setState({validation})
		uploadImage_API(file, (res) => {
			let link = res.data.link;
			let size = res.data.size;
			if (size < 512000) {
				//size is ok

				let x = {
					target:{
						name:name,
						value:link
					}
				}

				this.props.handleChange(x);
				validation[name].outcome = true;
			} else {
				validation[name].outcome = 'That image is too large, (limit = 500kb)';
				let x = {
					target:{
						name:name,
						value:''
					}
				}
				this.props.handleChange(x);
			}
			let formValid = true;
			for (let k of Object.keys(validation)) {
				if (validation[k].outcome !== true) formValid = false;
			}
			if (formValid !== this.state.formValid) {
				//form state has changed
				//alert Dashboard
				this.props.formStateChange(formValid);
			}


			this.setState({validation:validation, formValid:formValid});


		});


	}



	render() {
		return (
			<React.Fragment>
				<div className = "form-row">
					
					<img alt = "small_image" src = {this.props.store.small_image} />
					<label htmlFor='small_image'>A small image for the homepage</label>			
					<input 
						id = "small_image"
						type = "file" 
						name = "small_image"
						onChange = {this.uploadImage}
					/>
					{this.errorMsg(this.state.validation['small_image'])}
				</div>

				<div className = "form-row">
					<img alt = "small_image" src = {this.props.store.large_image} />
					<label htmlFor='large_image'>A large image for your storefront</label>
					<input 
						id = "large_image"
						type = "file" 
						name = "large_image"
						onChange = {this.uploadImage}
					/>
					{this.errorMsg(this.state.validation['large_image'])}
				</div>

			</React.Fragment>

		);
	}

}


export default Step3;


/*

validation: {
	name:{
		min_length:4,
		outcome:false
	},
	website:{
		min_length:7,
		outcome:false
	},
	description:{
		min_length:25,
		outcome:false
	},
	country: {
		min_length:1,
		outcome:true
	},
	category:{
		min_length:1,
		outcome:true
	},
	small_image:{
		min_length:10,
		outcome:false
	},
	large_image:{
		min_length:10,
		outcome:false
	}
*/


