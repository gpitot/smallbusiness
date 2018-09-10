
const domain = 'http://gpitot.pythonanywhere.com/smallbusiness/api';


export function api_get_all_stores(category, cb) {
	fetch(`${domain}/get_all_stores?category=${category}`)
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



export function api_get_all_products(category, cb) {
	fetch(`${domain}/get_all_products?category=${category}`)
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


export function api_get_individual_store(storeid=null, webpath=null, cb) {

	let url;
	if (storeid) {
		url = `${domain}/get_individual_store?storeid=${storeid}`;
	} else if (webpath) {
		url = `${domain}/get_individual_store?webpath=${webpath}`;
	} else {
		return;
	}


	fetch(url)
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


export function api_get_users_stores(cb) {

	const config = {
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'session':getSession()
    	},
	    method: "GET"
	}

	fetch(`${domain}/get_users_stores`, config)
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

export function api_get_all_countries(cb) {
	fetch(`${domain}/get_all_countries`)
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


export function api_get_all_store_categories(cb) {
	fetch(`${domain}/get_all_store_categories`)
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


export function api_get_all_product_categories(category, cb) {
	console.log(`${domain}/get_all_product_categories?category=${category}`);
	fetch(`${domain}/get_all_product_categories?category=${category}`)
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




export function api_add_store(data, cb) {

	const config = {
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'session':getSession()
    	},
	    method: "POST",
	    body: JSON.stringify(data)
	}


	fetch(`${domain}/add_store`, config)
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


export function api_edit_store(data, cb) {

	const config = {
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'session':getSession()
    	},
	    method: "POST",
	    body: JSON.stringify(data)
	}


	fetch(`${domain}/edit_store`, config)
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


export function api_approve_store(data, cb) {

	const config = {
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'session':getSession()
    	},
	    method: "POST",
	    body: JSON.stringify(data)
	}


	fetch(`${domain}/approve_store`, config)
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


export function api_deny_store(data, cb) {

	const config = {
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'session':getSession()
    	},
	    method: "POST",
	    body: JSON.stringify(data)
	}


	fetch(`${domain}/deny_store`, config)
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


export function api_login(data, cb) {

	const config = {
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'session':getSession()
    	},
	    method: "POST",
	    body: JSON.stringify(data)
	}


	fetch(`${domain}/login`, config)
		.then(function(res) {
			return res.json();
		})
		.then(function(data) {
			if (data.data) {
				setSession(data.data);
			}
			cb(data);
		})
		.catch(function(err) {
			console.log(err);
		})
}

export function api_create_account(data, cb) {

	const config = {
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'session':getSession()
    	},
	    method: "POST",
	    body: JSON.stringify(data)
	}


	fetch(`${domain}/createaccount`, config)
		.then(function(res) {
			return res.json();
		})
		.then(function(data) {
			if (data.data) {
				setSession(data.data);
			}
			cb(data);
		})
		.catch(function(err) {
			console.log(err);
		})
}

export function api_get_membership(cb) {
	const config = {
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'session':getSession()
    	},
	    method: "GET"
	}

	fetch(`${domain}/get_membership`, config)
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





function getSession() {
	return localStorage.getItem('session');
}

function setSession(session) {
	return localStorage.setItem('session', session);
}