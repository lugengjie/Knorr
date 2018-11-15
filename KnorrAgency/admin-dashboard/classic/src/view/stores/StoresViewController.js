Ext.define('Admin.view.stores.StoresViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.storesViewController',
    /********************************************** Controller View *****************************************************/
    /*Add*/
	openAddWindow:function(grid, rowIndex, colIndex){
		grid.up('container').add(Ext.widget('storesAddWindow')).show();
	},
    /*Edit*/
	openEditWindow:function(grid, rowIndex, colIndex){
         var record = grid.getStore().getAt(rowIndex);
		//»ñÈ¡Ñ¡ÖÐÊý¾ÝµÄ×Ö¶ÎÖµ£ºconsole.log(record.get('id')); »òÕß console.log(record.data.id);
		if (record ) {
			var win = grid.up('container').add(Ext.widget('storesEditWindow'));
			win.show();
			win.down('form').getForm().loadRecord(record);
		}
	},
	/*Search More*/	
	openSearchWindow:function(toolbar, rowIndex, colIndex){
		toolbar.up('grid').up('container').add(Ext.widget('storesSearchWindow')).show();
	},
	/********************************************** Submit / Ajax / Rest *****************************************************/
	/*Add Submit*/	
	submitAddForm:function(btn){
		var win    = btn.up('window');
		var form = win.down('form');
		var record = Ext.create('Admin.model.stores.StoresModel');
		var values  =form.getValues();//»ñÈ¡formÊý¾Ý
		record.set(values);
		record.save();
		Ext.data.StoreManager.lookup('storesGridStroe').load();
		win.close();
	},
	/*Edit Submit*/	
	submitEditForm:function(btn){
		var win    = btn.up('window');
		var store = Ext.data.StoreManager.lookup('storesGridStroe');
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
		Ext.apply(store.proxy.extraParams, {storeName:"",storeArea:""});
		
		if(searchField==='storeName'){
			Ext.apply(store.proxy.extraParams, {storeName:searchValue});
		}
		if(searchField==='storeArea'){
			Ext.apply(store.proxy.extraParams, {storeArea:searchValue});
		}
		store.load({params:{start:0, limit:20, page:1}});
	},
	/*Delete One Row*/	
	deleteOneRow:function(grid, rowIndex, colIndex){
	   Ext.MessageBox.confirm('提示', '确定要进行删除操作吗？旗下门店及员工信息也会删除!',
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

	//跳转到employee的grid且显示旗下的employee
	/*showEmployee:function(grid, rowIndex, colIndex){
		var record = grid.getStore().getAt(rowIndex);
	}*/
});