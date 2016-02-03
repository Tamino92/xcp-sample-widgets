Ext.namespace ('dsvg.functions');


/*
 * Add Font-Awesome icon
 * 
 */
dsvg.functions.addFA = function (faClasses,color) {
    if (color) return '<i class="'+faClasses+'" style="color:'+color+';"></i>'
	else return '<i class="'+faClasses+'"></i>' ;	
}