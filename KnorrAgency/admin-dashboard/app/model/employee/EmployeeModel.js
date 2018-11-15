Ext.define('Admin.model.employee.EmployeeModel', {
    extend: 'Admin.model.Base',
    requires: [
		'Ext.data.proxy.Rest'
	],
    fields: [
	    {type: 'int',name: 'id'},
	    {type: 'string', name: 'picture'},
	    {type: 'string',name: 'employeeNumber'},
	    {type: 'string', name: 'employeeName'},
	    {type: 'string', name: 'email'},
	    {type: 'string', name: 'storeName'},
	    {type: 'string', name: 'storeNumber'},
	    {type: 'string', name: 'storeArea'},
	    {type: 'string', name: 'post'}
	],
	proxy: {
		type: 'rest',
		url: '/employee',
	}
});
