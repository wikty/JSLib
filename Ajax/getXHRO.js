function getXHRO() {
	var XHRO = null;
	var err = null;
	try {
		XHRO = new XMLHttpRequest();
	}
	catch (err) {
		var aTypes = ['Msxml2.XMLHTTP.6.0', 'Msxml2.XMLHTTP.3.0',
				'Msxml2.XMLHTTP', 'Microsoft.XMLHTTP'];
		var len = aTypes.length;
		for (var i = 0; i < len; i++) {
			try {
				XHRO = new ActiveXObject(aTypes[i]);
			}
			catch (err) {
				continue;
			}
			break;
		}
	}
	finally {
		if(!XHRO)throw new Error('Browser cannot support ajax');
		return XHRO;
	}
};