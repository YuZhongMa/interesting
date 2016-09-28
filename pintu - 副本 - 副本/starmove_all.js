
function getStyle(obj,attr){
    if(obj.currentStyle){
      return obj.currentStyle[attr]
    }
    else{

      return getComputedStyle(obj,false)[attr]
    }
}


      function starmove(obj,json,fn){

        clearInterval(obj.timer);
        var stop = true;
        obj.timer = setInterval(function(){
          var i = 0;
          for( i in json){

          var att;
          if(i =='opacity'){
            att = parseFloat(getStyle(obj,i))*100;
          }
          else if (i=='left'){
            att = parseInt(obj.style.left);
            //alert(att)
          }else if(i=='top'){
            att = parseInt(obj.style.top)
          }
        var sleep;
        //sleep = sleep>0?Math.ceil(sleep):Math.floor(sleep);
        sleep = (json[i] > att ? Math.ceil : Math.floor)((json[i] - att) / 10);
          
          if( att!=JSON[i]){ stop =false;}else{stop=true;}
          
          if(att == json[i]){
            clearInterval(obj.timer);
            console.log(att,json[i],i)
            if (fn) {
              fn();
            };
          
        }
          else{
            if(i == 'opacity'){
              obj.style.filter = 'alpha(opacity:'+(att+sleep)+')';
              obj.style.opacity =(att+sleep)/100;
            }
            else{
            obj.style[i] = att + sleep + 'px';
            }
          }
         } 
  },30)
} 