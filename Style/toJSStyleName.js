//convert box-shadow to boxShadow
//convert -ms-transform to msTransform
function toJSStyleName(name) {
	if (typeof name == 'string') {
		name=name.replace(/^\s+/,'').replace(/\s+$/,'');
		var pos = name.indexOf('-');
		if (pos != -1) {
			if (pos == 0) {//case: -ms-transform
				name = name.slice(1);
			}
			var temp=name.split('-');
			var len=temp.length;
			for(var i=1;i<len;i++){//prefix keep original
				temp[i]=(temp[i].slice(0, 1).toUpperCase())+(temp[i].slice(1).toLowerCase());
			}
			return temp.join('');
		}
		return name;
	}
}