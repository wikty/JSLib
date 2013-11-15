//arg:interval default is 100(ms),this value meaning elem display after 2s,slow is 3s,normal is 2s,fast is 1s
function fadeOut(elem, interval,callback) {
	var opacity = 1;
	if(typeof interval =='string'){
		if(interval=='slow')interval=150;
		else if(interval=='normal')interval=100;
		else if(interval=='fast')interval=50;
	}
	//notice NaN can not use ==,should isNaN
	interval = (isNaN(parseInt(interval, 10))) ? 100 : parseInt(interval, 10);
	var htime = setInterval(function() {
		if (opacity >= 0) {
			opacity -= 0.05;
			if (typeof elem.style.opacity == 'string') {//no if(elem.style.opacity)because opacity can be 0
				elem.style.opacity = opacity;
			}
			else {
				elem.style.filter = 'alpha(opacity=' + opacity * 100 + ')';
			}
		}
		else {
			clearInterval(htime);
			elem.style.display = 'none';
			if(callback)callback();
		}
	}, interval);
}