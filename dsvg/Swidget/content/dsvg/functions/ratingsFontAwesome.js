Ext.namespace ('dsvg.functions');
/*
 * 
 * 
 */
dsvg.functions.ratingsFA = function (max,value,color) {
    
    if (parseInt(max) > 0) {
        var avg = parseInt(value)/parseInt(max) ;
        if (avg > .9) return '<span class="ratings"'+( color ?  'style="color:'+color+';"' : "" )+'></span>' ;
        if (avg > .8) return '<span class="ratings fourhalf"'+( color ?  'style="color:'+color+';"' : "" )+'></span>' ;
        if (avg > .7) return '<span class="ratings four"'+( color ?  'style="color:'+color+';"' : "" )+'></span>' ;
        if (avg > .6) return '<span class="ratings threehalf"'+( color ?  'style="color:'+color+';"' : "" )+'></span>' ;
        if (avg > .5) return '<span class="ratings three"'+( color ?  'style="color:'+color+';"' : "" )+'></span>' ;
        if (avg > .4) return '<span class="ratings twohalf"'+( color ?  'style="color:'+color+';"' : "" )+'></span>' ;
        if (avg > .3) return '<span class="ratings two"'+( color ?  'style="color:'+color+';"' : "" )+'></span>' ;
        if (avg > .2) return '<span class="ratings onehalf"'+( color ?  'style="color:'+color+';"' : "" )+'></span>' ;
        if (avg > .1) return '<span class="ratings one"'+( color ?  'style="color:'+color+';"' : "" )+'></span>' ;
        else return '<span class="ratings half"'+( color ?  'style="color:'+color+';"' : "" )+'></span>' ;
    }
    return '<span class="ratings none"'+( color ?  'style="color:'+color+';"' : "" )+'></span>' ;

}



