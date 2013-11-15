function dec2hex(v){
	var charsMap='0123456789abcdef';
	var str='';
	while(1){
		var temp=v%16;
		str=charsMap[temp]+str;
		v=(v/16)>>0;
		if(!v)break;
	}
	return str;
}