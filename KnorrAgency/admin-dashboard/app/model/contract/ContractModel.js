Ext.define('Admin.model.contract.ContractModel', {
extend: 'Admin.model.Base',
requires: [
	'Ext.data.proxy.Rest'
],
	fields: [
		{type: 'int',name: 'id'},
		{type: 'string',name: 'contractNumber'},
		{type: 'string',name: 'customerName'},
		{type: 'string',name: 'houseName'},
		{type: 'string',name: 'employeeName'},
		{type: 'date', name: 'startTime', dateFormat:'Y/m/d H:i:s'},
		{type: 'date', name: 'endTime', dateFormat:'Y/m/d H:i:s'},
		{type: 'date', name: 'day', dateFormat:'Y/m/d H:i:s'},
		{type: 'string',name: 'contractType'},
		{type: 'float',name: 'total'},
		{type: 'string',name: 'storeName'},
		{type:'string',name:'processInstanceId'},
		{type:'string',name:'processStatus'}
	],
	proxy: {
		type: 'rest',
		url: '/contract',
	}
});
