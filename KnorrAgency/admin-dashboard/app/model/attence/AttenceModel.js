Ext.define('Admin.model.attence.AttenceModel', {
extend: 'Admin.model.Base',
requires: [
	'Ext.data.proxy.Rest'
],
	fields: [
		{type: 'int',name: 'id'},
		{type: 'string',name: 'employeeName'},
		{type: 'string',name: 'location'},
		{type: 'date', name: 'workinTime', dateFormat:'Y/m/d H:i:s'},
		{type: 'date', name: 'workoutTime', dateFormat:'Y/m/d H:i:s'},
		{type: 'date', name: 'day', dateFormat:'Y/m/d H:i:s'},
		{type:'string',name:'attenceStatus'},
		{type:'string',name:'processInstanceId'},
		{type:'string',name:'processStatus'},
		{type:'string',name:'userId'},
		{type:'string',name:'appealreason'},
		{type:'string',name:'deptLeaderBackReason'},
		{type:'string',name:'hrBackReason'}
	],
	proxy: {
		type: 'rest',
		url: '/attence',
	}
});
