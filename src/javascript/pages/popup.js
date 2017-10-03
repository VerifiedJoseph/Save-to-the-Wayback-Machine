/*jslint node: true */
/*global browser, UI, Request, Settings, Stats, Debug, global, archive, validate, Format, document, window */
"use strict";

var ui = new UI(),
	settings = new Settings(),
	debug = new Debug(),
	stats = new Stats(),
	format = new Format(),
	archivedVersion, // URL from the Wayback availability API.
	archivedLocation, // Location of page saved by user.
	timeStamp, // Time stamp from Wayback availability API.
	url; // URL of the current tab.

/**
 * Create a new tab or update the current.
 * @param {string} pageUrl
 */
function tab(pageUrl) {

	if (settings.get('openInCurrent') === true) { // Open the URL in the current tab.
	
		browser.tabs.update({url: pageUrl, active: true});
	
	} else { // Open the URL in a new tab.
	
		browser.tabs.create({url: pageUrl});

	}
	
	// Close the popup. Firefox, MS Edge, and Vivaldi fail to do this automatically.
	window.close();
	
}

/**
 * Format and display data returned by the wayback API
 * @param {object} response
 */
function apiData(response) {

	if (response.status === 200) { // 

		var data = JSON.parse(response.data);

		// Returned a snapshot?
		if (data.archived_snapshots.hasOwnProperty('closest')) {

			ui.visibility('message', 'hide');
			ui.visibility('archive-version', 'show');
			ui.visibility('archive-history', 'show');
			
			archivedVersion = data.archived_snapshots.closest.url;
			//timeStamp = data.archived_snapshots.closest.timestamp;
			
			// Change timeStamp in to a format that is supported by Date.
			timeStamp = format.timeStampToDate(data.archived_snapshots.closest.timestamp);
			
			if (settings.get('displayFullDate') === true) { // Display Full date and time 

				ui.content('date', format.timeStamp('date', timeStamp, settings.get('timeZoneConvert'), settings.get('dateFormat')));
				ui.content('time', format.timeStamp('time', timeStamp, settings.get('timeZoneConvert'), settings.get('timeFormat')));
				ui.visibility('time-date', 'show');

			} else { // Display time since (e.g: "1 hour ago")
	
				ui.content('since', format.timeSince(timeStamp, settings.get('timeZoneConvert')));
				ui.visibility('time-since', 'show');
	
			}
	
			// Event listener for archive history button
			document.getElementById('archive-history').addEventListener('click', function () {

				tab(global.urls.calendar + url); // Create tab

			});

			// Event listener for archive version button
			document.getElementById('archive-version').addEventListener('click', function () {

				tab(archivedVersion); // Create tab

			});

		} else { // A snapshot was not returned

			debug.log('No snapshot returned for ' + url);
			
			ui.content('message', 'Page has not been archived.');
			ui.visibility('archive-version', 'hide');
			ui.visibility('archive-history', 'hide');

		}
	
	} else { // Error fetching data

		debug.log('API Data not fetched for ' + url);

		ui.content('message', 'Unable to fetch data from the Wayback Machine');
		ui.visibility('archive-version', 'hide');
		ui.visibility('archive-history', 'hide');
	
	}
	
}

/**
 * Was the page archived?
 * @param {object} response
 */
function wasArchived(response) {
	
	// Hide loading animation
	ui.visibility('loading-animation', 'hide');

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

		// Location of the archived page.
		archivedLocation = response.captureUrl;

		// Title
		ui.content('overlay-title', 'Page Archived');
	
		// Add event listener for view button.
		document.getElementById('overlay-button').addEventListener('click', function () {

			tab('https://web.archive.org' + response.captureUrl); // Create tab
	
		});

		// Show view button.
		ui.visibility('overlay-button', 'show');
		
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

			ui.visibility('overlay', 'show');
			ui.visibility('loading-animation', 'show');
	
			// Save to page to the archive
			archive(url, wasArchived);

		});
			
		// Fetch Wayback API data
		var request = new Request();
		request.open(global.urls.api + url, apiData);

	} else { // URL is not valid.			
		
		ui.content('overlay-title', '');
		ui.content('overlay-reason', 'This page can not be archived!');

		ui.visibility('overlay', 'show');

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

			ui.visibility('stats-view', 'show');
			ui.visibility('options-box', 'hide');

			// Display stats
			ui.content('total-number', format.number(stats.get(), settings.get('numberFormat')));

		});
		
		// Closing stats view (back)
		document.getElementById('back').addEventListener('click', function () {

			ui.visibility('stats-view', 'hide');
			ui.visibility('options-box', 'show');
			
		});
		
	} else { // Stats disabled. Disable the button.

		// Update the button's CSS classes 
		ui.className('stats', 'left button small two disabled');
		
		// Add title attribute
		ui.title('options-box', 'Statistics are disabled');
		
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
browser.tabs.query({currentWindow: true, active: true}, function (tabs) {
	
	// Set URL
	url = tabs[0].url;
	
	// Load setting and run the start function
	settings.load(start);

});
	
/*
	Event listener for opening options page
*/
document.getElementById('options').addEventListener('click', function () {
	
	browser.tabs.create({url: browser.runtime.getURL('html/options.html')});
	
	// Close the popup. Firefox, MS Edge, and Vivaldi fail to do this automatically.
	window.close();

});
