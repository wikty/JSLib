//the arg strict ensure there is no uppercase char in the str except first char
function ucwords(str,strict) {
	if (typeof str == 'string') {
		str=str.replace(/^\s+/,'').replace(/\s+$/,'');//to strip head and tail spaces
		var words = str.split(/\s+/);
		var len = words.length;
		str = '';
		var first = '';
		var remain = '';
		for (var i = 0; i < len; i++) {
			first = words[i][0].toUpperCase();
			remain = words[i].slice(1);
			if (strict) {
				remain = remain.toLowerCase();
			}
			str += first + remain + ' ';
		}
		return str.slice(0, -1);//the -1 to strip the last space
	}
};