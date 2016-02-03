Ext.define('dsvg.widgetx.xButton', {
    extend: 'xcp.widget.button.Button',
    alias: "widget.x_button",


    constructor: function(config) {
        console.log('constructor xButton called');
        dsvg.widgets.xButton.superclass.constructor.apply(this, [config]);

        console.log('config : ') ;
        console.log(this.config) ;
    },


    initComponent : function() {
        console.log('initComponent xButton called');  
        this.callParent(arguments);
        
        console.log('config : ') ;
        console.log(this.config) ;
    }
});
