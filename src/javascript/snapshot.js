/*jslint node: true */
/*global Request, global */

"use strict";

function Snapshot() {

	/**
	 * Get snapshot details for a URL from the Wayback Availability JSON API.
	 * @param {string} url
	 * @param {callback} callback
	 */
	this.get = function get(url, callback) {
		var request = new Request(),
			contentType = 'application/x-www-form-urlencoded',
			payload = 'url=' + encodeURIComponent(url);

		request.post(global.urls.api, contentType, payload, function (response) {
			var snapshot = {
				available: false,
				error: true,
				timestamp: ''
			};

			if (response.status === 200) {
				snapshot.error = false;

				var data = JSON.parse(response.data);

				if (data.results[0].archived_snapshots.hasOwnProperty('closest')) {
					snapshot.available = data.results[0].archived_snapshots.closest.available;
					snapshot.timestamp = data.results[0].archived_snapshots.closest.timestamp;
				}
			}

			callback(snapshot);
		});
	};
}
