//Version: 0.0, the problem is following
//Problem:the problem is return current script text code to current callback context
//even thoungh eval(code),only current callback can use functions in the loaded script
//,when the remain loading scripts depend on current loaded script,they cannot invoke
//function than in the other callback context
//Solution:add all of before loaded script code to next callback,in the ajaxLoadScriptQueuq-0.1.js
//Notice: you must eval() the return code in you callback
var ajaxLoadScriptQueue = function() {
	var scripts = [];
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
	var fetching = false;
	function fetchReached() {
		fetching = true;
		var len = scripts.length;
		var script = null;
		for (var i = 0; i < len; i++) {
			script = scripts[i];
			if (!script.done) {
				//这里存在一些漏洞，如果0号资源已经进入这块代码，就以为着将会取回0号资源
				//但是如果资源加载足够快的话，0号资源没有出这块代码时，1号资源就进入这块代码了
				//出现这样情况的结果是0号资源将会被回调两次，如果后续资源也一同进入的话问题就更大了
				//我的解决方案是设置一个进入该函数的标志变量，如果该函数没有退出后续调用将被挂起
				if (script.response) {
					script.done = true;
					script.callback(script.response);
				}
				else {
					break;
				}
			}
		}
		fetching = false;
	};
	var that = {
		load: function(src, callback, isOrder) {
			if (isOrder) {
				var item = { response: null, callback: callback, done: false};
				var index = scripts.length;
				scripts[index] = item;
			}
			var XHRO = getXHRO();
			XHRO.onreadystatechange = function() {
				if (XHRO.readyState == 4) {
					if ((XHRO.status >= 200 && XHRO.status < 300) || XHRO.status == 304) {
						if (isOrder) {
							scripts[index].response = XHRO.responseText;
							(function() {
								if (!fetching) {
									fetchReached();
								}
								else {
									setTimeout(arguments.callee, 50);
								}
							})();
						}
						else {
							callback(XHRO.responseText);
						}
					}
				}
			};
			XHRO.open('GET', src, true);
			XHRO.send(null);
		}
	};
	return that;
};