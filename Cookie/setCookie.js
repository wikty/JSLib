function setCookie(name, value, expires, dir, domainname, secure) {
	if(typeof name != 'string'){
		throw new Error('cookie name should be a string.');
	}
	
	if(typeof value != 'string'){
		if(value.toString){
			value=value.toString();
		}
		else{
			value='';
		}
	}

	if(typeof expires =='undefined'){
		expires='';
	}
	else if(!isNaN(parseInt(expires))){
		var mydate=new Date();
		mydate.setDate(mydate.getDate()+parseInt(expires));
		expires=';expires='+mydate.toUTCString();
	}
	else if(typeof expires =='object' && expires.constructor == Date){
		expires=';expires='+expires.toUTCString();
	}
	else{
		throw new Error('cookie expires should be a number(days) or Date object.');
	}

	dir=(typeof dir == 'undefined')?'':';path='+encodeURIComponent(dir);
	domainname=(typeof domainname=='undefined')?'':';domain='+encodeURIComponent(domainname);
	secure=(typeof secure == 'undefined')?'':';secure=true';
	
	document.cookie=encodeURIComponent(name)+'='+encodeURIComponent(value)+expires+dir+domainname+secure;
}