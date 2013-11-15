//depene on generateUniqueId
//Notice:you should have a global object to hold id
//arg:selectors may be a string ,like this: '#myform input[type=sumbit]',or a array hold those strings
//arg:rules may be a string,like this: 'border:1px solid #000;background-color:red;',or a array hold those strings
//if arg:selectors and arg:rules is all array,selectors.length must be equal to rules.length
function addStyleToHead(selectors,rules,idMapObj,isPrepend){
	////////////////////////////////depene part//////////////////////////////////////////////////////////
	function generateUniqueId(prefix,mapObj){
		if(typeof prefix !='string')throw new Error('generateUniqueId arg:prefix must be a string');
		if(typeof mapObj !='object')throw new Error('generateUniqueId arg:mapObj muse be a object');
		if(prefix in mapObj){
			mapObj[prefix]+=1;
		}
		else{
			mapObj[prefix]=0;
		}
		return prefix+mapObj[prefix];
	}
	///////////////////////////////end of depend part///////////////////////////////////////////////////////
	
	var style=document.createElement('style');
	style.type='text/css';
	style.id=generateUniqueId('addStyle',idMapObj);
	
	var selectorsIsArray=(typeof selectors =='object' && selectors !==null && selectors.constructor == Array);
	var rulesIsArray=(typeof rules=='object' && rules!==null && rules.constructor ==Array);

	if(selectorsIsArray && rulesIsArray){
		if(selectors.length != rules.length)
			throw new Error("addStyleToHead arg:selectors's length must be equal with arg:rules's length");
		var len=selectors.length;
		for(var i=0;i<len;i++){
			style.appendChild(document.createTextNode(selectors[i]+'{'+rules[i]+"}\n"));
		}
	}
	else if(!selectorsIsArray && rulesIsArray){
		var len=rules.length;
		var str='';
		for(var i=0;i<len;i++){
			str+=rules[i]+"\n";
		}
		style.appendChild(document.createTextNode(selectors+'{'+str+"}\n"));
	}
	else if(selectorsIsArray && !rulesIsArray){
		var len=selectors.length;
		for(var i=0;i<len;i++){
			style.appendChild(document.createTextNode(selectors[i]+'{'+rules+"}\n"));
		}
	}
	else{
		style.appendChild(document.createTextNode(selectors+'{'+rules+"}\n"));
	}
	
	var headElem=document.getElementsByTagName('head')[0];
	if(isPrepend){
		headElem.insertBefore(style,headElem.firstChild);
	}
	else{
		headElem.appendChild(style);
	}
	return style.id;
}