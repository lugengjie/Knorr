Ext.define('Admin.model.person.ColleagueModel', {
    extend: 'Admin.model.Base',
    requires: [
		'Ext.data.proxy.Rest'
	],
    fields: [
	    {type: 'int',name: 'id'},
	    {type: 'string', name: 'picture'},
	    {type: 'string',name: 'employeeNumber'},
	    {type: 'string', name: 'employeeName'},
	    {type: 'string', name: 'post'}
	],
	proxy: {
		type: 'rest',
		url: '/person/getColleague',
	}
});
