//the elem,must position:absolute;left:number;top:number;width:number;height:number;
//in other words,elem must be a position and size fixed.
function animateRise(elem) {
	function getStyle(elem, which) {
		if (elem.currentStyle) {
			return elem.currentStyle[which];
		}
		else {
			return window.getComputedStyle(elem)[which];
		}
	}
	var scale = 10;
	var counter = 60;
	var intervalTime = 30;
	var origX = parseInt(getStyle(elem, 'left'), 10);
	var origY = parseInt(getStyle(elem, 'top'), 10);
	var origWidth = parseInt(getStyle(elem, 'width'), 10);
	var origHeight = parseInt(getStyle(elem, 'height'), 10);
	var minWidth = Math.floor(origWidth / scale);
	var minHeight = Math.floor(origHeight / scale);
	var scaleIntervalH = Math.floor(((origWidth - minWidth) / counter)/2);
	var scaleIntervalV = Math.floor(((origHeight - minHeight) / counter)/2);
	var curX = origX + Math.floor((origWidth - minWidth) / 2);
	var curY = origY + Math.floor((origHeight - minHeight) / 2);
	var curWidth = minWidth;
	var curHeight = minHeight;
	var timer = setInterval(function() {
		if (curWidth>=origWidth) {
			clearInterval(timer);
			elem.style.width = origWidth + 'px';
			elem.style.height = origHeight + 'px';
			elem.style.left = origX + 'px';
			elem.style.top = origY + 'px';
		}
		elem.style.width = curWidth + 'px';
		elem.style.height = curHeight + 'px';
		elem.style.left = curX + 'px';
		elem.style.top = curY + 'px';
		curX -= scaleIntervalH;
		curY -= scaleIntervalV;
		curWidth += scaleIntervalH*2;
		curHeight += scaleIntervalV*2;
	}, intervalTime);
}