<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link rel="stylesheet" href="./../css/videoCss.css" type="text/css" />
<script src="./../js/jquery.min.js"></script>
<script>
console.log("begin");
    $(document).ready(function(){
    	/* $("body").append(""); */
    	// 用户ID
    	var otherPageData=JSON.parse(sessionStorage.getItem("orderPage_ids")); 
        var userId=otherPageData.userId;
        /* console.log(userId);  */
    	//可能加入的用户数组
    	var proIds=otherPageData.idGroup;
    	/* console.log(proIds);  */
       /*  var userId = window.location.href.split('#')[1];
        var proIds=[1,2]; */
        sessionStorage.clear();
    	//peerConnection数组
        var pcArray=new Array();

        //索引前面的id
        var preIds;
       // 与信令服务器的WebSocket连接i
        var socket = new WebSocket("wss://"+window.location.host+"/otherPage/"+userId);
        //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
        window.onbeforeunload = function(){
             socket.close();
        }
        
      //socket发起群聊
        $("#joinRoom").click(function(){
        	/* alert("测试一下就知道了"); */
        	//隐藏组件
        	$("#hideModel").hide();
        	//进入全屏
        	var de = document.documentElement;
            if (de.requestFullscreen) {
                de.requestFullscreen();
            } else if (de.mozRequestFullScreen) {
                de.mozRequestFullScreen();
            } else if (de.webkitRequestFullScreen) {
                de.webkitRequestFullScreen();
            }
            
      	      // 获取本地音频和视频流
  	          navigator.webkitGetUserMedia({
  	              "audio": true,
  	              "video": true
  	          }, function(stream){
  	        	
  	        	  //绑定本地媒体流到video标签用于输出
  	        	 $("body").append("<video id='localVideo' class='localVideo' autoplay muted> ");
  	             document.getElementById('localVideo').src = URL.createObjectURL(stream);
  	        	  
  	        	//创建连接对象	
  	              for(var i=0;i<proIds.length;i++){
  	                  var tmp=proIds[i];
  	                  if(tmp==userId) continue;   
  	                  pcArray[tmp]=new webkitRTCPeerConnection(null); 
  	                  pcArray[tmp].addStream(stream);
  	                  (function(index){
		  	                  pcArray[index].onicecandidate=function ondate(event){
		  	                    if (event.candidate !== null) {
		  	                      socket.send(JSON.stringify({
		  	                          "event" :"_ice_candidate",
		  	                          "userId":userId,
		  	                          "group":[index],
		  	                          "data" :event.candidate
		  	                      }));
		  	                   }
		  	                 };
		  	               pcArray[index].onaddstream = function(event){
	        	                 $("body").append("<video class='romveVideo' src="+URL.createObjectURL(event.stream)+" autoplay></video>"); 
	        	                 $(".romveVideo").each(function(idTmp){
	        	                 	var _tmp='romveVideo'+($(".romveVideo").length)+'_'+idTmp;
	        	                 	$(this).attr('id',_tmp);
	        	                 });
	        	                 $(".localVideo").attr('id','localVideo'+$(".romveVideo").length);      
			               };
  	                  })(tmp) 
  	             }
  	        	
  	            //排队，等待连接
  	              socket.send(JSON.stringify({
  	                    "event" :"joinQueue",
  	                    "userId":userId,
  	                    "group":null,
  	                    "data":null
  	              }));
  	            
  	          }, function(error){
  	              //处理媒体流创建失败错误
  	              console.log('getUserMedia error: ' + error);
  	          });
      	      
        });
        
      
        socket.onmessage = function(event){
        	 var json = JSON.parse(event.data);
        	 if(json.event==="agreeJoin"){
        		 preIds=json.group;
        		 //发送offer
        		 for(var i=0;i<preIds.length;i++){
             		var tmp=preIds[i];	
            			(function(index){
	                		 pcArray[parseInt(index)].createOffer(function(desc){   
	                	        	pcArray[parseInt(index)].setLocalDescription(desc);
	                	            socket.send(JSON.stringify({ 
	                	                "event" :"_offer",
	                	                "userId":userId,
	                	                "group":[index],
	                	                "data":desc
	                	            }));
             			}, function (error) {
		                           console.log('Failure callback: ' + error);
		                    });
            		   })(tmp)
                 }
        	 }else if(json.event==="_offer"){
            	 var tmp=json.userId;
                 pcArray[tmp].setRemoteDescription(new RTCSessionDescription(json.data));
                 pcArray[tmp].createAnswer(function(desc){
                  	pcArray[tmp].setLocalDescription(desc);
                    socket.send(JSON.stringify({ 
                        "event" :"_answer",
                        "userId":userId,
                        "group":[tmp],
                        "data":desc
                    }));
                }, function (error) {
                     console.log('Failure callback: ' + error);
                 }); 
            }else if(json.event==="_answer"){
                var tmp=json.userId;
                pcArray[tmp].setRemoteDescription(new RTCSessionDescription(json.data)); 
            }else if(json.event==="_ice_candidate"){
                var tmp=json.userId;
                pcArray[tmp].addIceCandidate(new RTCIceCandidate(json.data));  
            }
        } 
    });
</script>
</head>
<body >
   <img src='./../picture/bg.gif' id='bg'>
   <div id="hideModel">
	    <!-- <button id="joinRoom">加入群聊</button> -->
	    <img id="joinRoom" src='./../picture/button.png' >
   </div>
</body>
</html>
