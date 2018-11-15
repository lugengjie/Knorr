Ext.define('Admin.store.stores.StoresGridStroe', {
	extend: 'Ext.data.Store',
	storeId:'storesGridStroe',
	alias: 'store.storesGridStroe',
	model:'Admin.model.stores.StoresModel',
	proxy: {
		type: 'rest',
		url: '/store',
		reader:{
			type:'json',
			rootProperty:'content',//¶ÔÓ¦ºóÌ¨·µ»ØµÄ½á¹û¼¯Ãû³Æ
			totalProperty: 'totalElements'//·ÖÒ³ÐèÒªÖªµÀ×Ü¼ÇÂ¼Êý
		},
		writer: {
			type: 'json'
		},
		simpleSortMode: true	//¼òµ¥ÅÅÐòÄ£Ê½
	},
	autoLoad: true,
	autoSync: true,
	remoteSort: true,//È«¾Ö(Ô¶³Ì)ÅÅÐò
	pageSize: 10,
	sorters: {
		direction: 'DESC',property: 'id'
	}
});
