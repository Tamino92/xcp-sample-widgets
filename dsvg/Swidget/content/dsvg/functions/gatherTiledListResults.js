Ext.namespace ('dsvg.functions');


/*
 * Returns
 * 
 */
dsvg.functions.gatherTiledListResults = function (mainTitles) {
    console.log('call to gatherTiledListResults !!') ;
    var ret = '' ; 
    var tab = []
    for (var i=0;i<mainTitles.length;i++){  
        var result = {} ;
        result.mainTitle = mainTitles[i] ;
        tab.push(result) ;
    }
    ret = JSON.stringify(tab) ;
    console.log('ret before return : ') ;
    //console.log(ret) ;

    return ret ;
}
