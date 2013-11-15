//remove the tooltip element
//arg:elemId is the element using tooltip
//return the tooltip's id
function removeTooltip(elemId){
	var elem=document.getElementById(elemId);
	if(typeof elem !='object')throw new Error('removeTooltip arg:elemId is a novalid element Id');
	var parentElem=elem.parentNode;
	parentElem.removeChild(document.getElementById(elemId+'-tooltip'));
	return elemId+'-tooltip';
}