window.onload=function ()
{
	var SCALE=10;
	var oImg=document.getElementById('img1');
	var oTxt=document.getElementById('prog').getElementsByTagName('span')[0];
	var oBar=document.getElementById('bar');
	var aImg=[];
	var iImgCount=77;
	var iLoaded=0;
	var iNow=0;
	var i=0;
	//加载所有资源
	for(i=0;i<iImgCount;i++)
	{
		(function (i){
			var oNewImg=new Image();
			oNewImg.onload=function ()
			{
				oTxt.innerHTML=oBar.style.width=Math.ceil(100*iLoaded/iImgCount)+'%';
				oNewImg.onload=null;
				
				var oImg=document.createElement('img');
				oImg.src=this.src;
				oImg.style.display='none';
				document.body.appendChild(oImg);
				aImg[i]=oImg;
				
				if(++iLoaded==iImgCount)onLoad();
			};
			oNewImg.src='img/miaov ('+i+').jpg';
		})(i);
	}
	
	//效果
	function onLoad()
	{
		for(i=0;i<iImgCount;i++)if(!aImg[i])alert('资源加载失败，请刷新重试');
		var lastImg=null;
		document.getElementById('prog').style.display=document.getElementById('bg').style.display='none';
		document.body.removeChild(oImg);
		var body=document.body;
		oImg=null;
		var timer=null;
		var num=iNow;
		var speed=0;
		
		aImg[0].style.display='block';
		lastImg=aImg[0];
		
		document.onmousedown=function (ev)
		{
			console.log(ev)
			alert(1)
			var oEvent=ev||event;
			var startX=oEvent.clientX;
			var lastX=startX;
			if(body.setCapture)
			{
				body.onmousemove=onMove;
				body.onmouseup=onUp;
				
				body.setCapture();
			}
			else
			{
				document.onmousemove=onMove;
				document.onmouseup=onUp;
			}
			
			function onMove(ev)
			{
				var oEvent=ev||event;
				var i=-(oEvent.clientX-startX)/SCALE;
				
				num=(iNow+i+Math.abs(Math.floor(i/iImgCount))*iImgCount)%iImgCount;
				
				if(lastImg!=aImg[parseInt(num)])
				{
					lastImg.style.display='none';
					aImg[parseInt(num)].style.display='block';
					lastImg=aImg[parseInt(num)];
				}
				
				speed=-(oEvent.clientX-lastX)/SCALE;
				lastX=oEvent.clientX;
				
				return false;
			}
			
			function onUp()
			{
				this.onmousemove=null;
				this.onmouseup=null;
				
				if(body.releaseCapture)body.releaseCapture();
				
				iNow=num;
				
				startMove();
			}
			
			stopMove();
			
			return false;
		};
		
		function startMove()
		{
			timer=setInterval(function (){
				iNow=(iNow+speed+Math.abs(Math.floor(i/iImgCount))*iImgCount)%iImgCount;
				lastImg.style.display='none';
				aImg[parseInt(iNow)].style.display='block';
				lastImg=aImg[parseInt(iNow)];
				
				speed*=0.9;
				
				if(Math.abs(speed)<=1)
				{
					clearInterval(timer);
					speed=0;
				}
			}, 30);
		}
		
		function stopMove()
		{
			clearInterval(timer);
		}
	}
};