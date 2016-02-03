Ext.define("dsvg.grid.widgets.xgrid", {
    extend: 'Ext.panel.Panel',
    alias: 'widget.xgrid',


    config: {
        debug : false,
        autoScroll : true,
        height: 300,

        layout: {
            type: 'vbox',       // Arrange child items vertically
            align: 'stretch',    // Each takes up full width
            padding: 5
        },

        dockedItems: [{
            xtype: 'toolbar',
            dock: 'bottom',
            items: [
                { xtype: 'button', 
                 text: 'Prev',
                 handler : function(btn){
                     var grid = btn.up("[xtype='xgrid']") ;
                     grid.getNextPage() ;
                 }
                },
                { xtype: 'button', text: 'Next' }
            ]
        }]
    },

    xcpeventconfig: [
        'itemclick',
        'hide',
        'show'
    ],
    
    
    statics: {

        getLastClickedItemId: function (context, compId) {
            console.log("getLastClickedItemId called");
            var comp = context.getComponent(compId);
            var value = '';
            if (!comp) {
                console.warn("Could not find widget with id : " + compId);
            } else {
                value = comp.lastClickedItemId;
                console.log("Value is -- " + value);
            }
            return value;
        }
    },
    
    lastClickedItemId: null,

    
    getNextPage : function(){
        console.log('ask for next page !!') ;
    },

    constructor: function (config) {
        console.log(' Constructor called  - xgrid');

        config = config || {};
        this.runtime = Ext.isDefined(xcp.navigationManager);

        if (!this.runtime) {
            this.callParent(arguments);
            return;
        }

        var configuredStore = config.store;
        if (configuredStore) {
            var storeWkf = Ext.data.StoreManager.lookup(configuredStore);
            if (storeWkf) {
                this.storeTemp = storeWkf
                storeWkf.on("load", this.onLoad, this)
            }
        }
        this.callParent([config]);
        me = this;
    },
    
    initComponent: function () {
        console.log('initComponent called  - xGrid');
        this.update('<div class="container example-01"><ul id="xgrid-'+this.getId()+'" class="block-list"></ul></div>') ;


        this.callParent(arguments);
    },



    onLoad: function (storeObj, records, successful, eOpts) {
        console.log('onLoad - called ');
        console.log('storeObj : ') ;
        console.log(storeObj) ;
        console.log('records') ;
        console.log(records) ;

        var dataArray = records.map(function(d){
            return d.data ;
        });

        console.log(dataArray) ;
        if (!this.rootUL){this.rootUL = d3.select('#xgrid-'+this.getId()) ;}

        generateCardList(this,this.rootUL,dataArray,storeObj.storeId) ;

        this.doLayout() ;
    },

    onRender: function (ct, position) {
        //console.log('3) onRender called ');
        this.callParent(arguments);
    },


    setValue: function (value) {
        console.log('Set Value called');
        this.callParent(arguments)
    },

    getValue: function () {
        console.log('Get Value called');
        return '';
    },


    /** (required)
         * Returns the {@link Ext.form.field.Field#name name} attribute of the field. This is used as the parameter name
         * when including the field value in a {@link Ext.form.Basic#submit form submit()}.
         * @return {String} name The field {@link Ext.form.field.Field#name name}
         */
    getName: function () {
        var name = this.name;
        if (Ext.isEmpty(name)) {
            name = this.getInputId();
            if (Ext.isEmpty(name)) {
                name = this.id + "-inputEl";
            }
        }
        return name;
    }

});
