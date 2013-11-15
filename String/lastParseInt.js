//flex is using for the case which dfkdad90.34
//default 34 will be return
//maybe you want to gets is 90
//so, if you want that please flex=true
function lastParseInt(str,flex) {
	if(typeof str == 'number'){
		str=str+'';//number convert to string
	}
	if (typeof str == 'string') {
		var pattern=/[+|-]?[0-9]+$/;
		if(flex){
			pattern=/[+|-]?[0-9]*\.?[0-9]+$/;
		}
		var rtn = str.match(pattern);
		if (rtn) {
			return {
				index: rtn.index,
				input: rtn.input,
				valueOf: function() {
					return parseInt(rtn[0]*1);//parseInt can parse '.9' to 0,so use some hack
				},
				toString: function() {
					return parseInt(rtn[0]*1);
				}
			}
		}
	}
	return NaN;
};