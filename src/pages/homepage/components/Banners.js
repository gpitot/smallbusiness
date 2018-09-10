import React, {Component} from 'react';







class Banners extends Component {

	constructor(props) {
		super(props);
		const bannerImages = [
		{
			uri:'https://d2v9y0dukr6mq2.cloudfront.net/video/thumbnail/8k4lb58/woman-sitting-on-rock-on-beach-at-sunset_qyzaf-ec__F0000.png',
			newBanner:false,
			oldBanner:false
		},
		{
			uri:'https://images.pexels.com/photos/8769/pen-writing-notes-studying.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
			newBanner:false,
			oldBanner:false
		},
		{
			uri:'https://images.pexels.com/photos/951233/pexels-photo-951233.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
			newBanner:false,
			oldBanner:false
		},
		{
			uri:'https://images.pexels.com/photos/237321/pexels-photo-237321.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
			newBanner:false,
			oldBanner:false
		}
		];
		


		this.state = {
			bannerImages:bannerImages,
			currentIndex:0,
			bannerStyle : {
				height:0
			}
			
		}

		

		this.loaded = this.loaded.bind(this);
		
		
	}

	componentDidMount() {
		setTimeout(()=> {this.bannerTimer()}, 3500);
	}


	bannerTimer() {
		
		this.setState((prevState, props) => {
			let index1 = prevState.currentIndex + 1 < this.state.bannerImages.length ? prevState.currentIndex + 1 : 0;

			let bannerImages = this.resetBanners(prevState.bannerImages);
			bannerImages[prevState.currentIndex].oldBanner = true;
			bannerImages[index1].newBanner = true;

			return {
				currentIndex:index1,
				bannerImages:bannerImages
			}	
		})
		setTimeout(()=> {this.bannerTimer()}, 5500);
	}

	resetBanners(banners) {
		for (let b of banners) {
			b.oldBanner = false;
			b.newBanner = false;
		}
		return banners;
	}

	loaded({target:img}) {
		
		if (this.state.bannerStyle.height !== 0) return;
		console.log("loaded image");
		let h = img.offsetHeight + 'px'
		this.setState({
			bannerStyle:{height:h}
		})
	}

	
	
	render() {
		let controlWidth = this.state.bannerImages.length * 25;
		let controlStyle = {
			left: 'calc(50% - ' + (controlWidth / 2) + 'px)',
			width:controlWidth
		}

		return (
			<div>
				<div 
					className = "banners"
					style = {this.state.bannerStyle}
				>

					{
						this.state.bannerImages.map((img, index) => {
							return (
								<img 
									key = {index} 
									src = {img.uri} 
									className = {getClassname(img)}
									onLoad = {this.loaded}
								/>
							);
						})
					}


					<div 
						className = "controls"
						style = {controlStyle}
					>
						{
							this.state.bannerImages.map((img, index) => {
								return (
									<p key = {index} className = {index === this.state.currentIndex ? "current" : ""} />
								);
							})
						}
					</div>
				</div>

			</div>
		);
	}
}


function getClassname(img) {
	
	if (img.oldBanner) return "oldBanner";
	if (img.newBanner) return "newBanner";
	return "";
}





export default Banners;