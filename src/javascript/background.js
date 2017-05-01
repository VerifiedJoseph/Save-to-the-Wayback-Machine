/*jslint node: true */
/*global Stats, Settings, vaildate, HttpRequest, archive, browser, Audio */
"use strict";

(function () {
	
	var settings = new Settings(),
		stats = new Stats(),
		httpRequest = new HttpRequest(),
		contextMenuSet = false;
	
	/*
		Get current time
	
		@return {string} - Time
  */
	function getTime() {
	
		var time = new Date(),
			hours = ("0" + time.getHours()).slice(-2) + ":",
			minutes = ("0" + time.getMinutes()).slice(-2) + ":",
			seconds = ("0" + time.getSeconds()).slice(-2) + " | ";
		
		return hours + minutes + seconds;
	
	}
	
	
	/*
		Create or remove the 'archive this page' context menu
  */
	function contextMenus() {
	
		if (contextMenuSet === false && settings.get('contextMenu') === true) {
			
			browser.contextMenus.create({
				"title": "Archive this page",
				"contexts": ["page"],
				"id": "archivePage"
			}, function () {
	
				contextMenuSet = true;
				
				if (browser.extension.lastError) {
					console.error("Error: " + browser.extension.lastError.message);
				}
			
			});
			
			// Remove 'Archive this page' context menu
		} else if (contextMenuSet === true && settings.get('contextMenu') === false) {
			
			browser.contextMenus.removeAll(function () {
			
				contextMenuSet = false;
				
				if (browser.extension.lastError) {
					console.error("Error: " + browser.extension.lastError.message);
				}
				
			});
			
		}
	
	}
		
	/*
		Extension startup function
	*/
	function start() {
		contextMenus();
	}
	
	/*
		Show a notification
		
		@param {string} url
		@param {string} title
		@param {string} message
	*/
	function notifyUser(url, title, message) {

		if (settings.get('contextMenuNote') === true) { // Are notifications enabled			
			var noteInfo = {
				title: title,
				iconUrl: '/images/icons/96.png',
				type: 'basic',
				message: message
			};

			// Create notification
			browser.notifications.create(noteInfo);

			console.log(getTime() + 'Created notification: ' + noteInfo.message);
		}
	}

	/*
		Plays alert along with the notification
	*/
	function notifyUserSound() {

		if (settings.get('notePlayAlert') === true) {

			var sound = settings.get('noteAlertSound'),
				file = global.alertSounds[sound],
				audio;

			if (typeof file !== 'undefined') {

				audio = new Audio('../sounds/' + file);
				audio.play();

				// Log
				console.log(getTime() + 'Played notification sound (#' + sound + ') ');
			}
		}

	}
	
	/*
		Was the page archived?
	
		@response {object} function's response
	*/
	function wasArchived(response) {
		console.log(response);

		if (response.saved === false) { // Page was not saved

			notifyUser(response.pageLocation, 'Page Not Archived, Sorry!', response.error);
			notifyUserSound();

		} else { // Page saved

			// Log number
			stats.update();
			
			// Create tab with save page
			browser.tabs.create({ url: 'https://web.archive.org' + response.pageLocation});
		
		}
		
	}
	
	// Load settings (on start)
	settings.load(function () {

		if (settings.isLoaded() === true) {
			console.log(getTime() + 'Settings loaded');

			stats.load(settings.get('logNumberArchived'));
			
			start();
	
		} else {
			console.log(getTime() + 'Failed to load settings, extension not started!');
		}

	});

	// Listener for then the extension is installed or updated
	browser.runtime.onInstalled.addListener(function (details) {

		if (details.reason === "install") {
			console.log(getTime() + "This is a first install!");

		} else if (details.reason === "update") {
			var thisVersion = browser.runtime.getManifest().version;

			console.log(getTime() + "Updated from " + details.previousVersion + " to " + thisVersion + "!");
		}
	});
	
	// Listener for then the storage has changed
	browser.storage.onChanged.addListener(function (changes, namespace) {

		settings.load(function () {

			if (settings.isLoaded() === true) {
				console.info(getTime() + 'settings updated and loaded');

				start();
			}

		});

	});
	
	// Listener for on click of the context menu link
	browser.contextMenus.onClicked.addListener(function (info, tab) {
		
		vaildate(tab.url, function (status) {
			
			if (status === true) {
				archive(tab.url, wasArchived); // Save the page
				
			} else { // Failed, show notification
				notifyUser(tab.url, 'This page can not be archived, Sorry!', 'The Wayback Machine can not archive local files or pages from web.archive.org.');
				notifyUserSound();
			}
			
		});
		
	});
	
	// Listener for messages from pop.js and options.js
	browser.runtime.onMessage.addListener(function (request, sender, sendResponse) {
		
		if (request.name === 'vaildate') {
			
			vaildate(request.data, function (status) {
				sendResponse(status);
			});
			
			return true;
			
		} else if (request.name === 'settings') {
			
			sendResponse(settings.getAll());
			
		} else if (request.name === 'updateSettings') {
			
			settings.update(request.data, function (status) {
				sendResponse(status);
			});
			
			return true;
			
		} else if (request.name === 'httpRequest') { // Is this needed??
			
			httpRequest.open('GET', request.data, function (response) {
				sendResponse(response);
			});
			
			return true;
			
		} else if (request.name === 'archive') {

			// Save the page
			archive(request.data, function (response) {
				sendResponse(response);
				
				console.log(response);
			
				// Log number if the page was saved
				if (response.saved === true) {
					stats.update();
				}
				
			});
			
			return true;
		
		} else if (request.name === 'stats') {

			sendResponse(stats.get());
			
		}
		
	});
	
}());