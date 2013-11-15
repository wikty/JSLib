//callback for complete to do something
function sort(array, callback) {
	var pos = 0;
	function() {
		var temp;
		for (var i = array.length-1; i > pos; i--) {//this sort is bubble method,it is low effective
			if (array[i] < array[i - 1]) {
				temp = array[i];
				array[i] = array[i - 1];
				array[i - 1] = temp;
			}
		}
		pos++;
		if (pos == array.length) {
			callback();
		}
		else {
			setTimeout(arguments.callee, 100);
		}
	};
}