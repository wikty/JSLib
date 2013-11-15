//only support oridinary float format,e.g 23.34, can not parse scientific format
//flex is using for that case:dfasd.90
//default will return .90
//if you don't want that happend, for example:
//the last char=>. maybe a sentence end mark not a decimal point
//so if you want's is 90,you should flex=true
function lastParseFloat(str,flex) {
	if(typeof str=='number'){
		str=str+'';//number convert to string
	}
	if (typeof str == 'string') {
		var pattern=/[+|-]?[0-9]*\.?[0-9]+$/;
		if(flex){
			pattern=/[+|-]?[0-9]+\.?[0-9]+$/;
		}
		var rtn = str.match(pattern);
		if (rtn) {
			return {
				index: rtn.index,
				input: rtn.input,
				valueOf: function() {
					return rtn[0];
				},
				toString: function() {
					return rtn[0];
				}
			};
		}
		else if(flex){
			rtn=str.match(/[0-9]+$/);
			if (rtn) {
				return {
					index: rtn.index,
					input: rtn.input,
					valueOf: function() {
						return rtn[0];
					},
					toString: function() {
						return rtn[0];
					}
				};
			}

		}
	}
	return NaN;
};