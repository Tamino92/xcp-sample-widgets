// Gooey Menu desing time
dsvg.widgets.TiledResultsList.override({

    initComponent : function() {
        this.log('initComponent overrided SvgWidget called');  

        this.update('<h1>TiledResultsList</h1>');

        this.callParent(arguments);
    },

    updatePanel : function(){

        this.log('updatePanel overrided TiledResultsList called');  
        this.doLayout() ;
    }
});

Ext.define('dsvg.widgets.designer.TiledResultsList', {
    extend: 'xcp.designer.Component',


    constructor: function(cmp){
        dsvg.widgets.designer.TiledResultsList.superclass.constructor.call(this, cmp);
        console.log('SvgWidget xCP designer comp constructor called') ;
        this.propertyConfig = {
            "tabs": [{
                "name": "general",
                "sections": [{
                    "name" : "basic",
                    "label": "Basics",
                    "properties": [{"name": "title"},{"name":"debug"}]
                }, {
                    "name" : "value",
                    "label": xcp.Strings.widget.form.designer.ValueDisplay.valueSectionLabel,
                    "properties": [
                        {"name": "value", "editor": "com.emc.xcp.uitemplate.ui.property.section.special.expr.ExpressionPropertyEditor"}
                    ]
                }]
            },{
                "name": xcp.Strings.widget.form.designer.ValueDisplay.behaviorTabLabel,
                "sections":[{
                    "name": "behavior",
                    "label": xcp.Strings.widget.form.designer.ValueDisplay.behaviorSectionLabel,
                    "properties": [
                        {"name": "publish", "editor": "com.emc.xcp.uitemplate.ui.property.section.special.UIEventPublishPropertyEditor"},
                        {"name": "subscribe", "editor": "com.emc.xcp.uitemplate.ui.property.section.special.UIEventSubscribePropertyEditor"}
                    ]
                }]
            }]
        };
    },



    updateComponent: function(propertiesJSONObject) {
        if (propertiesJSONObject && propertiesJSONObject.name === 'debug') { 
            console.log('UpdateComponent setting debug to :'+propertiesJSONObject.value) ;
            this.cmp.setDebug(propertiesJSONObject.value);
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

xcp.designer.ComponentMgr.registerType("tiled_rlist",dsvg.widgets.designer.TiledResultsList);
