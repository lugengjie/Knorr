var video_userId;
Ext.define('Admin.view.authentication.AuthenticationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.authentication',

    //TODO: implement central Facebook OATH handling here

    onFaceBookLogin : function() {
        this.redirectTo('dashboard', true);
    },

	onLoginButton: function(btn){
    	var me = this;
        Ext.Ajax.request({
            url: 'login',
            method: 'post',
            async:false,
            params: {
                userName: btn.up("form").getForm().findField("userid").getValue(),
                password: btn.up("form").getForm().findField("password").getValue()
            },
            success: function(response, options) {
            	var json = Ext.util.JSON.decode(response.responseText);
	            if(json.success){
                    me.redirectTo('achievement', true);
                    Ext.getCmp('loginUserName').setText('Hi,'+json.map.userName);
                    Ext.getCmp('loginUserImage').getEl().dom.src = 'resources/images/user-profile/'+json.map.picture;
                    //通过全局变量传递用户id
                    video_userId=json.map.userId;
                    Ext.Ajax.request({ 
    	                url : '/addressList/upStatus',
    	                async:false, 
    	                method : 'post', 
    	                params : { 
    	                    userId:video_userId
    	                }
    	            });
		        }else{
		        	Ext.Msg.alert('登录失败', json.msg);
		        }
            }
        }); 
        if(video_userId!=null){
           //websocket初始化
	        websocket = null;
	        if('WebSocket' in window){ 
	              websocket = new WebSocket("wss://"+window.location.host+"/websocket/"+video_userId);
	        }else{
	            Ext.Msg.alert('Not support websocket');
	        }
	        websocket.onopen = function(event){ 
	            websocket.send(JSON.stringify({
                  "event":"status",
                  "status":"在线",
                  "statusId":video_userId
                }));
	        }
	        websocket.onmessage = function(event){
	            var json = JSON.parse(event.data);
	            if(json.event=="status"){
	            	if(Ext.getCmp("address_panel")){
	                     Ext.getCmp("address_panel").getStore().load();
	                 }
	            	/*if(Ext.getCmp("address_panel")){
	            		if(json.status=="在线"){
		                     var store=Ext.getCmp("address_panel").getStore();
		                     var index = store.find("id",json.statusId);
		                     if(index!=-1){
		                     	var record = store.getAt(index);
		                     	record.set("status","在线");
		                     }else{
		                    	 store.load();
		                     } 
	            		}else{
	            			var store=Ext.getCmp("address_panel").getStore();
		                     var index = store.find("id",json.statusId);
		                     if(index!=-1){
		                     	var record = store.getAt(index);
		                     	record.set("status","离线");
		                     }else{
		                    	 store.load();
		                     } 
	            		}
	                 }*/
	            }else if(json.event=="notice"){
	                if(Ext.getCmp("notice_panel")){
	                     Ext.getCmp("notice_panel").getStore().load();
	                 }
		             Ext.Msg.alert("公告",json.data);
	             }else{
	                Ext.MessageBox.confirm('提示', '是否接收群聊',function(btn, text){
	                    if(btn=='yes'){
	                         var ids={
	                            "userId":parseInt(video_userId),
	                            "idGroup":json.idGroup
	                          }
	                         sessionStorage.setItem("orderPage_ids", JSON.stringify(ids));
	                         window.open('https://'+window.location.host+'/a');
	                    }
	                }, this);
	             }
	            
	        }
	        window.onbeforeunload = function(){
	            Ext.Ajax.request({ 
	                url : '/addressList/downStatus',
	                async:false, 
	                method : 'post', 
	                params : {
	                    userId:video_userId
	                }
	            });
	            websocket.send(JSON.stringify({
                  "event":"status",
                  "status":"离线",
                  "statusId":video_userId
                }));
	            websocket.close();
	        } 
	     }     
	},
    onLoginAsButton: function() {
        this.redirectTo('login', true);
    },

    onNewAccount:  function() {
        this.redirectTo('register', true);
    },

    onSignupClick:  function() {
        this.redirectTo('dashboard', true);
    },

    onResetClick:  function() {
        this.redirectTo('dashboard', true);
    }
});