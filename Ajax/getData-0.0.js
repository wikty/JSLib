//Notice: dataType only for text or xml(defalut is text)
//if you want sync request,you should isSync=true(you rarely do this)
function getData(src, callback,dataType,isSync) {
	var XHRO = null;
	dataType = dataType || 't';
	isSync=(isSync)? true:false;
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
	if(!XHRO)throw new Error('Browser not support XMLHttpRequest');
	XHRO.open('GET', src, !isSync);
	XHRO.onreadystatechange = function() {
		if (XHRO.readyState == 4) {
			if ((XHRO.status >= 200 && XHRO.status < 300) || XHRO.status == 304) {
				if (dataType.toLowerCase().indexOf('t') != -1) {
					callback(XHRO.responseText);
				}
				else {
					callback(XHRO.responseXML);
				}
			}
		}
	}
	XHRO.send(null);
}