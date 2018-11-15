Ext.define('Admin.store.user.UserGridStroe', {
    extend: 'Ext.data.Store',
    alias: 'store.userGridStroe',
	model:'Admin.model.user.UserModel',
	data: {
		'content':[{
	        "id": 1,
			"userName": "No001",
			"createTime": "2018/09/08 19:40:52"

	    },{
	        "id": 2,
			"userName": "No002",
			"createTime": "2018/09/08 19:40:52"
    	},{
	        "id": 3,
			"userName": "No003",
			"createTime": "2018/09/08 19:40:52"

	    },{
	        "id": 4,
			"userName": "No004",
			"createTime": "2018/09/08 19:40:52"
    	},{
	        "id": 5,
			"userName": "No004",
			"createTime": "2018/09/08 19:40:52"

	    },{
	        "id": 6,
			"userName": "No006",
			"createTime": "2018/09/08 19:40:52"
    	},{
	        "id": 7,
			"userName": "No001",
			"createTime": "2018/09/08 19:40:52"

	    },{
	        "id": 8,
			"userName": "No002",
			"createTime": "2018/09/08 19:40:52"
    	},{
	        "id": 9,
			"userName": "No001",
			"createTime": "2018/09/08 19:40:52"

	    },{
	        "id": 10,
			"userName": "No0021",
			"createTime": "2018/09/08 19:40:52"
    	},{
	        "id": 11,
			"userName": "No0011",
			"createTime": "2018/09/08 19:40:52"

	    },{
	        "id": 12,
			"userName": "No0012",
			"createTime": "2018/09/08 19:40:52"
    	},{
	        "id": 13,
			"userName": "No0013",
			"createTime": "2018/09/08 19:40:52"

	    },{
	        "id": 14,
			"userName": "No0014",
			"createTime": "2018/09/08 19:40:52"
    	},{
	        "id": 15,
			"userName": "No001",
			"createTime": "2018/09/08 19:40:52"

	    },{
	        "id": 16,
			"userName": "No0021",
			"createTime": "2018/09/08 19:40:52"
    	},{
	        "id": 17,
			"userName": "No0011",
			"createTime": "2018/09/08 19:40:52"

	    },{
	        "id": 18,
			"userName": "No0012",
			"createTime": "2018/09/08 19:40:52"
    	},{
	        "id": 19,
			"userName": "No0013",
			"createTime": "2018/09/08 19:40:52"

	    },{
	        "id": 20,
			"userName": "No0014",
			"createTime": "2018/09/08 19:40:52"
    	}]
    },
    proxy: {
        type: 'memory',
        //url: '~api/search/users'	//mvc url  xxx.json
	    reader:{
	    	type:'json',
	    	rootProperty:'content'
	    }
    },

    autoLoad: 'true',
     pageSize:10,
    sorters: {
        direction: 'ASC',
        property: 'userName'
    }


    //连接后台数据
   /*proxy: {
		type: 'rest',
		url: '/user',
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
    autoSync:true,
    remoteSort:true,
    pageSize:20,
    sorters: {
        direction: 'ASC',
        property: 'id'
    }
	*/
});
