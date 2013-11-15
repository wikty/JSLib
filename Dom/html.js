function html(elem,html,stripscript){
	if(typeof elem !='object')return;
	if(!html){
		if(stripscript)return (elem.innerHTML).replace(/<script[^>]*>.*<\/script>/g,'');
		else return elem.innerHTML;
	}
	else{
		if(stripscript)html=html.replace(/<script[^>]*>.*<\/script>/g,'');
		return elem.innerHTML=html;
	}
}