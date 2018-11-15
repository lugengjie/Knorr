Ext.define('Admin.view.stores.StoresViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.storesViewModel',

    requires: [
        'Ext.data.Store',
        'Ext.data.proxy.Memory',
        'Ext.data.field.Integer',
        'Ext.data.field.String',
        /*'Ext.data.field.Date',
        'Ext.data.field.Boolean',*/
        'Ext.data.reader.Json'
    ],



    stores: {
		storesLists: {type: 'storesGridStroe'}
    }
});