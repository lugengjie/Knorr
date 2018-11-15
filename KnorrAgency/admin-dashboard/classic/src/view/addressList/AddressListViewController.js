Ext.define('Admin.view.addressList.AddressListViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.addressListViewController',
	/*Quick Search*/	
	quickSearch:function(btn){
		var searchField = this.lookupReference('searchFieldName').getValue();
		var searchValue = this.lookupReference('searchFieldValue').getValue();
		
		var store =	btn.up('gridpanel').getStore();
		//var store = Ext.getCmp('userGridPanel').getStore();// Ext.getCmp(）需要在OrderPanel设置id属性
		Ext.apply(store.proxy.extraParams, {status:"",employeeName:"",storeName:"",employeeNumber:"",post:""});
		
		if(searchField==='employeeName'){
			Ext.apply(store.proxy.extraParams, {employeeName:searchValue});
		}else if(searchField==='storeName'){
			Ext.apply(store.proxy.extraParams, {storeName:searchValue});
		}else if(searchField==='employeeNumber'){
			Ext.apply(store.proxy.extraParams, {employeeNumber:searchValue});
		}else if(searchField==='post'){
			Ext.apply(store.proxy.extraParams, {post:searchValue});
		}
		/*store.load({params:{start:0, limit:20, page:1}});*/
		store.load();
	},
  //在线查询
  statusSearch:function(btn){ 
    var store = btn.up('gridpanel').getStore();
    //var store = Ext.getCmp('userGridPanel').getStore();// Ext.getCmp(）需要在OrderPanel设置id属性
    Ext.apply(store.proxy.extraParams, {status:"",employeeName:"",storeName:"",employeeNumber:"",post:""});
    Ext.apply(store.proxy.extraParams, {status:"在线"});
    //store.load({params:{start:0, limit:20, page:1}});
    store.load();
  },
	//发起视频会议	
	sponsorVidwoMeeting:function(btn, rowIndex, colIndex){
      	
            var grid = btn.up('gridpanel');
            var selModel = grid.getSelectionModel();
            var selectIds = []; //选中的id
            selectIds[0]=parseInt(video_userId);
            if (selModel.hasSelection()){
               var rows = selModel.getSelection();
               Ext.each(rows, function (row) {   
                      selectIds.push(row.data.id);
               });
            }
            var ids={
                  "userId":parseInt(video_userId),
                  "idGroup":selectIds
            }
            sessionStorage.setItem("orderPage_ids", JSON.stringify(ids));
            websocket.send(JSON.stringify({
                  "event":"bulidRoom",
                  "idGroup":selectIds
            }));
            window.open('https://'+window.location.host+'/a');
   }
});