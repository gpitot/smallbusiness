import React, {Component} from 'react';
import {uploadImage_API} from '../../../imgur/api';


class Step4 extends Component {
	
	constructor(props) {
		super(props);
	
		let outcome = [];
		for (let p of this.props.products) {
			outcome.push(false);
		}

		this.state = {
			validation : {
				name:{
					min_length:4,
					outcome:outcome.slice()
				},
				url:{
					min_length:0,
					regex:/www.*/i,
					outcome:outcome.slice()
				},
				price:{
					min_length:0,
					outcome:outcome.slice()
				},
				description:{
					min_length:25,
					outcome:outcome.slice()
				},
				small_image:{
					min_length:1,
					regex:/www.*|http.*/i,
					outcome:outcome.slice()
				}
			},

			formValid:false
		}

		this.validateField = this.validateField.bind(this);
		this.validateForm = this.validateForm.bind(this);
		this.uploadImage = this.uploadImage.bind(this);

	}

	componentDidMount() {
		

		let validation = this.state.validation;

		
		for (let k of Object.keys(validation)) {

			let index = 0;
			for (let p of this.props.products) {
				let e = {
					target: {
						name:k,
						value:p[k]
					}
				}
				this.validateField(e, index);
				index += 1;
			}
			
		}

		if (this.props.products.length === 0) {
			this.validateForm();
		}
		
	}


	componentDidUpdate(prevProps, prevState) {
		

		if (this.props.products.length === prevState.validation.name.outcome.length) return;
	
		let validation = this.state.validation;

		for (let k of Object.keys(validation)) {
			if (validation[k].outcome.length < this.props.products.length) {
				validation[k].outcome.push(false);
			}
		}
		
		this.setState({
			validation:validation
		});
	}

	errorMsg(validation, index) {
		if (validation['outcome'][index] === true) return <div className = "success fas fa-check-circle" />;

		return (
			<React.Fragment>
				<div className = "fas fa-exclamation-circle failure" />
				<div className="msg">{validation['outcome']}</div>
			</React.Fragment>
		);
	}


	uploadImage(e, index) {
		let file = e.target.files[0];
		if (file === undefined) return null;

		let name = e.target.name;



		let validation = this.state.validation;
		validation[name].outcome[index] = 'Uploading image...';
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

				this.props.handleChange(x, index);
				validation[name].outcome[index] = true;
			} else {
				validation[name].outcome[index] = 'That image is too large, (limit = 500kb)';
				let x = {
					target:{
						name:name,
						value:''
					}
				}
				this.props.handleChange(x, index);
			}
			

