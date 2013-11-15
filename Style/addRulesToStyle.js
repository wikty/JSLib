//Notice:must browsers not support positions
//there are some restrict,arg:selectors,rules,positions must be all of string,or all of array(the same length)
function addRulesToStyle(style,selectors,rules,positions){

	function inner(st,sc,r,p){
		if(typeof p !='number'){
			st.appendChild(document.createTextNode(sc+'{'+r+"}\n"));
		}
		else if(st.insertRule){
			st.inertRule(sc+'{'+r+"{\n",p);
		}
		else if(st.addRule){
			st.addRule(sc,r,p);
		}
		else{
			throw new Error('Can not use method style.addRule and style.insertRule');
		}
	}

	var selectorsIsArray=(typeof selectors =='object' && selectors !==null && selectors.constructor == Array);
	var rulesIsArray=(typeof rules=='object' && rules!==null && rules.constructor ==Array);
	var positionsIsArray=(typeof positions=='object' && positions!==null && positions.constructor==Array);

	if(selectorsIsArray && rulesIsArray && positionsIsArray){
		if(!(selectors.length == rules.length && rules.length ==positions.length))
			throw new Error("addRulesToStyle arg:selectors,arg:rules,arg:positions must be same length");
		var len=selectors.length;
		for(var i=0;i<len;i++){
			inner(style,selectors[i],rules[i],positions[i]);
		}
	}
	else if(!selectorsIsArray && !rulesIsArray && !positionsIsArray){
		inner(style,selectors,rules,positions);
	}
	else{
		throw new Error('addRulesToStyle usage is undefined');
	}

	return style.id;
}