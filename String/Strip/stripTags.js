function stripTags(tagStr) {
	return tagStr.replace(/<[^>]*>/gi, '');
}