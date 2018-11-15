﻿Ext.define('Admin.store.processdefinition.ProcessDefinitionStroe', {
    extend: 'Ext.data.Store',
    storeId:'processDefinitionStroe',
    alias: 'store.processDefinitionStroe',
	model:'Admin.model.processdefinition.ProcessDefinitionModel',
    pageSize: 15,
    proxy: {
        type: 'ajax',
        url: '/process-definition',
        reader : {  
            type : 'json',  
            rootProperty  : 'content',
            totalProperty : 'totalElements'
        }
        ,simpleSortMode: true
    },
    remoteSort: true,
    sorters: [{ property: 'id',direction: 'desc'}],
    autoLoad: true,
    listeners: {}
});
