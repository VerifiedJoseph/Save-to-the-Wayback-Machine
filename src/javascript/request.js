/*jslint node: true */
/*global debug, global, XMLHttpRequest */

"use strict";

function Request() {

	var xhr = new XMLHttpRequest();
	
	/** @var {string} method */
	var method = 'GET';
	
	/** @var {object} response */
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
	 * Make a HTTP POST request with XMLHttpRequest()
	 * @param {string} url
	 * @param {string} contentType
	 * @param {string} payload
	 * @param {callback} callback
	 */
	this.post = function post(url, contentType, payload, callback) {
		method = 'POST';

		xhr.open(method, url, true);
		xhr.setRequestHeader('x-requested-by', global.requestedBy);
		xhr.setRequestHeader('content-type', contentType);

		debug.log('POST Request: ' + url);

		xhr.onload = function () {
			
			getResponse(url);
			
			/**
			 * @callback open~callback
			 * @param {object} response
			 */
			callback(response);
		};

		xhr.onerror = function () {
			debug.log('Request failed (connection error)');

			getResponse(url);
			
			/**
			 * @callback open~callback
			 * @param {object} response
			 */
			callback(response);
		};
		
		// Send request
		xhr.send(payload);
	};
	
	/**
	 * Parse response headers
	 * @param {string} rawHeaders
	 * @return {array} headers
	 */
	function parseHeaders(rawHeaders) {
		var headers = [], rawHeadersArray;
		
		if (rawHeaders) {
		
			// Split and trim the raw headers string at newlines
			rawHeadersArray = rawHeaders.trim().split(/[\r\n]+/);
		
			// Loop raw headers array and create object key/value pairs.
			rawHeadersArray.forEach(function (line) {
			
				var parts = line.split(': '),
					header = parts[0],
					value = parts[1];

				headers[header] = value;
			});
			
		}
		
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
