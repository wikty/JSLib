var classGenerateFactory=function(parentClass){
	///class framework
	var klass=function(){
		//when object is be constructed,invoke object's init function
		//Notice: apply transfer the arguments to init after split arguments,
		//		  in the other words,init be gived arg as same with contstructor
		
		this.parentInit.apply(this,arguments);//init parent prototype
		this.init.apply(this,arguments);
	}

	//prototype inheritance from parent class's prototype
	if(parentClass){
		var subClass=function(){};
		subClass.prototype=parentClass.prototype;
		klass.prototype=new subClass();
		//only inheritance praentClass prototype's attributes
		//,except for class's attributes and object's attributes
	}

	///parent prototype init function,when constructing auto invoke it before invoke klass.prototype.init
	klass.prototype.parentInit=function(){
		if(parentClass.prototype.init){
			parentClass.prototype.init.apply(this,arguments);
		}
	}

	///prototype's init function
	klass.prototype.init=function(){
		//default object's init function is empty
	}

	///proxy,make current object as this for func
	klass.proxy=function(func){
		var self=this;//this using generate a close package
		return (function(){//even through,uname function's this is changed
			func.apply(self,arguments);
		});
	}

	///add attribute and method to class
	klass.extend=function(obj){
		//the obj.extended is a callback function,
		//invoked after klass.extend executed
		var extended=obj.extended;
		for(var name in obj){
			klass[name]=obj[name];
		}
		klass.extended=undefined;//except for extended function
		if(extended)extended(klass);
	}

	///add attribute and method to prototype
	klass.include=function(obj){
		//the obj.included is a callback function,
		//invoked after klass.include executed
		var included=obj.included;
		for(var name in obj){
			klass.fn[name]=obj[name];
		}
		klass.included=undefined;//except for includec function
		if(included)included(klass);
	}

	///alias for prototype
	klass.fn=klass.prototype;

	///alias for class
	klass.fn.parent=klass;

	///i don't know what is this
	klass._super=klass.__proto__;

	///proxy
	klass.fn.proxy=klass.proxy;

	return klass;
}

// var Person=new classGenerateFactory();
// Person.prototype.init=function(name,age){
// 	this.name=name;
// 	this.age=age;
// }
// Person.include({
// 	getName:function(){return this.name;},
// 	getAge:function(){return this.age;}
// });
// Person.extend({
// 	getNameAge:function(){alert('unknow name or age !');}
// });

// var Worker=new classGenerateFactory(Person);

// Worker.prototype.init=function(name,age){
// 	//auto invoke Person.prototype.init
// 	this.hour=23;
// }

// Worker.include({
// 	working:function(){
// 		alert(this.name+" is working! on keeping "+this.hour+' hours');
// 	}
// });

// var worker=new Worker('wikty',24);
// worker.working();