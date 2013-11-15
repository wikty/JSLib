function getXHRO() {
	var XHRO = null;
	var err = null;
	try {
		XHRO = XMLHttpRequest();
	}
	catch (err) {
		var aTypes = ['Msxml2.XMLHTTP.6.0', 'Msxml2.XMLHTTP.3.0',
				'Msxml2.XMLHTTP', 'Microsoft.XMLHTTP'];
		var len = aTypes.length;
		for (var i = 0; i < len; i++) {
			try {
				XHRO = ActiveXObject(aTypes[i]);
			}
			catch (err) {
				continue;
			}
			break;
		}
	}
	finally {
		return XHRO;
	}
};