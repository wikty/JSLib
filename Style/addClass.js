//arg:elem and arg:cls all can be a array
//Notice:when elem and cls all are array,meaning all of cls add to every elem,not one to one
function addClass(elem, cls) {
	function inner(e, c) {
		if (e.className) {
			var temp = (e.className).split(/\s+/);
			var len = temp.length;
			for (var i = 0; i < len; i++) {
				var item = temp[i].replace(/^\s+/, '').replace(/\s+$/, '');
				if (item == c) return;
				temp[i] = item;
			}
			temp.push(c);//add class c
			e.className = temp.join(' ');
		}
		else {
			e.className = c;
		}
	};


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