Ext.define('Admin.store.allattence.AllAttenceGridStroe', {
    extend: 'Ext.data.Store',
    storeId:'allAttenceGridStroe',
    alias: 'store.allAttenceGridStroe',
	model:'Admin.model.allattence.AllAttenceModel',

    //连接后台数据
  proxy: {
        type: 'ajax',
        url: 'attence/getAllAttence', 			//需要修改
        reader : new Ext.data.JsonReader({  
            type : 'json',  
            rootProperty  : 'content',
            totalProperty : 'totalElements'
        })
        ,simpleSortMode: true
    },
    groupField: 'storeName',
    remoteSort: true,
    sorters: [{ property: 'id',direction: 'desc'}],
    autoLoad: true
	
});
