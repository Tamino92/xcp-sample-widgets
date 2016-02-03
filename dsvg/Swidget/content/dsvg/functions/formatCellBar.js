Ext.namespace ('dsvg.functions');


/*
 * Removes leading and/or trailing whitespace from a string
 * 
 * Example:
 * 		dtbTrim(' hello ') 
 * 		returns 'hello'
 */
dsvg.functions.formatCellBar = function (value,maxValue,barBgClass) {

    if (!isNaN(value) && !isNaN(maxValue)){
        var percent = Math.floor((value/maxValue)*100) ;

        var output = '<div style="width:'+percent ;

        if (barBgClass) {
            
            if (percent<=20) output += '%;" class="'+barBgClass+'20" ' ;
            else if (percent<=40) output += '%;" class="'+barBgClass+'40" ' ;
            else if (percent<=60) output += '%;" class="'+barBgClass+'60" ' ;
            else if (percent<=80) output += '%;" class="'+barBgClass+'80" ' ;
            else output += '%;" class="'+barBgClass+'100" ' ;
        }
        else {
            if (percent<=20) output+='%; background:lime;" ' ;
            else if (percent<=40) output+='%; background:limegreen;" ' ;
            else if (percent<=60) output+='%; background:yellow;" ' ;
            else if (percent<=80) output+='%; background:orange;" ' ;
            else output+='%; background:red;" ' ;
        }
        output+='>'+value+'</div>' ;

        return output ;
    }
    else return 'Value not a Number' ;

}