function getCookie(name){
	if (typeof name == 'string') {
		var len = name.length;
		var cookies = document.cookie.split(';');
		var count = cookies.length;
		var nv;
		for (var i = 0; i < count; i++) {
			nv = cookies[i];
			nv=nv.replace(/^\s+/,'').replace(/\s+$/,'');
			//nv = (nv.slice(0, 1) == ' ') ? nv.slice(1) : nv;
			nv = decodeURIComponent(nv);
			if (name == nv.slice(0, len) && nv[len]=='=') {
				return nv.slice(len+1);
			}
		}
	}
}