//Notice: dataType only for text or xml(defalut is text)
function getData(src, callback,dataType) {
	var XHRO = null;
	dataType = dataType || '';
	try {
		XHRO = new XMLHttpRequest();
	}
	catch (e) {
		try {
			XHRO = new ActiveXObject("Msxml2.XMLHTTP");
		}
		catch (e) {
			XHRO = new ActiveXObject("Microsoft.XMLHTTP");
		}
	}
	XHRO.open('GET', src);
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
	}
	XHRO.send(null);
}