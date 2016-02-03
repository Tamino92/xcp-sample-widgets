Ext.namespace ('dsvg.functions');


/*
 * Retruns an array image description
 * 
 */
dsvg.functions.gatherXGalleryValues = function (imgUrls,thumUrls,imgTitles,imgCaptions) {

    //console.log('call to gatherXGalleryValues !!') ;
    var ret = '' ; 
    var tab = []
    for (var i=0;i<imgUrls.length;i++){  
        var img = {} ;
        img.src = imgUrls[i] ;
        img.w =  900;
        img.h = 700 ;
        img.thum = thumUrls[i] ;
        tab.push(img) ;
    }
    ret = JSON.stringify(tab) ;
    //console.log('ret before return : ') ;
    //console.log(ret) ;

    return ret ;
}
