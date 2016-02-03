/**
 * 
 */
Ext.define("dsvg.widgets.SimpleTimeLine", {
    extend : "Ext.container.Container",
    alias: "widget.simple_time_line",


    config: {
        debug : false,
        //width: 300,
        //height: 200
    },  


    xcpeventconfig : [        
        'hide',
        'show',
        'focus'
    ],

    listeners: {
        afterrender: function() {
            this.updatePanel();
        }
    },

    constructor: function(config) {
        this.log('constructor SimpleTimeLine called');
        dsvg.widgets.SimpleTimeLine.superclass.constructor.apply(this, [config]);

    },

    initComponent : function() {
        this.log('initComponent SimpleTimeLine called');
        this.callParent(arguments);
    },


    updatePanel : function(){
        this.doLayout() ;
    },

    setValue : function(val){
        this.log('Call setValue :  '+val) ;
        this.events = JSON.parse(val) ;

        var comp = document.getElementById(this.getId()) ;
        // removing all childs first
        while (comp.firstChild) {
            comp.removeChild(comp.firstChild);
        }

        var section = document.createElement('section') ;
        section.setAttribute('class','timeline') ;
        comp.appendChild(section) ;
        var ul = document.createElement('ul') ;
        ul.setAttribute('id','stl-'+this.getId());
        section.appendChild(ul) ;

        this.events.forEach(function(event){
            var li = document.createElement('li') ;
            ul.appendChild(li) ;
            var div = document.createElement('div') ;
            div.setAttribute('class','evt_title') ;
            var d = moment(event.date) ;
            div.innerHTML = d.format('YYYY MM DD') ;
            var p = document.createElement('p') ;
            p.innerHTML = event.name ;
            li.appendChild(div);
            li.appendChild(p) ;
        }) ;

        this.updatePanel() ;
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
