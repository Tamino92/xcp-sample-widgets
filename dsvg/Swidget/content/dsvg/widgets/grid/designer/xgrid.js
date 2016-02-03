// Gooey Menu desing time
dsvg.widgets.grid.xgrid.override({

    initComponent : function() {
        this.log('initComponent overrided xgrid called');  
        this.callParent(arguments);
        this.update('<h1>xGrid</h1>');


    },

    updatePanel : function(){

        this.log('updatePanel overrided xgrid called');  
        this.doLayout() ;
    }
});

Ext.define('dsvg.widgets.grid.designer.xgrid', {
	extend: 'xcp.designer.Component',
	constructor: function(cmp){	
		this.callParent(arguments);
	},
	
	updateComponent: function(propertiesJSONObject) {
		if(propertiesJSONObject.name === 'fieldLabel') {
            this.cmp.setFieldLabel(Ext.htmlEncode(propertiesJSONObject.value));
		} else if(propertiesJSONObject.name === 'value') {
			fireJavaEvent(CONSTANTS.WIDGET_UPDATED, this.cmp.getId(), '{"states" : [{"name": "fieldLabel"}]}');
		}
	},
    getEventPublishingData: function() {
        return [{
            event: "valuechanged",
            eventLabel: xcp.Strings.widget.form.designer.NumberField.valueChangeEventLabel,
            data: [
                {
                    name: "value",
                    type: "STRING"
                }
            ]
        }];
    }
});

xcp.designer.ComponentMgr.registerType("xgrid",dsvg.widgets.grid.designer.xgrid);

