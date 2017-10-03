/*jslint node: true */
/*global browser, debug, Request */

"use strict";

/**
 * Save a page to the Wayback Machine
 * @param {string} url - URL of the page to archive
 * @param {callback} callback
*/
function archive(url, callback) {
	
	var request = new Request();
	request.open(global.urls.save + url, function (response) {
		debug.log(response.headers);
		
		var headers = response.headers,
			statusCode = response.status.toString(),
			runtimeError,
			status = {
				archived: false,
				url: url, // Page URL
				captureUrl: null, // Wayback Machine capture URL for the archived page.
				error: 'An unkown error occurred. \r\n Try again later.', // Default error note 
				code: 200 // HTTP status code
			};

		// Check for Wayback Runtime Error header
		if (headers.hasOwnProperty('X-Archive-Wayback-Runtime-Error')) {
			runtimeError = headers['X-Archive-Wayback-Runtime-Error'].split(':');
			
			if (runtimeError[0] === 'AdministrativeAccessControlException') { // website or URL is excluded from Wayback Machine.
				status.error = 'This website is excluded from the Wayback Machine.';

			} else if (runtimeError[0] === 'RobotAccessControlException') { // Blocked By robots.txt file.
				status.error = 'Unable to archive page. Blocked by robots.txt file.';

			} else if (runtimeError[0] === 'LiveDocumentNotAvailableException') { // Wayback Machine faild to fetch page.
				status.error = 'Unable to archive page. \r\n Try again later.';
			}
			
			status.code = statusCode;
			
		} else if (statusCode.match(global.regex.httpCodes)) { // Check HTTP status codes
			
			status.archived = true;
			status.code = statusCode;
			status.error = null;
			
			if (headers.hasOwnProperty('Content-Location')) {
				status.captureUrl = headers['Content-Location'];
			
			} else { // No Content-Location header, use page URL.
				status.captureUrl = '/' + url;
			}
			
		}
		
		/**
		 * @callback archive~callback
		 * @param {object} status - Details about the archived page.
		 */
		callback(status);
		
	});
	
}