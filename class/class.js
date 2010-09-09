// 
//  class.js
//  goddy
//  
//  Created by goddy zhao on 2010-08-22.
//  Copyright 2010 goddy. All rights reserved.
// 

goddy.provide("goddy.class");




/**
 * Declare a class
 * 
 * @param {string} classname: The name of class
 * @param {function} superclass: The super class
 * @param {object} props: Properties of the class
 * 
 * @return {function} : The class
 */

/*
	TODO error handler
*/
goddy.class.declare = function(classname, superclass, props){ 
	if(!goddy.is_string(classname)){
		/*
			TODO: apply function to non-string classname
		*/
	}
	superclass = superclass || Object;
	
	var new_class = function(){
		this.Class = classname; 
		this.constructor = arguments.callee; //maintain the prototype chain
		this.init && this.init.apply(this,arguments); //trigger the init function
	};
	
	/*
		TODO : superclass maybe other types
	*/
	if(typeof superclass === "function"){
		new_class.prototype = new superclass(); //will destroy the constructor attribute
		new_class.prototype.super_class = superclass;
	}	
	
	for(var name in props){
		new_class.prototype[name] = goddy.to_string(props[name]) === "[object Function]" && 
		   							goddy.to_string(superclass.prototype[name]) === "[object Function]" ?
									(function(name,fn){
										return function(){
											var temp = this._super;
											this._super = superclass.prototype[name];
											var ret = fn.apply(this, arguments);
											this._super = temp;
											return ret;
										}
									})(name,props[name]) : props[name];
	}
	
	
	return goddy.set_object(classname, new_class);
}

$gc = goddy.class;

