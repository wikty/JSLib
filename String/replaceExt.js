//Notice: regs must be a regexp object or a regexp object array, the '/\s+/' is error
//the case 1: regs is array, and reps is array too,they length should be same(or throw expection),every regs[i] be replaced by every reps[i]
//the case 2: regs is array ,and reps is string, every regs[i] will be replace by the reps
//the case 3: regs is singel regexp object, and reps is array,every match will be replaced using reps array loop
//  notice:in case 3,if you regexp is global,the replace action is like str.replace(regs,reps[reps.length-1]);
//  so ordinary you should not use global mark regexp,in the case 3
//the case 4:regs and reps is all string,the simplest case,regs will be replaced be reps
//Warning: there is a big thing you should notice
//			if you want to replace ht=>html,html=>htmlx
//			if the order you defined is html,ht,will be ok
//			but if you order is ht,html,you will in a hole
function replaceExt(str,regs,reps){
	if(typeof str !='string'){
		if(str.toString)str=str.toString();
		else throw new Error('replaceExt first arg must be a string');
	}
	var regsIsArray=false;
	var regsLen=null;
	var repsIsArray=false;
	var repsLen=null;
	var i=null;
	if(regs.constructor == Array){
		regsLen=regs.length;
		for(i=0;i<regsl;i++){
			if(regs[i].constructor != RegExp){
				throw new Error('replaceExt second arg must be a regexp or a regexp array');
			}
		}
		regsIsArray=true;
	}
	if(reps.constructor == Array){
		repsLen=reps.length;
		for(i=0;i<repsLen;i++){
			if(typeof reps[i] !='string'){
				throw new Error('replaceExt threed arg must be a string or a string array');
			}
		}
		repsIsArray=true;
	}

	if(!regsIsArray && !repsIsArray){
		return str.replace(regs,reps);
	}
	else if(regsIsArray && !repsIsArray){
		if(typeof reps !='string'){
			if(reps.toString)reps.toString();
			else throw new Error('replaceExt threed arg must be a string');
		}
		for(i=0;i<regsLen;i++){
			str=str.replace(regs[i],reps);
		}
		return str;
	}
	else if(!regsIsArray && repsIsArray){
		if(regs.constructor != RegExp)throw new Error('replaceExt second arg must be a regexp object');
		i=0;
		while(true){
			str=str.replace(regs,reps[i]);
			i++;
			if(i==repsLen)i=0;
			if(!regs.test(str))break;
		}
		return str;
	}
	else{
		if(regsLen != repsLen)throw new Error('replaceExt second(array) and threed(array) arg must same length');
		for(i=0;i<regsLen;i++){
			str=str.replace(regs[i],reps[i]);
		}
		return str;
	}
}