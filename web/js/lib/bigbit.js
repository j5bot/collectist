define([], function () {

	function BigBit (bytes, BYTE_SIZE) {
		this.bytes = bytes || [];
		this._init(BYTE_SIZE);
	}
	
	// JavaScript can't do unsigned 32-bit integer bitwise operations, we have to use 31-bit integers
	var BYTE_SIZE = 31;
	var BYTE_SIZE_FLOAT = 31.0;
	
	// Convert 32-bit integer array into 32-bit character string for base64 encoding
	function b32encode (arr) {
		return arr.map(function (x) {
			return String.fromCharCode(x);
		}).join("");
	}
	
	BigBit.prototype = {
		
		_init: function (_BYTE_SIZE) {
			BYTE_SIZE = _BYTE_SIZE;
			BYTE_SIZE_FLOAT = _BYTE_SIZE * 1.0;
		},
		
		_bitty: function (pos, callback, create) {

			var bitPosition,
				toggleByte,
				bitLength = this.length(),
				byteLength = this.bytes.length;

			if (bitLength <= pos) {
				
				// prepends a 1, which adds one new byte and a total of 32 new bit registers, with the last of the new byte set to 1
				// e.g. 00001111 -> 0000000100001111
				if (create) {
					this.bytes.unshift(1);
				}

			} else {

				// figure out what bit position in a byte this should be
				bitPosition = pos % BYTE_SIZE;
				// which byte to change, the bigger the position, the smaller the byte
				toggleByte = byteLength - Math.floor(pos / BYTE_SIZE_FLOAT) - 1;

				return callback.call(this, pos, toggleByte, bitPosition);
			}		
		},
		
		length: function () {
			return (this.bytes.length || 0) * BYTE_SIZE;
		},
		
		toggle: function (pos) {
			return this._bitty(pos, function (pos, tB, bP) {
				// toggle the bit
				this.bytes[tB] = this.bytes[tB] ^ (1 << bP);
				// return the current state (same as read)
				return !!(this.bytes[tB] & (1 << bP) >> bP);
			}, true);
		},
		
		on: function (pos) {	
			return this._bitty(pos, function (pos, tB, bP) {
				// turn on the bit
				this.bytes[tB] = this.bytes[tB] | (1 << bP);
				// return state
				return !!(this.bytes[tB] & (1 << bP) >> bP);
			}, true);
		},
		
		off: function (pos) {
			return this._bitty(pos, function (pos, tB, bP) {
				// turn off the bit
				this.bytes[tB] = this.bytes[tB] & ~(1 << bP);
				// return state
				return !!((this.bytes[tB] & (1 << bP)) >> bP);
			});
		},
		
		read: function (pos) {
			return this._bitty(pos, function (pos, tB, bP) {			
				return !!(((this.bytes[tB] || 0) & (1 << bP)) >> bP);
			});
		},
		
		/**
		Operate on two big bit instances
		 */
		operate: function (bigBit, operator) {
			
			var operation;
			
			switch (operator.toLowerCase()) {
				case "or":
					operation = function (a,b) {
						return a | b;
					};
					break;
				case "and":
					operation = function (a,b) {
						return a & b;
					};
					break;
				case "xor":
					operation = function (a,b) {
						return a ^ b;
					};
					break;
			}
			
			var resultBytes = [];
			for (var i = 0, l = this.bytes.length, bl = bigBit.bytes.length; i < l && i < bl; i++) {
				resultBytes.push(operation(this.bytes[i], bytes[i]));
			}
			
			return new BigBit(resultBytes);	
		},
		
		and: function (bigBit) {
			return this.operate(bigBit,"and");
		},
		
		or: function (bigBit) {
			return this.operate(bigBit,"or");
		},
		
		xor: function (bigBit) {
			return this.operate(bigBit,"xor");
		},
		
		// for checklists, swap list of haves for list of wants
		complement: function () {
			return new BigBit(this.bytes.map(function (x) {
				x = ~x;
			}));
		},
		
		toString: function () {
			return this.bytes.map(function (x) {
				return x.toString(2);
			}).join("");
		},
		
		toBase64: function (str) {
			return btoa(b32encode(this.bytes));
		},
		
		fromString: function () {
			this.bytes = str.match(/[01]{10}/g).map(function (x) {
				return parseInt(x,2);
			});
		},

		fromBase64: function (str) {
			if (str.length > 0) {
				this.bytes = atob(str).match(/./g).map(function (x) {
					return x.charCodeAt(0);
				});
			}
			return this;
		}
	}
	
	return BigBit;
});