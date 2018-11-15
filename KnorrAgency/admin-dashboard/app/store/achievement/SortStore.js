Ext.define('Admin.store.achievement.SortStore', {
	extend: 'Ext.data.Store',
	alias: 'store.sortStore',
	model:'Admin.model.achievement.SortModel',
	//连接后台数据
	proxy: {
		type: 'rest',
		url: '/achievement/sort',
		reader:{
			type:'json',
			rootProperty:'content',//对应后台返回的结果集名称
		},
		writer: {
			type: 'json'
		}
	},
	autoLoad: true,
	autoSync: true
	// data:{
	// 	'lists':[ 
 //            {"rank":1,"employeeName":"皇甫铁牛","word":"我就是那么优秀"},
 //            {"rank":2,"employeeName":"欧阳翠花","word":"像我这么优秀的还有三个"},
 //            {"rank":3,"employeeName":"诸葛钢蛋","word":"你们好优秀啊"},
 //            {"rank":4,"employeeName":"晓晓","word":"是啊"}
 //        ]
	// },
	// proxy: {
 //        type: 'memory',
 //        reader:{
 //            type:'json',
 //            rootProperty:'lists'
 //        }
 //    },
	// autoLoad: true
	
});
