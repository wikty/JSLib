//version:0.0,this version can not support IE9
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
			document.write('<script type="text/javascript" src="' + who + '"><\/script>');//NOtice:<\/script>(if no \) will be interrupt the <script>
			//use method .write is neccessary,because when the tag script .write wil write depend script after using script
			//as you konw,after current script meaning, in current script can not use depend script's code
			//to use depend script code,ther has 2 ways:
			//1,you should invoke depend script's code in the arg:callback funtion,the callback will be executed when all of depend scripts is loaded
			//2,move you invode depend script's code into window.onload,this a bad way
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
		document.write('<script type="text/javascript">('+callback+')();<\/script>');//bad news IE9 not support
		//because when callback is called the depend scipts is not loaded, wirte script is no order
		//solution:delay execute callback
		//so please use loadDependScript-0.1.js
	}
}