Ext.define('Admin.view.addressList.AddressListViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.addressListViewModel',

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
		addressListLists: {type: 'addressListPanelStroe'}
    }
});
