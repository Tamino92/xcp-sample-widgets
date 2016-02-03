/**
 * 
 */
Ext.define("dsvg.widgets.RadialProgress", {
    extend : "Ext.container.Container",
    alias: "widget.radial_progress",


    config: {
        debug : false,
        width: 100,
        height: 100
    },  



    xcpeventconfig : [            
        'hide',
        'show',
        'focus'
    ],


    listeners: {
        afterrender: function() {
            this.updatePanel();
        }

    },

    constructor: function(config) {
        this.log('constructor RadialProgress called');
        dsvg.widgets.RadialProgress.superclass.constructor.apply(this, [config]);

    },

    initComponent : function() {
        this.log('initComponent RadialProgress called');  
        this.callParent(arguments);

        this.update('<div id="r-pie-'+this.getId()+'" class="pie-wrapper progress-30">'+
                    '<span id="r-pie-'+this.getId()+'-l"class="label">30<span class="smaller">%</span></span>'+
                    '<div class="pie">'+
                    '<div class="left-side half-circle"></div>'+
                    '<div class="right-side half-circle"></div>'+
                    '</div>'+
                    '</div>') ;
    },


    updatePanel : function(){
        this.doLayout() ;
    },

    setValue : function(val){
        this.log('Call setValue :  '+val) ;
        var val = JSON.parse(val) ;

        var floatValue = parseFloat(val)*100 ;
        document.getElementById("r-pie-"+this.getId()+"-l").innerHTML=floatValue+'<span class="smaller">%</span>' ;
        var progress_val = Math.ceil(floatValue/5)*5;

        if (progress_val > 100 ){
            document.getElementById("r-pie-"+this.getId()).setAttribute("class","pie-wrapper progress-100") ;
        }
        else {
            document.getElementById("r-pie-"+this.getId()).setAttribute("class","pie-wrapper progress-"+progress_val) ; 
        }   
    },

    log: function(arg) {
        if (this.getDebug() === true) {
            var id;
            if (this.id){
                id = this.id;
            }
            else {
                id = this.alias[0];
            }
            console.log(id + ' : '+arg);
        }
    }

});
