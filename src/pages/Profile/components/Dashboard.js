import React, {Component} from 'react';


import Step1 from '../widgets/Step1';
import Step2 from '../widgets/Step2';
import Step3 from '../widgets/Step3';
import Step4 from '../widgets/Step4';
import StepDisplay from '../widgets/StepDisplay';
import SubmitMsg from '../widgets/SubmitMsg';
import {
	api_get_all_product_categories,
	api_add_store,
	api_edit_store,
	api_approve_store
} from '../../../api/Api';



class Dashboard extends Component {
	constructor(props) {
		super(props);


		this.state = {
			step:0,
			stepsValid:[false, false, false, false],
			store:this.props.store,
			product_categories:[],

			SubmitMsg:null
			
		}

		this.takeStep = this.takeStep.bind(this);
		this.getStepRender = this.getStepRender.bind(this);
		this.handleStoreChange = this.handleStoreChange.bind(this);
		this.handleProductChange = this.handleProductChange.bind(this);
		this.addNewProduct = this.addNewProduct.bind(this);
		this.deleteProduct = this.deleteProduct.bind(this);

		this.onCategoryChange = this.onCategoryChange.bind(this);
		this.updateStore = this.updateStore.bind(this);
		this.formStateChange = this.formStateChange.bind(this);
		this.changeTag = this.changeTag.bind(this);
		this.addTag = this.addTag.bind(this);
		this.goToStep = this.goToStep.bind(this);
		this.closeSubmitMsg = this.closeSubmitMsg.bind(this);





		this.onCategoryChange(this.props.store.category);

	}


	componentDidUpdate(prevProps, prevState) {
		if (this.props.store !== prevState.store) {
			this.setState({store:this.props.store, step:0})
			this.onCategoryChange(this.props.store.category);
		}
	}


	closeSubmitMsg() {	
		this.setState({SubmitMsg:null})
	}


	takeStep(d) {
		this.setState({step:this.state.step+d});
	}
	goToStep(i) {
		console.log(i);
		this.setState({step:i});
	}


	handleStoreChange(e) {
		let store = this.state.store;
		store[e.target.name] = e.target.value;
		this.setState({
			store:store
		});

		
	}

	

	handleProductChange(e, index) {
		let store = this.state.store;
		
		store.products[index][e.target.name] = e.target.value;
		this.setState({store:store})
	}

	addNewProduct() {
		let store = this.state.store;

		if (store.products.length >= 3) return;

		let category = this.state.product_categories.length > 0 ? this.state.product_categories[0] : '';
		let product = {
			name:'',
			url:'',
			price:0,
			description:'',
			gender:'unisex',
			category:category,
			small_image:'',
			large_image:'',
			tags:[]
		}

		store.products.push(product);
		this.setState({store:store})
	}

	deleteProduct(prodindex) {
		let store = this.state.store;
		let products = store.products;
		products.splice(prodindex, 1);
		this.setState({store:store});
	}


	onCategoryChange(category) {
		api_get_all_product_categories(category, (data)=>{
			if (data.data) {

				if (data.data.length > 0) {
					let store = this.state.store;
					for (let p of store.products) {
						p.category = data.data[0];
					}
				}
				


				this.setState({product_categories:data.data})
			}
		})
	}

	changeTag(e, tagindex, productindex=null) {
		let value = e.target.value;
		let store = this.state.store;

		if (productindex !== null) {
			store.products[productindex].tags[tagindex] = value;
		} else {
			store.tags[tagindex] = value;
		}

		

		this.setState({store:store});
	}

	addTag(e, productindex=null) {
		let store = this.state.store;
		if (productindex !== null) {
			store.products[productindex].tags.push('');
		} else {
			store.tags.push('');

		}
		this.setState({store:store});
		
	}


