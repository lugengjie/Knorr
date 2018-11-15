Ext.define('Admin.store.file.InboxGridStroe', {
    extend: 'Ext.data.Store',
    storeId:'inboxGridStroe',
    alias: 'store.inboxGridStroe',
	model:'Admin.model.file.FileModel',

    //连接后台数据
   proxy: {
		type: 'rest',
		url: '/email/findInbox',
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
	autoLoad: 'true',
	groupField: 'sendDay',
    autoSync:true,
    remoteSort:true,
    pageSize:20,
    sorters: {
        direction: 'ASC',
        property: 'id'
    }
	
});
