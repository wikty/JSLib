function stripScript(str) {
	return str.replace(/<script[^>]*>.*<\/script[^>]*>/gi, '');
}