//the arg strict ensure there is no uppercase char in the str except first char
function ucfirst(str,strict) {
	if (typeof str == 'string') {
		str = str.replace(/^\s+/, '').replace(/\s+$/, '');
		if(str=='')return '';
		var first = str[0].toUpperCase();
		var remain = str.slice(1); //don't worry if word a char the slice(1) will return ''(still a string)
		if (strict) {
			remain = remain.toLowerCase();
		}
		return first + remain;
	}
}