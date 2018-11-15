Ext.define('Admin.view.person.ColleagueViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.colleagueViewModel',

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
		colleagueLists: {type: 'colleagueGridStroe'}
    }
});