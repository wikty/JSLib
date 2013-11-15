//this function will return a object with a method=>load(src,callback,isOrder),and it is the only method
//you can use it to load script,and arg:isOrder to define whether push into script load queue
var loadScriptQueue = function() {
	var queue = [];
	function forOldIE(callback) {
		var target = window.event.srcElement;
		if (target.readyState == 'complete' || target.readyState == 'loaded') {
			callback.call(target,window.event);
		}
	}
	var using = false;//mark whether is checking scripts(scanQueue is calling) queue
					  //if is checking queue,other ready script will loop waiting until can use into scanQueue
	
	function scanQueue(item, ie) {//check queue,if the script if ready will be called the responsive callback
		using = true;
		item.ready = true;//set current load script is ready
		
		var len = queue.length;
		for (var i = 0; i < len; i++) {
			var which = queue[i];
			if (!which.done) {//done is false,meaning the callback is not called
				if (which.ready) {//ready is true,meaning script is loaded
					if (ie) {
						ie(which.callback);
					}
					else {
						which.callback();
					}
					which.done=true;
				}
				else {
					break;
				}
			}
		}
		using = false;
	};
	var that = {
		load: function(src, callback, isOrder) {
			if (isOrder) {
				var item = { callback: callback, done: false, ready: false };
				queue[queue.length] = item;
			}
			var script = document.createElement('script');
			if (script.addEventListener) {
				if (isOrder) {
					script.addEventListener('load', function() {
						(function() {
							if (!using) {
								scanQueue(item);
							}
							else {
								item.timer=setTimeout(arguments.callee, 50);
							}
						})();
					});
				}
				else {
					script.addEventListener('load', callback);
				}
			}
			else if (script.attachEvent) { //for old IE
				if (!isOrder) {
					script.attachEvent('onreadystatechange', function() { forOldIE(callback); });
				}
				else {
					script.attachEvent('onreadystatechange', function() {
						var target = window.event.srcElement;
						if (target.readyState == 'complete' || target.readyState == 'loaded') {
							(function() {
								if (!using) {
									scanQueue(item, forOldIE);
								}
								else {
									item.timer=setTimeout(arguments.callee, 50);
								}
							})();
						}
					});
				}
			}
			else {
				if (isOrder) {
					script.onreadystatechange = function() {
						var target = window.event.srcElement;
						if (target.readyState == 'complete' || target.readyState == 'loaded') {
							(function() {
								if (!using) {
									scanQueue(item, forOldIE);
								}
								else {
									item.timer=setTimeout(arguments.callee, 50);
								}
							})();
						}
					};
				}
				else {
					script.onreadystatechange = function() {
						forOldIE(callback);
					};
				}
			}
			script.src = src;
			document.getElementsByTagName('head')[0].appendChild(script);
		}
	};
	return that;
};