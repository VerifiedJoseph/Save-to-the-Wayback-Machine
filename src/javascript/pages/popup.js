/*jslint node: true */
/*global browser, UI, Snapshot, Settings, Stats, Debug, global, archive, validate, Format, document, window */
"use strict";

var ui = new UI(),
	settings = new Settings(),
	debug = new Debug(),
	stats = new Stats(),
	format = new Format(),
	url; // URL of the current tab.

/**
 * Create a new tab or update current.
 * @param {string} pageUrl
 */
function tab(pageUrl) {

	if (settings.get('openInCurrent') === true) { // Open URL in the current tab.
		browser.tabs.update({
			url: pageUrl,
			active: true
		});

	} else { // Open URL in a new tab.
		browser.tabs.create({
			url: pageUrl
		});
	}

	// Close the popup. Firefox, MS Edge, and Vivaldi fail to do this automatically.
	window.close();
}

/**
 * Format and display data returned by Wayback Availability API
 * @param {object} response
 */
function snapshotData(snapshot) {
	try {
		if (snapshot.error === true) {
			debug.log('API Data not fetched for ' + url);
			throw new Error(browser.i18n.getMessage('ApiRequestFailed'));
		}

		if (snapshot.available === false) {
			debug.log('No snapshot returned for ' + url);
			throw new Error(browser.i18n.getMessage('ApiPageNotArchived'));
		}

		ui.hide('message');
		ui.display('archive-version');
		ui.display('archive-history');

		// Convert timestamp to ISO 8601 format
		var isoString = format.convertToIso(snapshot.timestamp);

		if (settings.get('displayFullDate') === true) { // Display Full date and time 
			ui.content('date', format.readableDate(isoString));
			ui.content('time', format.readableTime(isoString));
			ui.display('time-date');

		} else { // Display time since (e.g: "1 hour ago")
			ui.content('since', format.timeSince(isoString, settings.get('timeZoneConvert')));
			ui.title('since', format.readableDate(isoString) + ' ' + format.readableTime(isoString));
			ui.display('time-since');
		}

		// Event listener for archive history button
		document.getElementById('archive-history').addEventListener('click', function () {
			tab(global.urls.calendar + url); // Create tab
		});

		// Event listener for archive version button
		document.getElementById('archive-version').addEventListener('click', function () {
			tab(global.urls.base + '/web/' + snapshot.timestamp + '/' + url); // Create tab
		});
	} catch (exception) {
		ui.content('message', exception.message);
		ui.hide('archive-version');
		ui.hide('archive-history');
	}
}

/**
 * Was the page archived?
 * @param {object} response
 */
function wasArchived(response) {

	// Hide loading animation
	ui.hide('loading-animation');

	if (response.archived === false) { // Page was not archived

		// Log details 
		debug.log('Page Not Archived \n URL :' + response.url + '\n Status code: ' + response.code + '\n Reason: ' + response.error);

		// Overlay Title
		ui.content('overlay-title', browser.i18n.getMessage('PageNotArchived'));

		// Overlay Error/Note
		ui.content('overlay-reason', response.error);

	} else { // Page saved

		// Update Stats 
		stats.update();

		// Title
		ui.content('overlay-title', browser.i18n.getMessage('PageArchived'));

		// Add event listener for view button.
		document.getElementById('overlay-button').addEventListener('click', function () {
			tab(global.urls.base + response.captureUrl); // Create tab
		});

		// Show view button.
		ui.display('overlay-button');
	}
}


/**
 * Is the URL valid?
 * @param {boolean} status
 */
function isValid(status) {

	if (status === true) { // URL is valid,

		// Event listener for archive now button
		document.getElementById('archive-now').addEventListener('click', function () {
			ui.display('overlay');
			ui.display('loading-animation');

			// Add .overlay to #options-box
			ui.addClass('options-box', 'overlay');

			// Save to page to the archive
			archive(url, wasArchived);

		});

		var snapshot = new Snapshot();
		snapshot.get(url, snapshotData);

	} else { // URL is not valid.

		ui.content('overlay-title', '');
		ui.content('overlay-reason', browser.i18n.getMessage('UrlValidationFailed'));

		ui.display('overlay');

		// Add .overlay to #options-box
		ui.addClass('options-box', 'overlay');
	}
}

/*
	Event listeners
*/
function eventListeners() {

	// Event listener for opening/closing the stats view, if logNumberArchived option in enabled
	if (settings.get('logNumberArchived') === true) {

		// Opening stats view
		document.getElementById('stats').addEventListener('click', function () {

			// Show statistics div and back button
			ui.display('statistics');
			ui.display('back');

			// Remove .overlay from #options-box if #overlay is displayed
			if (ui.isDisplayed('overlay') === true) {
				ui.removeClass('options-box', 'overlay');
			}

			// Hide option and stats buttons
			ui.hide('options');
			ui.hide('stats');

			// Display stats
			ui.content('total-number', format.number(stats.get(), settings.get('numberFormat')));
		});

		// Closing stats view (back)
		document.getElementById('back').addEventListener('click', function () {

			// Show option and stats buttons
			ui.display('options');
			ui.display('stats');

			// Add .overlay to #options-box if #overlay is displayed
			if (ui.isDisplayed('overlay') === true) {
				ui.addClass('options-box', 'overlay');
			}

			// Hide statistics div and back butto
			ui.hide('statistics');
			ui.hide('back');
		});

	} else { // Stats disabled. Hide button.

		// Change display status of stats button
		ui.hide('stats');

		// Change width of options button to 150px
		ui.addClass('options', 'popup');
	}
}

/*
	Start popup
*/
function start() {

	if (settings.isLoaded() === true) {

		// Start Debug logging (if enabled by user)
		debug.enable(settings.get('logDebugInfo'));
		debug.log('Settings loaded');

		// Load Stats
		stats.load(settings.get('logNumberArchived'));

		// Set event listeners
		eventListeners();

		// Validate the current page URL
		validate(url, isValid);

	} else {
		console.log('Failed to load settings!');
	}
}

/*
	Get current tab URL (load settings and vaildate URL)
*/
browser.tabs.query({
	currentWindow: true,
	active: true
}, function (tabs) {
	var tab = tabs[0];

	// Since chrome 79 (Dec 2019), the property 'pendingUrl' is returned by the tabs.query API when a tab is loading.
	// Firefox (71) does not currently support this property.
	if (tab.status === 'loading' && tab.hasOwnProperty('pendingUrl')) {
		url = tabs[0].pendingUrl;
	} else {
		url = tabs[0].url;
	}

	// Load setting and run the start function
	settings.load(start);
});

/*
	Event listener for opening options page
*/
document.getElementById('options').addEventListener('click', function () {
	browser.tabs.create({
		url: browser.runtime.getURL('html/options.html')
	});

	// Close the popup. Firefox, MS Edge, and Vivaldi fail to do this automatically.
	window.close();
});
