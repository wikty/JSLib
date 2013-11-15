//depend on addTooltip,removeTooltip,addListener,removeListener
//
//arg:elemId is the element that using tooltip
//arg:content is the tooltip's content
//arg:showEvent default is focus
//arg:hideEvent default is blur
//
//Notice:
// arg:showEvent and arg:hideEvent must be like this:focus not onfocus
// if you want the tooltip just show once,you can make a little modify 
//
//Usage example:
//	tooltip('name','请填写姓名');
//	tooltip('password','请填写密码');

function tooltip(elemId,content,showEvent,hideEvent){
	/////////////////////////////////depend part//////////////////////////////////////////
	function addTooltip(elemId,content){
		var elem=document.getElementById(elemId);
		if(typeof elem !='object')throw new Error('addTooltip arg:elemId must be a valid element Id');

		//the styel about tooltip
		var tooltipStyle="color: #ffffff;font-size:17px;border: 2px solid #00ff00;background-color: #000000;-moz-border-radius: 0.5em;-webkit-border-radius: 0.5em;-ms-border-radius: 0.5em;border-radius: 0.5em;opacity: 0.8;filter: alpha(opacity=80);-moz-box-shadow: 2px 2px 2px #314844;-webkit-box-shadow: 2px 2px 2px #314844;-ms-box-shadow: 2px 2px 2px #314844;box-shadow: 2px 2px 2px #314844;";
		var positionStyle='padding:0.5em; width:10em; max-width:10em; position:absolute; right:-11.5em;top:20%;';

		var parentElem=elem.parentNode;
		var position='';
		if(parentElem.currentStyle){
			position=parentElem.currentStyle['position'];
		}
		else{
			position=window.getComputedStyle(parentElem)['position'];
		}
		if(position!='relative')throw new Error("addTooltip arg:elem's parent element must be a relative position element ");
		
		var span=document.createElement('span');
		span.setAttribute('style',tooltipStyle+positionStyle);
		span.setAttribute('id',elemId+'-tooltip');

		if(span.innerText){
			span.innerText=content;
		}
		else if(span.textContent){
			span.textContent=content;
		}
		else{
			span.innerHTML=content;
		}

		parentElem.appendChild(span);
		return span.getAttribute('id');
	}
	function removeTooltip(elemId){
		var elem=document.getElementById(elemId);
		if(typeof elem !='object')throw new Error('removeTooltip arg:elemId is a novalid element Id');
		var parentElem=elem.parentNode;
		parentElem.removeChild(document.getElementById(elemId+'-tooltip'));
		return elemId+'-tooltip';
	}
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
	function removeListener(elem,type, theCallback) {
		function inner(el,ty,cb){
			if (el.removeEventListener) {
				el.removeEventListener(ty, cb, false);
			}
			else if (el.detachEvent) {
				el.detachEvent("on" + ty, cb);
			}
			else {
				el['on' + ty] = null;
			}
		}
		if(typeof type =='object' && type.constructor ==Array && elem.constructor ==Array){
			if(type.length != elem.length){
				throw new Error('addListener when arg:elem and arg:type are all array,their item number must be equal');
			}
			var len=type.length;
			for(var i=0;i<len;i++){
				inner(elem[i],type[i],theCallback);
			}
		}
		else if(typeof type =='string' && elem.constructor ==Array){
			var len=elem.length;
			for(var i=0;i<len;i++){
				inner(elem[i],type,theCallback);
			}
		}
		else if(typeof type =='string' && elem.constructor !=Array){
			inner(elem,type,theCallback);
		}
		else{
			throw new Error('addListener undefined invoke way');
		}
	}
	/////////////////////////////end of depend part///////////////////////////////////////
	showEvent=showEvent||'focus';
	hideEvent=hideEvent||'blur';
	content=content||'please fill me';
	var elem=document.getElementById(elemId);
	function hideTooltip(){//hide tooltip and do some clear working
		removeTooltip(elemId);
		removeListener(elem,hideEvent,hideTooltip);
		addListener(elem,showEvent,showTooltip);//if you want once tooltip remove this line
	}
	function showTooltip(){//show tooltipt

		addTooltip(elemId,content);
		removeListener(elem,showEvent,showTooltip);
		addListener(elem,hideEvent,hideTooltip);
	}
	addListener(elem,showEvent,showTooltip);
}