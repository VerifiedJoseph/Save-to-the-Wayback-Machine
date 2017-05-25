/*jslint node: true */
/*global browser, UI, HttpRequest, sendMessage, formatTimeStamp, timeSince, formatNumber */
"use strict";

(function () {
	
	var ui = new UI(),
		settings = {},
		archivedVersion,
		archivedLocation,
		timeStamp,
		url;
	
	/*
		Format and display data returned by the wayback API
	
		@param {object} response
	*/
	function apiData(response) {
		
		console.log(response);
		
		if (response.status === 200) {
			
			var data = JSON.parse(response.data);

			// Returned a snapshot?
			if (data.archived_snapshots.hasOwnProperty('closest')) {

				ui.visibility('loading', 'hide');
				
				archivedVersion = data.archived_snapshots.closest.url;
				timeStamp = data.archived_snapshots.closest.timestamp;
				
				if (settings.displayFullDate === true) { // Display Full date and time 
					
					ui.content('date', formatTimeStamp('date', timeStamp, settings.timeZoneConvert, settings.dateFormat));
					ui.content('time', formatTimeStamp('time', timeStamp, settings.timeZoneConvert, settings.timeFormat));
					ui.visibility('time-date', 'show');
					
				} else {  // Display time since (e.g: "1 hour ago")
					
					ui.content('since', timeSince(timeStamp, settings.timeZoneConvert));
					ui.visibility('time-since', 'show');
				}
				
				// Event listener for arhcive history button
				document.getElementById('archive-history').addEventListener('click', function () {
					browser.tabs.create({ url: global.urls.calendar + url });
				});

				// Event listener for archive version button
				document.getElementById('archive-version').addEventListener('click', function () {
					browser.tabs.create({ url: archivedVersion });
				});

				
			} else { // A snapshot was not returned

				console.log('No snapshot returned for ' + url);
				
				ui.visibility('loading', 'hide'); // Hide loading text
				ui.visibility('api-error-one', 'show');

				ui.visibility('archive-version', 'hide');
				ui.visibility('archive-history', 'hide');

			}
	
		} else { // Error fetching data

			console.log('API Data not fetched for ' + url);
			
			ui.visibility('loading', 'hide'); // Hide loading text
			ui.visibility('api-error-two', 'show');

			ui.visibility('archive-version', 'hide');
			ui.visibility('archive-history', 'hide');
			
		}
		
	}
		
	/*
		Was the page archived by the background function 
	
		@response {object} function's response
	*/
	function wasArchived(response) {
		console.log(response);

		ui.visibility('loading-animation', 'hide'); // Hide archiving loading div

		if (response.saved === false) { // Page was not saved
			ui.content('error', 'Page Not Archived');
			ui.content('error-reason', response.error);

		} else { // Page saved
			archivedLocation = response.pageLocation;

			ui.content('error', 'Page Archived'); // Title
			
			// Add event listener for button
			document.getElementById('archive-version-saved').addEventListener('click', function () {
				browser.tabs.create({ url: 'https://web.archive.org' + archivedLocation});
			});

			ui.visibility('archive-version-saved', 'show'); // View saved button
		
		}
		
	}
	
	/* 
		Is the URL vaild and if so fetch data from the wayback API
		
		@param {object} status
	*/
	function isVaild(status) {
		//console.log(status);
		if (status === true) {

			// Event listener for archive now button
			document.getElementById('archive-now').addEventListener('click', function () {
				ui.visibility('archiving', 'show');
				ui.visibility('loading-animation', 'show');
	
				sendMessage('archive', url, wasArchived);
			});
			
			// Fetch API data
			var httpRequest = new HttpRequest();
			httpRequest.open('GET', global.urls.api + url, apiData);

		} else {
			console.log('URL: ' + url + ' is not valid');
			
			ui.content('error', 'This page can not be archived!');
			ui.content('error-reason', 'Invalid URL or IP address');

			ui.visibility('loading', 'hide'); // Hide loading text
			ui.visibility('error', 'show'); // Show error box
			ui.visibility('archiving', 'show');
			
		}
		
	}
	
	/*
		Event listeners (must be created after the user options have been fetch from the background script)  
	*/
	function eventListeners() {
	
		// Event listener for opening/closing the stats view, if logNumberArchived option in enabled
		if (settings.logNumberArchived === true) {
	
			// Opening
			document.getElementById('stats').addEventListener('click', function () {
				ui.visibility('stats-view', 'show');
				ui.visibility('options-box', 'hide');
				
				// Fetch and display stats
				sendMessage('stats', null, function (stats) {
					ui.content('total-number', formatNumber(stats.pagesArchived, settings.numberFormat));
				});
			});
		
			// Closing (back)
			document.getElementById('back').addEventListener('click', function () {
				ui.visibility('stats-view', 'hide');
				ui.visibility('options-box', 'show');
			});
		
		} else { // Not enabled, disable the button	
			document.getElementById('stats').className = 'left button small two disabled';
			document.getElementById('stats').title = 'Statistics are disabled';
		}
	
	}
	
	// Fetch settings from the background page
	/*sendMessage('settings', null, function (response) {
		settings = response.options;
		
		eventListeners();
	});*/
	
	browser.tabs.query({currentWindow: true, active: true}, function (tabs) { // Current tab URL
		url = tabs[0].url;
		
			// Fetch settings from the background page
		sendMessage('settings', null, function (response) {
			settings = response.options;
		
			eventListeners();
			//sendMessage('vaildate', url, isVaild);
		});
		
		// Vaildate the url via the function in the background page
		sendMessage('vaildate', url, isVaild);

	});
	
	// Event listener for opening options page
	document.getElementById('options').addEventListener('click', function () {

		window.open(browser.runtime.getURL('html/options.html'));

	});
	
}());