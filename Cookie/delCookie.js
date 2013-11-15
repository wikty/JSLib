function delCookie(name){
	if (typeof name == 'string') {
		document.cookie = encodeURIComponent(name) + '=;expires=Thu, 1 Jan 1970 00:00:00 UTC';
		return true;
	}
	return false;
}