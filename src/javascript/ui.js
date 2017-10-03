/*jslint node: true */
/*global debug */

"use strict";

/*
	Create, update or remove elements 
 */
function UI() {
	var domElement = null;

	/**
	 * Does the element exist in the DOM
	 * @param {string} element - element id
	 * @return {boolean}
	 */
	this.isElement = function isElement(element) {

		var status = false;
		domElement = null;

		if (element !== 'undefined' || element !== null) {

			domElement = document.getElementById(element);

			if (domElement !== null) { // Element found

				status = true;

			} else {

				debug.log('Element not Found:' + element);

			}

		}

		return status;

	};

	/**
	 * Update the element's contents (text)
	 * @param {string} element - element id
	 * @param {string} data
	 */
	this.content = function content(element, value) {

		if (this.isElement(element) === true && value !== undefined) {

			domElement.textContent = value;

		}

	};

	/**
	 * Change the element's visibility
	 * @param {string} element - element id
	 * @param {string} data
	 */
	this.visibility = function visibility(element, action) {

		if (this.isElement(element) === true) {

			if (action === 'show') {

				domElement.style.display = 'block';

			} else if (action === 'hide') {

				domElement.style.display = 'none';

			}

		}

	};

	/**
	 * Change or add an element's class
	 * @param {string} element - element id
	 * @param {string} value - class name
	 */
	this.className = function className(element, value) {

		if (this.isElement(element) === true) {

			domElement.className = value;

		}

	};

	/**
	 * Disable a input box or button
	 * @param {string} element - element id
	 * @param {boolean} value
	 */
	this.disableInput = function disableInput(element, value) {

		if (this.isElement(element) === true) {

			domElement.disabled = value;

		}

	};

	/**
	 * Set or change the contents of an element's title
	 * @param {string} element - element id
	 * @param {boolean} value
	 */
	this.title = function title(element, value) {

		if (this.isElement(element) === true && typeof value !== 'undefined') {

			domElement.title = value;

		}

	};

	/**
	 * Set or change the contents of an element's attribute
	 * @param {string} element - element id
	 * @param {string} attr - attribute name
	 * @param {string} value - attribute value
	 */
	this.attribute = function attribute(element, attr, value) {

		if (this.isElement(element) === true && typeof attr !== 'undefined' && typeof value !== 'undefined') {

			domElement.setAttribute(attr, value);

		}

	};

	/**
	 * Remove an attribute from an element  
	 * @param {string} element - element id
	 * @param {string} attr - attribute name
	 */
	this.attributeRemove = function attributeRemove(element, attr) {

		if (this.isElement(element) === true && typeof attr !== 'undefined') {

			if (domElement.hasAttribute(attr)) {

				domElement.removeAttribute(attr);

			}

		}

	};

}