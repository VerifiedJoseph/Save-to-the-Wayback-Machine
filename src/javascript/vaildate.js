/*jslint node: true */
/*global chrome, browser, console, settings, httpRequest */

"use strict";

/*
	Vaildate a URL or IP address (IPv4)

	@type {function}
	@param {string} url
	@param {callable} callback
*/
function vaildate(url, callback) {
	
	var status = true,
		URLParts = document.createElement('a');
	
	URLParts.href = url;

	// Vaildate URL or a IPv4 address using regular expressions
	if (url.match(global.regex.url) || url.match(global.regex.ipv4)) {

		// Loop through host name black list and check for match
		global.hostNameBlackList.forEach(function (host) {

			if (URLParts.hostname === host) { // Protocol match
				status = false;

				//console.warn('URL format is not valid: ' + url);
				console.info('URL has black listed host name : ' + URLParts.hostname);
			}
			
		});

		if (status === true) {
			console.info('URL format is valid: ' + url);
		}
		
	} else {
		status = false;
		console.info('URL format is not valid: ' + url);
	}

	callback(status);
	
}