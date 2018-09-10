

import React, {Component} from 'react';


class Step1 extends Component {
	
	constructor(props) {
		super(props);

		this.state = {
			validation : {
				name:{
					min_length:4,
					outcome:false
				},
				website:{
					min_length:7,
					regex:/http.*/i,
					outcome:false
				},
				description:{
					min_length:25,
					outcome:false
				}
			},

			formValid:false
		}

		this.validateField = this.validateField.bind(this);

	}

	componentDidMount() {
		let validation = this.state.validation;
		for (let k of Object.keys(validation)) {
			let e = {
				target: {
					name:k,
					value:this.props.store[k]
				}
			}
			this.validateField(e)
		}
	}

	componentDidUpdate(prevProps, prevState) {

		if (this.props.store.storeid !== prevProps.store.storeid) {
			let validation = this.state.validation;
			for (let k of Object.keys(validation)) {
				let e = {
					target: {
						name:k,
						value:this.props.store[k]
					}
				}
				this.validateField(e)
			}
		}
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


	validateField(e) {
		let name = e.target.name;
		let value = e.target.value;

		let validation = this.state.validation;
		let data = validation[name]
		data.outcome = true;
		if (data.min_length > value.length) {
			data.outcome = "Must be at least " + data.min_length + " characters";
		} else if (data.regex !== undefined) {
			if (value.search(data.regex) < 0) {
				data.outcome = "That is not a valid input";
			}
		}


		




		let formValid = true;
		for (let k of Object.keys(validation)) {
			if (validation[k].outcome !== true) {
				formValid = false;
				break;
			}
		}
		if (formValid !== this.state.formValid) {
			//form state has changed
			//alert Dashboard
			this.props.formStateChange(formValid);
		}


		this.setState({validation:validation, formValid:formValid});
	}

	render() {
		return (
			<React.Fragment>
				
				<div className = "form-row">
					<label htmlFor="name">Store name</label>
					<input 
						id = "name"
						type = "text"
						name = "name"
						onChange = {(e)=>{
							this.props.handleChange(e);
							this.validateField(e);
						}}
						value = {this.props.store.name}
					/>
					{this.errorMsg(this.state.validation['name'])}
				</div>

				<div className = "form-row">
					<label htmlFor="website">Do you have a website?</label>
					<input 
						id = 'website'
						type = "text"
						name = "website"
						placeholder = "https://www.localstore.com"
						onChange = {(e)=>{
							this.props.handleChange(e);
							this.validateField(e);
						}}
						value = {this.props.store.website}
					/>
					{this.errorMsg(this.state.validation['website'])}
				</div>

				<div className = "form-row">
				<label htmlFor='description'>description</label>
				<textarea 
					id = 'description'
					type = "text"
					name = "description"
					onChange = {(e)=>{
						this.props.handleChange(e);
						this.validateField(e);
					}}
					value = {this.props.store.description}
				/>
				{this.errorMsg(this.state.validation['description'])}
				</div>
			</React.Fragment>

		);
	}

}


export default Step1;


