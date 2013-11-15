//Notice:if use php to test this function please follow every echo by flush
function XHRStream(src, callback) {//only for responseText, xml can not be bulit stream
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
	var lastSize = 0;
	var XHRO = getXHRO();
	XHRO.onreadystatechange = function() {
		var receivedText;
		if (XHRO.readyState > 2) {
		//use lastSize to make sure every time fetch new text
			receivedText = XHRO.responseText.substr(lastSize);
			lastSize = XHRO.responseText.length;
			callback(receivedText);
		}
		if (XHRO.readyState == 4) {
			XHRStream(src, callback);
		}
	};
	XHRO.open('GET', src, true);
	XHRO.send(null);
};