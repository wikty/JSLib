function text(elem,text,showTag){
	if(typeof elem !='object')return undefined;
	if(!text){
		text=elem.innerText || elem.textContent || elem.innerHTML;
		if(showTag)return text;
		else return text.replace(/<[^>]*>/g,'').replace(/<\/[^>]*>/g,'');
	}
	else{
		if(!showTag){
			text=text.replace(/<[^>]*>/g,'').replace(/<\/[^>]*>/g,'');
		}
		if(elem.innerText){
			return elem.innerText=text;
		}
		else if(elem.textContent){
			return elem.textContent=text;
		}
		else{
			return elem.innerHTML=text;
		}
	}
}