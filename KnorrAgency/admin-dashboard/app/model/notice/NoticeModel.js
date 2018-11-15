Ext.define('Admin.model.notice.NoticeModel', {
extend: 'Admin.model.Base',
requires: [
	'Ext.data.proxy.Rest'
],
	fields: [
		{type: 'int',name: 'id'},
		{type: 'string',name: 'message'},
		{type: 'date', name: 'time', dateFormat:'Y/m/d H:i:s'}
		
	],
	proxy: {
		type: 'rest',
		url: '/notice',
	}
});

