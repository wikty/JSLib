function Query2JSO(query) {
	if (typeof query == 'string') {
		var obj = {};
		var nvs = query.split('&');
		var len = nvs.length;
		for (var i = 0; i < len; i++) {
			var nv = nvs[i].replace(/^\s+/, '').replace(/\s+$/, '');
			if (nv) {
				nv = nv.split('=');
				obj[decodeURIComponent(nv[0])] = decodeURIComponent(nv[1]);
			}
		}
		return obj;
	}
};