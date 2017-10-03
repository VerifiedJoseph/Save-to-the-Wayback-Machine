/*jslint node: true */
/*global chrome, browser, debug */

"use strict";

function Request() {
	
	/*
		Request response data
	*/
	var response = {
		headers: {},
		status: null,
		data: null,
		method: null,
		url : null
	};

	/**
	 * Make a HTTP request with XMLHttpRequest()
	 * @param {string} url
	 * @param {callback}
	 */
	this.open = function open(url, callback) {

		var request = new XMLHttpRequest();

		request.open('GET', url, true);
		request.setRequestHeader('x-requested-by', global.requestedBy);
		
		debug.log('GET Request: ' + url);
		
		request.onload = function () { // On request load
			
			response.status = request.status;
			response.data = request.response;
			response.method = 'GET';
			response.url = url;
			
			// Parses response headers
			var headers = {},
				header,
				key,
				val,
				index,
				i = 0;
			
			// Split string at newlines.
			headers = request.getAllResponseHeaders().split('\u000d\u000a');
				
			// Loop response headers and add them to the response object
			for (i = 0; i < headers.length;  i += 1) {
				header = headers[i];
					
				// Find the first colon in the header and get its location.
				index = header.indexOf(':');
					
				if (index > 0) {
						
					// Header Name (object key)
					key = header.substring(0, index);
						
					// Header Value
					val = header.substring(index + 2);
						
					// Add header to response object
					response.headers[key] = val;
				}
			}

			debug.log(response);
	
			callback(response);
		};
	
		request.onerror = function () { // On connection error
			debug.log('Request failed (connection error)');
			
			response.status = request.status;
			response.data = request.response;
			response.method = 'GET';
			response.url = url;

			callback(response);
		};
	
		request.send(); // Send the request
	};
	
}