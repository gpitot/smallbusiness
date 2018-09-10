import React, {Component} from 'react';


class Step2 extends Component {
	
	constructor(props) {
		super(props);

		this.state = {
			
			formValid:true
		}

		this.tagsValid = this.tagsValid.bind(this);

	}

	componentDidMount() {
		this.props.formStateChange(true);
	}


	tagsValid() {
		let tags = this.props.store.tags;
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
			<React.Fragment>

				<div className = "form-row">
					<label htmlFor='country'>Where is your store based?</label>				
					<select
						id = 'country' 
						value = {this.props.store.country}
						name = "country"
						onChange = {(e)=>{
							this.props.handleChange(e);
						}}
					>
						{
							this.props.countries.map((country) => {
								return <option key = {country} value = {country}>{country}</option>
							})
						}

					</select>
					<div className = "success fas fa-check-circle" />
				</div>

				<div className = "form-row">
					<label htmlFor='category'>Choose a category</label>
					<select 
						id = 'category'
						value = {this.props.store.category}
						name = "category"
						onChange = {(e)=>{
							this.props.handleChange(e);
							this.props.onCategoryChange(e.target.value);
						}}
					>
						{
							this.props.categories.map((category) => {
								return <option key = {category.name} value = {category.name}>{category.name}</option>
							})
						}

					</select>
					<div className = "success fas fa-check-circle" />
				</div>


				<div className = "form-row">
					<label>Add store tags so users can find you</label>
					
						{
							this.props.store.tags.map((tag, index) => {
								return (
									<input
								 		key = {index}
								 		type = "text"
								 		className = "tag"
								 		name = "tag"
								 		value = {tag}
								 		onChange = {(e)=>{this.props.changeTag(e, index)}}
								 	/>
								)
							})
						}
						{this.tagsValid()}
						<p />
						{
							this.props.store.tags.length < 3 ?
							<div 
								onClick = {this.props.addTag}
								className = "addNewTag"
							>Add a tag</div>
							:
							null
						}
				</div>

			</React.Fragment>

		);
	}

}






export default Step2;