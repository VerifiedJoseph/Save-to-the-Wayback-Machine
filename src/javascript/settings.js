/*jslint node: true */
/*global browser, console */

"use strict";

/*
	User Settings

	@type {class}
*/
function Settings() {
	var loaded = false,
		self = this,
		storage = null,
		items = {},
		defaults = {
			// Page Archived and number format
			numberFormat: '1,000', // Format to display numbers

			logNumberArchived: true, // Log number of pages archived

			// Date and time formats
			dateFormat: 'F j, Y',
			timeFormat: 'g:i A',
			timeZoneConvert: true,
			displayFullDate: true,
			displayTimeSince: false,

			// Context Menu
			contextMenu: true, // Show 'Archive this' link is the context menu (right click menu)
			contextMenuNote: true, // Display notification if a page cannot be archived via the context menu

			// Notifications
			notePlayAlert: false, // Play alert sound when a notification is displayed.
			noteAlertSound: 0 // Default Alert sound.
		};

	/*
		Have the settings been loaded?
		
		@type {function}
		@returns {boolean} - true/false
	*/
	this.isLoaded = function isLoaded() {
		
		return self.loaded;
		
	};
		
	/*
		Load settings from storage
  	
		@param {callable} callback
  */
	this.load = function load(callback) {
		
		browser.storage.sync.get(defaults, function (data) {
			
			self.loaded = true;
			self.items = data;
			//console.log(self.items);
			
			callback();
			
		});
		
	};
	
	/*
		Save updated settings item to storage
  	
		@param {object} updatedItems 
		@param {callback} callback
		@callback {bool} status
  */
	this.update = function update(updatedItems, callback) {
		var status = true;
		
		//console.log(updatedItems);
		
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
	
	/*
		Get a setting from the items object 
	
		@param {string} name 
		@return {string} setting/ false
	*/
	this.get = function get(name) {
		
		// If item exists in object
		if (self.items.hasOwnProperty(name)) {
			
			return self.items[name];
			
		} else { // Item not found
			
			return null;
			
		}
		
	};
	
	/*
		Return all settings (user and defaults)
	
		@return {object} settings
	*/
	this.getAll = function getAll() {
		
		var all = {
			options: self.items,
			defaultOptions: defaults
		};
		
		return all;
		
	};
	
}