function getDirName(path) {
	if (typeof path == 'string') {
		var pos = path.lastIndexOf('/');
		//if there is no /,so pos is -1, return path.substr(pos+1) is appropriate
		if (pos == path.length - 1) {
			return path;
		}
		else {
			return path.substr(0, pos + 1);
		}
	}
	return undefined;
}