			this.validateForm();

		});
	}




	validateField(e, index) {
		let name = e.target.name;
		let value = e.target.value;

		let validation = this.state.validation;
		let data = validation[name];

		data.outcome[index] = true;
		if (data.min_length > value.length) {
			data.outcome[index] = "Must be at least " + data.min_length + " characters";
		} else if (data.regex !== undefined) {
			if (value.search(data.regex) < 0) {
				data.outcome[index] = "That is not a valid input"
			}
		}

		


		this.setState({validation:validation}, ()=>{this.validateForm()});

	}

	validateForm() {
		let validation = this.state.validation;
		let formValid = true;
		for (let k of Object.keys(validation)) {
			for (let p of validation[k]['outcome']) {
				if (p !== true) {

					formValid = false;
					break;
				}
			}
		}
		console.log(formValid);
		if (formValid !== this.state.formValid) {
			//form state has changed
			//alert Dashboard
			this.props.formStateChange(formValid);
		}

		this.setState({formValid:formValid});
	}

	tagsValid(index) {
		let tags = this.props.products[index].tags;
		if (tags.length === 0) return null;

		for (let t of tags) {
			if (t.length < 2) {
				return (
					<React.Fragment>
						<div className = "fas fa-exclamation-circle failure" />
						<div className="msg">Tags must be at least 2 characters long</div>
					</React.Fragment>
				)
			}
		}

		return <div className = "success fas fa-check-circle" />;
	}

	render() {
		return (
			<div className = "profile-productList">

				{
					this.props.products.map((product, index) => {
						return (
							<div
								key = {index}
								className = "profile-product"
							>
								<div className = "form-row">
									<label htmlFor={'prodname'+index}>Product name</label>
									<input 
										id={'prodname'+index}
										type = "text"
										name = "name"
										value = {product.name}
										onChange = {(e)=>{
											this.props.handleChange(e, index);
											this.validateField(e, index);
										}}

										placeholder = "Wedding cake"
									/>
									{this.errorMsg(this.state.validation['name'], index)}
								</div>

								<div className = "form-row">
									<label htmlFor={'produrl'+index}>Url of product</label>
									<input 
										id={'produrl'+index}
										type = "text"
										name = "url"
										value = {product.url}
										onChange = {(e)=>{
											this.props.handleChange(e, index);
											this.validateField(e, index);
										}}
									/>
									{this.errorMsg(this.state.validation['url'], index)}
								</div>

								<div className = "form-row">
									<label htmlFor={'prodprice'+index}>Price</label>
									<input 
										id = {'prodprice'+index}
										type = "number"
										name = "price"
										value = {product.price}
										onChange = {(e)=>{
											this.props.handleChange(e, index);
											this.validateField(e, index);
										}}

										placeholder = "$199.99"
									/>
									{this.errorMsg(this.state.validation['price'], index)}
								</div>

								<div className = "form-row">
									<label htmlFor={'proddesc'+index}>A short description of the product</label>
									<textarea
										id = {'proddesc'+index}
										name = "description"
										value = {product.description}
										onChange = {(e)=>{
											this.props.handleChange(e, index);
											this.validateField(e, index);
										}}
									/>
									{this.errorMsg(this.state.validation['description'], index)}
								</div>

								<div className = "form-row">
									<img alt = "small_image" src = {product.small_image} />
									<label htmlFor={'prodimage'+index}>A picture of the product</label>
									<input 
										id = {'prodimage'+index}
										type = "file"
										name = "small_image"
										
										onChange = {(e)=>{
											this.uploadImage(e, index);
										}}
									/>

									{this.errorMsg(this.state.validation['small_image'], index)}
								</div>
								
								<div className = "form-row">
									<label>What category does your product fall under</label>
									<select
										name = "category"
										value = {product.category}
										onChange = {(e)=>{
											this.props.handleChange(e, index);
										}}
									>
									{
										this.props.categories.map((category) => {
											return (
												<option
													key = {category}
													value = {category}
												>
												{category}
												</option>
											);
										})
									}
									</select>
									<div className = "success fas fa-check-circle" />
								</div>

								<div className = "form-row">
									<label>Gender</label>
									<select
										name = "gender"
										value = {product.gender}
										onChange = {(e)=>{
											this.props.handleChange(e, index);
										}}
									>
										<option value = "unisex">Unisex</option>
										<option value = "male">Male</option>
										<option value = "female">Female</option>
									</select>
									<div className = "success fas fa-check-circle" />
								</div>

								<div className = "form-row">
									<label>Add product tags so users can find this product</label>
									
										{
											product.tags.map((tag, prodindex) => {
												console.log('tags!!')
												return (
													<input
												 		key = {prodindex}
												 		type = "text"
												 		className = "tag"
												 		name = "tag"
												 		value = {tag}
												 		onChange = {(e)=>{this.props.changeTag(e, prodindex, index)}}
												 	/>
												)
											})
										}
										{this.tagsValid(index)}
										<p />
										{
											product['tags'].length < 3 ?
											<div 
												onClick = {(e)=>{
													this.props.addTag(e, index);
												}}
												className = "addNewTag"
											>Add a tag</div>
											:
											null
										}

								</div>

								<div 
									className = "deleteProduct"
									onClick = {()=>{
										let validation = this.state.validation;
										for (let k of Object.keys(validation)) {
											validation[k].outcome.splice(index, 1);
										}
										this.props.deleteProduct(index);
									}}>Delete</div>
									


							</div>
						);
					})
				}

				{
					this.props.products.length < 3 ?
					<div 
						onClick = {()=> {
							this.props.addNewProduct();
							this.setState({formValid:false});
							this.props.formStateChange(false);
						}}
						className = "addNew"
					>Add a product</div>
					:
					null
				}
				
				

			</div>

		);
	}

}


export default Step4;