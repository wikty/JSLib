function debugConsole(it){
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
	var constructor='';
	if (typeof it == 'object') {
		var i = 1;
		for (var name in it) {
			console.log(toFixedString((i++),3,'0',true) + '. ' + toFixedString('Type: ' + typeof it[name],20,' ') + toFixedString('Name: ' + name+',',30,' ')
			  + toFixedString(' Value: ' + it[name]+',',30,' ') + toFixedString('Constructor: ' + (it[name].constructor || ''),30,' '));
		}
	}
	else {
		console.log(toFixedString('Type: ' + typeof it+',',20,' ') + toFixedString('Value: ' + it +',',30,' '));
	}
}