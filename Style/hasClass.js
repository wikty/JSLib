//depend on getElemClassesName and inArray
//arg:operation can be '|' or '&',default operation is |
//    if | 
//     elem=>array and cls=>array : at least one elem have all of cls return true
//     elem=>array and cls=>string : at least one elem have the cls
//     elem=>object and cls=>array : elem have at least one cls return true
//     elem=>object and cls=>string: the elem have the cls return true
//    if &
//     elem=>array and cls=>array : every elem have all of the cls return true
//     elem=>array and cls=>string: every elem have the cls return true
//     elem=>object and cls=>array: the elem have all of the cls return true
//     elem=>object and cls=>string: the elem have the cls return true
//arg:elem can be a object array or a object,
//arg:cls can be a string or a string array
function hasClass(elem,cls,operation){
	///////////////////////////////////////depend part////////////////////////////////////
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
	///////////////////////////////////end of depend part///////////////////////////////////////
	function inner(e,c){
		if(inArray(c,getElemClassesName(e))!=-1)
			return true;
		else
			return false;
	}
	var elemIsArray=(typeof elem =='object' && elem !==null & elem.constructor ==Array);
	var clsIsArray=(typeof cls =='object' && cls !==null & cls.constructor ==Array);
	if(!(operation=='|' || operation=='&'))operation='|';
	
	//elem not array, cls not array
	if(!elemIsArray && !clsIsArray){//if the elem not array and cls not array,no matter what is operation
		return inner(elem,cls);
	}
	//elem is array,cls is array too
	if(elemIsArray && clsIsArray){
		var m=elem.length;
		var n=cls.length;
		if(operation=='&'){
			for(var i=0;i<m;i++){
				for(var j=0;j<n;j++){
					if(!inner(elem[i],cls[j]))return false;
				}
			}
			return true;
		}
		else{
			var flag=true;
			for(var i=0;i<m;i++){
				flag=true;
				for(var j=0;j<n;j++){
					if(!inner(elem[i],cls[j]))flag=false;
				}
				if(flag)return true;
			}
			return false;
		}
	}
	//elem is array, cls is not array
	if(elemIsArray && !clsIsArray){
		var len=elem.length;
		if(operation=='&'){
			for(var i=0;i<len;i++){
				if(!inner(elem[i],cls))return false;
			}
			return true;
		}
		else{
			for(var i=0;i<len;i++){
				if(inner(elem[i],cls))return true;
			}
			return false;
		}
	}
	//elem is not array, cls is array
	if(!elemIsArray && clsIsArray){
		var len=cls.length;
		if(operation=='&'){
			for(var i=0;i<len;i++){
				if(!inner(elem,cls[i]))return false;
			}
			return true;
		}
		else{
			for(var i=0;i<len;i++){
				if(inner(elem,cls[i]))return true;
			}
			return false;
		}
	}

}