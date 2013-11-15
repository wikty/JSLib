//arg:equalCmpFunc using to compare item with array's item,if equal should return true
//     default is ==
//return: if item is not in array return -1,or return item index
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