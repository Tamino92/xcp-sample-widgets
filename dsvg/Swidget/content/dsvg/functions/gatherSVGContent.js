Ext.namespace ('dsvg.functions');


/*
 * Removes leading and/or trailing whitespace from a string
 * 
 *  format an object  obj : {
 *                          actionType : 'svg_content'
 *                          svg : <svg_content>
 *                          }
 */
dsvg.functions.gatherSVGContent = function (svgString) {
	return JSON.stringify({
        actionType : 'svg_content',
        svg : svgString
    }) ;
}
