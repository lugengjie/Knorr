Ext.define('Admin.store.addressList.AddressListPanelStroe', {
    extend: 'Ext.data.Store',
    alias: 'store.addressListPanelStroe',
	model:'Admin.model.addressList.AddListModel',

    // 连接后台数据
   proxy: {
		type: 'rest',
		url: '/addressList',
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
 // data:{
	// 	'lists':[ 
	// 		{"id":1,"employeeName":"小红",'storeNumber':'1','storeArea':'常平分店'},
	// 		{"id":2,"employeeName":"小红",'storeNumber':'1','storeArea':'常平分店'}
 //        ]
	// },
	// proxy: {
 //        type: 'memory',
 //        //url: '~api/search/users'  //mvc url  xxx.json
 //        reader:{
 //            type:'json',
 //            rootProperty:'lists'
 //        }
 //    },
	// autoLoad: true
});
