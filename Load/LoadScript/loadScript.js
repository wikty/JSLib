//load script to head part
//when script loaded you can use it in you callback function 
//and callback will be gived event.target as this, and event as first argument
function loadScript(src, callback) {
	function forOldIE() {
		var target = window.event.srcElement;
		if (target.readyState == 'complete' || target.readyState == 'loaded') {
			callback.call(target,window.event);
		}
	}
	var script = document.createElement('script');
	if (script.addEventListener) {
		script.addEventListener('load', callback);
	}
	else if (script.attachEvent) { //for old IE
		script.attachEvent('onreadystatechange', forOldIE);
	}
	else {
		script.onreadystatechange = function() {
			forOldIE();
		};
	}
	script.src = src;
	document.getElementsByTagName('head')[0].appendChild(script);
}

