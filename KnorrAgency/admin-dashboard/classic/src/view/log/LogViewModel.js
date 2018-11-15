Ext.define('Admin.view.log.LogViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.LogViewModel',

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
		logLists: {type: 'logGridStroe'}
    }
});
