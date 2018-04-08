const isServer = function(){
	return typeof(window) === 'undefined'
}

module.exports = ( req ) => {
	const Server = {};
	const ServerProxy = new Proxy(Server, {
	    set: function(obj, prop, callback) {
	    	if (isServer()) {
	    		// make call via global
	    	} else {
	    		// make call via RPC
	    	}
	    	obj[prop] = callback;
	    	return true;
	    }
	});

	return {
		Server: ServerProxy,
		Action: {},
		Route: {}
	};

	// return 

}