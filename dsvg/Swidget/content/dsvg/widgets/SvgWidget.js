/**
 * 
 */
Ext.define("dsvg.widgets.SvgWidget", {
    extend : "Ext.container.Container",
    alias: "widget.svg_widget",

    config: {
        debug : false,
        actionButtonId : ''
    },  

    xcpSvgIdClicked: null,
    xcpSvgNameClicked: null,
    xcpSvgTypeClicked: null,

    xcpeventconfig : [
        {
            event : "svgclick",
            data : function() {
                return  "svgclick-ok" ;
            }
        },
        'hide',
        'show',
        'focus'
    ],

    statics: {    
        getLastClickedXcpID : function(context, compId) {
            console.log("getLastClickedXcpID called with id : " + compId);
            var comp = context.getComponent(compId);
            var value = '';
            if (!comp) {
                console.warn("Comp ID not found : " + compId);
            } else {
                value =  comp.xcpSvgIdClicked;
            }
            return value;
        },
        getLastClickedXcpName : function(context, compId) {
            console.log("getLastClickedXcpName called with id : " + compId);
            var comp = context.getComponent(compId);
            var value = '';
            if (!comp) {
                console.warn("Comp ID not found : " + compId);
            } else {
                value =  comp.xcpSvgNameClicked;
            }
            return value;
        },
        getLastClickedXcpType : function(context, compId) {
            console.log("getLastClickedXcpType called with id : " + compId);
            var comp = context.getComponent(compId);
            var value = '';
            if (!comp) {
                console.warn("Comp ID not found : " + compId);
            } else {
                value =  comp.xcpSvgTypeClicked;
            }
            return value;
        }
    },

    listeners: {
        afterrender: function() {
            this.updatePanel();
        },

        svgdblclick : function(){
            console.log('svgdblclick event recieved by svg widget') ;
            this.launchActionOnLinkedButton() ;
        }
    },

    constructor: function(config) {
        this.log('constructor SvgWidget called');
        dsvg.widgets.SvgWidget.superclass.constructor.apply(this, [config]);

    },

    initComponent : function() {
        this.log('initComponent SvgWidget called'); 
        this.callParent(arguments);
    },


    updatePanel : function(){
    },

    setValue : function(val){
        //this.log('Call setValue :  '+val) ;
        this.log('Call setValue') ;
        var obj = JSON.parse(val);

        if (obj.actionType === 'svg_content') {
            if (this.svg){
                // remove existing all svg content
                this.svg = d3.select('#'+this.getId()+'-innerCt').select('svg').remove() ;
            }
            this.log('init this.svg') ;
            this.svg = d3.select('#'+this.getId()+'-innerCt').html(obj.svg) ;
            this.addXcpObjectsListeners() ;
            this.doLayout() ;
        }
        else if (obj.actionType === 'svg_select'){
            this.log('svg_select') ;
            // first deselect all artifacts
            d3.selectAll('.xcpselectable').classed("xcpselected", false);
            if (obj.selector === 'id') d3.selectAll('[xcpobjectid='+obj.value+']').classed("xcpselected", true);
            else if (obj.selector === 'name') d3.selectAll('[xcpobjectname='+obj.value+']').classed("xcpselected", true);
            else if (obj.selector === 'type') d3.selectAll('[xcpobjecttype='+obj.value+']').classed("xcpselected", true);
        }
    },

    launchActionOnLinkedButton : function(){
        var btn = Ext.ComponentQuery.query('xcp_button[xcpId="'+this.actionButtonId+'"]');
        if (btn){
            console.log('button : '+btn.length);
            console.log(btn[0]) ;
            btn[0].handler() ;
        }
        else {
            console.warn('button not found : '+bntId) ;
        }
    },

    addXcpObjectsListeners : function(){
        /*
       *  SVG file should contain the following attribut for each xcp object related artifact :
                xcpobjectid
	           xcpobjectname
	           xcpobjecttype

               SVG artifact who are selectable shoud have the xcpselectable class
       *
       */

        var me = this ;
        d3.selectAll(".xcpselectable").on("click", function() {
            d3.event.preventDefault();
            d3.selectAll('.xcpselectable').classed("xcpselected", false);
            me.xcpSvgIdClicked = d3.select(this).attr('xcpobjectid') ;
            me.xcpSvgNameClicked = d3.select(this).attr('xcpobjectname') ;
            me.xcpSvgTypeClicked = d3.select(this).attr('xcpobjecttype') ;
            console.log('svgclicked ') ;
            me.fireEvent('svgclick');
        });
        d3.selectAll(".xcpselectable").on("dblclick", function() {
            d3.event.preventDefault();
            d3.selectAll('.xcpselectable').classed("xcpselected", false);
            console.log('svg double click') ;
            me.fireEvent('svgdblclick');
        });


        // fetch the svg
        var rootSvg = d3.select('#'+this.getId()+'-innerCt').select('svg') ;
        console.log('rootsvg before zoom listener : ') ;
        console.log(rootSvg) ;
        rootSvg.call(d3.behavior.zoom()
                     .scaleExtent([0.1, 10])
                     .on("zoom", function () {
            d3.select('svg').select('g').attr("transform", "translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")");
        }));
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
