function isValidXMLDoc(url,callback) {
	var XHRO = null;
	if (ActiveXObject) {
		try {
			XHRO = new ActiveXObject("Msxml2.XMLHTTP");
		}
		catch (e) {
			XHRO = new ActiveXObject("Microsoft.XMLHTTP");
		}
	}
	else {
		callback('this test xml valid is only for IE,You browser is not IE');
	}
	XHRO.open('GET', url);
	XHRO.onreadystatechange = function() {
		if (XHRO.readyState == 4) {
			if ((XHRO.status >= 200 && XHRO.status < 300) || XHRO.status == 304) {
				var tester = new ActiveXObject('MSXML2.DOMDocument');
				tester.validateOnParse = true;
				tester.load(XHRO.responseXML);
				var str = '';
				if (tester.parseError.errorCode != 0) {
					str = 'Error in url:' +
						tester.parseError.url +
					'\nline:' +
					tester.parseError.line +
					'\npositon:' +
					tester.parseError.linepos +
					'\nError source:' + tester.parseError.srcText +
					'\nError reason:' + tester.parseError.reason +
					'Error code:' + tester.parseError.errorCode + '.';
				}
				else {
					str = 'valid xml document.';
				}
				callback(str);
			}
		}
	}
	XHRO.send(null);
}