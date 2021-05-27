# Changelog
All notable changes to this project will be documented in this file.

## [5.5.1](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/releases/tag/v5.5.1) - 2021-05-27
### Changes:
* Updated Spacetime timezone library to version [6.16.1](https://github.com/spencermountain/spacetime/releases/tag/6.16.1).

## [5.5.0](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/releases/tag/v5.5.0) - 2021-04-07
### Additions:
* Added keyboard accessible checkboxes and radio buttons. ([#179](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/pull/179))
* Added CSS `focus` rule to `select` drop-downs and buttons ([`644e118`](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/commit/644e1180785ec5f53a4bff51c85dbf55c5e2f2e7), [`862812f`](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/commit/862812f05bf60b276f7dd01483de12d02b0d1649))

### Changes:
* Updated Spacetime timezone library to version [6.15.0](https://github.com/spencermountain/spacetime/releases/tag/6.15.0).
* Buttons for archiving and viewing archived pages in `popup.html` are now disabled when not needed. ([`7855c3e`](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/commit/7855c3e388f573de63faeb0d0202dc41c7b011ff))
* Only lower opacity of `#overlay` background not its contents in `popup.css`. ([`6907465`](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/commit/6907465386a5de75afeddf33c3898fd531b1fd81))
* Minor changes to CSS rules in `popup.css`. ([`2f82a19`](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/commit/2f82a1904d697ff60891ec5c0deb5b501ec3bb8b))
* Removed unused and redundant CSS rules from `options.css` ([`ab064b1`](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/commit/ab064b1dafaf1ad1367b4e8024a55b51861b01e9), [`c8399a3`](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/commit/c8399a39c1736e2a531abede23d9cc41def677bc))

## [5.4.11](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/releases/tag/v5.4.11) - 2021-03-23
### Additions:
* Added function `hide()` to `ui.js`. ([`36f73fd`](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/commit/36f73fd794ea31d3698c398b396b9e4fed5441ea))
* Added english locale strings `PageArchived` and `PageNotArchived`. ([`b836a24`](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/commit/b836a24eda3385761d057e0378c050b6a27529c8), [`22c4684`](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/commit/22c46842a4b085d0f0e7911e7502f862cb3b67c1))
* Added english locale string `ApiPageNotArchived`. ([`a287044`](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/commit/a2870441c291fc0ec07db5cf4a5d9049e111bd19))

### Changes:
* Updated Spacetime timezone library to version [6.14.0](https://github.com/spencermountain/spacetime/releases/tag/6.14.0).
* Updated `popup.js` to set date & time in title attribute of HTML element `#since` when displaying time since in `popup.html`. ([`b21e27e`](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/commit/b21e27eab208f558d1c044b74a3c8629973b8d8a))
* Updated functions in `ui.js` to use 'typeof' when checking for undefined variables. ([`d96f183`](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/commit/d96f183bfaf99f7be6eed57e62ead60060ef39d0))
* Updated function `snapshotData()` to use a try...catch block in `popup.js` ([`03ef622`](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/commit/03ef622917fc1aa68a48c5662bc451f511392a80))
* Renamed array `hostNameBlacklist` to `hostnameDenylist` in `global.js` ([`9ef1603`](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/commit/9ef1603471be7e475fc419acf9dfa9a90a2347ca))
* Removed unused english locale string `StatisticsDisabled` ([`53f3e45`](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/commit/53f3e45c1f97b366b55a5f878f724999d09e13b3))

### Fixes:
* Fixed incorrect variable used in function `title()` in `ui.js`. ([`ca79dc3`](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/commit/ca79dc3acfa62758e142b1c85f55ebdb37265d8b))

## [5.4.10](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/releases/tag/v5.4.10) - 2021-02-16
### Changes:
* Updated Spacetime timezone library to version [6.12.5](https://github.com/spencermountain/spacetime/releases/tag/6.12.5).
* Updated privacy policy link in `options.html` to use [policy](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/blob/master/PRIVACY.md) hosted in the github repository. ([`2c08af`](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/commit/2c08af1c22953aaefba6bef6ad5702200bc20eac))
* Updated CSS `font-family` to '`helvetica, arial, sans-serif`'. ([#176](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/pull/176), [`1fe10ac`](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/commit/1fe10ac52099cecffa997aa72c370e2bdda6c44d))
* Removed redundant CSS rules. ([#176](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/pull/176), [`1fe10ac`](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/commit/1fe10ac52099cecffa997aa72c370e2bdda6c44d))

## [5.4.9](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/releases/tag/v5.4.9) - 2020-11-15
### Changes:
* Updated Spacetime timezone library to version [6.10.0](https://github.com/spencermountain/spacetime/releases/tag/6.10.0).

## [5.4.8](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/releases/tag/v5.4.8) - 2020-11-09
### Changes:
* Updated Spacetime timezone library to version [6.9.0](https://github.com/spencermountain/spacetime/releases/tag/6.9.0).

## [5.4.7](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/releases/tag/v5.4.7) - 2020-10-30
### Changes:
* Updated Spacetime timezone library to version [6.8.0](https://github.com/spencermountain/spacetime/releases/tag/6.8.0).

## [5.4.6](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/releases/tag/v5.4.6) - 2020-10-26
### Changes:
* Updated Spacetime timezone library to version [6.7.0](https://github.com/spencermountain/spacetime/releases/tag/6.7.0).

## [5.4.5](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/releases/tag/v5.4.5) - 2020-10-02
### Changes:
* Updated Spacetime timezone library to version [6.6.4](https://github.com/spencermountain/spacetime/releases/tag/6.6.4).

## [5.4.4](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/releases/tag/v5.4.4) - 2020-08-31
### Changes:
* Use HTTP POST method when making requests to Wayback Availability API. ([`933752`](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/commit/933752ba273a3a71777a664a84112e779daa274e), [#161](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/pull/161))
* Updated Spacetime timezone library to version [6.6.3](https://github.com/spencermountain/spacetime/releases/tag/6.6.3).

## [5.4.3](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/releases/tag/v5.4.3) - 2020-07-31
### Changes:
* Updated Spacetime timezone library to version [6.6.2](https://github.com/spencermountain/spacetime/releases/tag/6.6.2).

## [5.4.2](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/releases/tag/v5.4.2) - 2020-04-30
### Changes:
* Updated wording in `popup.html` ([`ab2b1fa`](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/commit/ab2b1fa93f4f3dd5ecc65c54bcf51181c3c2073f), [`d05374a`](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/commit/d05374a8643d18f16968c37b87fc0ddfbe697f10), [#156](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/pull/156), [#157](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/pull/157))

## [5.4.1](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/releases/tag/v5.4.1) - 2020-03-07
### Changes:
* Removed extra circumflex character (`^`) from URL regex in `global.js` ([`9d6592`](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/commit/9d659258e315c4b9c57ba718d6b149c1a76695d3), [#150](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/pull/150))

## [5.4.0](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/releases/tag/v5.4.0) - 2020-02-18
### Additions:
* Added context menu items for opening archived versions of pages, links and images. ([`2f9efe8`](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/commit/2f9efe8), [#144](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/pull/144))

## [5.3.8](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/releases/tag/v5.3.8) - 2019-12-24
### Additions:
* Added HTTP status code `410` to array `httpStatusCodes` in `global.js` ([`b9af187`](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/commit/b9af187), [#132](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/pull/132))

### Changes:
* Updated URL regex to allow any character in paths in `global.js` ([`817f2ff`](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/commit/817f2ff), [#133](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/pull/133))
* Removed path capture from URL regex in `global.js` ([`817f2ff`](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/commit/817f2ff), [#133](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/pull/133))
* Increased width of popup buttons (`button.popup`) by 2px in `popup.css` ([`59afbb1`](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/commit/59afbb1), [#131](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/pull/131))

## [5.3.7](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/releases/tag/v5.3.7) - 2019-12-18
### Changes:
* Updated `browser.tabs.query` callback in `popup.js` to use the property `pendingUrl`. ([`a64cf1e`](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/commit/a64cf1e), [#129](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/pull/129))

## [5.3.6](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/releases/tag/v5.3.6) - 2019-12-10
### Additions:
* Added error handling for Wayback Machine error `LiveWebCacheUnavailableException` ([`c5b5ad6`](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/commit/c5b5ad6), [#121](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/pull/121))

### Changes:
* Minor update to improve user experience in `option.html` ([`c2894e2`](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/commit/c2894e2), [#118](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/pull/118))
* Replaced `if` statement with a `switch` for event listener callback in `options.js` ([`d6284a6`](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/commit/d6284a6), [#120](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/pull/120))
* Increased width of popup window by 2px in `popup.css` ([`0473836`](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/commit/0473836), [#123](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/pull/123))
* Increased width of small buttons by 1px in `base.css` ([`54a68bc`](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/commit/54a68bc), [#124](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/pull/124))
* Use dot notation in function `getResponse()` in `request.js` ([`6b8ead8`](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/commit/6b8ead8), [#126](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/pull/126))

### Fixes:
* Fixed typo in _locales/en/messages.json ([`0609125`](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/commit/0609125), [#122](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/pull/122))
* Fixed select drop-down and buttons not aligning in options.html ([`ed640bf`](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/commit/ed640bf), [#117](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/pull/117))

## [5.3.5](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/releases/tag/v5.3.5) - 2019-10-29
### Additions:
* Added file `snapshot.js`. ([`73af927`](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/commit/73af927), [#107](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/pull/107))

### Changes:
* Lowered minimum Firefox version to 56. ([`6b04e10`](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/commit/6b04e10), [#106](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/pull/106))
* Removed function `apiData()` from `popup.js`. ([`73af927`](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/commit/73af927))
* Renamed function `timeStampToDate()` to `convertToIso()` in `format.js`. ([`cf879f7`](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/commit/cf879f7), [#108](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/pull/108))

## [5.3.4](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/releases/tag/v5.3.4) - 2019-10-14
### Additions:
* none

### Changes:
* Encode URL parameter when making Wayback Availability API requests. ([#99](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/pull/99), [#100](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/pull/100))

## [5.3.3](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/releases/tag/v5.3.3) - 2019-06-20
### Additions:
* none

### Changes:
* Updated Spacetime timezone library to [version 5.9.0](https://github.com/spencermountain/spacetime/releases/tag/5.9.0).
* Updated URL regex to improve handling of URLs with short hostnames. ([#91](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/pull/91))
* Updated URL regex to improve handling of URLs containing exclamation marks, commas and semicolons. ([#91](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/pull/91), [95033ea](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/commit/95033ea3c28c5a108108e3500bc27cb9029615ca))

### Fixes:
* none

## [5.3.2](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/releases/tag/v5.3.2) - 2019-06-07
### Additions:
* Added support for archiving links and images via the context menu. ([#88](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/pull/88), [#89](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/pull/89))

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
* Fixed invalid time format in `convertDateTimeFormats()` ([3253bf5](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/commit/3253bf50ff9cf5ad1700b4be455bd66855c154b4))

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
* Updated screenshots ([#41](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/pull/41))
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

## 4.5.0 - 2017-04-??
### Additions:
* Added `<meta charset="utf-8">` line to popup.html and options.html
* Added icon images 16.png, 32.png and 96.png

### Changes:
* Updated checkbox and radio button CSS to work with Firefox

### Fixes:
* none

## 4.4.0 - 2017-03-17
### Additions:
* none

### Changes:
* Improved HTTP status code handling in background.js
* Removed Today and Yesterday stats from popup.html, popup.js and background.js
* Removed experimental robots.txt scanning feature from background.js and options.js
* Removed updateStats() function from background.js

### Fixes:
* Fixed 'Try agian' Typo in popup.html. [#1](https://github.com/VerifiedJoseph/Save-to-the-Wayback-Machine/issues/1)

## 4.3.2 - Not Released
### Additions:
* none

### Changes:
* Improved handling of 503 and 504 HTTP errors in background.js 

### Fixes:
* none

## 4.3.1 - 2016-09-27
### Additions:
* Added image file 64.png
* Added HTTP status codes regex to options var in background.js
* Added displayData() function to popup.js
* Added wasRest() function to popup.js

### Changes:
* Updated user agent regex to work with user agents that contain spaces (background.js)
* Moved resetNumber() function to background.js and renamed it to resetStats()

### Fixes:
* Fixed bug with 'archive this page' right click option not opening the right URL (background.js)

## 4.3.0 - 2016-09-01
### Additions:
* Added new IPv4 regex to background.js
* Added requestedBy string 'Save to the Wayback Machine (https://verifiedjoseph.com/wayback)' to options object in background.js
* Added setRequestHeader() line to functions scanRobotsFile() and saveByAjax() in background.js and function fetchData() in popup.js
* Added function status() to options.js 
* Added function updateStats() to background.js
* Added confirm div and yes and no buttons to popup.html
* Added CSS for confirm div and extra small buttons to popup.css
* Added event listener for yes and no buttons to popup.js
* Added image files checkbox.png, select.png and select-disabled.png
* Added image file 40-page-icon.png
* Added folders html and icons
* Added archive.org_bot user agent check to scanRobotsFile() function in background.js
* Added function Eventlistener() to popup.js
* Added path regex to options var in background.js
* Added user options 'DisplayFullDate' and 'displayTimeSince' to background.js 
* Added timeSince() function to background.js
* Added radio boxes for FullDate and TimeSince options to options.html
	
### Changes:
* Changes to options var in background.js
* Changes to url regex in background.js to escape forward slashes 
* Minor changes to formatTimeDate() function in popup.js
* Updated options page css in options.css to work with checkbox.png
* Updated options page css in options.css to work with select.png and select-disabled.png
* Removed javascript confirm() function from popup.js
* Removed image files checked.png, checked-disabled.png and not-checked.png
* Removed image file drop_down_arrow.png
* Removed file background.js from main folder
* Removed file loading.css from css folder
* Removed file download.png from images folder
* Removed file options.html from main folder (chrome inline options view)
* Moved files popup.html and options_tab.html to the html folder
* Renamed options_tab.html to options.html
* Moved image files 16.png and 128.png to icons folder
* Removed 'Archive pages without open a new tab' option as this is now default behavior (options.js)
* Log number option can now be enabled/disabled by the user in options.html
* Renamed folder js to javascript

### Fixes:
* Fixed bug in formatTimeDate() function that forced time stamps to always display in the 12-hour clock (popup.js)
* Fixed bug in function saveByAjax() in background.js, that stopped a error message from being displyed when the Wayback Machine API return a 502 error code.

## 4.2.0 (Opera) - Not Released
### Additions:
* none
### Changes:
* Removed file background.js from main folder
* Removed file loading.css from css folder
* Removed file download.png from images folder
### Fixes:
* none

## 4.2.0 - 2016-06-20
### Additions:
* Added IPv4 regular expression to the vaildateUrl() function in background.js
* Added check for 'Disallow:' (visit all files) to scanRobotsFile() function in background.js
* Added function consoleLog() to background.js and popup.js
* Added debug section to options_tab.html
* Added default user options `consoleLog`, `archiveAnyway`, `archivedDate`, `archivedToday`, `archivedYesterday`, `tabFreeSaving`, `dateFormat`, `timeFormat`, `timeZoneConvert` and `numberFormat` to background.js
* Added Archive Anyway button to popup.html and related CSS to popup.css
* Added today and yesterday numbers to logNumber() function in background.js and to fetchNumber() function in popup.js
* Added today and yesterday number reset to resetNumber() in popup.js
* Added saveByAjax() function to background.js
* Added wasSaved() function to popup.js
* Added updateHTML() function to popup.js
* Added numberFormat() fuction to popup.js
* Added checkbox css to options.css
* Added Date and time section to options_tab.html
* Added number format select box to options_tab.html

### Changes:
* Updated formatTimeDate() function in popup.js to include formats that can be set by the user
* Removed old code from functions in background.js and popup.js
* Removed default user option `contextMenuCreated` from background.js
* Renamed style.css to popup.css
* Improved code comments in background.js, popup.js and options.js
* Replaced each document.getElementById(element).innerHTML line with the function updateHTML() in popup.js

### Fixes:
*none

## 4.1.0 - 2016-05-18
### Additions:
* none
### Changes:
* Removed incognito "not_allowed" line from manifest.json after a request from a user.
### Fixes:
* none

## 4.0.1 - 2016-05-16
### Additions:
* none
## Changes:
* Removed line `chrome.browserAction.setBadgeText({text:"DR"});` from popup.js
### Fixes:
* none

## 4.0.0 - 2016-05-16
### Additions:
* Added incognito "not_allowed" to manifest.json
* Added Notifications section to options.html
* Added Experimental Features section to options.html
* Added function contextMenus() to background.js
* Added isValid(), background() and start() functions to popup.js
* Added previewSound() function to options.js
* Added notifyUserSound() function to background.js
* Added defaultUserOptions `ScanRobotsFile` to background.js
* Added function scanRobotsFile() to background.js
* Added defaultUserOptions `contextMenuCreated` to background.js
* Added function fetchUserOptions() to background.js
### Changes:
* Changed padding on confirm Dialog box in options.html
* Changed section title font size and padding in options.html
* Removed function passOptions() from background.js
* Removed functions createMenu() and removeMenu() from background.js
* Renamed option 'expression' to 'regex' in backgroun.js
* Removed default user option 'noteAutoClose' from background.js and options.js
### Fixes:
* none

## 3.5.0 - 2016-04-15
### Additions:
* Added version_name to manifest.json
* Added function display() to popup.js
* Added function resetOptions() to options.js
* Added event listeners for html elements #reset, #yes and #no to options.js
### Changes:
* Renamed function restoreOptions() to displayOptions() in options.js
* Improved code comments in popup.js and background.js
## Fixes:
* Fixed bug with URL regular expression in background.js that stopped websites with the new gTLDs like .photography or .ninja from being archived.

## 3.0.0 - 2016-04-09
### Additions:
* none
### Changes:
* Removed jQuery library dependency from popup.js.
### Fixes:
* none

## 2.3.0 - 2016-04-06
### Additions:
* Added permission 'https://archive.org/wayback/available?url=*' to manifest.json for API calls
* Added event listener for context_menu options checkbox to options.js
### Changes:
* Replaced permission 'tabs' with 'activeTab' in manifest.json
* Removed permissions 'https://*' and 'http://*' from manifest.json
* Improved code comments in background.js, popup.js and options.js
### Fixes:
* none

## 2.2.0 - 2016-03-25
### Additions:
* Added pages archived number reset button to popup.html and code to popup.js
### Changes:
* none
### Fixes:
* none

## 2.1.1 - 2016-03-23
### Additions:
* none
### Changes:
* none
### Fixes:
* Save URL bug fixed in popup.js

## 2.1.0 -- 2016-03-23
### Additions:
* Added stats view to popup.html and code to popup.js
### Changes:
* Minor changes to background.js and popup.js
### Fixes:
* none

## 2.0.0 - 2016-03-23
### Additions:
* Added background script
* Added options page
* Added contextMenu link
* Added notifications
### Changes:
* none
### Fixes:
* none

## 1.3.0 - 2016-03-22
### Additions:
* none
### Changes:
* Minor change popup css paddding.
### Fixes:
* none

## 1.2.0 - 2016-03-21
Changes not logged

## 1.0.0 - 2016-03-18
Initial release
