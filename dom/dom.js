goddy.provide("goddy.dom");

goddy.dom.get = function(element){
	return goddy.is_string(element) ? document.getElementById(element) : element; 
}

goddy.dom.getElementsByClassName = function(element,opt_element){
	
}
