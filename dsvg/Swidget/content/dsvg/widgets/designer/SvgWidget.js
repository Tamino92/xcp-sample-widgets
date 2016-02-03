// Gooey Menu desing time
dsvg.widgets.SvgWidget.override({

    initComponent : function() {
        this.log('initComponent overrided SvgWidget called');  

        this.update('<h1>Svg Widget</h1>');

        this.callParent(arguments);
    },

    updatePanel : function(){

        this.log('updatePanel overrided SvgWidget called');  
        this.doLayout() ;
    }
});

Ext.define('dsvg.widgets.designer.SvgWidget', {
    extend: 'xcp.designer.Component',


    constructor: function(cmp){
        dsvg.widgets.designer.SvgWidget.superclass.constructor.call(this, cmp);
        console.log('SvgWidget xCP designer comp constructor called') ;
        this.propertyConfig = {
            "tabs": [{
                "name": "general",
                "sections": [{
                    "name" : "basic",
                    "label": "Basics",
                    "properties": [{"name": "title"},{"name":"debug"},{"name":"action"}]
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


        //cmp.getEl().setStyle("display", "block");
        //cmp.ownerCt.doLayout();
    },



    updateComponent: function(propertiesJSONObject) {
        if (propertiesJSONObject && propertiesJSONObject.name === 'debug') { 
            console.log('UpdateComponent setting debug to :'+propertiesJSONObject.value) ;
            this.cmp.setDebug(propertiesJSONObject.value);
        }
        if (propertiesJSONObject && propertiesJSONObject.name === 'action') { 
            console.log('UpdateComponent setting debug to :'+propertiesJSONObject.value) ;
            this.cmp.setActionButtonId(propertiesJSONObject.value);
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

xcp.designer.ComponentMgr.registerType("svg_widget",dsvg.widgets.designer.SvgWidget);
