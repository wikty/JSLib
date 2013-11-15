//if there is some radio with same name,
//this function will return the radio element which is checked
//even thourght the name is like this: name[](you should arg:name=name[])
function getCheckedRadioElem(name){
	if (typeof name == 'string') {
		var radios = document.getElementsByName(name);
		var len = radios.length;
		for (var i = 0; i < len; i++) {
			var item = radios[i];
			if (item.checked) {
				return item.value;
			}
		}
		return null;//no checked radio
	}
}