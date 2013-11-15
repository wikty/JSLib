//you can add only one listener for only one elem
//or,only one listener for some elem
//or,some listener fot some elem but one to one corresponding
function addListener(elem,type, callback) {
	function inner(el,ty,cb){
		if (el.addEventListener) {
			el.addEventListener(ty, cb, false);
		}
		else if (el.attachEvent) {
			el.attachEvent("on" + ty, cb);
		}
		else {
			el['on' + ty] = cb;
		}
	}
	if(typeof type =='object' && type.constructor ==Array && elem.constructor ==Array){
		if(type.length != elem.length){
			throw new Error('addListener when arg:elem and arg:type are all array,their item number must be equal');
		}
		var len=type.length;
		for(var i=0;i<len;i++){
			inner(elem[i],type[i],callback);
		}
	}
	else if(typeof type =='string' && elem.constructor ==Array){
		var len=elem.length;
		for(var i=0;i<len;i++){
			inner(elem[i],type,callback);
		}
	}
	else if(typeof type =='string' && elem.constructor !=Array){
		inner(elem,type,callback);
	}
	else{
		throw new Error('addListener undefined invoke way');
	}
}