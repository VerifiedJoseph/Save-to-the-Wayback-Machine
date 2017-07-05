/*jslint node: true */
/*global chrome, browser, console */

"use strict";

/*
	Format numbers using the user selected format

	@param {int} number
	@param {string} format
	@return {string} number
*/
function formatNumber(number, format) {
	
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

	if (number >= 1000) {
		number = number.toString();

		while (regex.test(number)) {
			number = number.replace(regex, '$1' + separator + '$2');
		}
	}

	return number;

}

/*
	Format time stamp return by the Wayback API in to a string
	
	@param {string} type (date/time)
	@param {int} timeStamp
	@param {bool} convertTimeZone
	@param {string} date or time format
	@return {string} output 
*/
function formatTimeStamp(type, timeStamp, convertTimeZone, format) {
	format = format || null;

	var output,
		months = {'01': "January", '02': "February", '03': "March", '04': "April", '05': "May",
			'06': "June", '07': "July", '08': "August", '09': "September", '10': "October", '11': "November", '12': "December"},
		year,
		month,
		day,
		hour,
		min,
		sec,
		ap;

	if (typeof timeStamp !== 'undefined') {

		// Time stamp parts
		year = timeStamp.substr(0, 4);
		month = timeStamp.substr(4, 2);
		day = timeStamp.substr(6, 2);
		hour = timeStamp.substr(8, 2);
		min = timeStamp.substr(10, 2);
		sec = timeStamp.substr(12, 2);

		if (convertTimeZone === true) { // Convert to local timezone

			var UTC = month + '/' + day + '/' + year + ' ' + hour + ':' + min + ':' + sec + ' UTC',
				UTCtime = new Date(UTC); // Convert to local timezone
			UTCtime.toLocaleString();

			// Fetch Local Time stamp parts
			var localTime = new Date(UTCtime);

			year = localTime.getFullYear();
			month = localTime.getMonth() + 1;
			day = localTime.getDate();

			hour = localTime.getHours();
			min = localTime.getMinutes();
			sec = localTime.getSeconds();

		}

		if (type === 'date') { // Format date

			// Add leading zero, if not present
			if (day < 10 && day.toString().length === 1) {
				day = '0' + day;
			}

			if (month < 10 && month.toString().length === 1) {
				month = '0' + month;
			}

			if (format === 'F j, Y') { // F j, Y - June 5, 2016

				if (day < 10) { // Removed starting zero
					day = day.substr(1);
				}

				output = months[month] + ' ' + day + ', ' + year;

			} else if (format === 'Y/m/d') { // Y/m/d - 2016/06/05
				output = year + '/' + month + '/' + day;

			} else if (format === 'd/m/Y') { // d/m/Y - 05/06/2016
				output = day + '/' + month + '/' + year;

			} else if (format === 'm/d/Y') { // m/d/Y - 06/05/2016
				output = month + '/' + day + '/' + year;
			}

		} else if (type === 'time') { // Format Time

			ap = 'AM';

			// Add leading zero for hour, min and sec, if not present
			if (hour < 10 && hour.toString().length === 1) {
				hour = '0' + hour;
			}

			if (min < 10 && min.toString().length === 1) {
				min = '0' + min;
			}

			if (sec < 10 && sec.toString().length === 1) {
				sec = '0' + sec;
			}

			if (format === 'H:i') { // H:i - 14:50
				output = hour + ':' + min;

			} else if (format === 'H:i:s') { // H:i:s - 14:50:48
				output = hour + ':' + min + ':' + sec;

			} else { // g:i A - 02:50 (PM/AM) and g:i:s A - 02:50:48 (PM/AM)

				if (hour > 12) {
					hour -= 12;
					ap = "PM";

				} else if (hour === 0) {
					hour = 12;
				}

				// Add leading zero to hour, if not present after changing to 12 hour clock
				if (hour < 10 && hour.toString().length === 1) {
					hour = '0' + hour;
				}

				if (format === 'g:i A') {  // Without seconds
					output = hour + ':' + min + ' ' + ap;

				} else { // With seconds
					output = hour + ':' + min + ':' + sec + ' ' + ap;
				}
			}
		}

		return output;

	}

}
	
/*
	Format time stamp return by the Wayback API in to a time since last archive string. e.g: "1 hour ago"
	
	@param {int} timeStamp
	@param {bool} convertTimeZone
	@return {string} output 
*/
function timeSince(timeStamp, convertTimeZone) {
	
	// Time stamp parts
	var year = timeStamp.substr(0, 4),
		month = timeStamp.substr(4, 2),
		day = timeStamp.substr(6, 2),
		hour = timeStamp.substr(8, 2),
		min = timeStamp.substr(10, 2),
		sec = timeStamp.substr(12, 2),
		date;
	
	if (convertTimeZone === true) { // Convert to local timezone
		var UTC = month + '/' + day + '/' + year + ' ' + hour + ':' + min + ':' + sec + ' UTC',
			UTCtime = new Date(UTC); // Convert to local timezone
		
		UTCtime.toLocaleString();

		// Fetch Local Time stamp parts
		date = new Date(UTCtime);

	} else {
		date = new Date(month + '/' + day + '/' + year + ' ' + hour + ':' + min + ':' + sec);
	}
	
	var seconds = Math.floor((new Date() - date) / 1000),
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
  
	if (interval > 1) {
		return interval + " hours ago";
	}
  
		
	interval = Math.floor(seconds / 60);
		
	if (interval > 1) {
		return interval + " minutes ago";
	}

	return Math.floor(seconds) + " seconds ago";
	
}