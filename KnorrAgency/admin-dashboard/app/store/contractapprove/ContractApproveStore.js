Ext.define('Admin.store.contractapprove.ContractApproveStore', {
    extend: 'Ext.data.Store',
    storeId:'contractApproveStore',
    alias: 'store.contractApproveStore',
    model: 'Admin.model.contractapprove.ContractApproveModel',
    //pageSize: 25,
    proxy: {
        type: 'ajax',
        url: 'contract/tasks', 			//需要修改
        reader : new Ext.data.JsonReader({  
            type : 'json',  
            rootProperty  : 'content',
            totalProperty : 'totalElements'
        })
        ,simpleSortMode: true
    },
    groupField: 'taskName',
    remoteSort: true,
    sorters: [{ property: 'id',direction: 'desc'}],
    autoLoad: true
});	