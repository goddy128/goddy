/**
 * Base namespace for goddy library.
 */
var goddy = goddy || {};

/**
 * Reference to global context.
 */
goddy.global = this;

/**
 * Return an object based on the name.
 * 
 * @param {string} name: The fully qulified name.
 * @param [object] base_object: The base object to look in.
 * 
 * @return {object} The object or null if not found.
 */
goddy.to_object = function(name,base_object){
	var parts = name.split(".");
	var cur_obj = base_object || goddy.global;
	for(var part; parts.length && (part = parts.shift()); ){
		if(!cur_obj[part]){
			return null;
		}
		cur_obj = cur_obj[part];
	}
	return cur_obj;
};


goddy.set_object = function(/*string*/name, /*object*/value){
	var parts = name.split("."), 
	last_part = parts.pop(),
	obj = goddy.export_by_arr(parts);
	return obj && last_part ? obj[last_part] = value : undefined;
};



/*
	TODO merge the properties from source to target
*/
goddy.merge = function(/*object*/target,/*object*/source){
	for(var prop in source){
		target[prop] = source[prop];
	}
};

//Todo: documentation
goddy.provide = function(name){
	if(goddy.to_object(name)){
		alert("sorry the object has existed!");
	}
	goddy.export_path(name);
};


//Todo: documentation
goddy.require = function(){
	
};


//Todo: documentation
goddy.export_path = function(name){
	if(!name){ return; }
	goddy.export_by_arr(name.split("."));
	
};



goddy.export_by_arr = function(/*array*/parts){
	var cur = goddy.global;
	for(var part; parts.length && (part = parts.shift());){
		if(cur[part]){
			cur = cur[part];
		}else{
			cur = cur[part] = {};
		}
	}
	return cur;
};


goddy.topics = {};//Store all the event topics

goddy._listener = {
	get_dispatcher: function() {
		return function(){
			/*
				TODO : extendable
			*/
		};
	},
	
	add: function(/*object*/source, /*topic*/topic,  /*function*/listener){
		var t = source && source[topic];
		if(!t || !t._listeners){
			var d  = goddy._listener.get_dispatcher();
			d._listeners = [];
			t = source[topic] = d;
		}
		t._listeners.push(listener);
		return this;
	}
};

goddy.attach = function(/*object*/context, /*function*/fn){
	if(!context || !fn){
		return;
	}
	
	return function(){ fn.call(context,arguments[0]); }
};

goddy.subscribe = function(/*string*/topic, /*object*/context, /*function*/fn){
	if (!topic) {
		return;
	};
	
	goddy._listener.add(goddy.topics, topic, goddy.attach(context,fn));
	
	return this;
};

goddy.publish = function(/*string*/topic, /*array*/args){
	var t = goddy.topics[topic];
	var listeners = t && t._listeners;
	for (var i=0, len=listeners.length; i < len; i++) {
		listeners[i] && (listeners[i].apply(this, args || []));
	};
	return this;
};



//todo: document
goddy.is_string = function(val){
	return typeof val === "string";
};


goddy.to_string = function(obj){
	return Object.prototype.toString.call(obj);
};

//alias of goddy
var $g = goddy;

