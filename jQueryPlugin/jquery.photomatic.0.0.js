(function($) {
	$.fn.photomatic = function(options) {
		function showPhoto(index) {
			$(options.showcase).attr('src', options.transformer(options.thumbnails$[index].src));
			options.currentIndex = index;
		}
		options = $.extend({
			firstControl: null,
			previousControl: null,
			playControl: null,
			nextControl: null,
			lastControl: null,
			transformer: function(url) { return url.replace(/thumbnails/, 'photos'); },
			showcase: null,
			playingClass:'photomatic-playing',
			delay: 1500
		}, options || {});
		options.currentIndex = 0;
		options.thumbnails$ = this.filter('img');
		options.thumbnailsLen = options.thumbnails$.length;
		options.thumbnails$.each(function(index) {
			$(this).data('photomatic-index', index);
		}).click(function() {
			showPhoto($(this).data('photomatic-index'));
		});

		$(options.showcase).
		attr('title', 'click for next photo').
		css('cursor', 'pointer').
		click(function() {
			showPhoto((options.currentIndex + 1) % options.thumbnailsLen);
		});

		$(options.firstControl).click(function() {
			showPhoto(0);
		});
		$(options.previousControl).click(function() {
			showPhoto((options.currentIndex - 1 + options.thumbnailsLen) % options.thumbnailsLen);
		});
		$(options.playControl).toggle(function() {
			options.tick = setInterval(function(event) {
				$(options.nextControl).triggerHandler('click');
			}, options.delay);
			$(event.target).addClass(options.playingClass);
			$(options.nextControl).click();
		},
		function(event) {
			clearInterval(options.tick);
			$(event.target).removeClass(options.playingClass);
		});
		$(options.nextControl).click(function() {
			showPhoto((options.currentIndex + 1) % options.thumbnailsLen);
		});
		$(options.lastControl).click(function() {
			showPhoto(options.thumbnailsLen - 1);
		});
		showPhoto(0);
		return this;
	}
})(jQuery);