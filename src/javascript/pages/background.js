/*jslint node: true */
/*global Stats, Settings, validate, global, archive, browser, Audio, Debug, console */
"use strict";

var settings = new Settings(),
	debug = new Debug(),
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
 * Show a notification
 * @param {string} url
 * @param {string} title
 * @param {string} message
 */
function notifyUser(url, title, message) {

	if (settings.get('contextMenuNote') === true) { // Notifications enabled			

		// Create notification
		browser.notifications.create("", {
			title: title,
			iconUrl: '/images/icons/96.png',
			type: 'basic',
			message: message
		});

		debug.log('Created notification \n Title: ' + title + '\n Message: ' + message + '\n URL: ' + url);
	}
}

/*
 * Play alert sound along with the notification (if enabled by user)
 */
function notifyUserSound() {

	if (settings.get('notePlayAlert') === true) { // Enabled

		var sound = settings.get('noteAlertSound'),
			file = global.alertSounds[sound],
			audio;

		if (typeof file !== 'undefined') {

			audio = new Audio('../sounds/' + file);
			audio.play();

			debug.log('Played notification sound (#' + sound + ') ');
		}
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
		
		notifyUser(response.url, browser.i18n.getMessage('notificationArchiveFailed'), response.error);
		notifyUserSound();

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

	validate(tab.url, function (status) {

		if (status === true) {

			archive(tab.url, wasArchived); // Save the page

		} else { // Failed, show notification

			notifyUser(tab.url, browser.i18n.getMessage('notificationCanNotArchive'), browser.i18n.getMessage('notificationBodyCanNotArchive'));
			notifyUserSound();

		}

	});

});
