/**
 * 
 */
Ext.define("dsvg.widgets.LiquidFillGauge", {
    extend : "Ext.container.Container",
    alias: "widget.liquid_fill_gauge",


    config: {
        debug : false
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
        dsvg.widgets.SimpleTimeLine.superclass.constructor.apply(this, [config]);

    },

    initComponent : function() {
        this.log('initComponent SimpleTimeLine called');  
        this.callParent(arguments);        
    },


    updatePanel : function(){

        if (!this.svg){
            this.log('init this.svg') ;
            var svg = d3.select('#'+this.getId()+'-innerCt').append("svg")
            .attr('id',"lfg-"+this.getId())
            .attr('width','100%')
            .attr('height','150') ;


            var config1 = liquidFillGaugeDefaultSettings();
            config1.circleColor = "#FF7777";
            config1.textColor = "#FF4444";
            config1.waveTextColor = "#FFAAAA";
            config1.waveColor = "#FFDDDD";
            config1.circleThickness = 0.2;
            config1.textVertPosition = 0.2;
            config1.waveAnimateTime = 1000;
            this.gauge = loadLiquidFillGauge("lfg-"+this.getId(), 55);
        }


        this.doLayout() ;
    },

    setValue : function(val){
        //this.log('Call setValue :  '+val) ;
        var value = parseFloat(val) ;

        if (this.gauge && value<=100.){
            this.gauge.update(value) ;
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
