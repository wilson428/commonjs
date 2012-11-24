/* Crockford helper functions */

//define new methods. See examples below
Function.prototype.method = function (name, func) {
    this.prototype[name] = func;
	return this;
};

//specifies the prototype of a new object
if (typeof Object.beget !== 'function') {
	 Object.beget = function (o) {
		 var F = function () {};
		 F.prototype = o;
		 return new F();
	 };
}

/* NEW METHODS */
Number.method('integer', function (  ) {
	return Math[this < 0 ? 'ceiling' : 'floor'](this);
});

String.method('trim', function (  ) {
	return this.replace(/^\s+|\s+$/g, '');
});

String.method('deentityify', (function () {
// The entity table. 
	var entity = {
		quot: '"',
		lt:   '<',
		gt:   '>'
	};
// Return the deentityify method.
	return function () {
		return this.replace(/&([^&;]+);/g,
			function (a, b) {
				var r = entity[b];
				return typeof r === 'string' ? r : a;
			}
		);
	};
})());

//support Array.indexOf in pre-EMCA-262
//https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/indexOf
if (!Array.prototype.indexOf) {  
	Array.prototype.indexOf = function (searchElement /*, fromIndex */ ) {  
		"use strict";  
		if (this === null) {  
			throw new TypeError();  
		}  
		var t = Object(this);  
		var len = t.length >>> 0;  
		if (len === 0) {  
			return -1;  
		}  
		var n = 0;  
		if (arguments.length > 0) {  
			n = Number(arguments[1]);  
			if (n !== n) { // shortcut for verifying if it's NaN  
				n = 0;  
			} else if (n !== 0 && n !== Infinity && n !== -Infinity) {  
				n = (n > 0 || -1) * Math.floor(Math.abs(n));  
			}  
		}  
		if (n >= len) {  
			return -1;  
		}  
		var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);  
		for (; k < len; k += 1) {  
			if (k in t && t[k] === searchElement) {  
				return k;  
			}  
		}  
		return -1;  
	}  
}