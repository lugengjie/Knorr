Ext.define('Admin.view.file.FileViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.fileViewModel',

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
		editLists: {type: 'editGridStroe'},
        inboxLists:{type: 'inboxGridStroe'},
        sendLists:{type: 'sendGridStroe'}
    }
});
