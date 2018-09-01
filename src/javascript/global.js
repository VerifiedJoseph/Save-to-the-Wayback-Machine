/*jslint node: true */
/*global chrome, browser */
"use strict";

/*
	Global options
*/
var global = {
	urls: {
		save: 'https://web.archive.org/save/',
		calendar: 'https://web.archive.org/web/*/',
		api: 'https://archive.org/wayback/available?url='
	},
	regex: {
		
		// URL validation
		url: /^https?:\/\/[a-zA-Z0-9-.]{2,256}\.[a-z]{2,20}(\:[0-9]{2,4})?\/[a-zA-Z0-9@:%_\+.~#?&\/\/=\-]*/i,
		// IPv4 validation
		ipv4: /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/g,
		
		// URL and IPv4 validation with hostname and path capture
		urlAndIpv4: /^https?:\/\/([a-zA-Z0-9-.]{2,256}\.[a-z]{2,20}(?:\:[0-9]{2,4})?|(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(?:\:[0-9]{2,4})?)\/([a-zA-Z0-9@:%_\+.~#?&\/\/=\-]+)?/,
		
		// HTTP status codes
		httpCodes: /^(200|201|202|203|301|302|303|307|308|400|401|403|404|405|406|408|409|411|412|413|414|415|418|429|431|451)$/
	},
	hostNameBlacklist: [
		'archive.org',
		'web.archive.org',
		'127.0.0.1',
		'localhost'
	],
	alertSounds: [
		'sound-1.mp3',
		'sound-2.mp3'
	],
	requestedBy: 'Save to the Wayback Machine (https://verifiedjoseph.com/wayback)'
};

/* 
	Check api type (chrome (based. e.g: opera), Firefox or MS Edge)
*/
if (typeof chrome !== 'undefined' && typeof browser === 'undefined') {

	var browser = chrome;

}