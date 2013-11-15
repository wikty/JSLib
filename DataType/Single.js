var Single = function() {
	var obj;
	var init = false;
	var referenceCount = 0;
	var that = {
		getSingle: function(yourConstructor) {
			if (!init) {
				init = true;
				referenceCount++;
				obj = new yourConstructor();
				return obj;
			}
			else {
				referenceCount++;
				return obj;
			}
		},
		howMany: function() {
			return referenceCount;
		}
	};
	return that;
};