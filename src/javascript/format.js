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
		
		// Set timezone
		d = d.goto(settings.get('timeZone'));

		
		if (format === 'Y/m/d' || format === 'ymd') {
			return d.format('ymd');
		}
		
		if (format === 'd/m/Y' || format === 'dmy') {
			return d.format('dmy');
		}
		
		if (format === 'm/d/Y' || format === 'mdy') {
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
		
		// Set timezone
		d = d.goto(settings.get('timeZone'));
		
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
	 * @param {string} isoString
	 * @return {string}
	 */
	this.timeSince = function timeSince(isoString) {
		
		var before = spacetime(isoString), now = spacetime();
		
		if (settings.get('timeZoneConvert') === true) {
			before = before.goto(Intl.DateTimeFormat().resolvedOptions().timeZone);
		}
		
		var diif = now.since(before).diff;
		
		if (diif.years > 1) {
			return diif.years + ' years ago';
		}
		
		if (diif.years === 1) {

			if (diif.months > 0) {
				return '1 year, ' + diif.months + ' months ago';
			}
			
			if (diif.days > 0) {
				return '1 year, ' + diif.days + ' days ago';
			}
			
			return '1 year ago';
			
		}
		
		if (diif.months > 1) {
			
			if (diif.days > 0) {
				return diif.months + ' months, ' + diif.days + ' days ago';
			}
			
			return diif.months + " months ago";
		}
		
		if (diif.months === 1) {
			
			if (diif.days > 0) {
				return '1 month, ' + diif.days + ' days ago';
			}
			
			return '1 month ago';
		}
		
		if (diif.days > 1) {
			return diif.days + ' days ago';
		}
		
		if (diif.days === 1) {
			return '1 days ago';
		}

		if (diif.hours === 1) {
			return '1 hour ago';
		}

		if (diif.hours > 1) {
			return diif.hours + " hours ago";
		}

		if (diif.minutes === 1) {
			return diif.minutes + " minute ago";
		}

		if (diif.minutes > 1) {
			return diif.minutes + " minutes ago";
		}

		return diif.seconds + " seconds ago";
		
	};

}
