(function($) {
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
		else if(padding<0){
			var temp = '';
			for (var i = -padding; i >= 0; i -= fillLen) {
				temp += fill;
			}
			temp += fill.substr(0, fillLen + i);
			result = temp + result;
		}
		return result;
	}
})(jQuery);