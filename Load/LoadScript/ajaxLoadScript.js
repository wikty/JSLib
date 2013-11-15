//if undefined sync , will be async
//you will get file's code in your callback
//a callback example:
//function cb(code) {
//	var script = document.createElement('script');
//	script.innerHTML = code;
//	document.getElementsByTagName('head')[0].appendChild(script);
//}
//Notice:
//actullay there is a perblem,the response is text,so
//how can your callback convert the repsonseText to code is really a problem
//sure,i have a solution,but it is not well
//eval(repsonseText),after you can use some function and data in the src script file
function ajaxLoadScript(src, callback,sync) {
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

	var XHRO=getXHRO();
	sync=(sync)? true: false;
	XHRO.open('GET', src, !sync);
	XHRO.onreadystatechange = function() {
		if (XHRO.readyState == 4) {
			if ((XHRO.status >= 200 && XHRO.status < 300) || XHRO.status == 304) {
				callback(XHRO.responseText);
			}
		}
	}
	XHRO.send(null);
}