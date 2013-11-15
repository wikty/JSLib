function isSameDomain(url) {
	if (url.indexOf('http://') == 0 || url.indexOf('https://') == 0) {
		var thisDomain = document.location.protocol + '://' + document.location.host + '/';
		if (url.indexOf(thisDomain) == -1) {
			return false;
		}
	}
	return true;
}