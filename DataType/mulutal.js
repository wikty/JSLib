var Mulutal = function() {
	var init = false;
	var stack = [];
	var rs = null;
	var Item = function(func, param, callback) {
		this.func = func;
		this.param = param;
		this.callback = callback;
	};
	var that = {
		create: function(resource) {
			if (!init) {
				rs = resource;
				init = true;
			}
		},
		changeRs: function(resource) {
			if (init) {
				rs = resource;
			}
		},
		access: function(func, param) {
			if (init) {
				if (stack.length == 0) {
					param = param || {};
					param.resource = rs;
					func(param);
				}
				else {
					stack[stack.length - 1].callback = func;
					stack.push(new Item(func, param, null));
				}
			}

		},
		quit: function() {
			if (init) {
				if (stack.length != 0) {
					var invoke = stack.shift();
					var param = stack[0].param;
					param = param || {};
					param.resource = rs;
					invoke.callback(param);
				}
			}
		}
	};
	return that;
};