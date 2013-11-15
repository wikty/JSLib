//arg:interval default is 100(ms),this value meaning elem display after 2s,slow is 3s,normal is 2s,fast is 1s
function fadeIn(elem, interval,callback) {
	var opacity = 0;
	//notice NaN can not use ==,should isNaN
	if(typeof interval =='string'){
		if(interval=='slow')interval=150;
		else if(interval=='normal')interval=100;
		else if(interval=='fast')interval=50;
	}
	interval = (isNaN(parseInt(interval, 10))) ? 100 : parseInt(interval, 10);
	if (typeof elem.style.opacity == 'string') {
		elem.style.opacity = 0;
	}
	else {
		elem.style.filter = 'alpha(opacity=0)';
	}
	elem.style.display = 'block';
	elem.style.visibility = 'visible';
	var htime = setInterval(function() {
		if (opacity <= 1) {
			opacity += 0.05;
			if (typeof elem.style.opacity == 'string') {
				elem.style.opacity = opacity;
			}
			else {
				elem.style.filters = 'alpha(opacity=' + opacity * 100 + ')';
			}
		}
		else {
			clearInterval(htime);
			if(callback)callback();
		}
	}, interval);
}