# Changelog
All notable changes to this project will be documented in this file.

## [5.3.3](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/releases/tag/v5.3.3) - 2019-06-20
### Additions:
* none

### Changes:
* Updated Spacetime  timezone library to [version 5.9.0](https://github.com/spencermountain/spacetime/releases/tag/5.9.0).
* Updated URL regex to improve handling of URLs with short hostnames. ([#91](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/pull/91))
* Updated URL regex to improve handling of URLs containing exclamation marks, commas and semicolons. ([#91](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/pull/91), [95033ea](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/commit/95033ea3c28c5a108108e3500bc27cb9029615ca))

### Fixes:
* none

## [5.3.2](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/releases/tag/v5.3.2) - 2019-06-07
### Additions:
* Added support for archiving links and images via the context menu. ([#88](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/pull/88), [#88](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/pull/89))

### Changes:
* none

### Fixes:
* none

## [5.3.1](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/releases/tag/v5.3.1) - 2019-05-20
### Additions:
* none

### Changes:
* none

### Fixes:
* Fixed invalid time format in convertDateTimeFormats() ([3253bf5](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/commit/3253bf50ff9cf5ad1700b4be455bd66855c154b4))

## [5.3.0](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/releases/tag/v5.3.0) - 2019-05-20
### Additions:
* Added Spacetime library dependency ([#73](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/pull/73)) ([#80](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/pull/80))
* Added file notify.js ([#74](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/pull/74))
* Added file timezones.js ([#75](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/pull/75))
* Add support for custom time zones. ([#75](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/pull/75))
* Add support for POST requests to Request() ([#71](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/pull/71))

### Changes:
* Removed convert to local time zone option. ([#77](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/pull/77))
* Updated URL regex to improve handling of URLs with port numbers. ([#78](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/pull/78))
* Updated URL regex to improve handling of URLs containing brackets ([#84](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/pull/84))

### Fixes:
* Fixed double encoding of URLs. URLs returned by browser.tabs.query are already encoded. ([#83](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/pull/83))

## [5.2.2](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/releases/tag/v5.2.2) - 2019-01-29
### Additions:
* none

### Changes:
* Changed CSS font-family value to `sans-serif` ([25224b7](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/commit/25224b79aa8f2e1a5a4be18ffd96a95bb2b2def7))
* Removed  extra css values from popup.css. ([afbfed4](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/commit/afbfed4c20d136fb71e1ce3f6ba903a8199e5fb2))
* Page URL is encoded in save page request ([1eb3186](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/commit/1eb3186e6903c4a5bc8f00013cb2481f5ae86420))
* Updated all archive.org URLs to use HTTPS ([add2bb](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/commit/add2bbabcd1843ee6eaa467a89e05005dd3b1307))
* Removed variable `archivedVersion` from popup.js ([5f77658](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/commit/5f77658e057175caf926762958f7efd468606c11)) 
* Added variable `global.urls.base` to global.js ([7370136](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/commit/73701360d2103f036fbef93c323755276bc9b985))

### Fixes:
* Fixed confirm panel overlapping page header in options.html ([8eef72e](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/commit/8eef72e5f8bc7db53e77fa150b8c646ab729ba38))

## [5.2.1](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/releases/tag/v5.2.1) - 2018-10-07
### Additions:
* none

### Changes:
* none

### Fixes:
* Fixed broken CSS padding in base.css ([ade8c8d](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/commit/ade8c8dd2c7115adc9969f9799270f486822896f))

## [5.2.0](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/releases/tag/v5.2.0) - 2018-10-07
### Additions:
* Added function UI.display() ([09fa071](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/commit/09fa07139817d3f69ef76bd32d46b5b410468c66))
* Added function UI.isDisplayed() ([1c4c89e](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/commit/1c4c89eccd99e422ae73f6b1ccfce553110f634f))
* Added function UI.enableInput() ([2cfb9bd](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/commit/2cfb9bd62b3184b5527d42e5d8571a799f1545d6))
* Added function UI.addClass() ([15ba3a0](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/commit/15ba3a0556c3bec63e43e04f07876c3826058e0b))
* Added function UI.removeClass() ([fb612ce](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/commit/fb612ce9246b210fbe369935af97f61bef391c4e))
* Added file loading.css ([6063fce](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/commit/6063fce6c39c39a98812537c012d3c4c0e2ac7a5))
* Added file base.css ([f70de5e](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/commit/f70de5e17d687af4616b4dd280b9234408eae7e9))

### Changes:
* Updated screenshots (#41)
* Formatted JavaScript, CSS and HTML with js-beautify ([#47](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/pull/47), [#48](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/pull/48), [#51](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/pull/51))
* Statistics button in popup.html is now hidden when statistics are disabled. ([#17](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/pull/17))
* Options button width is changed to match pop-up window width when statistics button is hidden ([#53](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/pull/53))
* Replaced RGB values with hex values in CSS files. ([#21](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/pull/21))
* Replaced input images with CSS ([#34](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/pull/34))
* Replaced 'fake' div buttons with real buttons ([37d5338](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/commit/37d5338588fe34bc1ad311cfccf5e95f7eb0c70d))
* Removed function UI.visibility() ([3ebe214](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/commit/3ebe2143faba370cbb30a63d2db7bba610cef097))
* Removed function UI.className() ([e3bb294](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/commit/e3bb294b79b6ef4edab40b55f80a50e064e2863c)) 
* Removed boolean parameter from function  UI.disableInput() ([31d650c](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/commit/31d650ca922179c31eef7e157429cbd030f9ac49))
* Removed files: checkbox.png, radio.png, select-disabled.png and select.png ([7d59bbc](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/commit/7d59bbcd32357f04fd7a939ff3e2eb8b742d4c48))

### Fixes:
* Fixed overlapping buttons when display scaling is greater than 100% ([#39](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/pull/39))
* Fixed incorrect function name in Debug.enable() ([db9e167](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/commit/db9e16741cb41351ccb5d8d07b9031a9aaff66af))

## [5.1.5](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/releases/tag/v5.1.5) - 2018-09-17
### Additions:
* Added empty id string to browser.notifications.create() in background.js ([9c7e1f0](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/commit/9c7e1f091fd3bc2f35f272d19bd5255cc7a1ad43))

### Changes:
* Replaced nested if statements with try...catch in validate.js ([ab5b001](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/commit/ab5b0012180e728dd5e99acafa2b15be495c5dc2))
* Replaced for loop with forEach when handling raw HTTP headers in request.js ([07f3cd3](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/commit/07f3cd3412080a25a03acb0a93ee28c3c2e1e9b2))
* Renamed global.hostNameBlackList to global.hostNameBlacklist in global.js ([021916f](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/commit/021916f70ddce9acbc6c55980bcf6acad9752efe))
* Removed commented out timeStamp.replace() from format.js ([#7](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/pull/7))
* Removed protocol blacklist from global.js ([5de660d](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/commit/5de660d47982a28e765a312328c66884a37d39e8))

### Fixes:
* Fixed time ago failing to display when converting UTC to local time. ([#13](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/pull/13))
* Fixed incorrect code comment in options.js ([ac9ec88](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/commit/ac9ec88b65a1ac078e5dc57c2ba13811bed2d592))

## [5.1.4](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/releases/tag/v5.1.4) - 2018-04-06
### Additions:
* Added basic internationalisation support
* Added functions readableDate() and readableTime() to format.js
* Added new url and Ipv4 regex to globle.js

### Changes:
* Improved URL and ipv4 address validation
* Improved UTC time zone conversions
* Removed function timeStamp() from format.js

### Fixes:
* none

## [5.1.3](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/releases/tag/v5.1.3) - 2017-11-02
### Additions:
* none

### Changes:
* Minor code changes.
* Formatted javascript files using Brackets Beautify extension

### Fixes:
* Fixed incorrect time zone conversion in format.js

## [5.1.2](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/releases/tag/v5.1.2) - 2017-10-03
### Additions:
* none

### Changes:
* Minor code changes.
* Updated archive.js and request.js to work with changes to http headers in http/2 and chrome 60

### Fixes:
* Fixed timeSince() function not converting datetime to local time zone in format.js

## [5.1.1](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/releases/tag/v5.1.1) - 2017-07-17
### Additions:
* none

### Changes:
* none

### Fixes:
* Fixed broken code comment in ui.js
* Fixed incorrectly name variable in format.js.
* Fixed incorrect time displaying on options page.

## [5.1.0](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/releases/tag/v5.1.0) - 2017-07-17
### Additions:
* Added file debug.js to javascript folder
* Added title() function to ui.js
* Added tab() function to popup.js
* Added user settings 'openInCurrent' and 'logDebugInfo'
* Added functions enabled() and log() to debug.js
* Added timeStampToDate() function to format.js
* Added version 5.1 screenshots for Firefox and Opera

### Changes:
* Removed getTime() function from background.js
* Removed onInstalled listener from background.js
* Removed start() function from background.js
* Removed onMessage listener from background.js
* Removed file sendMessage.js
* Removed var noteInfo from notifyUser() function in background.js
* Removed method parameter from open() function in request.js
* Removed method check from open() function in request.js
* Renamed dataFormat.js to format.js
* Renamed vaildate.js to validate.js
* Renamed HttpRequest() function to Request() in request.js
* Updated URL regex in global.js to work with URLs that have a port number.
* Moved background.js file to javascript pages folder
* Improved code comments in all javascript files.
* Corrected spelling of valid and validate in popup.js, background.js and validate.js

### Fixes:
* none

## [5.0.4](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/releases/tag/5.0.4) - 2017-05-25
* Fixed a bug that stopped UTC time stamps from being converted to the user's local timezone.

## 5.0.3 - 2017-05-15
### Additions:
* none

### Changes:
* none
	
Fixes:
* Fixed incorrect function name in archive.js, that stopped the script from working.

### 5.0.2 - 2017-05-15
### Additions:
* none

### Changes:
* none

### Fixes:
* Fixed undefined URL bug in archive.js

## 5.0.1 - 2017-05-01
### Additions:
* none

### Changes:
* none

### Fixes:
* Fixed undefined separator bug in dataFormat.js and popup.js

## 5.0.0 - 2017-05-01
### Additions:
* Added file settings.js to javascript folder
* Added file ui.js to javascript folder
* Added file vaildate.js to javascript folder
* Added file global.js to javascript folder
* Added file requset.js to javascript folder
* Added file sendMessage.js to javascript folder
* Added file stats.js to javascript folder
* Added file dataFormat.js to javascript folder
* Added function start() to background.js
* Added function this.isLoaded() to settings.js
* Added function this.get() to settings.js
* Added function SendMessage() to send-message.js
* Added function apiData() to popup.js
* Added function this.attribute() to ui.js
* Added function this.attributeRemove() to ui.js 
* Added parameters method and url to function open() in request.js
* Added <!DOCTYPE html> line to options.html and popup.html

### Changes:
* Removed function consoleLog() from background.js and popup.js
* Removed protocol BlackList for Each loop from vaildate.js as the url regex checks the portocol and only passes URL that use http or https
* Removed Debug log error messages option from options.html and options.js
* Moved popup.js and options.js file to javascript pages folder

### Fixes:
* none
