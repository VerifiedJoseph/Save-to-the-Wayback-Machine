/*jslint node: true */
/*global Stats, Settings, Notify, validate, archive, browser, Debug, console */
"use strict";

var settings = new Settings(),
	debug = new Debug(),
	notify = new Notify(),
	stats = new Stats(),
	contextMenuSet = false;

/**
 *	Create or remove 'archive this page' context menu option
 **/
function contextMenus() {

	// Create option
	if (contextMenuSet === false && settings.get('contextMenu') === true) {

		browser.contextMenus.create({
			"title": browser.i18n.getMessage('MenuItemArchivePage'),
			"contexts": ["page"],
			"id": "archivePage"
		}, function () {

			contextMenuSet = true;

			if (browser.extension.lastError) {
				console.log("Error: " + browser.extension.lastError.message);
			}

		});

		// Remove option
	} else if (contextMenuSet === true && settings.get('contextMenu') === false) {

		browser.contextMenus.removeAll(function () {
			contextMenuSet = false;

			if (browser.extension.lastError) {
				console.log("Error: " + browser.extension.lastError.message);
			}

		});

	}

}

/**
 * Was the page archived?
 * @param {object} response
 */
function wasArchived(response) {

	if (response.archived === false) { // Page was not archived

		// Log Details
		debug.log('Page Not Archived \n URL:' + response.url + ' \n Status code: ' + response.code + '\n Reason: ' + response.error);

		notify.note(
			browser.i18n.getMessage('notificationArchiveFailed'),
			response.error
		);
		notify.sound();

	} else { // Page saved

		// Log number
		stats.update();

		// Create tab with saved page
		browser.tabs.create({
			url: 'https://web.archive.org' + response.captureUrl
		});

	}

}


// Load settings on start.
settings.load(function () {

	if (settings.isLoaded() === true) {

		// Start Debug logging (if enabled by user)
		debug.enable(settings.get('logDebugInfo'));
		debug.log('Settings loaded');

		// Load Stats
		stats.load(settings.get('logNumberArchived'));

		contextMenus();

	} else {

		console.log('Failed to load settings, extension not started!');

	}

});

/** Convert date and time format to values used in version 5.3.0 or greater */
function convertDateTimeFormats() {

	var dateOld = ['F j, Y', 'Y/m/d', 'd/m/Y', 'm/d/Y'],
		dateNew = ['MMMM d, Y', 'ymd', 'dmy', 'mdy'],
		timeOld = ['g:i A', 'g:i:s A', 'H:i', 'H:i:s'],
		timeNew = ['h:mm a', 'h:mm:ss a', 'HH:mm', 'HH:mm:ss'],
		dateFormat = settings.get('dateFormat'),
		timeFormat = settings.get('timeFormat'),
		update = {};

	if (dateOld.includes(dateFormat) === true) {

		update = {
			dateFormat: dateNew[dateOld.indexOf(dateFormat)]
		};

		settings.update(update, function (updated) {

			if (updated === true) {
				debug.log('Updated date format from ' + dateFormat + ' to ' + update.dateFormat);
			}

		});

	}

	if (timeOld.includes(timeFormat) === true) {

		update = {
			'timeFormat': timeNew[timeOld.indexOf(timeFormat)]
		};

		settings.update(update, function (updated) {

			if (updated === true) {
				debug.log('Updated time format from ' + timeFormat + ' to ' + update.timeFormat);
			}

		});

	}
}

// Listener for then the storage has changed
browser.storage.onChanged.addListener(function () {

	settings.load(function () {

		if (settings.isLoaded() === true) {

			// Start Debug logging (if enabled by user)
			debug.enable(settings.get('logDebugInfo'));
			debug.log('settings updated and loaded');

			contextMenus();
		}

	});

});

// Listener for context menu link
browser.contextMenus.onClicked.addListener(function (info, tab) {

	settings.load(function () {

		validate(tab.url, function (status) {

			if (status === true) {
				archive(tab.url, wasArchived); // Save the page

			} else { // Failed, show notification

				notify.note(
					browser.i18n.getMessage('notificationCanNotArchive'),
					browser.i18n.getMessage('notificationBodyCanNotArchive')
				);
				notify.sound();
			}
		});
	});

});

browser.runtime.onInstalled.addListener(function (details) {

	settings.load(function () {

		if (details.reason === 'update') {
			convertDateTimeFormats();
		}

	});

});
