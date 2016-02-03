/**
 * 
 */
Ext.define("dsvg.widgets.GooeyMenu", {
    extend : "Ext.container.Container",
    alias: "widget.gooey_menu",

    config: {
        debug : false,
        menuLabels : '',
        menuTargets : '',
        menuButtonIds : ''
    },  

    menuClicked: null,
    selectedButtonId : null,

    xcpeventconfig : [
        {
            event : "gooclicked",
            data : function() {
                return  "gooclicked-ok" ;
            }
        },
        'hide',
        'show',
        'focus'
    ],

    statics: {    
        getMenuItemClicked : function(context, compId) {
            console.log("getMenuClicked called with id : " + compId);
            var comp = context.getComponent(compId);
            var value = '';
            if (!comp) {
                console.warn("Comp ID not found : " + compId);
            } else {
                value =  comp.menuClicked;
            }
            return value;
        }
    },

    listeners: {
        afterrender: function() {
            this.updatePanel();
        },
        
        actionGoo : function(){
            console.log('actionGoo event recieved by ggo menu') ;
            this.launchActionOnLinkedButton() ;
        }
        
        
    },

    constructor: function(config) {
        this.log('constructor GooeyMenu called');
        dsvg.widgets.GooeyMenu.superclass.constructor.apply(this, [config]);

    },

    initComponent : function() {
        this.log('initComponent GooeyMenu called'); 
        this.callParent(arguments);
    },


    updatePanel : function(){
        if(!this.root){
            this.root = d3.select('#'+this.getId()+'-innerCt').append("div")
                .attr('id','gm-'+this.getId())
                .style("width","100%")
                .style("width","200")
                .attr('class','menu');
            this.root.append("input")
                .attr("type","checkbox")
                .attr("href",'#')
                .attr("id",'menu-open')
                .attr("class",'menu-open')
                .attr("name",'menu-open');
            var lab = this.root.append('label')
            .attr('class','menu-open-button')
            .attr('for','menu-open') ;
            lab.append('span').attr('class','hamburger hamburger-1') ;
            lab.append('span').attr('class','hamburger hamburger-2') ;
            lab.append('span').attr('class','hamburger hamburger-3') ;

            var me = this ;
            var labels = this.menuLabels.split(",");
            var targets = this.menuTargets.split(',') ;
            var buttonIds = this.menuButtonIds.split(',') ;
            // Very ugly !! have to learn more about D3 to optimize that
            for (var i=0;i<labels.length;i++) {
                var item = this.root.append('a')
                .attr("href","#")
                .attr('class',"menu-item")
                .attr('target',targets[i])
                .attr('gooActionId',buttonIds[i]);

                item.append('i').attr('class',labels[i]);

                item.on("click", function() {
                    d3.event.preventDefault();
                    me.menuClicked = d3.select(this).attr('target') ;
                    me.selectedButtonId = d3.select(this).attr('gooActionId') ;
                    console.log('gooclicked '+me.gooclicked) ;
                    me.fireEvent('gooclicked');
                    me.fireEvent('actionGoo') ;
                });
            }

        }
        this.doLayout() ;
    },



    launchActionOnLinkedButton : function(){
        var btn = Ext.ComponentQuery.query('xcp_button[xcpId="'+this.selectedButtonId+'"]');
        if (btn){
            console.log('button : '+btn.length);
            console.log(btn[0]) ;
            btn[0].handler() ;
        }
        else {
            console.warn('button not found : '+bntId) ;
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
