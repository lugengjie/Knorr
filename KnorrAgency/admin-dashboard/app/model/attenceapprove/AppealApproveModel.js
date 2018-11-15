Ext.define('Admin.model.attenceapprove.AppealApproveModel', {
    extend: 'Admin.model.Base',
    fields: [	//需要修改
		 {type: 'int' ,name: 'id'}
        ,{type: 'string' ,name: 'employeeName'}
        ,{type: 'string' ,name: 'location'}
		,{type: 'date' 	 ,name: 'workinTime'}
		,{type: 'date'	 ,name: 'workoutTime'}
        ,{type: 'string' ,name: 'attenceStatus'}
        ,{type: 'string' ,name: 'processStatus'}
        ,{type: 'string' ,name: 'appealreason'}

        ,{type: 'date'   ,name: 'applyTime'}
        ,{type: 'string' ,name: 'taskId'}
        ,{type: 'string' ,name: 'taskName'}
        ,{type: 'date' ,name: 'taskCreateTime'}
        ,{type: 'string' ,name: 'assignee'}
        ,{type: 'string' ,name: 'taskDefinitionKey'}
        ,{type: 'string' ,name: 'processInstanceId'}
        ,{type: 'string' ,name: 'processDefinitionId'}
        ,{type: 'boolean' ,name: 'suspended'}
        ,{type: 'int' ,name: 'version'}
        ,{type: 'string' ,name: 'deptLeaderBackReason'}
        ,{type: 'string' ,name: 'hrBackReason'}
    ]
});

