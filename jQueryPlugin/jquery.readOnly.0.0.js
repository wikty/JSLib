(function($) {
	$.fn.readOnly = function(readOnly, cssForItem) {
		var options = $.extend({ opacity: readOnly ? 0.5 : 1.0 }, cssForItem || {});
		return this.filter('input:text,textarea').each(function() {
			$(this).attr('readOnly', readOnly).
					css(options).
					end();
		});
	}
})(jQuery);