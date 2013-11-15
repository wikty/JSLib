//this function will *recursive* clear undefined items in the yourArray
//arg:clearNULL,if you want to clear null,pleast clearNULL=true
function clearUndefined(yourArray,clearNULL){
	if(yourArray.constructor != Array)throw new Error('clearUndefined arg:yourArray must be a array object');
	var len=yourArray.length;
	var temp=[];
	for(var i=0;i<len;i++){
		var item=yourArray[i];
		if(typeof item =='object' && item !==null && item.constructor ==Array){
			temp.push(clearUndefined(item,clearNULL));
		}
		else{
			if(item !==undefined){
				if(clearNULL){
					if(item !==null){
						temp.push(item);
					}
				}
				else{
					temp.push(item);
				}

			}
		}
	}
	return temp;
}