Ext.define('Admin.view.contractapprove.ContractApproveViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.contractApproveViewModel',
    requires: [
        'Ext.data.Store',
        'Ext.data.proxy.Memory',
        'Ext.data.field.Integer',
        'Ext.data.field.String',
        'Ext.data.field.Date',
        'Ext.data.field.Boolean',
        'Ext.data.reader.Json'
    ],
    stores: {
        contractApproveLists:{type:'contractApproveStore'}
    }
});
