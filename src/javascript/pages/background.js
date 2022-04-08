/*jslint node: true */
/*global Stats, Settings, Notify, validate, archive, browser, Debug, global, console */
"use strict";

var settings = new Settings(),
	debug = new Debug(),
	notify = new Notify(),
	stats = new Stats(),
	contextMenuSet = {
		'archivePage': false,
		'archiveLink': false,
		'archiveImage': false,
		'viewArchivedPage': false,
		'viewArchivedLink': false,
		'viewArchivedImage': false
	};

/**
 * Create a context menu option
 * @param {string} id
 * @param {array} contexts
 * @param {sting} title
 */
function contextMenuCreate(id, context, title) {
	browser.contextMenus.create({
		'title': title,
		'contexts': [context],
		'id': id
	}, function () {
		contextMenuSet[id] = true;

		debug.log('Created context menu item: ' + id);

		if (browser.extension.lastError) {
			console.log('Error: ' + browser.extension.lastError.message);
		}
	});
}

/**
 * Remove a context menu option
 * @param {string} id
 */
function contextMenuRemove(id) {
	browser.contextMenus.remove(id, function () {
		contextMenuSet[id] = false;

		debug.log('Removed context menu item: ' + id);

		if (browser.extension.lastError) {
			console.log('Error: ' + browser.extension.lastError.message);
		}

	});
}

/**
 *	Create or remove 'archive this page' context menu option
 **/
function contextMenus() {

	if (settings.get('contextMenu') === true) {

		// Pages
		if (contextMenuSet.archivePage === false && settings.get('contextMenuArchive').page === true) {
			contextMenuCreate(
				'archivePage',
				'page',
				browser.i18n.getMessage('MenuItemArchivePage')
			);

		} else if (contextMenuSet.archivePage === true && settings.get('contextMenuArchive').page === false) {
			contextMenuRemove('archivePage');
		}

		// Links
		if (contextMenuSet.archiveLink === false && settings.get('contextMenuArchive').link === true) {
			contextMenuCreate(
				'archiveLink',
				'link',
				browser.i18n.getMessage('MenuItemArchiveLink')
			);

		} else if (contextMenuSet.archiveLink === true && settings.get('contextMenuArchive').link === false) {
			contextMenuRemove('archiveLink');
		}

		// Images
		if (contextMenuSet.archiveImage === false && settings.get('contextMenuArchive').image === true) {
			contextMenuCreate(
				'archiveImage',
				'image',
				browser.i18n.getMessage('MenuItemArchiveImage')
			);

		} else if (contextMenuSet.archiveImage === true && settings.get('contextMenuArchive').image === false) {
			contextMenuRemove('archiveImage');
		}
		
		// View archived page
		if (contextMenuSet.viewArchivedPage === false && settings.get('contextMenuViewArchived').page === true) {
			contextMenuCreate(
				'viewArchivedPage',
				'page',
				browser.i18n.getMessage('MenuItemViewArchivedPage')
			);

		} else if (contextMenuSet.viewArchivedPage === true && settings.get('contextMenuViewArchived').page === false) {
			contextMenuRemove('viewArchivedPage');
		}
		
		// View archived link
		if (contextMenuSet.viewArchivedLink === false && settings.get('contextMenuViewArchived').link === true) {
			contextMenuCreate(
				'viewArchivedLink',
				'link',
				browser.i18n.getMessage('MenuItemViewArchivedLink')
			);

		} else if (contextMenuSet.viewArchivedLink === true && settings.get('contextMenuViewArchived').link === false) {
			contextMenuRemove('viewArchivedLink');
		}
		
		// View archived image
		if (contextMenuSet.viewArchivedImage === false && settings.get('contextMenuViewArchived').image === true) {
			contextMenuCreate(
				'viewArchivedImage',
				'image',
				browser.i18n.getMessage('MenuItemViewArchivedImage')
			);

		} else if (contextMenuSet.viewArchivedImage === true && settings.get('contextMenuViewArchived').image === false) {
			contextMenuRemove('viewArchivedImage');
		}
	} else { // Context menu options disabled, remove all options.
		contextMenuRemove('archivePage');
		contextMenuRemove('archiveLink');
		contextMenuRemove('archiveImage');
		contextMenuRemove('viewArchivedPage');
		contextMenuRemove('viewArchivedLink');
		contextMenuRemove('viewArchivedImage');
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

function setPopup() {
	browser.browserAction.setPopup({popup: browser.runtime.getURL('html/popup.html')});
}

// Load settings on start.
settings.load(function () {

	if (settings.isLoaded() === true) {
		if (settings.get('eolRead') === true) {
			setPopup();
		}

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
			if (settings.get('eolRead') === true) {
				setPopup();
			}

			// Start Debug logging (if enabled by user)
			debug.enable(settings.get('logDebugInfo'));
			debug.log('settings updated and loaded');

			contextMenus();
		}
	});
});

// Listener for context menu link
browser.contextMenus.onClicked.addListener(function (info) {
	var archivePage = false,
		url;
	
	if (info.hasOwnProperty('pageUrl')) {
		if (info.menuItemId === 'archivePage') {
			archivePage = true;
		}

		url = info.pageUrl;
	}
	
	if (info.hasOwnProperty('linkUrl')) {
		if (info.menuItemId === 'archiveLink') {
			archivePage = true;
		}

		url = info.linkUrl;
	}
	
	if (info.hasOwnProperty('srcUrl')) {
		if (info.menuItemId === 'archiveImage') {
			archivePage = true;
		}

		url = info.srcUrl;
	}

	settings.load(function () {
		validate(url, function (status) {
			if (status === true) {
				if (archivePage === true) { // Archive page 
					archive(url, wasArchived);
				}

				if (archivePage === false) { // View archived page
					browser.tabs.create({
						url: global.urls.base + '/web/2/' + url
					});
				}

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

// Opens message page on toolbar click if EOL not yet acknowledged.
chrome.browserAction.onClicked.addListener((tab) => {
	settings.load(function () {
		if (settings.get('eolRead') === false) {
			browser.tabs.create({
				url: browser.runtime.getURL('html/message.html')
			});
		}
	});
  })
