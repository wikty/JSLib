//Notice: dataType only for text or xml(defalut is text)
//if you want sync request,you should isSync=true(you rarely do this)
//the arg data is sent to server
function putData(src, callback,dataJSO,isSync) {
	function JSO2Query(JSO) {
		if (typeof JSO == 'object') {
			var str = '';
			for (var name in JSO) {
				str += '&' + encodeURIComponent(name) + '=' + encodeURIComponent(JSO[name]);
			}
			return str.slice(1);
		}
		else{
			throw new Error("JSO2Query's arg must be a object");
		}
	};
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
	XHRO.open('POST', src, !isSync);
	//set requestHeader, give request info to server .if don't do this 
	//the server will be refused your request

	//XHRO.setRequestHeader('Content-Type','text/plain');//this is default request type
	XHRO.setRequestHeader('Content-Type','application/x-www-form-urlencoded');//this is url encoded request type(post method)
	//XHRO.setRequestHeader('Content-Type','multipart/form-data');//this is using to upload file(binary data)
	XHRO.onreadystatechange = function() {
		if (XHRO.readyState == 4) {
			if ((XHRO.status >= 200 && XHRO.status < 300) || XHRO.status == 304) {
				callback(XHRO.responseXML || XHRO.responseText);
			}
		}
	}
	if(dataJSO)dataJSO=JSO2Query(dataJSO);
	else dataJSO=null;
	XHRO.send(dataJSO);
}