//depend on cloneObject
function mergeObject(first,second){
	/////////////////////depend part////////////////////////////////
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
	////////////////////end depent part////////////////////////////////
	if(typeof first !='object')throw new Error('mergeObject arg:first must be a object');
	var temp=cloneObject(first);
	var len=arguments.length;
	for(var i=1;i<len;i++){
		var item=arguments[i];
		for(var name in item){
			temp[name]=item[name];
		}
	}
	return temp;
}