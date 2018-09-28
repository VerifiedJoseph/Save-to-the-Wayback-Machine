/*jslint node: true */
/*global console */

"use strict";

/*
	Debug info logger
*/
function Debug() {
	var self = this,
		isEnabled = false;
	
	/*
		Enable the logging
	*/
	this.enable = function enable(status) {
		
		isEnabled = status;
		
	};
	
	/**
	 * Log text in the console
	 * @param {string} text
	 */
	this.log = function log(text) {
		
		if (isEnabled === true && text !== undefined) {

			console.log(text);

		}
		
	};

}