Ext.namespace ('dsvg.functions');


/*
 * Removes leading and/or trailing whitespace from a string
 * 
 *  format an object  obj : {
*                           actionType : 'svg_select'
 *                          selector : should be id name or type
 *                          value : value to match
 *                          }
 */
dsvg.functions.selectSVGObjects = function (selector,value) {
	return JSON.stringify({
        actionType : 'svg_select',
        selector : selector,
        value : value
    }) ;
}
