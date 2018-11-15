Ext.define('Admin.model.stores.StoresModel', {
    extend: 'Admin.model.Base',
    requires: [
		'Ext.data.proxy.Rest'
	],
    fields: [
	    {type: 'int',name: 'id'},
	    {type: 'string', name: 'storeName'},
	    {type: 'string', name: 'storeNumber'},
	    {type: 'string', name: 'storeArea'},
	    {type: 'string', name: 'fatherStoreName'}
	],
	proxy: {
		type: 'rest',
		url: '/store',
	}
});
