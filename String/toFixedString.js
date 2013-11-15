//if str.length <len will be paded using arg:padding
//if onHead is true,padding will be before str,default paddings is after str
function toFixedString(str,len,padding,onHead){
	str+='';
	padding+='';
	var lenPadding=padding.length;
	len=Math.abs(parseInt(len));
	if(isNaN(len))throw new Error('toFixedString arg:len must be a positive interage');
	var n=len-str.length;
	if(n<=0)return str.slice(0,len);
	n=Math.ceil(n/lenPadding);
	while(n--){
		if(onHead){
			str=padding+str;
		}
		else{
			str+=padding;
		}
	}
	return str.slice(0,len);
}