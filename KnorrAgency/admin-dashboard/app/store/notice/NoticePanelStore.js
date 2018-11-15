Ext.define('Admin.store.notice.NoticePanelStore', {
    extend: 'Ext.data.Store',
    alias: 'store.noticePanelStore',
    storeId:'noticePanelStore',
	model:'Admin.model.notice.NoticeModel',

    //连接后台数据
   proxy: {
		type: 'rest',
		url: '/notice',
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
	autoLoad: true,
    autoSync: true
 });