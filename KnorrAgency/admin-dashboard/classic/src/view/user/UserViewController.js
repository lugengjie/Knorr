Ext.define('Admin.view.user.UserViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.userViewController',
    
    /*修改用户资料*/
	onEditButton:function(grid, rowIndex, colIndex){
		/*打开窗口*/
		var record = grid.getStore().getAt(rowIndex);
	    //获取选中数据的字段值：console.log(record.get('id')); 或者 console.log(record.data.id);
		if (record ) {
			var win = grid.up('container').add(Ext.widget('userEditWindow'));
			win.show();
			win.down('form').getForm().loadRecord(record);
		}

	},
	/*提交修改后的信息*/
	submitUserEditFormButton:function(btn){
		var win = btn.up('window');
		var store = Ext.data.StoreManager.lookup('userGridStroe');
    	var values  = win.down('form').getValues();//获取form数据
    	var record = store.getById(values.id);//获取id获取store中的数据
        record.set(values);
    	/*store.load();*/
        win.close();
	},

	onDisableButton:function(grid, rowIndex, colIndex){
		Ext.Msg.alert("Title","Click Disable Button");
	},


	/*简单查询*/	
	quickSearch:function(btn){
		//alert("quickSearch");
		var searchField = this.lookupReference('searchFieldName').getValue();
		var searchValue = this.lookupReference('searchFieldValue').getValue();
	    var searchDataFieldValue = this.lookupReference('searchDataFieldValue').getValue();
	    var searchDataFieldValue2 = this.lookupReference('searchDataFieldValue2').getValue();
		var store =	btn.up('gridpanel').getStore();
		//var store = Ext.getCmp('userGridPanel').getStore();// Ext.getCmp(）需要在OrderPanel设置id属性
		Ext.apply(store.proxy.extraParams, {userName:"",timeStart:"",timeEnd:""});
		if(searchField==='userName'){
			Ext.apply(store.proxy.extraParams, {userName:searchValue});
		}
		if(searchField==='createTime'){
			Ext.apply(store.proxy.extraParams,{
		        timeStart:Ext.util.Format.date(searchDataFieldValue, 'Y/m/d H:i:s'),
		        timeEnd:Ext.util.Format.date(searchDataFieldValue2, 'Y/m/d H:i:s')
		     });
		}
		store.load({params:{start:0, limit:20, page:1}});
	},

	/*combobox选中后控制对应输入（文本框和日期框）框显示隐藏*/
	searchComboboxSelectChange:function(){
		var searchField = this.lookupReference('searchFieldName').getValue();
		if(searchField==='createTime'){
			this.lookupReference('searchFieldValue').hide();
			this.lookupReference('searchDataFieldValue').show();
      this.lookupReference('searchDataFieldValue2').show();
		}else{
			this.lookupReference('searchFieldValue').show();
			this.lookupReference('searchDataFieldValue').hide();
      this.lookupReference('searchDataFieldValue2').hide();
		}
	},

	/*高级查询*/
	openSearchWindow:function(toolbar, rowIndex, colIndex){
		toolbar.up('grid').up('container').add(Ext.widget('userSearchWindow')).show();
	},
	submitSearchForm:function(btn){
  		  var store = Ext.data.StoreManager.lookup('userGridStroe');
	      var win = btn.up('window');
	      var form = win.down('form');
	      var values  = form.getValues();
	      Ext.apply(store.proxy.extraParams, {userName:"",timeStart:"",timeEnd:""});
	      Ext.apply(store.proxy.extraParams,{
	        userName:values.userName,
	        timeStart:Ext.util.Format.date(values.timeStart, 'Y/m/d H:i:s'),
	        timeEnd:Ext.util.Format.date(values.timeEnd, 'Y/m/d H:i:s')
	      });
	      store.load({params:{start:0, limit:20, page:1}});
	      win.close();
	},

	/*增加用户*/
	openAddWindow:function(toolbar, rowIndex, colIndex){
		toolbar.up('grid').up('container').add(Ext.widget('userAddWindow')).show();
	},
	submitAddForm:function(btn){
	  	  var win    = btn.up('window');
	      var form = win.down('form');
	      var record = Ext.create('Admin.model.user.UserModel');
	      var values  =form.getValues();//获取form数据
	      record.set(values);
	      record.save();
	      Ext.data.StoreManager.lookup('userGridStroe').load();
	      win.close();
	},

	/*删除一条*/	
	onDeleteButton:function(grid, rowIndex, colIndex){

		Ext.MessageBox.confirm('提示','确定删除吗？',
			function(btn,text){
				if(btn=='yes'){
					var store = grid.getStore();
					var record = store.getAt(rowIndex);
					store.remove(record);//GET //http://localhost:8081/order/112
					//store.sync();
				}

			}
		,this);

	},

	/*删除多条*/	
	deleteMoreRows:function(btn, rowIndex, colIndex){
      var grid = btn.up('gridpanel');
      var selModel = grid.getSelectionModel();
      if (selModel.hasSelection()){
          Ext.Msg.confirm("警告", "确定要删除吗？", function (button) {
              if (button == "yes") {
                  var rows = selModel.getSelection();
                  var selectIds = []; //要删除的id
                  Ext.each(rows, function (row) {
                      selectIds.push(row.data.id);
                  });
                  Ext.Ajax.request({
                      url : '/user/deletes', 
                      method : 'post', 
                      params : { 
                        ids :selectIds
                      }, 
                      success: function(response, options) {
                          var json = Ext.util.JSON.decode(response.responseText);
                          if(json.success){
                            Ext.Msg.alert('操作成功', json.msg, function() {
                                  grid.getStore().reload();
                              });
                          }else{
                             Ext.Msg.alert('操作失败', json.msg);
                          }
                      }
                  });
              }
          });
      }else {
            Ext.Msg.alert("错误", "没有任何行被选中，无法进行删除操作！");
      }
		
   }
   
});
