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

		var request = new Request();
		request.get(global.urls.api + encodeURIComponent(url), function (response) {

			var snapshot = {
				available: false,
				error: false,
				timestamp: ''
			};

			if (response.status !== 200) {
				snapshot.error = true;
			}

			if (response.status === 200) {
				var data = JSON.parse(response.data);

				if (data.archived_snapshots.hasOwnProperty('closest')) {
					snapshot.available = data.archived_snapshots.closest.available;
					snapshot.timestamp = data.archived_snapshots.closest.timestamp;
				}
			}

			callback(snapshot);
		});
	};

}
