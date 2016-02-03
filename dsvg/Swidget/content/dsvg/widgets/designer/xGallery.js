// Gooey Menu desing time
dsvg.widgets.xGallery.override({

    initComponent : function() {
        this.log('initComponent overrided xGallery called');  
        this.callParent(arguments);
        this.update('<h1>xGallery</h1>');


    },

    updatePanel : function(){

        this.log('updatePanel overrided xGallery called');  
        this.doLayout() ;
    }
});

Ext.define('dsvg.widgets.designer.xGallery', {
    extend: 'xcp.designer.Component',


    constructor: function(cmp){
        dsvg.widgets.designer.xGallery.superclass.constructor.call(this, cmp);
        console.log('xGallery xCP designer comp constructor called') ;
        this.propertyConfig = {
            "tabs": [{
                "name": "general",
                "sections": [{
                    "name" : "basic",
                    "label": "Basics",
                    "properties": [{"name": "title"},{"name":"debug"},{"name":"thumbnailSize"}]
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

        cmp.getEl().setStyle("display", "block");
        cmp.ownerCt.doLayout();
    },



    updateComponent: function(propertiesJSONObject) {
        if (propertiesJSONObject && propertiesJSONObject.name === 'debug') { 
            console.log('UpdateComponent setting debug to :'+propertiesJSONObject.value) ;
            this.cmp.setDebug(propertiesJSONObject.value);
        }
        if (propertiesJSONObject && propertiesJSONObject.name === 'thumbnailSize') { 
            console.log('UpdateComponent setting debug to :'+propertiesJSONObject.value) ;
            this.cmp.setThumbnailSize(propertiesJSONObject.value);
        }

    }
});

xcp.designer.ComponentMgr.registerType("x_gallery",dsvg.widgets.designer.xGallery);
