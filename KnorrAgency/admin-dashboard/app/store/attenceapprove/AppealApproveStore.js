Ext.define('Admin.store.attenceapprove.AppealApproveStore', {
    extend: 'Ext.data.Store',
    storeId:'appealApproveStore',
    alias: 'store.appealApproveStore',
    model: 'Admin.model.attenceapprove.AppealApproveModel',
    //pageSize: 25,
    proxy: {
        type: 'ajax',
        url: 'attence/tasks', 			//需要修改
        reader : new Ext.data.JsonReader({  
            type : 'json',  
            rootProperty  : 'content',
            totalProperty : 'totalElements'
        })
        ,simpleSortMode: true
    },
    remoteSort: true,
    sorters: [{ property: 'id',direction: 'desc'}],
    autoLoad: true
});	