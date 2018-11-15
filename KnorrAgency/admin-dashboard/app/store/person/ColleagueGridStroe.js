Ext.define('Admin.store.person.ColleagueGridStroe', {
	extend: 'Ext.data.Store',
	storeId:'colleagueGridStroe',
	alias: 'store.colleagueGridStroe',
	model:'Admin.model.person.ColleagueModel',
	proxy: {
		type: 'rest',
		url: '/person/getColleague',
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
	//pageSize: 20,
	sorters: {
		direction: 'DESC',property: 'id'
	}
});
