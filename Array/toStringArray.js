//Notice:no matter yourArray item's type is boolean, number, function, object(NaN,Infinity is too)
//       all of items will be converted to string,except for null and undefined,they will be converted ''
// arg:clearUndefined will clear items that are undeined
function toStringArray(yourArray, clearUndefined) {
	var temp = yourArray.join('~!~');//use some special chars to defend yourArray has them
	//the join method will convert all of items to string
	temp = temp.split('~!~');
	if (clearUndefined) {
		var len = temp.length;
		var rtn = [];
		for (var i = 0; i < len; i++) {
			if (temp[i] !== '') {
				rtn.push(temp[i]);
			}
		}
		return rtn;
	}
	return temp;
}