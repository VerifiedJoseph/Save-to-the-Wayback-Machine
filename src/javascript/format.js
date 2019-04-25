/*jslint node: true */
/*global settings, Intl, spacetime */

"use strict";

function Format() {

	/**
	 * Format numbers using the user selected format
	 * @param {int} n
	 * @param {string} format
	 * @return {string} n
	 */
	this.number = function number(n, format) {

		var regex = /(\d+)(\d{3})/,
			separator;

		if (format === '1,000') {
			separator = ',';

		} else if (format === '1 000') {
			separator = ' ';

		} else if (format === '1.000') {
			separator = '.';

		} else if (format === '1\'000') {
			separator = '\x27';
		}

		if (n >= 1000) {
			n = n.toString();

			while (regex.test(n)) {
				n = n.replace(regex, '$1' + separator + '$2');
			}
		}

		return n;

	};

	/**
	 * Convert 14 digit IA timestamps (YYYYMMDDhhmmss) into ISO 8601 format (YYYYMMDDTHHMMSSZ).
	 * @param {string} timeStamp API timestamp
	 * @return {string}
	 */
	this.timeStampToDate = function timeStampToDate(timeStamp) {

		return timeStamp.replace(
			/^(\d{4})(\d\d)(\d\d)(\d\d)(\d\d)(\d\d)$/,
			'$1-$2-$3T$4:$5:$6Z'
		);

	};

	/**
	 * Format time stamp into a readable date format
	 * @param {string} isoString Date in ISO 8601 format
	 * @param {string} customFormat Custom date format
	 * @return {string}
	 */
	this.readableDate = function readableDate(isoString, customFormat) {

		var d = spacetime(isoString),
			format = settings.get('dateFormat');
		
		if (customFormat) {
			format = customFormat;
		}
		
		if (settings.get('timeZoneConvert') === true) {
			d = d.goto(Intl.DateTimeFormat().resolvedOptions().timeZone);
		}
		
		if (format === 'Y/m/d' || format === 'year/month/day') {
			return d.format('ymd');
		}
		
		if (format === 'd/m/Y' || format === 'day/month/year') {
			return d.format('dmy');
		}
		
		if (format === 'm/d/Y' || format === 'month/day/year') {
			return d.format('mdy');
		}

		// default -  April 04, 2018
		return d.format('month') + ' ' + d.format('date') + ', ' + d.format('year');

	};

	/**
	 * Format time stamp into a readable time format
	 * @param {string} isoString Date in ISO 8601 format
	 * @param {string} customFormat Custom date format
	 * @return {string}
	 */
	this.readableTime = function readableTime(isoString, customFormat) {

		var d = spacetime(isoString),
			format = settings.get('timeFormat');
		
		if (customFormat) {
			format = customFormat;
		}
		
		if (settings.get('timeZoneConvert') === true) {
			d = d.goto(Intl.DateTimeFormat().resolvedOptions().timeZone);
		}
		
		if (format === 'h:mm a' || format === 'g:i A') { // 12 Hour clock
			return d.unixFmt('hh:mm a');
		}
		
		if (format === 'h:mm:ss a' || format === 'g:i:s A') { // 12 Hour clock with seconds
			return d.unixFmt('hh:mm:ss a');
		}
		
		if (format === 'HH:mm' || format === 'H:i') { // 24 Hour clock
			return d.format('time-24');
		}

		if (format === 'HH:mm:ss' || format === 'H:i:s') { // 24 Hour clock with seconds
			return d.unixFmt('HH:mm:ss');
		}

		// default - 12 Hour clock
		return d.unixFmt('HH:mm a');
		
	};

	/**
	 * Format time stamp to a time ago string. example: "1 hour ago"
	 * @param {string} dateString
	 * @param {bool} convertTimeZone Convert to local time zone
	 * @return {string} output
	 */
	this.timeSince = function timeSince(dateString, convertTimeZone) {

		if (convertTimeZone === undefined) {
			convertTimeZone = false;
		}

		var date,
			seconds,
			interval;

		if (convertTimeZone === true) { // Convert UTC to local timezone

			date = new Date(dateString);

		} else {

			// Remove UTC 'Z' time zone designator
			dateString = dateString.slice(0, -1);
			date = new Date(dateString);

		}

		seconds = Math.floor((new Date() - date) / 1000);
		interval = Math.floor(seconds / 31536000);

		if (interval > 1) {
			return interval + " years ago";
		}

		interval = Math.floor(seconds / 2592000);

		if (interval > 1) {
			return interval + " months ago";
		}

		interval = Math.floor(seconds / 86400);

		if (interval > 1) {
			return interval + " days ago";
		}

		interval = Math.floor(seconds / 3600);

		if (interval === 1) {
			return interval + " hour ago";
		}

		if (interval > 1) {
			return interval + " hours ago";
		}

		interval = Math.floor(seconds / 60);

		if (interval === 1) {
			return interval + " minute ago";
		}

		if (interval > 1) {
			return interval + " minutes ago";
		}

		return Math.floor(seconds) + " seconds ago";

	};

}
