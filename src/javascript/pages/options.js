/*jslint node: true */
/*global browser, Audio, sendMessage, UI */
'use strict';

var defaultOptions = {};
var options = {};

var ui = new UI();

/*
	Display user settings
	
	@type {function}
	@param {bool} showDefaults
*/
function displaySettings(showDefaults) {
	var list = options;
	//console.log(list);
	
	if (showDefaults === true) { // Show default user options
		list = defaultOptions;
	}
	
	// Log numbers
	document.getElementById('log_number').checked = list.logNumberArchived;

	// Number format
	document.getElementById('number_format').value = list.numberFormat;

	// Date format
	document.getElementById('date_format').value = list.dateFormat;
	
	// Time format
	document.getElementById('time_format').value = list.timeFormat;
	
	// Convert time zone
	document.getElementById('time_zone_convert').checked = list.timeZoneConvert;
		
	// Full date and time
	document.getElementById('full_date_time').checked = list.displayFullDate;
	
	// Time since
	document.getElementById('time_since_archive').checked = list.displayTimeSince;
	
	// Context menu item (right click item)
	document.getElementById('context_menu').checked = list.contextMenu;
	
	// Notifications
	document.getElementById('context_note').checked = list.contextMenuNote;

	// Notification alert sound
	document.getElementById('note_sound').checked = list.notePlayAlert;
	
	// Notification alert sound file
	document.getElementById('note_sound_list').value = list.noteAlertSound;

	if (list.contextMenu === false) { // Disable context Menu note option, if contextMenu is false. 
		document.getElementById('context_note').disabled = true;
	}

	if (list.notePlayAlert === false) { // Disable Sounds list and preview, if notePlayAlert is false.
		document.getElementById('note_sound_list').disabled = true;
		document.getElementById('preview_sound').disabled = true;
		document.getElementById('note-sound').className = 'disabled';
	}
	
}

/*
	Handle user settings

	@type {function}
	@param {object} response
*/
function settings(response) {
	options = response.options;
	defaultOptions = response.defaultOptions;
	
	displaySettings(false);
	
}

/*
	Settings status text
	
	@type {function}
	@param {string} text
*/
function status(text) {
	//var div = document.getElementById('status');
	
	ui.content('status', text);
	
	//div.textContent = text;

	setTimeout(function () {
		ui.content('status', '');
		//div.textContent = '';
	}, 1750);
	
}

/*
	Save updated settings to storage
	
	@type {function}
*/
function saveSettings() { // Saves user options to chrome storage

	var settingsToSave = {
		logNumberArchived: document.getElementById('log_number').checked,

		numberFormat: document.getElementById('number_format').value,
		
		dateFormat: document.getElementById('date_format').value,
		timeFormat: document.getElementById('time_format').value,
		timeZoneConvert: document.getElementById('time_zone_convert').checked,
		
		displayFullDate: document.getElementById('full_date_time').checked,
		displayTimeSince: document.getElementById('time_since_archive').checked,
			
		contextMenu: document.getElementById('context_menu').checked,
		contextMenuNote: document.getElementById('context_note').checked,

		notePlayAlert: document.getElementById('note_sound').checked,
		noteAlertSound: document.getElementById('note_sound_list').value
	};
		
	sendMessage('updateSettings', settingsToSave, function (updated) {
		
		if (updated === true) {
			status('Options saved');
		} else {
			status('An error occurred, Try again');
		}
		
	});

}

/*
	Reset settings to the defaults
	
	@type {function}
*/
function resetSettings() {

	sendMessage('updateSettings', defaultOptions, function (reset) {
		
		ui.visibility('confirm', 'hide');  // Hide confirm div 
		
		if (reset === true) {
			status('Options reset');
			
			 // Display default user options
			displaySettings(true);
			
		} else {
			status('An error occurred, try again.');
		}
		
	});

}

/*
	Preview selected notification alert sound 
	
	@type {function}
*/
function previewSound() {
	
	var sound = document.getElementById('note_sound_list').value,
		file = global.alertSounds[sound],
		preview;
	
	if (typeof file !== 'undefined') {

		preview = new Audio('../sounds/' + file);
		preview.play();
		
	}
}


document.addEventListener('DOMContentLoaded', function () { // Event listener for DOMContentLoaded
	
	// Fetch options (all) from the background.js and user options with callback
	sendMessage('settings', false, settings);
	
	// Event listener for input box clicks (buttons, checkbox etc..)		
	var body = document.querySelector("body");
	
	body.addEventListener('click', function (event) {
		var input = event.target;

		// Check Boxes
		if (input.id === 'context_menu') { // Right Click Menus

			if (input.checked) {
				ui.disableInput('context_note', false);

			} else {
				ui.disableInput('context_note', true);
			}
	
		} else if (input.id === 'note_sound') { // Notifications (Sound)
	
			if (input.checked) {
				ui.disableInput('note_sound_list', false);
				ui.disableInput('preview_sound', false);

				ui.className('note-sound', '');
				
			} else {
				ui.disableInput('note_sound_list', true);
				ui.disableInput('preview_sound', true);
				
				ui.className('note-sound', 'disabled');
			}
				
		} else if (input.id === 'full_date_time') { // Display full date and time
			
			if (input.checked) {
				ui.className('note-date', '');
				
				ui.disableInput('date_format', false);
				ui.disableInput('time_format', false);
			}

		} else if (input.id === 'time_since_archive') { // Display time since last archive
			
			if (input.checked) {
				ui.className('note-date', 'disabled');
				ui.className('note-time', 'disabled');
				
				ui.disableInput('date_format', true);
				ui.disableInput('time_format', true);
			}
	
		// Buttons
		} else if (input.id === 'preview_sound') { // Preview notification sound 
			previewSound();
	
		} else if (input.id === 'save') { // Save user options
			saveSettings();
			
		} else if (input.id === 'reset') { // Reset user options			
			ui.visibility('confirm', 'show'); // Show confirm div
	
		} else if (input.id === 'no') { // No, Hide confirm div	
			ui.visibility('confirm', 'hide');
	
		} else if (input.id === 'yes') { // Yes, Reset user options confirmed
			resetSettings();
	
		}
		
	});
});
