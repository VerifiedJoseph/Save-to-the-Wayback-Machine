/*jslint node: true */
/*global debug, global */

"use strict";

/**
 * Validate a URL or IP address (IPv4)
 * @param {string} url
 * @param {callable} callback
 */
function validate(url, callback) {
	var valid = true,
		hostname,
		urlRegex = new RegExp(global.urlRegex);

	debug.log('Vaildating URL: ' + url);

	try {

		// Validate URL format
		if (urlRegex.test(url) === false) {
			throw new Error('URL format is not valid: ' + url);
		}

		// Get hostname with regex
		hostname = url.match(urlRegex);

		// Check blacklist for hostname 
		if (global.hostNameBlacklist.includes(hostname[1])) {
			throw new Error('URL hostname blacklisted: ' + hostname[1]);
		}

		debug.log('URL is valid: ' + url);

	} catch (exception) {
		valid = false;
		debug.log(exception.message);
	}

	/**
	 * @callback validate~callback
	 * @param {boolean} valid.
	 */
	callback(valid);
}