	updateStore() {
		// ADD TO DATABASE
		if (this.state.store.storeid === undefined) {
			//new store
			api_add_store(this.state.store, (data)=> {
				if (data.data === null) {

					let msg = "That store name/website has been taken already.";
					if (data.msg !== undefined) msg = data.msg;
					let submitmsg = {
						msg:msg,
						error:true
					}
					this.setState({SubmitMsg:submitmsg})

					return;
				}

				let submitmsg = {
					msg:'Successfully edited store, now waiting approval',
					error:false
				}
				this.setState({SubmitMsg:submitmsg})
				if (this.props.membership === 'admin') {
					api_approve_store({storeid:data.data.live}, (res) => {
						console.log('approved ? ', res);
					});
				}

			});
		} else {
			api_edit_store(this.state.store, (data)=> {

				if (data.data === null) {

					let msg = "That store name/website has been taken already.";
					if (data.msg !== undefined) msg = data.msg;
					let submitmsg = {
						msg:msg,
						error:true
					}
					this.setState({SubmitMsg:submitmsg})

					return;
				}

				let submitmsg = {
					msg:'Successfully edited store, now waiting approval',
					error:false
				}
				this.setState({SubmitMsg:submitmsg})


				if (this.props.membership === 'admin') {
					api_approve_store({storeid:data.data.edit}, (res) => {
						console.log('approved ? ', res);
					});
				}
			});
		}
	}

	formStateChange(valid) {
		let stepsValid = this.state.stepsValid;
		stepsValid[this.state.step] = valid;
		this.setState({stepsValid:stepsValid});
	}



	getStepRender() {
		let step = this.state.step;
		if (step === 0) return (
			<Step1 
				store = {this.state.store} 
				handleChange = {this.handleStoreChange} 
				formStateChange = {this.formStateChange}
			/>
		);
		if (step === 1) return (
			<Step2 
				store = {this.state.store} 
				handleChange = {this.handleStoreChange} 
				countries = {this.props.countries}
				categories = {this.props.categories}
				onCategoryChange = {this.onCategoryChange}

				formStateChange = {this.formStateChange}

				changeTag = {this.changeTag}
				addTag = {this.addTag}
				
			/>
		);
		if (step === 2) {
			return (
				<Step3 
					store = {this.state.store} 
					handleChange = {this.handleStoreChange} 
					formStateChange = {this.formStateChange}
				/>
			);
		}
		if (step === 3) return (
			<Step4 
				products = {this.state.store.products} 
				handleChange = {this.handleProductChange} 
				addNewProduct = {this.addNewProduct}
				deleteProduct = {this.deleteProduct}

				categories = {this.state.product_categories}
				formStateChange = {this.formStateChange}

				changeTag = {this.changeTag}
				addTag = {this.addTag}
			/>
		);


		
		
	}

	
	render() {
		return (
			<div className = "dashboard">

				<div className = {this.state.store.approved === 1 ? "approvedMsg" : "approvedMsg waiting"}>
				{

					this.state.store.approved === 1 ?
					"Store approved" :
					"Awaiting approval"
				}
				</div>

				<StepDisplay step = {this.state.step} stepsValid = {this.state.stepsValid} goToStep = {this.goToStep} />
				
				<div className = "profile-form">	
					{this.getStepRender()}
				</div>


				<div className = "buttonArea">


					<div className = "stepArea">
						{
							this.state.step > 0 ?
							<button onClick = {()=>{this.takeStep(-1)}} className = "dashboard-step step-left">Back</button>
							:
							null
						}
						{
							this.state.step < 3 ?
							<button onClick = {()=>{this.takeStep(1)}} className = "dashboard-step step-right">Next</button>
							:
							null
						}
					</div>
					{
						this.state.stepsValid.includes(false) ?
						null
						:
						<button onClick = {this.updateStore} className = "dashboard-save">Save</button>
					}
					
				</div>


				{
					this.state.SubmitMsg !== null ?
					<SubmitMsg 
						msg = {this.state.SubmitMsg.msg} 
						close = {this.closeSubmitMsg} 
						error = {this.state.SubmitMsg.error} />
					: 
					null
				}

			</div>
		);
	}
}


export default Dashboard;

