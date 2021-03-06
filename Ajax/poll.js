function poll(src, callback, interval, dataType) {
	dataType = dataType || '';
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
			return XHRO;
		}
	};
	var XHRO = getXHRO();
	XHRO.onreadystatechange = function() {
		if (XHRO.readyState == 4) {
			if ((XHRO.status >= 200 && XHRO.status < 300) || XHRO.status == 304) {
				if (dataType.toLowerCase() == 'xml') {
					callback(XHRO.responseXML);
				}
				else {
					callback(XHRO.responseText);
				}
			}
		}
	};
	setTimeout(function() {
		XHRO.open('GET', src, true);
		XHRO.send(null);
	}, interval);
	XHRO.open('GET', src, true);
	XHRO.send(null);
};