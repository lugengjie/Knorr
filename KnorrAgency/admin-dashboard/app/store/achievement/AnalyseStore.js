Ext.define('Admin.store.achievement.AnalyseStore', {
	extend: 'Ext.data.Store',
	alias: 'store.analyseStore',
	storeId:'analyseStore',
	model:'Admin.model.achievement.AnalyseModel',
	// 连接后台数据
	proxy: {
		type: 'rest',
		url: '/achievement/analyse',
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
 //            	"winner":"皇甫铁牛",
 //            	"monthTotal":2000000,
 //            	"monthRate":10,
 //            	"peopleNum":20
 //            }
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
