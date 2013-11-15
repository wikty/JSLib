//Notice: [something] meaning ,you should replace the [something] match with your context
//Usage:  if you want to add a invoke interface(this is like file onload callback) for outside script file
//				in your outside script tail you should add current file's code
//				also your should provide the <script data-Interface='[yourInterface]'
//				data-[scriptNameNoExtendName]='true'></script> in your reference file as a record
//				for invoke interface to outsiede
//Tips:     if you think this is too complex,there is a replacable way, you can force rule the interface
//				name, so when your reference you muse use the interface name
(function() {
	var existedScripts = document.getElementsByTagName('script');
	var len = existedScripts.length;
	for (var i = 0; i < len; i++) {
		var cur = existedScripts[i];
		if (cur.getAttribute('data-Animate')) {//data-[Animate]
			var func = cur.getAttribute('data-Interface');
		}
	}
	if (func) {
		eval(func + '()');
	}
})();