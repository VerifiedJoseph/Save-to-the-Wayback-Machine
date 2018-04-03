/*jslint node: true */
/*global browser */

"use strict";

/*
	User Settings
*/
function Settings() {
	var loaded = false,
		self = this,
		items = {},
		defaults = {
			// Page Archived and number format
			numberFormat: '1,000', // Format to display numbers in.

			logNumberArchived: true, // Log number of pages archived.

			// Date and time formats
			dateFormat: 'F j, Y', // Default date format (e.g: April 04, 2018)
			timeFormat: 'g:i A', // Default date time (e.g: 06:16 PM)
			timeZoneConvert: true, // Convert time from UTC to local time zone
			displayFullDate: true, // Display full time and date using user selected formats
			displayTimeSince: false, // Display time past since date (e.g: "1 hour ago")

			// Context Menu
			contextMenu: true, // Show 'Archive this' link in the context menu (right click menu).
			contextMenuNote: true, // Display notification if a page cannot be archived via the context menu.

			// Notifications
			notePlayAlert: false, // Play an alert sound when a notification is displayed.
			noteAlertSound: 0, // Default Alert sound.

			// Tab & Link Behavior
			openInCurrent: false, // Open archive.org links in the current tab.

			// Debug
			logDebugInfo: false // Log debug messages in the developer console.

		};

	/**
	 * Have the settings been loaded?
	 * @returns {boolean}
	 */
	this.isLoaded = function isLoaded() {

		return self.loaded;

	};

	/**
	 * Load user settings from storage
	 * @param {callable} callback
	 */
	this.load = function load(callback) {

		browser.storage.sync.get(defaults, function (data) {

			self.loaded = true;
			self.items = data;

			callback();

		});

	};

	/**
	 * Save updated user settings to storage
	 * @param {object} updatedItems
	 * @param {callback} callback
	 * @callback {boolean} status
	 */
	this.update = function update(updatedItems, callback) {
		var status = true;

		if (typeof updatedItems !== 'undefined') {

			browser.storage.sync.set(updatedItems, function () {
				self.items = updatedItems;

				if (browser.runtime.lastError) {
					status = false;
				}

			});

		}

		callback(status);

	};

	/**
	 * Get setting from the items object 
	 * @param {string} name - Name of the setting
	 * @return {mixed}
	 */
	this.get = function get(name) {

		// If item exists in object
		if (self.items.hasOwnProperty(name)) {

			return self.items[name];

		} else { // Item not found

			return null;

		}

	};

	/**
	 * Return all settings (user settings and defaults)
	 * @return {object} all
	 */
	this.getAll = function getAll() {

		var all = {
			options: self.items,
			defaultOptions: defaults
		};

		return all;

	};

}