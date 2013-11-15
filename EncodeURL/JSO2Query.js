function JSO2Query(JSO) {
	if (typeof JSO == 'object') {
		var str = '';
		for (var name in JSO) {
			str += '&' + encodeURIComponent(name) + '=' + encodeURIComponent(JSO[name]);
		}
		return str.slice(1);
	}
};