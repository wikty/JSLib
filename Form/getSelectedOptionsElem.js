//arg:selectElem must be a <select> element
//if selectElem have attribute muliple will return a array which hold selected options
function getSelectedOptionsElem(selectElem){
	if(selectElem.nodeName.toUpperCase() !='SELECT'){
		throw new Error('getSelectedOptionsElem arg:selectElem must be a select element');
	}
	else{
		if(selectElem.multiple){
			var options=selectElem.options;
			var len=options.length;
			var temp=[];
			for(var i=0;i<len;i++){
				if(options[i].selected){
					temp.push(options[i]);
				}
			}
			return temp;
		}
		else{
			return selectElem.options[selectElem.selectedIndex];
		}
	}
}