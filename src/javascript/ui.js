/*jslint node: true */
/*global chrome, browser, console */

"use strict";

/*
	Create, update or remove HTMl elements

	@type {function}
 */
function UI() {
	var self = this,
		domElement = null;

	/*
		Check if a element exists in DOM
	
		@param {string} element - HTML ID
		@return {boolean}
	*/
	this.find = function find(element) {

		var status = false,
			found;
		
		if (typeof element !== 'undefined' || element !== null) {
		
			found = document.getElementById(element);
		
			if (found !== null) {
				domElement = found;
				
				console.log('Element found: ' + element);
			
				status = true;
			} else {
				console.log('Element not found: ' + element);
			}
			
		}
		
		return status;
		
	};
	
	/* 
		Update the contents of a HTML element
	
		@param {string} element - HTML ID
		@param {string} data - Data to display 
	*/
	this.content = function update(element, data) {
	
		if (this.find(element) === true) {
			domElement.textContent = data;
		}
		
	};
	
	/*
		Change the visibility of a HTML element
	
		@param {string} element - HTML ID
		@param {string} action - hide/show 
	*/
	this.visibility = function visibility(element, action) {
		
		if (this.find(element) === true) {
			
			if (action === 'show') {
				domElement.style.display = 'block';
				
			} else if (action === 'hide') {
				domElement.style.display = 'none';
			}
			
		}
		
	};
	
	/*
		Change or add a class to a HTML element
	
		@param {string} element - HTML id
		@param {string} value - class name
	*/
	this.className = function className(element, value) {
		
		if (this.find(element) === true) {
			domElement.className = value;
		}
		
	};
	
	/*
		Disable a input box or button
	
		@param {string} element - HTML id
		@param {bool} value - true/false
	*/
	this.disableInput = function disableInput(element, value) {
		
		if (this.find(element) === true) {
			domElement.disabled = value;
		}
		
	};
	
	/*
		Set or change the contents of a attribute on a HTML element 
		
		@param {string} element - HTML ID
		@param {string} attr - attribute name
		@param {string} value - attribute value
	*/
	this.attribute = function attribute(element, attr, value) {
		
		if (this.find(element) === true && typeof attr !== 'undefined' && typeof value !== 'undefined') {
			domElement.setAttribute(attr, value);
		}

	};
	
	/*
		Remove a attribute from a HTML element  
		
		@param {string} element - HTML ID
		@param {string} attr - attribute name
	*/
	this.attributeRemove = function attributeRemove(element, attr) {
		
		if (this.find(element) === true && typeof attr !== 'undefined') {

			if (domElement.hasAttribute(attr)) {
				domElement.removeAttribute(attr);
			}
			
		}
		
	};
	
	// Short function names
	this.attr = this.attribute;
	
}