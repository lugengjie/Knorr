Ext.define('Admin.model.user.UserModel', {
extend: 'Admin.model.Base',
requires: [
	'Ext.data.proxy.Rest'
],
	fields: [
		{type: 'int',name: 'id'},
		{type: 'string',name: 'userName'},
		{type: 'date', name: 'createTime', dateFormat:'Y/m/d H:i:s'}
	],
	proxy: {
		type: 'rest',
		url: '/user',
	}
});

