//if nodepth is true,will not clone subobject
//default clone subobject
function cloneObject(obj,nodepth){
	var temp={};
	for(var name in obj){
		if(nodepth){
			temp[name]=obj[name];
		}
		else if(typeof obj[name] =='object'){
			temp[name]=cloneObject(obj[name]);
		}
		else{
			temp[name]=obj[name];
		}
	}
	return temp;
}