/*jslint node: true */
/*global debug, global, fetch, Headers */

"use strict";

function Request() {

	/*
		Response Data
	*/
	var responseData = {
		headers: {},
		status: 0,
		data: null,
		method: 'GET',
		url: null
	};

	/**
	 * Make a HTTP request with fetch()
	 * @param {string} url
	 * @param {callback} callback
	 */
	this.get = function get(url, callback) {

		debug.log('GET Request: ' + url);
		
		fetch(url, {
			method: 'GET',
			redirect: 'follow',
			headers: new Headers({
				'x-requested-by': global.requestedBy
			})
		}).then(function (response) {

			responseData.status = response.status;
			responseData.url = response.url;

			if (response.headers.has('x-archive-wayback-runtime-error')) {
				responseData.headers['x-archive-wayback-runtime-error'] = response.headers.get('x-archive-wayback-runtime-error');
			}
			
			if (response.headers.has('content-location')) {
				responseData.headers['content-location'] = response.headers.get('content-location');
			}
			
			return response.text();

		}).then(function (text) {
			responseData.data = text;

		}).catch(function (error) {

			responseData.url = url;
			
			debug.log('GET Request failed: ' + url);
			debug.log(error);

		}).then(function () {

			/**
			 * @callback open~callback
			 * @param {object} response
			 */
			callback(responseData);

		});

	};

}
