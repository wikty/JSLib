//Notice:
//		your object.valueOf() will be the key,and your object holding in the set
//		the object.valueOf() is unique
//Method:
//		isExisted(obj):if obj in the set will return true or return false
//		add(obj): add object,if obj existed this function will do nothing and return fasle
//		update(obj):update the object,if existed and update return true,or return false
//		remove(obj): remove object,no matter whether object existed,return undefined
//		howMany():return the count objects in the set
//		get(k):the arg:k is object.valueOf(),if existed return the obj,or return undefined
//		headMode():switch to head mode(insert into set head)
//		tailMode():switch to tail mode(insert into set tail)
//Addition:
//		when you set is too big,you should to optimize it
//		invoke update(obj),get(k) will trigger optimize
//      that will invoke the inner function optimize to
//		frequency used object,may be you want ot modify the optimize function
var Set = function(mode) {
	//mode: 0 indicate insert to tail(not be used immediately), is default
	//		1 indicate insert to head(if the insert object will be used later)
	//		just for improve performance,norelated to functionally
	mode = (mode !== 1) ? 0 : 1;
	var objs = [];
	var keys = [];
	var counter = []; //for optimized
	function optimize(index) {
		if (index > 100 || (index <= 100 && counter[index] > 10)) {
			//if index gt 100 or lt 100 but request counter is more than 10,use optimized
			var tempO = objs[index];
			var tempK = keys[index];
			objs[index] = objs[0];
			keys[index] = keys[0];
			objs[0] = tempO;
			keys[0] = tempK;
			counter[index] = 0;
		}
	}
	var that = {
		isExisted: function(obj) {
			var len = keys.length;
			var k = obj.valueOf();
			for (var i = 0; i < len; i++) {
				if (keys[i] === k) {
					return i;
				}
			}
			return undefined;
		},
		add: function(obj) {//if existed,add fail(return false)
			var index = this.isExisted(obj);
			if (index === undefined) {
				switch (mode) {
					case 1:
						objs.unshift(obj);
						keys.unshift(obj.valueOf());
						break;
					case 0:
					default:
						objs.push(obj);
						keys.push(obj.valueOf());
						break;
				}
				return true;
			}
			return false;
		},
		update:function(obj){
			var k=obj.valueOf();
			var len = objs.length;
			for (var i = 0; i < len; i++) {
				if (keys[i] === k) {
					counter[i] = (counter[i] === undefined) ? 0 : counter[i]++;
					optimize(i);
					objs[i]=obj;
					return true;
				}
			}
			return false;
		},
		remove: function(obj) {
			var index = this.isExisted(obj);
			if (index !== undefined) {
				objs.splice(index, 1);
				keys.splice(index, 1);
			}
		},
		get: function(k) {
			var len = objs.length;
			for (var i = 0; i < len; i++) {
				if (keys[i] === k) {//record reference counter,for optimize
					counter[i] = (counter[i] === undefined) ? 0 : counter[i]++;
					optimize(i);
					return objs[i];
				}
			}
			return undefined;
		},
		clear: function() {
			objs = [];
			keys = [];
			counter = [];
		},
		howMany: function() {
			return objs.length;
		},
		headMode: function() {
			mode = 1;
		},
		tailMode: function() {
			mode = 0;
		}
	};
	return that;
};