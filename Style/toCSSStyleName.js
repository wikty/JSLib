//convert boxShadow to box-shadow
//prefix ms o webkit moz will be processed too,e.g msTransform be converted to -ms-transform
function toCSSStyleName(name){

	///////////////////////////////////depend part/////////////////////////////////////////////
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
	/////////////////////////////////////end of depend part//////////////////////////////////////

	if(typeof name =='string'){
		var prefix=['ms','o','webkit','moz'];
		var result=name.match(/[A-Z]/);
		var temp='';
		if(result){
			var prev=result.index;
			var header=name.slice(0,prev);
			var index=inArray(header,prefix);
			if(index==-1){
				temp=header;
			}
			else{
				temp='-'+header;
			}
			while(true){
				result=name.slice(prev+1).match(/[A-Z]/);
				if(result){
					temp+='-'+name.slice(prev,prev+1+result.index).toLowerCase();
					prev+=result.index+1;
				}
				else{
					temp+='-'+name.slice(prev).toLowerCase();
					return temp;
				}
			}
		}
		else{
			return name;
		}
	}
}