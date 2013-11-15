//depend on generateUniqueId and mergeObject
//link is a object like:{idPrefix:'addlink',ref:'stylesheet',href:'css/main.css'};
//the default link is {rel:'stylesheet',idPrefix:'addlink'};
//Notice:to use this you should have a global object to hold idMap
//return:the new link elem's id will be returned
function addLinkToHead(link,idMapObj,isPrepend) {
	/////////////////////////////////depend part////////////////////////////////////
	function mergeObject(first,second){
		/////////////////////depend part////////////////////////////////
		function cloneObject(obj,nodepth){
			var temp={};
			for(var name in obj){
				if(nodepth){
					temp[name]=obj[name];
				}
				else if(typeof obj[name] =='object'){
					temp[name]=cloneObject(obj[name]);
				}
				else{
					temp[name]=obj[name];
				}
			}
			return temp;
		}
		////////////////////end depent part////////////////////////////////
		if(typeof first !='object')throw new Error('mergeObject arg:first must be a object');
		var temp=cloneObject(first);
		var len=arguments.length;
		for(var i=1;i<len;i++){
			var item=arguments[i];
			for(var name in item){
				temp[name]=item[name];
			}
		}
		return temp;
	}
	function generateUniqueId(prefix,mapObj){
		if(typeof prefix !='string')throw new Error('generateUniqueId arg:prefix must be a string');
		if(typeof mapObj !='object')throw new Error('generateUniqueId arg:mapObj muse be a object');
		if(prefix in mapObj){
			mapObj[prefix]+=1;
		}
		else{
			mapObj[prefix]=0;
		}
		return prefix+mapObj[prefix];
	}
	//////////////////////////////end of depend part//////////////////////////////
	
	//merge link config items
	var defaultLink={rel:'stylesheet',idPrefix:'addlink'};
	var usingLink=mergeObject(defaultLink,link);

	var linkElem = document.createElement('link');
	linkElem.id = generateUniqueId(usingLink.idPrefix,idMapObj);//got unique id
	linkElem.href = usingLink.href;
	linkElem.rel = usingLink.rel;
	if (document.head) {
		if (isPrepend) {
			document.head.insertBefore(linkElem,document.head.firstChild);
		}
		else {
			document.head.appendChild(linkElem);
		}
	}
	else {
		if (isPrepend) {
			document.getElementsByTagName('head')[0].insertBefore(linkElem,document.getElementsByTagName('head')[0].firstChild);
		}
		else {
			document.getElementsByTagName('head')[0].appendChild(linkElem);
		}
	}
	return linkElem.id;
}