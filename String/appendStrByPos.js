//if arg:pos is undefined,the chars will be appended to str(str+chars),pos can not be a navigetive
//arg:maxLen is to ensure return string's length is less than maxLen,if maxLen is  undefined or maxLen=-1 or some value is not number
//           will no limit
function appendStrByPos(str,chars,pos,maxLen){
	if(typeof str !='string' || typeof chars !='string')
		throw new Error('appendStrByPos arg:str and arg:chars must be a string');
	if(typeof pos !='number' || str.length-1 <= Math.abs(parseInt(pos))){
		return str+chars;
	}
	var head=str.slice(0,pos+1);
	var tail=str.slice(pos+1);
	var newStr=head+chars+tail;
	if(typeof maxLen !='number' || maxLen<0 ){//if maxLen is lt 0,will return total string
		return newStr;
	}
	else{
		return newStr.slice(0,Math.abs(parseInt(maxLen)));
	}
}