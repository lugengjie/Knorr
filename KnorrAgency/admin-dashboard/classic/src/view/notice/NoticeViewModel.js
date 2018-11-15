Ext.define('Admin.view.notice.NoticeViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.noticeViewModel',

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
		noticeDate: {type: 'noticePanelStore'}
    }
});
