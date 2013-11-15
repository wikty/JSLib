//version:0.2,this version can run on every browser
//this function a use to load depend script auto for you using script
//so in your using script file head you should invoke this function:loadDependScript(whos), and you should <script src='loadDependScript.js'>in your html file
//arg: whos should be a string or a array,which should a file path(relative .html path) about the load script
//arg: callback is a unname function in which you invoke depend scirpt's code, if you don't want do this you will have some trouble
//     you cannot invoke depend script's code,and you should move invoke part into window.onload
function loadDependScript(whos,callback) {
	// function getBaseName(path) {
	// 	path = path || '';
	// 	var pos = path.lastIndexOf('/');
	// 	//if there is no /,so pos is -1, return path.substr(pos+1) is appropriate
	// 	if (pos == path.length - 1) {
	// 		return '';
	// 	}
	// 	else {
	// 		return path.substr(pos + 1);
	// 	}
	// };
	function forOldIE() {
		var target = window.event.srcElement;
		if (target.readyState == 'complete' || target.readyState == 'loaded') {
			callback.call(target,window.event);
		}
	}
	var lastLoadScript=null;
	var headElem=document.getElementsByTagName('head')[0];
	function addScript(who) {
		var existedScripts = document.getElementsByTagName('script');
		var len = existedScripts.length;
		var names = [];
		for (var i = 0; i < len; i++) {
			//names.push(getBaseName(existedScripts[i].getAttribute('src')));
			names.push(existedScripts[i].getAttribute('src'));
		}
		var canAdd=true;
		for (var i = 0; i < len; i++) {
			if (names[i] == who) {
				canAdd = false;
				break;
			}
		}
		if (canAdd) {
			//document.write('<script type="text/javascript" src="' + who + '"><\/script>');//NOtice:<\/script>(if no \) will be interrupt the <script>
			//use method .write is neccessary,because when the tag script .write wil write depend script after using script
			//as you konw,after current script meaning, in current script can not use depend script's code
			//to use depend script code,ther has 2 ways:
			//1,you should invoke depend script's code in the arg:callback funtion,the callback will be executed when all of depend scripts is loaded
			//2,move you invode depend script's code into window.onload,this a bad way
			var script=document.createElement('script');
			script.src=who;
			headElem.appendChild(script);
			lastLoadScript=script;
		}
	};
	//work part
	if (whos.constructor == Array) {
		var l = whos.lenght;
		var results = [];
		for (var i = 0; i < l; i++) {
			addScript(whos[i].replace(/^\s+/,'').replace(/\s+$/,''));
		}
	}
	else {
		addScript(whos.replace(/^\s+/, '').replace(/\s+$/, ''));
	}

	if(callback && callback.constructor==Function){
		//IE cannot
			//ie not support,because ie execute write inner script no order with 
			//write outer script
		//document.write('<script type="text/javascript">('+callback+')();<\/script>');


		//Opear cannot sometime
			//because opear think write outer script and appendChild(script) is async loaded
			//so sometime when loadDependScript-0.1.js is loaded later,it work
		// function forOldIE() {
		// 	var target = window.event.srcElement;
		// 	if (target.readyState == 'complete' || target.readyState == 'loaded') {
		// 		callback.call(target,window.event);
		// 	}
		// }
		// var script = document.createElement('script');
		// if (script.addEventListener) {
		// 	script.addEventListener('load', function(){
		// 		document.getElementsByTagName('head')[0].removeChild(script);
		// 		callback();
		// 	});
		// }
		// else if (script.attachEvent) { //for old IE
		// 	script.attachEvent('onreadystatechange', function(){
		// 		document.getElementsByTagName('head')[0].removeChild(script);
		// 		forOldIE();
		// 	});
		// }
		// else {
		// 	script.onreadystatechange = function() {
		// 		document.getElementsByTagName('head')[0].removeChild(script);
		// 		forOldIE();
		// 	};
		// }
		// script.src = 'loadDependScript-0.1.js';//this is no meaning just want to use onload event
		// document.getElementsByTagName('head')[0].appendChild(script);

		//run good
		if (lastLoadScript.addEventListener) {
			lastLoadScript.addEventListener('load', function(){
				//document.getElementsByTagName('head')[0].removeChild(script);
				callback();
			});
		}
		else if (lastLoadScript.attachEvent) { //for old IE
			lastLoadScript.attachEvent('onreadystatechange', function(){
				//document.getElementsByTagName('head')[0].removeChild(script);
				forOldIE(callback);
			});
		}
		else {
			lastLoadScript.onreadystatechange = function() {
				//document.getElementsByTagName('head')[0].removeChild(script);
				forOldIE(callback);
			};
		}
	}
}