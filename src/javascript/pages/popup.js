/*jslint node: true */
/*global browser, UI, Request, Settings, Stats, Debug, global, archive, validate, Format, document, window */
"use strict";

var ui = new UI(),
	settings = new Settings(),
	debug = new Debug(),
	stats = new Stats(),
	format = new Format(),
	timeStamp, // Time stamp from the Wayback availability API.
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
 * Format and display data returned by the wayback availability API
 * @param {object} response
 */
function apiData(response) {

	if (response.status === 200) { // Check status code

		var data = JSON.parse(response.data);

		if (data.archived_snapshots.hasOwnProperty('closest')) { // Did the API return a snapshot?

			ui.display('message', false);
			ui.display('archive-version', true);
			ui.display('archive-history', true);

			// Change timeStamp in to a format that is supported by Date()
			timeStamp = format.timeStampToDate(data.archived_snapshots.closest.timestamp);

			if (settings.get('displayFullDate') === true) { // Display Full date and time 

				ui.content('date', format.readableDate(timeStamp, settings.get('timeZoneConvert'), settings.get('dateFormat')));
				ui.content('time', format.readableTime(timeStamp, settings.get('timeZoneConvert'), settings.get('timeFormat')));
				ui.display('time-date', true);

			} else { // Display time since (e.g: "1 hour ago")

				ui.content('since', format.timeSince(timeStamp, settings.get('timeZoneConvert')));
				ui.display('time-since', true);

			}

			// Event listener for archive history button
			document.getElementById('archive-history').addEventListener('click', function () {
				tab(global.urls.calendar + url); // Create tab
			});

			// Event listener for archive version button
			document.getElementById('archive-version').addEventListener('click', function () {
				tab(global.urls.base + '/web/' + data.archived_snapshots.closest.timestamp  + '/' + data.url); // Create tab
			});

		} else { // A snapshot was not returned.

			debug.log('No snapshot returned for ' + url);

			ui.content('message', 'Page has not been archived.');
			ui.display('archive-version', false);
			ui.display('archive-history', false);

		}

	} else { // Error fetching data from API

		debug.log('API Data not fetched for ' + url);

		ui.content('message', browser.i18n.getMessage('ApiRequestFailed'));
		ui.display('archive-version', false);
		ui.display('archive-history', false);

	}

}

/**
 * Was the page archived?
 * @param {object} response
 */
function wasArchived(response) {

	// Hide loading animation
	ui.display('loading-animation', false);

	if (response.archived === false) { // Page was not archived

		// Log details 
		debug.log('Page Not Archived \n URL :' + response.url + '\n Status code: ' + response.code + '\n Reason: ' + response.error);

		// Overlay Title
		ui.content('overlay-title', 'Page Not Archived');

		// Overlay Error/Note
		ui.content('overlay-reason', response.error);

	} else { // Page saved

		// Update Stats 
		stats.update();

		// Title
		ui.content('overlay-title', 'Page Archived');

		// Add event listener for view button.
		document.getElementById('overlay-button').addEventListener('click', function () {
			tab(global.urls.base + response.captureUrl); // Create tab
		});

		// Show view button.
		ui.display('overlay-button', true);

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

			ui.display('overlay', true);
			ui.display('loading-animation', true);

			// Add .overlay to #options-box
			ui.addClass('options-box', 'overlay');

			// Save to page to the archive
			archive(url, wasArchived);

		});

		// Fetch Wayback API data
		var request = new Request();
		request.get(global.urls.api + url, apiData);

	} else { // URL is not valid.			

		ui.content('overlay-title', '');
		ui.content('overlay-reason', browser.i18n.getMessage('UrlValidationFailed'));

		ui.display('overlay', true);

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
			ui.display('statistics', true);
			ui.display('back', true);

			// Remove .overlay from #options-box if #overlay is displayed
			if (ui.isDisplayed('overlay') === true) {

				ui.removeClass('options-box', 'overlay');

			}

			// Hide option and stats buttons
			ui.display('options', false);
			ui.display('stats', false);

			// Display stats
			ui.content('total-number', format.number(stats.get(), settings.get('numberFormat')));

		});

		// Closing stats view (back)
		document.getElementById('back').addEventListener('click', function () {

			// Show option and stats buttons
			ui.display('options', true);
			ui.display('stats', true);

			// Add .overlay to #options-box if #overlay is displayed
			if (ui.isDisplayed('overlay') === true) {

				ui.addClass('options-box', 'overlay');

			}

			// Hide statistics div and back butto
			ui.display('statistics', false);
			ui.display('back', false);

		});

	} else { // Stats disabled. Hide button.

		// Change display status of stats button
		ui.display('stats', false);

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

	// Set URL
	url = tabs[0].url;

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
