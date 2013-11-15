var linkList = function() {
	var Node = function(value, f) {
		this.value = value;
		this.next = {};
		this.flag = !!f; //by flag, you can divide list into two(if not boolean will more parts) logical part
	};
	var root = new Node(Infinity); //assgin for root node a special value
	var tail = {
		perv: null,
		next: null
		//,value: Infinity
	};
	root.next = tail;
	var size = 0; //record link list's lenght

	var that = {
		DEBUG: function() {
			var work = root.next;
			var str = '';
			var temp = [];
			var item = '';
			var i = 0;
			while (work.next !== null) {
				i++;
				item += '{\n';
				item += work.value + '    ';
				item += work.flag;
				item += '\n}';
				temp.push(item);
				work = work.next;
			}
			return str = temp.join('\n')+i;
		},
		addNode: function(value, f) {
			if (size == 0) {
				root.next = new Node(value, f);
				root.next.next = tail;
				tail.perv = root.next;
			}
			else {
				tail.perv.next = new Node(value, f);
				tail.perv = tail.perv.next;
				tail.perv.next.next = tail;
			}
			size++;
		},
		removeNode: function(value) {
			var work = null;
			var perv = null;
			work = root.next;
			perv = root;
			while (work.next !== null && work.value !== value) {
				perv = work;
				work = work.next;
			}
			if (work.next !== null) {
				perv.next = work.next;
				if (work.next.next === null) {
					work.next.perv = perv;
				}
				var temp = null;
				temp = work;
				delete work;
				size--;
				return temp.value;
			}
			return false;
		},
		walker: function(func) {
			var work = null;
			work = root.next;
			while (work.next !== null) {
				func(work.value);
				work = work.next;
			}
		},
		serialize: function() {
			var temp = [];
			this.walker(function(data) {
				temp.push(data.toString());
			});
			return temp.join(',');
		},
		howMany: function() {
			return size;
		},
		findMin: function(funComp, rFlag, wFlag) {
			//rFlag when find min skip the node with node.flag==true
			//wFlag when find the min ,the min node be mark node.flag=true
			function defaultFunc(s1, s2) {
				if (s1 < s2) {
					return -1;
				}
				else if (s1 > s2) {
					return 1;
				}
				else {
					return 0;
				}
			};
			funComp = funComp || defaultFunc;
			var work = null;
			var temp = null;
			work = root.next;
			temp = work;
			if (work.next === null) return null;
			var min = work.value;
			wFlag = !!wFlag;
			rFlag = !!rFlag;
			switch (rFlag) {
				case true:
					while (work.next !== null) {
						if (work.flag == true) {
							work = work.next;
							continue;
						}
						if (funComp(work.value, min) < 0) {
							min = work.value;
							temp = work;
						}
						work = work.next;
					}
					break;
				case false:
					while (work.next !== null) {
						if (funComp(work.value, min) < 0) {
							min = work.value;
							temp = work;
						}
						work = work.next;
					}
					break;
				//just for extend in the furtrue                       
			}
			if (wFlag) {
				temp.flag = true;
			}
			return min;
		},
		sort: function(funComp) {
			function defaultFunc(s1, s2) {
				if (s1 < s2) {
					return -1;
				}
				else if (s1 > s2) {
					return 1;
				}
				else {
					return 0;
				}
			};
			funComp = funComp || defaultFunc;
			var cloneRoot = new Node(Infinity, null);
			var work = cloneRoot.next;
			var temp = null;
			var minNode = that.findMin(funComp, true);
			while (minNode) {
				minNode.flag = true;
				temp = new Node(minNode.value);
				work = temp;
				work = temp.next;
				minNode = that.findMin(funComp, true);
			}
		},
		clearFlag: function() {
			var work = null;
			work = root.next;
			while (work.next !== null) {
				work.flag = false;
				work = work.next;
			}
		}
	};
	return that;
};