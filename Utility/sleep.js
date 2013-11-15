function sleep(milliseconds) {
	milliseconds = milliseconds || 100;
	var start = (new Date()).getTime();
	while (1) {
		if (start + milliseconds < (new Date()).getTime()) {
			break;
		}
	}
};