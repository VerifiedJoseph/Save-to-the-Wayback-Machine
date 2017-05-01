/*jslint node: true */
/*global browser, console */

"use strict";

/*
	Send a message to the background page to fetch data or run a function

	@type {function}
	@param {string} name
	@param {object|string|int} data
	@param {callable} callback
*/
function sendMessage(name, data, callback) {

	browser.runtime.sendMessage({name: name, data: data}, function (response) {

		callback(response);

	});
	
}