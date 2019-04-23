/*jslint node: true */
/*global debug, global, XMLHttpRequest */

"use strict";

function Request() {

	var xhr = new XMLHttpRequest();
	
	var method = 'GET';
	
	/*
		Request response data
	*/
	var response = {
		headers: {},
		status: null,
		data: null,
		method: null,
		urls: {}
	};

	/**
	 * Make a HTTP GET request with XMLHttpRequest()
	 * @param {string} url
	 * @param {callback} callback
	 */
	this.get = function open(url, callback) {
		method = 'GET';
			
		xhr.open(method, url, true);
		xhr.setRequestHeader('x-requested-by', global.requestedBy);

		debug.log('GET Request: ' + url);

		xhr.onload = function () { // On request load

			getResponse(url);
			
			/**
			 * @callback open~callback
			 * @param {object} response
			 */
			callback(response);
		};

		xhr.onerror = function () { // On connection error
			debug.log('Request failed (connection error)');

			getResponse(url);

			/**
			 * @callback open~callback
			 * @param {object} response
			 */
			callback(response);
		};

		xhr.send(); // Send the request
	};
	
	/**
	 * Parse response headers
	 * @param {string} rawHeaders
	 * @return {array} headers
	 */
	function parseHeaders(rawHeaders) {
		var headers = [], rawHeadersArray;
		
		// Split and trim the raw headers string at newlines
		rawHeadersArray = rawHeaders.trim().split(/[\r\n]+/);
		
		// Loop raw headers array and create object key/value pairs.
		rawHeadersArray.forEach(function (line) {
			
			var parts = line.split(': '),
				header = parts[0],
				value = parts[1];

			headers[header] = value;
		});
	
		return headers;
		
	}
	
	/**
	 * Get response details
	 * @param {string} url
	 */
	function getResponse(url) {
		
		response.status = xhr.status;
		response.method = method;
		response.data = xhr.response;
		response.urls['request'] = url;
		response.urls['response'] = xhr.responseURL;
	
		response.headers = parseHeaders(xhr.getAllResponseHeaders());
		
	}
	
}
