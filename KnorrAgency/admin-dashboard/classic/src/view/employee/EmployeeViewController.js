Ext.define('Admin.view.employee.EmployeeViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.employeeViewController',
    /********************************************** Controller View *****************************************************/
    /*Add*/
	openAddWindow:function(grid, rowIndex, colIndex){
		grid.up('container').add(Ext.widget('employeeAddWindow')).show();
	},
    /*Edit*/
	openEditWindow:function(grid, rowIndex, colIndex){
         var record = grid.getStore().getAt(rowIndex);
		//»ñÈ¡Ñ¡ÖÐÊý¾ÝµÄ×Ö¶ÎÖµ£ºconsole.log(record.get('id')); »òÕß console.log(record.data.id);
		if (record ) {
			var win = grid.up('container').add(Ext.widget('employeeEditWindow'));
			win.show();
			win.down('form').getForm().loadRecord(record);
		}
	},
	/*Search More*/	
	openSearchWindow:function(toolbar, rowIndex, colIndex){
		toolbar.up('grid').up('container').add(Ext.widget('employeeSearchWindow')).show();
	},
	/*comboboxÑ¡ÖÐºó¿ØÖÆ¶ÔÓ¦ÊäÈë£¨ÎÄ±¾¿òºÍÈÕÆÚ¿ò£©¿òÏÔÊ¾Òþ²Ø*/
	/*searchComboboxSelectChuang:function(combo,record,index){
		//alert(record.data.name);
		var searchField = this.lookupReference('searchFieldName').getValue();
		if(searchField==='createTime'){
			this.lookupReference('searchFieldValue').hide();
			this.lookupReference('searchDataFieldValue').show();
		}else{
			this.lookupReference('searchFieldValue').show();
			this.lookupReference('searchDataFieldValue').hide();
		}
		
	},*/
	/********************************************** Submit / Ajax / Rest *****************************************************/
	/*Add Submit*/	
	submitAddForm:function(btn){
		var win    = btn.up('window');
		var form = win.down('form');
		var record = Ext.create('Admin.model.employee.EmployeeModel');
		var values  =form.getValues();//»ñÈ¡formÊý¾Ý
		record.set(values);
		record.save();
		Ext.data.StoreManager.lookup('employeeGridStroe').load();
		win.close();
	},
	/*Edit Submit*/	
	submitEditForm:function(btn){
		var win    = btn.up('window');
		var store = Ext.data.StoreManager.lookup('employeeGridStroe');
		var values  = win.down('form').getValues();//»ñÈ¡formÊý¾Ý
		var record = store.getById(values.id);//»ñÈ¡id»ñÈ¡storeÖÐµÄÊý¾Ý
		record.set(values);//rest put 
		//store.load();
		win.close();
	},
		
	/*Quick Search*/	
	quickSearch:function(btn){
		var searchField = this.lookupReference('searchFieldName').getValue();
		var searchValue = this.lookupReference('searchFieldValue').getValue();
		//var searchDataFieldValue = this.lookupReference('searchDataFieldValue').getValue();
		var store =	btn.up('gridpanel').getStore();
		//var store = Ext.getCmp('userGridPanel').getStore();// Ext.getCmp(£©ÐèÒªÔÚOrderPanelÉèÖÃidÊôÐÔ
		Ext.apply(store.proxy.extraParams, {storeName:"",storeArea:"",post:""});
		
		if(searchField==='storeName'){
			Ext.apply(store.proxy.extraParams, {storeName:searchValue});
		}
		if(searchField==='storeArea'){
			Ext.apply(store.proxy.extraParams, {storeArea:searchValue});
		}
		if(searchField==='post'){
			Ext.apply(store.proxy.extraParams, {post:searchValue});
		}
		store.load({params:{start:0, limit:20, page:1}});
		
	},
	submitSearchForm:function(btn){
		//alert("submitSearchForm");
		var store =	Ext.data.StoreManager.lookup('employeeGridStroe');
		var win = btn.up('window');
		var form = btn.up('window').down('form');
		var values=form.getValues();
		Ext.apply(store.proxy.extraParams, {employeeNumber:"",employeeName:"",storeNumber:"",storeName:"",storeArea:"",post:""});
		Ext.apply(store.proxy.extraParams, {
			employeeNumber:values.employeeNumber,
			employeeName:values.employeeName,
			storeNumber:values.storeNumber,
			storeName:values.storeName,
			storeArea:values.storeArea,
			post:values.post
		});

		store.load({params:{start:0, limit:20, page:1}});
		win.close();
		//¸üÐÂÊÂ¼þ
	},
	/*Delete One Row*/	
	deleteOneRow:function(grid, rowIndex, colIndex){
	   Ext.MessageBox.confirm('提示', '确定要进行删除操作吗？数据将无法还原!',
  			function(btn, text){
            	if(btn=='yes'){
            		var store = grid.getStore();
					var record = store.getAt(rowIndex);
					store.remove(record);//DELETE //http://localhost:8081/order/112
					//store.sync();
				}
        	}
        , this);
	},
	/*Delete More Rows*/	
	/*deleteMoreRows:function(btn, rowIndex, colIndex){
	var grid = btn.up('gridpanel');
		var selModel = grid.getSelectionModel();
        if (selModel.hasSelection()) {
            Ext.Msg.confirm("提示", "确定要进行删除操作吗？", function (button) {
                if (button == "yes") {
                    var rows = selModel.getSelection();
                    var selectIds = []; //要删除的id
                    Ext.each(rows, function (row) {
                        selectIds.push(row.data.id);
                    });
                  	Ext.Ajax.request({ 
						url : '/employee/deletes', 
						method : 'delete', 
						params : { 
							//ids[] :selectIds
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
    },*/

	/*Disable*/	
	onDisableButton:function(grid, rowIndex, colIndex){
		Ext.Msg.alert("Title","Click Disable Button");
	}
});