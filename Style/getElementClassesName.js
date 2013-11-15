function getElementClassesName(elem){
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