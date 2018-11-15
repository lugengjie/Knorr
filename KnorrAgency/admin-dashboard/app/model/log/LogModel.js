Ext.define('Admin.model.log.LogModel', {
extend: 'Admin.model.Base',
requires: [
	'Ext.data.proxy.Rest'
],
	fields: [
		{type: 'int',name: 'id'},
		{type: 'string',name: 'employeeName'},
		{type: 'string',name: 'storeName'},
		{type: 'string',name: 'title'},
		{type:'string',name:'type'},
		{type:'string',name:'remoteAddr'},
		{type:'string',name:'requestUri'},
		{type:'string',name:'method'},
		{type:'string',name:'params'},
		{type: 'date', name: 'operateDate', dateFormat:'Y/m/d H:i:s'},
		{type: 'date', name: 'day', dateFormat:'Y/m/d H:i:s'},
		{type: 'int',name: 'time'}
	],
	proxy: {
		type: 'rest',
		url: '/log',
	}
});
