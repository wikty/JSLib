//browser do not prevent selected multi checkbox with the same name
//so this function will return all of checked checkbox element as a array
//even throught arg:name like this: name[](just affect server can accpect multi checkbox values)
function getCheckedCheckbox(name) {
	if (typeof name == 'string') {
		var checkboxes=document.getElementsByName(name);
		var len=checkboxes.length;
		var temp=[];
		for(var i=0;i<len;i++)	{
			if(checkboxes[i].checked){
				temp.push(checkboxes[i].value);
			}
		}
		return temp;
	}
}