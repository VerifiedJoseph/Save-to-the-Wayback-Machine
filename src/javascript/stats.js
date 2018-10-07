/*jslint node: true */
/*global browser, debug */

"use strict";

function Stats() {
	var self = this,
		statsEnabled = false,
		defaults = {
			pagesArchived: 0
		},
		stats = {};

	/**
	 * Load stats from storage
	 * @param {boolean} statsEnabled
	 */
	this.load = function load(statsEnabled) {
		self.statsEnabled = statsEnabled;

		// Load stats if they are enabled
		if (self.statsEnabled === true) {

			browser.storage.sync.get(defaults, function (data) {
				self.loaded = true;
				self.stats = data;

				debug.log('stats loaded');
			});

		}

	};

	/**
	 * Return stats 
	 * @return {object} stats
	 */
	this.get = function get() {

		// Return stats if they are enabled
		if (self.statsEnabled === true) {

			return self.stats.pagesArchived;

		} else {

			return defaults.pagesArchived;

		}

	};

	/*
		Update stats 
	*/
	this.update = function update() {

		// Update stats if they are enabled
		if (self.statsEnabled === true) {
			self.stats.pagesArchived += 1;

			browser.storage.sync.set({
				'pagesArchived': self.stats.pagesArchived
			}, function () {

				debug.log('stats updated');

			});

		}

	};

}
