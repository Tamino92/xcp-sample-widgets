/**
 * 
 */
Ext.define("dsvg.widgets.TiledResultsList", {
    extend : "Ext.container.Container",
    alias: "widget.tiled_rlist",

    config: {
        debug : false,
        autoScroll : true
    },  

    tileClicked: null,

    xcpeventconfig : [
        {
            event : "svgclick",
            data : function() {
                return  "svgclick-ok" ;
            }
        },
        'hide',
        'show',
        'focus'
    ],

    statics: {    
        getLastClickedTile : function(context, compId) {
            console.log("getLastClickedTile called with id : " + compId);
            var comp = context.getComponent(compId);
            var value = '';
            if (!comp) {
                console.warn("Comp ID not found : " + compId);
            } else {
                value =  comp.tileClicked;
            }
            return value;
        }
    },

    listeners: {
        afterrender: function() {
            this.updatePanel();
        },

        tileclick : function(){
            console.log('tileclick event recieved by tile results list') ;
            //this.launchActionOnLinkedButton() ;
        }
    },

    constructor: function(config) {
        this.log('constructor TiledResultsList called');
        dsvg.widgets.TiledResultsList.superclass.constructor.apply(this, [config]);

    },

    initComponent : function() {
        this.log('initComponent TiledResultsList called'); 
        this.callParent(arguments);


        this.update('<div class="container example-01">'+
                    '<ul id="trl-'+this.getId()+'" class="block-list">'+
                    '<li>'+
                    '<div class="card">'+
                    '<div class="card-front">'+
                    '<h4>Main title</h4>'+
                    '<p>Lorem ipsum <small>dolor sit amet</small>, consectetur adipiscing elit. Duis condimentum.</p>'+
                    '</div>'+
                    ' <div class="card-back">'+
                    '<h4>Back</h4>'+
                    '<p>Lorem ipsums dolor sit amet, consectetur adipiscing elit. Duis condimentum.</p>'+
                    '</div>'+
                    '</div>'+
                    '</li>'+  		
                    '</ul> '+
                    '</div>');
    },


    updatePanel : function(){
    },

    setValue : function(val){
        this.log('Call setValue :  '+val) ;

        this.results = JSON.parse(val);

        console.log('getting ul elt') ;
        var ul = document.getElementById('trl-'+this.getId()) ;
        // removing all childs first
        while (ul.firstChild) {
            ul.removeChild(ul.firstChild);
        }
        console.log('ul cleaned') ;
        
        var litem,card, frontCard, backCard,mainTitle,line1 ;

        console.log('before loop')
        // should use a templating engine  !!!
        this.results.forEach( function(result){
            litem = document.createElement('li') ;
            card = document.createElement("div");
            card.setAttribute('class','card') ;
            frontCard = document.createElement('div');
            frontCard.setAttribute('class','card-front') ;
            backCard = document.createElement('div');
            backCard.setAttribute('class','card-back') ;
            mainTitle = document.createElement('h4') ;
            mainTitle.innerHTML = result.mainTitle ;
            
            // compose
            ul.appendChild(litem) ;
            litem.appendChild(card) ;
            card.appendChild(frontCard) ;
            card.appendChild(backCard) ;         
            frontCard.appendChild(mainTitle) ;
        });
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




