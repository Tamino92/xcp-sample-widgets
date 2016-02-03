Ext.define('dsvg.widgets.designer.LiquidFillGauge', {
    extend: 'xcp.designer.Component',


    constructor: function(cmp){
        dsvg.widgets.designer.LiquidFillGauge.superclass.constructor.call(this, cmp);
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

        //cmp.ownerCt.doLayout();
    },



    updateComponent: function(propertiesJSONObject) {
        if (propertiesJSONObject && propertiesJSONObject.name === 'debug') { 
            console.log('UpdateComponent setting debug to :'+propertiesJSONObject.value) ;
            this.cmp.setDebug(propertiesJSONObject.value);
        }

    }
});

xcp.designer.ComponentMgr.registerType("liquid_fill_gauge",dsvg.widgets.designer.LiquidFillGauge);
