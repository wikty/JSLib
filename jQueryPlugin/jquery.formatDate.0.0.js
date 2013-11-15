(function($) {
//the follow is regexp use for parse date string
//^(yy(yy)?|M(M(M(M)?)?)?|d(d)?|EEE(E)?|a|H(H)?|h(h)?|m(m)?|s(s)?|S)

//this is a tool depend for formatDate
	$.strToFixedWidth = function(value, length, fill, headTurncate) {
		var result = (value || '').toString();
		fill = ((typeof fill == 'undefined') ? ' ' : fill).toString();
		headTurncate = headTurncate || false;
		var fillLen = fill.length;
		length = (length || value.length);
		var padding = result.length - length;
		if (padding > 0) {
			if (headTurncate) {
				result = result.substr(0, length);
			}
			else {
				result = result.substr(padding);
			}
		}
		else if (padding < 0) {
			var temp = '';
			for (var i = -padding; i >= 0; i -= fillLen) {
				temp += fill;
			}
			temp += fill.substr(0, fillLen + i);
			result = temp + result;
		}
		return result;
	};

//the jQuery plugin for format Date
	$.formatDate = function(date, pattern) {
		var result = [];
		if (arguments.length == 1) {
			if (typeof date == 'object' && date.constructor == Date) {
				throw new Error('formatDate must be given a pattern argument');
			}
			pattern = date;
			date = new Date();
		}
		while (pattern.length > 0) {
			$.formatDate.patternParts.lastIndex = 0;
			var matched = $.formatDate.patternParts.exec(pattern);
			if (matched) {
				result.push($.formatDate.patternValue[matched[0]].call(this, date));
				pattern = pattern.slice(matched[0].length);
			}
			else {
				result.push(pattern.charAt(0));
				pattern = pattern.slice(1);
			}
		}
		return result.join(' ');
	};
	$.formatDate.patternParts = /^(yy(yy)?|M(M(M(M)?)?)?|d(d)?|EEE(E)?|a|H(H)?|h(h)?|m(m)?|s(s)?|S)/;
	$.formatDate.monthNames = [
		'January', 'February', 'March', 'April', 'May',
		'June', 'July', 'August', 'September', 'October', 'November', 'December'
	];
	$.formatDate.dayNames = [
		'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
	];
	$.formatDate.AMPM = ['AM', 'PM'];
	$.formatDate.patternValue = {
		yy: function(date) {
			return $.strToFixedWidth(date.getFullYear(), 2, '0');
		},
		yyyy: function(date) {
			return date.getFullYear();
		},
		MMMM: function(date) {
			return $.formatDate.monthNames[date.getMonth()];
		},
		MMM: function(date) {
			return $.formatDate.monthNames[date.getMonth()].substr(0, 3);
		},
		MM: function(date) {
			return $.strToFixedWidth(date.getMonth() + 1, 2, '0');
		},
		M: function(date) {
			return date.getMonth() + 1;
		},
		dd: function(date) {
			return $.strToFixedWidth(date.getDate(), 2, '0');
		},
		d: function(date) {
			return date.getDate();
		},
		EEEE: function(date) {
			return $.formatDate.dayNames[date.getDay()];
		},
		EEE: function(date) {
			return $.formatDate.dayNames[date.getDay()].substr(0, 3);
		},
		HH: function(date) {
			return $.strToFixedWidth(date.getHours(), 2, '0');
		},
		H: function(date) {
			return date.getHours();
		},
		hh: function(date) {
			var temp = date.getHours() % 12;
			return $.strToFixedWidth(temp, 2, '0');
		},
		h: function(date) {
			return date.getHours() % 12;
		},
		a: function(date) {
			return date.getHours() > 12 ? $.formatDate.AMPM[1] : $.formatDate.AMPM[0];
		},
		mm: function(date) {
			return $.strToFixedWidth(date.getMinutes(), 2, '0');
		},
		m: function(date) {
			return date.getMinutes();
		},
		ss: function(date) {
			return $.strToFixedWidth(date.getSeconds(), 2);
		},
		s: function(date) {
			return date.getSeconds();
		},
		S: function(date) {
			return $.strToFixedWidth(date.getMilliseconds(), 3, '0');
		}
	};
})(jQuery);