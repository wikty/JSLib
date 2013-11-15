//if arg:mark is undefined, if not find mark,the chars will not be appended
//arg:maxLen is to ensure return string's length is less than maxLen,if maxLen is  undefined or maxLen=-1 or some value is not number
//           will no limit
function appendStrByMark(str,chars,mark,maxLen){
	if(typeof str!='string')throw new Error('insertStrByMark arg:str must be a string');
	if(typeof chars !='string')throw new Error('insertStrByMark arg:chars must be a string');
	if(typeof mark !='string'){
		if(mark.toString)mark=mark.toString();
		else throw new Error('appendStrByMark arg:mark must be a string');
	}
	var pos=str.indexOf(mark);
	if(pos==-1)return str;
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