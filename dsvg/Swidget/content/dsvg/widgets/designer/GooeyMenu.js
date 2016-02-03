// Gooey Menu desing time
dsvg.widgets.GooeyMenu.override({

    initComponent : function() {
        this.log('initComponent overrided GooeyMenu called');  

        this.update('<h1>Gooey Menu</h1>');

        this.callParent(arguments);
    },

    updatePanel : function(){

        this.log('updatePanel overrided GooeyMenu called');  
        this.doLayout() ;
    }
});


Ext.define('dsvg.widgets.designer.GooeyMenu', {
    extend: 'xcp.designer.Component',


    constructor: function(cmp){
        dsvg.widgets.designer.GooeyMenu.superclass.constructor.call(this, cmp);
        console.log('GooeyMenu xCP designer comp constructor called') ;
        this.propertyConfig = {
            "tabs": [{
                "name": "general",
                "sections": [{
                    "name" : "basic",
                    "label": "Basics",
                    "properties": [{"name": "title"},{"name":"debug"}]
                }, {
                    "name" : "value",
                    "label": "Labels, event messages and button actions",
                    "properties": [
                        {"name": "menuLabels"},
                        {"name": "menuTargets"},
                        {"name": "menuButtonIds"}
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


        cmp.getEl().setStyle("display", "block");
        cmp.ownerCt.doLayout();
    },



    updateComponent: function(propertiesJSONObject) {
        if (propertiesJSONObject && propertiesJSONObject.name === 'debug') { 
            console.log('UpdateComponent setting debug to :'+propertiesJSONObject.value) ;
            this.cmp.setDebug(propertiesJSONObject.value);
        }
        if (propertiesJSONObject && propertiesJSONObject.name === 'menuLabels') { 
            console.log('UpdateComponent setting debug to :'+propertiesJSONObject.value) ;
            this.cmp.setMenuLabels(propertiesJSONObject.value);
        }
        if (propertiesJSONObject && propertiesJSONObject.name === 'menuTargets') { 
            console.log('UpdateComponent setting debug to :'+propertiesJSONObject.value) ;
            this.cmp.setMenuTargets(propertiesJSONObject.value);
        }
        if (propertiesJSONObject && propertiesJSONObject.name === 'menuButtonIds') { 
            console.log('UpdateComponent setting debug to :'+propertiesJSONObject.value) ;
            this.cmp.setMenuButtonIds(propertiesJSONObject.value);
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

xcp.designer.ComponentMgr.registerType("gooey_menu",dsvg.widgets.designer.GooeyMenu);
