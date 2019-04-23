/*jslint node: true */
/*global debug, global, XMLHttpRequest */

"use strict";

function Request() {

	var request = new XMLHttpRequest();
	
	/*
		Request response data
	*/
	var response = {
		headers: {},
		status: null,
		data: null,
		method: null,
		url: null
	};

	/**
	 * Make a HTTP GET request with XMLHttpRequest()
	 * @param {string} url
	 * @param {callback} callback
	 */
	this.get = function open(url, callback) {

		request.open('GET', url, true);
		request.setRequestHeader('x-requested-by', global.requestedBy);

		debug.log('GET Request: ' + url);

		request.onload = function () { // On request load

			response.status = request.status;
			response.data = request.response;
			response.method = 'GET';
			response.url = url;

			response.headers = parseHeaders(
				request.getAllResponseHeaders()
			);

			/**
			 * @callback open~callback
			 * @param {object} response
			 */
			callback(response);
		};

		request.onerror = function () { // On connection error
			debug.log('Request failed (connection error)');

			response.status = request.status;
			response.data = request.response;
			response.method = 'GET';
			response.url = url;

			/**
			 * @callback open~callback
			 * @param {object} response
			 */
			callback(response);
		};

		request.send(); // Send the request
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
	
}
