/*jslint node: true */
/*global chrome, browser, console */

"use strict";

/*
	Send HTTP requests with XMLHttpRequest
		
	@type {function}
*/
function HttpRequest() {
	/*
		Set request settings
		
		@type {object}
	*/
	var settings = {
		header: true // Set x-requested-by header
	},
	
	/*
		Response data
		
		@type {object}
	*/
		response = {
			headers: {},
			status: null,
			data: null,
			method: null,
			url : null
		};

	/*
		Make a HTTP request with XMLHttpRequest()
		
		@type {function}
		@param {string} method - HTTP request method
		@param {string} url
		@param {callback}
	*/
	this.open = function open(method, url, callback) {
		
		// Check HTTP request method
		if (method === 'GET' || method === 'POST') {

			var request = new XMLHttpRequest();

			request.open(method, url, true);
			//request.open(method, 'https://http418.verifiedjoseph.com/200', true); // test
			request.setRequestHeader('x-requested-by', global.requestedBy);
		
			console.info(method + ' Request : ' + url);
		
			request.onload = function () { // On request load
				console.info('Request loaded');
			
				response.status = request.status;
				response.data = request.response;
				response.method = method;
				response.url = url;
			
				// Parses response headers
				var headers = request.getAllResponseHeaders().split('\u000d\u000a'),
					headerPair,
					key,
					val,
					index,
					i = 0;
			
				// Loop headers and create a array
				for (i = 0; i < headers.length;  i += 1) {
					headerPair = headers[i];
				
					// if the header value has the string ": " in it.		
					index = headerPair.indexOf(':');
				
					if (index > 0) {
						key = headerPair.substring(0, index);
						val = headerPair.substring(index + 2);
						response.headers[key] = val;
					}
				}

				callback(response);
			};
	
			request.onerror = function () { // On connection error
				console.error('Request failed (connection error)');
			
				response.status = request.status;
				response.data = request.response;
				response.method = method;
				response.url = url;

				callback(response);
			};
	
			request.send(); // Send the request
				
		} else { // Invaild request method

			console.info('Invaild request method, use GET or POST.');
	
			return false;
			
		}
		
	};
	
}