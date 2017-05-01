/*jslint node: true */
/*global chrome, browser, console */

"use strict";

function Stats() {
	var self = this,
		statsEnabled = false,
		defaults = {pagesArchived: 0},
		stats = {};
		
	/*
		Load stats from storage
  	
		@param {bool} statsEnabled
  */
	this.load = function load(statsEnabled) {
		self.statsEnabled = statsEnabled;
		
		if (self.statsEnabled === true) {
			browser.storage.sync.get(defaults, function (data) {
				self.loaded = true;
				self.stats = data;
				
				console.log('stats loaded');
			});
		}
	
	};
	
	/*
		Return stats 
	
		@return {object} stats
	*/
	this.get = function get() {
		
		if (self.statsEnabled === true) {
			return self.stats;
			
		} else {
			return defaults;
		}
		
	};
	
	/*
		Update stats 
	*/
	this.update = function update() {
		//console.log(self.stats.pagesArchived);
		
		if (self.statsEnabled === true) {
			self.stats.pagesArchived += 1;

			chrome.storage.sync.set({
				'pagesArchived': self.stats.pagesArchived
			}, function () {
			
				console.log('Number updated');
			
			});
			
		}
		
	};
	
}