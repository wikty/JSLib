//Notice:make sure the arg:elem is wrapped by a element(position:relative)
//  the added tooltip is a span with id=elemId+'-tooltip'(addTooltip will return this id).
// 
//arg:elemId is tooltip target element's id
//arg:content is tooltip content
//
//Usage:
//the elemId must be wrapped by a parent element(width position:relative;)

function addTooltip(elemId,content){
	var elem=document.getElementById(elemId);
	if(typeof elem !='object')throw new Error('addTooltip arg:elemId must be a valid element Id');

	var tooltipStyle="color: #ffffff;font-size:17px;border: 2px solid #00ff00;background-color: #000000;-moz-border-radius: 0.5em;-webkit-border-radius: 0.5em;-ms-border-radius: 0.5em;border-radius: 0.5em;opacity: 0.8;filter: alpha(opacity=80);-moz-box-shadow: 2px 2px 2px #314844;-webkit-box-shadow: 2px 2px 2px #314844;-ms-box-shadow: 2px 2px 2px #314844;box-shadow: 2px 2px 2px #314844;";
	var positionStyle='padding:0.5em; width:10em; max-width:10em; position:absolute; right:-11.5em;top:20%;';

	var parentElem=elem.parentNode;
	var position='';
	if(parentElem.currentStyle){
		position=parentElem.currentStyle['position'];
	}
	else{
		position=window.getComputedStyle(parentElem)['position'];
	}
	if(position!='relative')throw new Error("addTooltip arg:elem's parent element must be a relative position element ");
	
	var span=document.createElement('span');
	span.setAttribute('style',tooltipStyle+positionStyle);
	span.setAttribute('id',elemId+'-tooltip');

	if(span.innerText){
		span.innerText=content;
	}
	else if(span.textContent){
		span.textContent=content;
	}
	else{
		span.innerHTML=content;
	}

	parentElem.appendChild(span);
	return span.getAttribute('id');
}