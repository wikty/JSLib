//arg:mapObj(existed id collection object) is like this:
//	{
//		'submit':4,//this 4 is meaning,current submit prefix id is to submit4
//		'animate':2
//	}
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