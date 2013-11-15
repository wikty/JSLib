//depend on getElemClassesName and inArray
function toggleClass(elem,cls){
	///////////////////////////depend part////////////////////////////////////
	function getElemClassesName(elem){
		var result=[];
		if(elem.className){
			var temp=(elem.className).split(/\s+/);
			var len=temp.length;
			for(var i=0;i<len;i++){
				var item=temp[i].replace(/^\s+/,'').replace(/\s+$/,'');
				if(item)result.push(item);
			}
		}
		return result;
	}
	function inArray(item,yourArray,equalCmpFunc){
		if(typeof equalCmpFunc !='function'){
			equalCmpFunc=function(a,b){
				if(a==b)return true;
			}
		}
		if(typeof yourArray =='object' && yourArray !==null && yourArray.constructor ==Array){
			var len=yourArray.length;
			for(var i=0;i<len;i++){
				if(equalCmpFunc(item,yourArray[i])){
					return i;
				}
			}
			return -1;
		}
	}
	//////////////////////////end of depend part////////////////////////////////
	function inner(e,c){
		var classes=getElemClassesName(e);
		var index=inArray(c,classes);
		if(index!=-1){
			classes.splice(index,1);
			e.className=classes.join(' ');
		}
		else{
			e.className+=' '+c;
		}
	}
	var elemIsArray=(typeof elem =='object' && elem !==null & elem.constructor ==Array);
	var clsIsArray=(typeof cls =='object' && cls !==null & cls.constructor ==Array);
	
	//elem not array, cls not array
	if(!elemIsArray && !clsIsArray){
		inner(elem,cls);
	}
	//elem is array,cls is array too
	if(elemIsArray && clsIsArray){
		var m=elem.length;
		var n=cls.length;
		for(var i=0;i<m;i++){
			for(var j=0;j<n;j++){
				inner(elem[i],cls[j]);
			}
		}
	}
	//elem is array, cls is not array
	if(elemIsArray && !clsIsArray){
		var len=elem.length;
		for(var i=0;i<len;i++){
			inner(elem[i],cls);
		}
	}
	//elem is not array, cls is array
	if(!elemIsArray && clsIsArray){
		var len=cls.length;
		for(var i=0;i<len;i++){
			inner(elem,cls[i]);
		}
	}
}