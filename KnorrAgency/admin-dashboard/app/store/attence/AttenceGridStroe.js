Ext.define('Admin.store.attence.AttenceGridStroe', {
    extend: 'Ext.data.Store',
    storeId:'attenceGridStroe',
    alias: 'store.attenceGridStroe',
	model:'Admin.model.attence.AttenceModel',

    //连接后台数据
   proxy: {
		type: 'rest',
		url: '/attence',
		reader:{
			type:'json',
			rootProperty:'content',//对应后台返回的结果集名称
			totalProperty: 'totalElements'//分页需要知道总记录数
		},
		writer: {
			type: 'json'
		},
		simpleSortMode: true	//简单排序模式
	},
	groupField: 'day',
	autoLoad: 'true',
    autoSync:true,
    remoteSort:true,
    pageSize:20,
    sorters: {
        direction: 'ASC',
        property: 'id'
    }
	
});
