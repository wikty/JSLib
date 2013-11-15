//the browser should support style.transform=rotate(8deg);
function animateJitter(elem) {
	var counter = 10;
	var interval = 200;
	var maxDeg = 7;
	var deg = maxDeg;
	var degInterval = maxDeg / (counter / 2);
	var timer = setInterval(function() {
		if (counter % 2 == 0) {
			elem.style.msTransform = 'rotate(-' + deg + 'deg)';
			elem.style.webkitTransform = 'rotate(-' + deg + 'deg)';
			elem.style.oTransform = 'rotate(-' + deg + 'deg)';
			elem.style.mozTransform = 'rotate(-' + deg + 'deg)';
			elem.style.transform = 'rotate(-' + deg + 'deg)';
		}
		else {
			deg -= degInterval;
			elem.style.msTransform = 'rotate(' + deg + 'deg)';
			elem.style.webkitTransform = 'rotate(' + deg + 'deg)';
			elem.style.oTransform = 'rotate(' + deg + 'deg)';
			elem.style.mozTransform = 'rotate(' + deg + 'deg)';
			elem.style.transform = 'rotate(' + deg + 'deg)';
		}
		counter--;
		if (counter == 0) {
			if (parseInt(Math.random() * 10) >= 5) {
				elem.style.msTransform = 'rotate(0.2deg)';
				elem.style.webkitTransform = 'rotate(0.2deg)';
				elem.style.oTransform = 'rotate(0.2deg)';
				elem.style.mozTransform = 'rotate(0.2deg)';
				elem.style.transform = 'rotate(0.2deg)';
			}
			else {
				elem.style.msTransform = 'rotate(-0.2deg)';
				elem.style.webkitTransform = 'rotate(-0.2deg)';
				elem.style.oTransform = 'rotate(-0.2deg)';
				elem.style.mozTransform = 'rotate(-0.2deg)';
				elem.style.transform = 'rotate(-0.2deg)';
			}
			clearInterval(timer);
		}
	}, interval);
}