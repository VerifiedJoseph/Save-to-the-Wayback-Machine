/*jslint node: true */
/*global chrome, browser, console, httpRequest, HttpRequest */

"use strict";

/*
	Save a page to the Wayback Machine
	
	@param {string} url
	@param {callable} callback
*/
function archive(url, callback) {
	
	var httpRequest = new HttpRequest();
	httpRequest.open('GET', global.urls.save + url, function (response) {

		var headers = response.headers,
			statusCode = response.status.toString(),
			runtimeError,
			archiveStatus = {
				saved: false,
				pageLocation: '',
				error: 'An unkown error occurred, try again later.',
				errorCode: 200
			};

		// Check for Wayback Runtime Error header
		if (headers.hasOwnProperty('X-Archive-Wayback-Runtime-Error')) {
			runtimeError = headers['X-Archive-Wayback-Runtime-Error'].split(':');
			
			if (runtimeError[0] === 'AdministrativeAccessControlException') { // Black listed website
				archiveStatus.error = 'Website is excluded from the Wayback Machine.';

			} else if (runtimeError[0] === 'RobotAccessControlException') { // Blocked By robots.txt file
				archiveStatus.error = 'Unable to save page. Blocked by robots.txt file.';

			} else if (runtimeError[0] === 'LiveDocumentNotAvailableException') { // IA faild to fetch page
				archiveStatus.error = 'Unable to save page. \r\n Try again later.';
			}
			
		} else if (statusCode.match(global.regex.httpCodes)) { // Check HTTP status codes
			
			if (headers['Content-Location'] !== null) {
				archiveStatus.saved = true;
				archiveStatus.error = null;
				archiveStatus.pageLocation = headers['Content-Location'];
			}
			
		}

		callback(archiveStatus);
		
	});
	
}