function convertToArray(it){
	var temp=[];
	if(typeof it =='object'){
		if(it===null){
			temp.push(null);
		}
		else if(it.constructor == Array){
			temp=it;
		}
		else{
			for(var name in it){
				temp.push(it[name]);
			}
		}
	}
	else{
		temp.push(it);
	}
	return temp;
}