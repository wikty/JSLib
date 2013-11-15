//arg:elem and arg:cls all can be a array
//Notice:when elem and cls all are array,meaning all of cls set to every elem,not one to one
function setClass(elem, cls) {
	if (typeof cls =='object' && cls !==null && cls.constructor == Array) {
		var l = cls.length;
		if (elem.constructor == Array) {
			var ll = elem.length;
			for (var j = 0; j < ll; j++) {
				for (var i = 0; i < l; i++) {
					elem[j].className=cls.join(' ');
				}
			}
		}
		else {
			for (var i = 0; i < l; i++) {
				elem.className=cls.join(' ');
			}
		}
	}
	else if (typeof cls == 'string') {
		if (elem.constructor == Array) {
			var ll = elem.length;
			for (var j = 0; j < ll; j++) {
				elem[j].className=cls;
			}
		}
		else {
			elem.className=cls;
		}
	}
}