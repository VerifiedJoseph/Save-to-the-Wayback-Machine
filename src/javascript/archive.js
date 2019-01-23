/*jslint node: true */
/*global debug, global, browser, Request */

"use strict";

/**
 * Save a page to the Wayback Machine
 * @param {string} url
 * @param {callback} callback
 */
function archive(url, callback) {

	var request = new Request();
	request.open(global.urls.save + encodeURI(url), function (response) {

		var headers = response.headers,
			statusCode = response.status.toString(),
			runtimeError,
			status = {
				archived: false,
				url: url, // Page URL
				captureUrl: null, // Wayback Machine capture URL for the archived page.
				error: browser.i18n.getMessage('ArchiveFailedDefault'), // Default error message
				code: 200 // Default HTTP status code
			};

		// Check for Wayback Runtime Error header
		if (headers.hasOwnProperty('x-archive-wayback-runtime-error')) {
			runtimeError = headers['x-archive-wayback-runtime-error'].split(':');

			if (runtimeError[0] === 'AdministrativeAccessControlException') { // Website or URL is excluded from Wayback Machine.
				status.error = browser.i18n.getMessage('ArchiveFailedWebsiteExcluded');

			} else if (runtimeError[0] === 'RobotAccessControlException') { // Blocked By robots.txt file.
				status.error = browser.i18n.getMessage('ArchiveFailedBlocked');

			} else if (runtimeError[0] === 'LiveDocumentNotAvailableException') { // Wayback Machine failed to fetch page.
				status.error = browser.i18n.getMessage('ArchiveFailedNotFetched');
			}

			status.code = statusCode;

		} else if (global.httpStatusCodes.includes(Number(statusCode))) { // Check HTTP status codes

			status.archived = true;
			status.code = statusCode;
			status.error = null;

			if (headers.hasOwnProperty('content-location')) {
				status.captureUrl = headers['content-location'];

			} else { // No Content-Location header, use page URL.
				status.captureUrl = '/web/' + url;
			}

		}

		/**
		 * @callback archive~callback
		 * @param {object} status Status of archived page.
		 */
		callback(status);

	});

}
