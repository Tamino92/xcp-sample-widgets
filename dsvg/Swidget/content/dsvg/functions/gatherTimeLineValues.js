Ext.namespace ('dsvg.functions');


/*
 * Return an array of events with the following format
 * 
 *  format an object  obj : [{
 *                          name : 
 *                          date : 
 *                          }]
 */
dsvg.functions.gatherTimeLineValues = function (evtNames,evtDates) {
	var ret = '' ; 
    var tab = []
    for (var i=0;i<evtNames.length;i++){  
        var evt = {} ;
        evt.name = evtNames[i] ;
        evt.date = evtDates[i] ;
        tab.push(evt) ;
    }
    ret = JSON.stringify(tab) ;
    //console.log('ret before return : ') ;
    //console.log(ret) ;

    return ret ;
}
