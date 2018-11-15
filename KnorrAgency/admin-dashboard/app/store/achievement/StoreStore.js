Ext.define('Admin.store.achievement.StoreStore', {
	extend: 'Ext.data.Store',
	alias: 'store.storeStore',
	model:'Admin.model.achievement.StoreModel',
	//连接后台数据
	// proxy: {
	// 	type: 'rest',
	// 	url: '/achievement',
	// 	reader:{
	// 		type:'json',
	// 		rootProperty:'content',//对应后台返回的结果集名称
	// 	},
	// 	writer: {
	// 		type: 'json'
	// 	}
	// },
	// autoLoad: true,
	// autoSync: true

	data:{
		'lists':[ 
			{storeName:'常平分店'},
			{storeName:'虎门分店'}
        ]
	},
	proxy: {
        type: 'memory',
        reader:{
            type:'json',
            rootProperty:'lists'
        }
    },
	autoLoad: true
	
});
