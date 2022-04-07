"use strict";

var settings = new Settings();

document.getElementById('acknowledge').onclick = function() {
	settings.update({eolRead: true}, function (updated) {
		if (updated === true) {
			browser.tabs.getCurrent((tab) => {
				browser.tabs.remove(tab.id)
			})
		}
	});

}