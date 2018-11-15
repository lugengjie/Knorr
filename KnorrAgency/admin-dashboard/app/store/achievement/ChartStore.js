Ext.define('Admin.store.achievement.ChartStore', {
	extend: 'Ext.data.Store',
	storeId:'chartStore',
	alias: 'store.chartStore',
	model:'Admin.model.achievement.ChartModel',
	//连接后台数据
	proxy: {
		type: 'rest',
		url: '/achievement',
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
	// 		{
 //            	"total": 1000,
 //            	"employeeName":"小红"
 //            },
 //        	{
 //           	 	"total": 3000,
 //           		 "employeeName":"小明"
 //        	},
 //        	{
 //            	"total": 2000,
 //            	"employeeName":"小狼"
 //        	}
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
