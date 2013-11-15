//js don't support original inheritance, but you can create inheritance also.
//using Prototype and New
//adventage:节省内存，属性和方法不管继承多少次只有一份内存拷贝
var Pet = function(name, legs) {
	this.name = name;
	this.legs = legs;
}
Pet.prototype.getDetails = function() {
	return this.name + ' has ' + this.legs + ' legs.';
}
var PetCat = function(name) {
	Pet.call(this, name, 4);
}
PetCat.prototype = new Pet();
PetCat.prototype.action = function() {
	return 'Catch A Bird';
}
/***test-explame
var myCat=new PetCat('HollKity');
myCat.action();
myCat.getDetails();
myCat.name='BlackCat';
myCat.legs=10;
myCat.getDetails();
*/

//no Prototype and no New, and private variable legs
//每次实例化对象都要创建一份属性和方法的内存拷贝
var PetExt = function(name, legs) {
	var that = {
		name: name,
		getDetails: function() {
			return this.name + ' has ' + legs + ' legs';
		}
	};
	return that;
}
var PetCatExt = function(name) {
	var that = new PetExt(name, 4);
	that.action = function() {
		return 'Catch A Bird';
	};
	return that;
}
/***test-explame
var myCat=new PetCatExt('HollKity');
myCat.action();
myCat.getDetails();
myCat.name='BlackCat';
myCat.legs=10;//can not execute this statement
myCat.getDetails();
*/