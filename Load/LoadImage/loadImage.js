// Function to execute a callback when an image has been loaded,
// either from the network, or from the browser cache.

function loadImage($image, src, callback) {

	// Bind the load event BEFORE setting the src.
	$image.bind("load", function(evt) {
		// If no valid width, image hasn't actually loaded.
		if ($image.width() === 0) {
			$image.bind('load', arguments.callee);
			return;
		}
		// Image has loaded, so unbind event and call callback.
		$image.unbind("load");
		callback($image);
	}).each(function() {
		// For Gecko based browsers, check the complete property,
		// and trigger the event manually if image loaded.
		if ($image[0].complete) {
			$image.trigger("load");
		}
	});
	// For Webkit browsers, the following line ensures load event fires if
	// image src is the same as last image src. This is done by setting
	// the src to an empty string initially.
	if ($.browser.webkit) {
		$image.attr('src', '');
	}
	$image.attr('src', src);
};