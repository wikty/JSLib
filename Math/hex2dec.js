function hex2dec(hexStr){
	var prefix=hexStr.slice(0,2);
	if(prefix=='0x' || prefix=='0X'){
		hexStr=hexStr.slice(2);
	}
	var charsMap={'0':0, '1':1, '2':2, '3':3, '4':4, '5':5, '6':6, '7':7, '8':8, '9':9, 'a':10, 'b':11, 'c':12, 'd':13, 'e':14, 'f':15 };
	var len=hexStr.length;
	var result=0;
	for(var i=0;i<len;i++){
		var temp=charsMap[hexStr[i]];
		for(var j=0;j<len-i-1;j++){
			temp*=16;
		}
		result+=temp;
	}
	return result;
}