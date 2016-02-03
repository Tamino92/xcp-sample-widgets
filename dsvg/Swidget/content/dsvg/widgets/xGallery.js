/**
 * 
 */
Ext.define("dsvg.widgets.xGallery", {
    extend : "Ext.container.Container",
    alias: "widget.x_gallery",


    config: {
        debug : false,
        thumbnailSize : 50
    },

    photos : [],

    xcpeventconfig : [    
        'hide',
        'show'
    ],


    constructor: function(config) {
        this.log('constructor xGallery called');
        dsvg.widgets.xGallery.superclass.constructor.apply(this, [config]);

    },

    initComponent : function() {
        this.log('initComponent xGallery called');  
        this.callParent(arguments);


        this.update(
            '<div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">'+
            '<div class="pswp__bg"></div>'+
            '<div class="pswp__scroll-wrap">'+
            '<div class="pswp__container">'+
            '<div class="pswp__item"></div>'+
            '<div class="pswp__item"></div>'+
            '<div class="pswp__item"></div>'+
            '</div>'+
            '<div class="pswp__ui pswp__ui--hidden">'+
            '<div class="pswp__top-bar">'+
            '<div class="pswp__counter"></div>'+
            '<button class="pswp__button pswp__button--close" title="Close (Esc)"></button>'+
            '<button class="pswp__button pswp__button--share" title="Share"></button>'+
            '<button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>'+
            '<button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>'+
            '<div class="pswp__preloader">'+
            '<div class="pswp__preloader__icn">'+
            '<div class="pswp__preloader__cut">'+
            '<div class="pswp__preloader__donut"></div>'+
            '</div>'+
            '</div>'+
            '</div>'+
            '</div>'+
            '<div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">'+
            '<div class="pswp__share-tooltip"></div>'+
            '</div>'+
            '<button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)">'+
            '</button>'+
            '<button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)">'+
            '</button>'+
            '<div class="pswp__caption">'+
            '<div class="pswp__caption__center"></div>'+
            '</div>'+
            '</div>'+
            '</div>'+
            '</div>'+
            '<div><section id="photos">'+
            '</section></div>');
            this.updatePanel() ;
    },


    updatePanel : function(){
        this.doLayout() ;
    },

    setValue : function(val){
        console.log('xGallery call to set value !!') ;
        var me = this ;
        this.photos = JSON.parse(val) ;

        var photo_section = document.getElementById("photos") ;
        // removing all childs first
        while (photo_section.firstChild) {
            photo_section.removeChild(photo_section.firstChild);
        }

        var dom = Ext.dom.Query.select('.pswp');
        var el = Ext.get(dom[0]);
        //console.log('el : '+el.dom) ;

        this.photos.forEach( function(item){
            var image = document.createElement("img");
            image.setAttribute('src',item.thum) ;
            image.setAttribute('width',me.getThumbnailSize()) ;
            image.setAttribute('height',me.getThumbnailSize()) ;
            image.addEventListener("click", function() {
                //console.log('image click !!')
                // retrieve the index of clicked image
                var thumURL = this.getAttribute("src");
                var index = me.photos.map(function(e) { return e.thum; }).indexOf(thumURL);
                //console.log('index : '+index) ;
                me.gallery = new PhotoSwipe( el.dom, PhotoSwipeUI_Default, me.photos, {index : index ,history : false,preload :[1,1]});   
                me.gallery.init() ;
            });
            photo_section.appendChild(image) ;
        });

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
