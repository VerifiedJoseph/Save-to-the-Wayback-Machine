/*jslint node: true */
/*global debug, global */

"use strict";

/**
 * Validate a URL or IP address (IPv4)
 * @param {string} url
 * @param {callable} callback
 */
function validate(url, callback) {

	var status = true,
		hostname,
		urlRegex = new RegExp(global.regex.urlAndIpv4);
	
	debug.log('Vaildating URL: ' + url);
	
	// Vaildate URL or IPv4 address using regular expression
	if (urlRegex.test(url)) {

		// Get hostname from URL with regex 
		hostname = url.match(urlRegex);
		
		// Check for hostname in hostname black list
		global.hostNameBlackList.find(function (host) {
			
			if (hostname[1] === host) {
				
				status = false;
				debug.log('URL has a black listed host name: ' + host);
				
			}

		});

		if (status === true) {

			debug.log('URL is valid: ' + url);

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