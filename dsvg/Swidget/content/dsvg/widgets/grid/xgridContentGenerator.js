var confs = {

    metro_stations : {
        id : "id",
        title : "public_name",
        subtitle : "open",
        subtitleLabel : "Status",

        attributesLabels : ["Passenger/year"] ,
        attributesValues : ["passengers_year"],
        //attributesLabels : ["Passenger/year","Belongs to lines"] ,
        //attributesValues : ["passengers_year","lineschild_metrolineshort_name"],

        attributesMultivalue : [false,true],

        actions : [
            { title : "View",
             faIcon : "fa fa fa-eye",
             xcpEventName : "viewObj"
            },
            {title : "Edit",
             faIcon : "fa fa-pencil-square-o",
             xcpEventName : "editObj"},
            {title : "Download",
             faIcon : "fa fa-download",
             xcpEventName : "downloadObj"},
            {title : "Import new version",
             faIcon : "fa fa-upload",
             xcpEventName : "importNVObj"},
            {title : "Delete",
             faIcon : "fa fa-trash",
             xcpEventName : "deleteObj"}
        ]
    },
    metro_lines : {
        id : "id",
        title : "public_label",
        subtitle : "stations_count",
        subtitleLabel : "# stations",
        
        attributesLabels : ["Passengers/year","Trains in services","Length","Punctuality (%)"],
        attributesValues : ["passengers_per_year","trains_in_service","line_length","punctuality_rate"],
        
        actions : [
            { title : "View",
             faIcon : "fa fa fa-eye",
             xcpEventName : "viewObj"
            },
            {title : "Edit",
             faIcon : "fa fa-pencil-square-o",
             xcpEventName : "editObj"}
        ]
    }
};

function generateCardList(comp,d3rootElt,data,confType){

    console.log('generateCardList confType : '+confType) ; 
    var conf = confs[confType] ;
    console.log('conf') ;
    console.log(conf) ;

    if (conf){      
        d3rootElt.selectAll("li").remove();
        data.forEach(function(d){
            var li = d3rootElt.append('li') ;
            var card = li.append('div').attr('class','card').attr('id',d[conf.id]);

            // Action bar
            var cb_footer = card.append('div').attr('class','c-actions') ;   
            conf.actions.forEach(function(a){
                cb_footer.append('span')
                    .attr('class','c-action '+a.faIcon)
                    .attr('title',a.title)
                    .attr('id',d.id)
                    .attr('xcpEvt',a.xcpEventName)
                    .on('click',function(e){
                        alert('click on'+d3.select(this).attr('id')+' with event : '+d3.select(this).attr('xcpEvt')) ;
                        comp.lastClickedItemId = d3.select(this).attr('id') ;
                        comp.fireEvent('itemclick') ;
                });
            }) ;
            // Title and subtile and card faces
            var card_front = card.append('div').attr('class','card-front') ;        
            card_front.append('h4').attr('class','c-title').text(d[conf.title]) ;  
            card_front.append('p').attr('class','cf-subtitle').html('<span class="cf-subtitle-label">'+conf.subtitleLabel+'</span>'+d[conf.subtitle]) ;

            // Attributes
            var MAX_ATTR = 4 ;
            var nbr_attr = conf.attributesValues.length ;
            var index = 0 ;

            while (Number(index)< Number(MAX_ATTR) && Number(index)<Number(nbr_attr)) {
                // !! the card cannot show more than 4 attributes
                //if (conf.attributesMultivalue[index] === false) {
                card_front.append('p').attr('class','c-attr').html('<span class="c-attr-label">'+conf.attributesLabels[index]+'</span>'+d[conf.attributesValues[index]]) ;      
                index++ ;
            }
        });

        return ;
    }

}