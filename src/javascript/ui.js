/*jslint node: true */
/*global debug, document */

"use strict";

/*
	Create, update or remove elements
 */
function UI() {
	var element = null;

	/**
	 * Does the element exist in the DOM
	 * @param {string} id Element id
	 * @return {boolean} status
	 */
	this.isElement = function isElement(id) {

		var status = false;
		element = null;

		if (id !== 'undefined' || id !== null) {

			element = document.getElementById(id);

			if (element !== null) { // Element found

				status = true;

			} else {

				debug.log('Element not Found:' + id);

			}

		}

		return status;

	};

	/**
	 * Set or change the value of an element's textContent
	 * @param {string} element Element id
	 * @param {string} data
	 */
	this.content = function content(id, value) {

		if (this.isElement(id) === true && value !== undefined) {

			element.textContent = value;

		}

	};

	/**
	 * Change the display status of an element via the CSS class .hide
	 * @param {string} id Element id
	 * @param {boolean} boolean
	 */
	this.display = function display(id, boolean) {

		if (this.isElement(id) === true) {

			if (boolean === true) { // Remove .hide class and display element

				this.removeClass(id, 'hide');

			} else if (boolean === false) { // Add .hide class and hide element

				this.addClass(id, 'hide');

			}

		}

	};

	/*
	 * Is the element displayed
	 * @param {string} id Element id
	 */
	this.isDisplayed = function isDisplayed(id) {

		if (this.isElement(id) === true) {

			var display = window.getComputedStyle(element).display;

			if (display !== 'none') {

				return true;

			}

		}

		return false;

	};

	/**
	 * Add a class to an element
	 * @param {string} id Element id
	 * @param {string} value Class name
	 */
	this.addClass = function addClass(id, value) {

		if (this.isElement(id) === true && typeof value !== 'undefined') {

			element.classList.add(value);

		}

	};

	/**
	 * Remove a class from an element
	 * @param {string} id Element id
	 * @param {string} value Class name
	 */
	this.removeClass = function removeClass(id, value) {

		if (this.isElement(id) === true && typeof value !== 'undefined') {

			element.classList.remove(value);

		}

	};

	/**
	 * Enable an input element
	 * @param {string} id Element id
	 */
	this.enableInput = function enableInput(id) {

		if (this.isElement(id) === true) {

			element.disabled = false;

		}

	};

	/**
	 * Disable an input element
	 * @param {string} id Element id
	 */
	this.disableInput = function disableInput(id) {

		if (this.isElement(id) === true) {

			element.disabled = true;

		}

	};

	/**
	 * Set or change an element's title
	 * @param {string} id Element id
	 * @param {boolean} value
	 */
	this.title = function title(id, value) {

		if (this.isElement(element) === true && typeof value !== 'undefined') {

			element.title = value;

		}

	};

	/**
	 * Set or change an element's attribute
	 * @param {string} id Element id
	 * @param {string} attr Attribute name
	 * @param {string} value Attribute value
	 */
	this.attribute = function attribute(id, attr, value) {

		if (this.isElement(id) === true && typeof attr !== 'undefined' && typeof value !== 'undefined') {

			element.setAttribute(attr, value);

		}

	};

	/**
	 * Remove an attribute from an element
	 * @param {string} id Element id
	 * @param {string} attr Attribute name
	 */
	this.attributeRemove = function attributeRemove(id, attr) {

		if (this.isElement(id) === true && typeof attr !== 'undefined') {

			if (element.hasAttribute(attr)) {

				element.removeAttribute(attr);

			}

		}

	};

}
