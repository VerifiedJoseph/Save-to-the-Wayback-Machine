/*jslint node: true */
/*global Audio, Settings, UI, Format, Debug, global, document, setTimeout, Intl */
"use strict";

var settings = new Settings(),
	ui = new UI(),
	debug = new Debug(),
	format = new Format(),
	options = {},
	defaults = {},
	body;

/**
 * Display the settings
 * @param {boolean} showDefaults
 */
function displaySettings(showDefaults) {
	var list = options;

	if (showDefaults === true) { // Show default user settings
		list = defaults;
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

	// Open archive links in the active tab
	document.getElementById('archive_links').checked = list.openInCurrent;

	// Log debug messages
	document.getElementById('debug_log').checked = list.logDebugInfo;

	// Disable the context nenu notification option if 'contextMenu' is false. 
	if (list.contextMenu === false) {

		ui.disableInput('context_note');

	}

	// Disable the sounds list and preview button if 'notePlayAlert' is false.
	if (list.notePlayAlert === false) {

		// Grey out the option text
		ui.addClass('note-sound', 'disabled');

		// Disable the sound select dropdown and preview button
		ui.disableInput('note_sound_list');
		ui.disableInput('preview_sound');

	}

	// Disable the date and time options if 'full_date_time' is false. 
	if (list.displayFullDate === false) {

		// Grey out the option text
		ui.addClass('note-date', 'disabled');
		ui.addClass('note-time', 'disabled');

		// Disable the select dropdowns
		ui.disableInput('date_format');
		ui.disableInput('time_format');

	}

}

/*
 * Display current date and time as date/time select options.
 */
function displayDateTime() {

	var date = new Date(),
		dateSelect = document.getElementById('date_format'),
		timeSelect = document.getElementById('time_format');

	// Date formats
	dateSelect.options[0].textContent = format.readableDate(date, 'F j, Y');
	dateSelect.options[1].textContent = format.readableDate(date, 'Y/m/d');
	dateSelect.options[2].textContent = format.readableDate(date, 'd/m/Y');
	dateSelect.options[3].textContent = format.readableDate(date, 'm/d/Y');

	// Time formats
	timeSelect.options[0].textContent = format.readableTime(date, 'h:mm a');
	timeSelect.options[1].textContent = format.readableTime(date, 'h:mm:ss a');
	timeSelect.options[2].textContent = format.readableTime(date, 'HH:mm');
	timeSelect.options[3].textContent = format.readableTime(date, 'HH:mm:ss');

}

function displayTimeZones() {
	
	var select = document.getElementById('timezone'),
		opt;
	
	// Set default (Automatic) timezone
	opt = document.createElement('option');
    opt.value = Intl.DateTimeFormat().resolvedOptions().timeZone;
	opt.innerText = 'Automatic';
	opt.title = 'Automatic time zone: ' + Intl.DateTimeFormat().resolvedOptions().timeZone;
	select.appendChild(opt);
	
	// Create timezone list
	timezones.forEach(function (timezone) {
		opt = document.createElement('option');
    	opt.value = timezone;
		opt.innerText = timezone;

		select.appendChild(opt);
	});
	
}

/**
 * Show settings status
 * @param {string} text
 */
function status(text) {

	ui.content('status', text);

	setTimeout(function () { // Set Timeout

		ui.content('status', '');

	}, 1750);

}



/*
	Save updated user settings
*/
function saveSettings() {

	var settingsToSave = {
		logNumberArchived: document.getElementById('log_number').checked,

		numberFormat: document.getElementById('number_format').value,

		timeZone: document.getElementById('timezone').value,
		dateFormat: document.getElementById('date_format').value,
		timeFormat: document.getElementById('time_format').value,
		timeZoneConvert: document.getElementById('time_zone_convert').checked,

		displayFullDate: document.getElementById('full_date_time').checked,
		displayTimeSince: document.getElementById('time_since_archive').checked,

		contextMenu: document.getElementById('context_menu').checked,
		contextMenuNote: document.getElementById('context_note').checked,

		notePlayAlert: document.getElementById('note_sound').checked,
		noteAlertSound: document.getElementById('note_sound_list').value,

		openInCurrent: document.getElementById('archive_links').checked,

		logDebugInfo: document.getElementById('debug_log').checked
	};

	settings.update(settingsToSave, function (updated) {

		if (updated === true) {

			status('Options saved');

		} else {

			status('An error occurred, Try again');

		}

	});

}

/*
	Reset user settings to defaults
*/
function resetSettings() {

	// Hide reset confirm div 
	ui.display('confirm', false);

	settings.update(defaults, function (reset) {

		if (reset === true) {

			status('Options reset');

			// Display default user options
			displaySettings(true);

		} else {

			status('An error occurred, try again');

		}

	});

}

/*
	Preview selected alert sound
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

/*
	Load settings and display them
*/
settings.load(function () {

	if (settings.isLoaded() === true) {

		// Start Debug logging (if enabled by user)
		debug.enable(settings.get('logDebugInfo'));
		debug.log('Settings loaded');

		var all = settings.getAll();
		options = all.options;
		defaults = all.defaultOptions;

		displayDateTime();
		displayTimeZones();
		
		displaySettings(false);

	}

});


/*
	Event listeners for buttons, checkboxes and select menus (user inputs)
*/
body = document.querySelector("body");
body.addEventListener('click', function (event) {
	var input = event.target;

	// Check Boxes
	if (input.id === 'context_menu') { // Right Click Menus

		if (input.checked) {

			ui.enableInput('context_note');

		} else {

			ui.disableInput('context_note');

		}

	} else if (input.id === 'note_sound') { // Notifications (Sound)

		if (input.checked) {

			ui.enableInput('note_sound_list');
			ui.enableInput('preview_sound');
			ui.removeClass('note-sound', 'disabled');

		} else {

			ui.disableInput('note_sound_list');
			ui.disableInput('preview_sound');
			ui.addClass('note-sound', 'disabled');

		}

	} else if (input.id === 'full_date_time') { // Display full date and time

		if (input.checked) {

			ui.enableInput('date_format');
			ui.enableInput('time_format');
			ui.removeClass('note-date', 'disabled');
			ui.removeClass('note-time', 'disabled');

		}

	} else if (input.id === 'time_since_archive') { // Display time since last archive

		if (input.checked) {

			ui.addClass('note-date', 'disabled');
			ui.addClass('note-time', 'disabled');

			ui.disableInput('date_format');
			ui.disableInput('time_format');

		}

		// Buttons
	} else if (input.id === 'preview_sound') { // Preview notification sound 

		previewSound();

	} else if (input.id === 'save') { // Save user options

		saveSettings();

	} else if (input.id === 'reset') { // Reset user options			

		ui.display('confirm', true); // Show confirm div

	} else if (input.id === 'no') { // No, hide rest confirm div	

		ui.display('confirm', false);

	} else if (input.id === 'yes') { // Yes, reset user options confirmed

		resetSettings();

	}

});
