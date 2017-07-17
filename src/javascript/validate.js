/*jslint node: true */
/*global chrome, browser, debug, settings, httpRequest */

"use strict";

/**

 * Validate a URL or IP address (IPv4)
 * @param {string} url
 * @param {callable} callback
 */
function validate(url, callback) {
	
	var status = true,
		URLParts = document.createElement('a');
	
	URLParts.href = url;

	// Vaildate URL or a IPv4 address using regular expressions
	if (url.match(global.regex.url) || url.match(global.regex.ipv4)) {

		// Loop through host name black list and check for match
		global.hostNameBlackList.forEach(function (host) {

			if (URLParts.hostname === host) { // Protocol match
				
				status = false;
				debug.log('URL has a black listed host name : ' + URLParts.hostname);
			
			}
			
		});

		if (status === true) {
			
			debug.log('URL format is valid: ' + url);

		}
		
	} else {
		
		status = false;
		debug.log('URL format is not valid: ' + url);
	
	}

	/**
	 * @callback validate~callback
	 * @param {boolean} status.
	 */
	callback(status);
	
}