//if you frequency use sin e.g functions you can create a lookup a table for them
//Usage: if you steps is 360 or 360*n ,you will more convenient.(larger and precisioner)
//there is not precision for data,because you may not use all data,so this leave for you do it.
function tableForFunc(steps, which) {
	var accept = ['sin', 'cos', 'tan'];
	var allow = false;
	which += '';
	for (var name in accept) {
		if (which.toLowerCase() == accept[name]) {
			allow = true;
		}
	}
	if (allow == false) return false;
	var table = [];
	var angStep = (Math.PI * 2) / steps;
	var ang = 0;
	switch (which) {
		case 'sin':
			while (ang < (Math.PI * 2)) {
				ang += angStep;
				table.push(Math.sin(ang));
			}
			break;
		case 'cos':
			while (ang < (Math.PI * 2)) {
				ang += angStep;
				table.push(Math.cos(ang));
			}
			break;
		case 'tan':
			while (ang < (Math.PI * 2)) {
				ang += angStep;
				table.push(Math.tan(ang));
			}
			break;
		default:
			alert('undefine method for tableForFunc');
			break;
	}

	return table;
}