//arg:elem can be array
//arg:cls can be array
// elem is array and cls is array|string: every elem remove all of the cls
// elem is object and cls is array|strig: the elem remove all of the cls
function removeClass(elem, cls) {
	function inner(e, c) {
		if (e.className) {
			var temp = (e.className).split(/\s+/);
			var len = temp.length;
			for (var i = 0; i < len; i++) {
				var item = temp[i].replace(/^\s+/, '').replace(/\s+$/, '');
				if (item == c) {
					temp.splice(i, 1);
					len--; //notice:if you forget,you will be trouble
				}
			}
			e.className = temp.join(' ');
		}
	}


	if (typeof cls =='object' && cls !==null && cls.constructor == Array) {
		var l = cls.length;
		if (elem.constructor == Array) {
			var ll = elem.length;
			for (var j = 0; j < ll; j++) {
				for (var i = 0; i < l; i++) {
					inner(elem[j], cls[i]);
				}
			}
		}
		else {
			for (var i = 0; i < l; i++) {
				inner(elem, cls[i]);
			}
		}
	}
	else if (typeof cls == 'string') {
		if (elem.constructor == Array) {
			var ll = elem.length;
			for (var j = 0; j < ll; j++) {
				inner(elem[j], cls);
			}
		}
		else {
			inner(elem, cls);
		}
	}
}