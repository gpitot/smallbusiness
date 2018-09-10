//clientid 4afe175db120d6b


let clientid = '4afe175db120d6b';


let domain = 'https://api.imgur.com';

export function uploadImage_API(file, cb) {	
	let form = new FormData();
	form.append('image', file);
	form.append('type', 'file');
	
	const config = {
		method:'POST',
		body : form,
		
		headers: {
			'Authorization': 'Client-ID ' + clientid
    	}
	}


	fetch(`${domain}/3/image`, config)
		.then(function(res) {
			return res.json();
		})
		.then(function(data) {
			cb(data);
		})
		.catch(function(err) {
			console.log(err);
		})
}