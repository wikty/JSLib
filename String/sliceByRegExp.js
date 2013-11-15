//return first appear substr between headReg and tailReg(not include headReg,tailReg),
//and you should make sure headReg before tailReg,
//and you regexp can't be golbal
//if the start is onvalid,will be ignored
function sliceByRegExp(str,headReg,tailReg,start){
	str+='';//convert str to string
	start=parseInt(start);
	if(!isNaN(start) && start<str.length){
		str=str.slice(start);
	}
	var headPos=str.match(headReg);
	if(!headPos){//no match headReg
		headPos={index:-1};
	}
	else{
		headPos={
			index:headPos.index+headPos[0].length
		};
	}
	var tailStart=(headPos.index==-1)?0:headPos.index;
	var tailPos=str.slice(tailStart).match(tailReg);
	if(!tailPos){
		tailPos={index:-1};
	}
	else{
		tailPos={
			index:tailPos.index+tailStart
		}
	}
	
	if(headPos.index <0 && tailPos.index<0){
		return '';
	}
	else if(headPos.index<0 && tailPos.index>=0){
		return str.slice(0,tailPos.index);
	}
	else if(headPos.index>=0 && tailPos.index<0){
		return str.slice(headPos.index);
	}
	else{//if heasPos.index>tailPos.index,the slice will process good
		return str.slice(headPos.index,tailPos.index);
	}
}
