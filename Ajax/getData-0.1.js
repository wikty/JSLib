//Notice: dataType only for text or xml(defalut is text)
//if you want sync request,you should isSync=true(you rarely do this)
function getData(src, callback,isSync) {
	var XHRO = null;
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
				//because when you request file is .txt the responseXML is null
				//but when you request file is .xml the responseText is not null
				//so the order  is important
				callback(XHRO.responseXML || XHRO.responseText);
			}
		}
	}
	XHRO.send(null);
}