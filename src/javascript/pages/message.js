"use strict";

var settings = new Settings();
var ui = new UI();

settings.load(function () {
	if (settings.get('eolRead') === false) {
		document.getElementById('acknowledge').onclick = function() {
			settings.update({eolRead: true}, function (updated) {
				if (updated === true) {
					browser.tabs.getCurrent((tab) => {
						browser.tabs.remove(tab.id)
					})
				}
			});
		}
	} else {
		ui.hide('acknowledge');
	}
});