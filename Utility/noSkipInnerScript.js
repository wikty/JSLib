//NOTICE:[something] is meaning should be replaced to match with your context
//DESC: if you want execute the inner code in which the script(reference outside script), this is useful for you
//Usage:include follow code into your outside script
(function() {
	var existedScripts = document.getElementsByTagName('script');
	var len = existedScripts.length;
	for (var i = 0; i < len; i++) {
		var cur = existedScripts[i];
		if (cur.getAttribute('src') == 'Animate.js') {//[Animate.js] is outside file name
		//may be your need function getBaseName()
			eval(cur.innerHTML); //if your innerHTML include code than process dom
			//you should add defer attribute for the reference script label
		}
	}
})();