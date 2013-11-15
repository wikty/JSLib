function getElementStyle(elem, which) {
	if (elem.currentStyle) {
		return elem.currentStyle[which];
	}
	else {
		return window.getComputedStyle(elem)[which];
	}
}