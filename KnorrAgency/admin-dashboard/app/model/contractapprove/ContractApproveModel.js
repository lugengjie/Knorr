Ext.define('Admin.model.contractapprove.ContractApproveModel', {
    extend: 'Admin.model.Base',
    fields: [	//需要修改
		 {type: 'int' ,name: 'id'}
        ,{type: 'string' ,name: 'userId'}

        ,{type: 'string' ,name: 'contractNumber'}
        ,{type: 'string' ,name: 'customerName'}
        ,{type: 'string' ,name: 'houseName'}
        ,{type: 'string' ,name: 'employeeName'}
        ,{type: 'date' ,name: 'startTime'}
        ,{type: 'date' ,name: 'endTime'}
        ,{type: 'string' ,name: 'contractType'}
        ,{type: 'float' ,name: 'total'}
        ,{type: 'string' ,name: 'area'}

        ,{type: 'string' ,name: 'processStatus'}
        ,{type: 'string' ,name: 'processInstanceId'}
        ,{type: 'string' ,name: 'taskId'}
        ,{type: 'string' ,name: 'taskName'}
        ,{type: 'date' ,name: 'taskCreateTime'}
        ,{type: 'string' ,name: 'assignee'}
        ,{type: 'string' ,name: 'taskDefinitionKey'}
        ,{type: 'string' ,name: 'processDefinitionId'}
        ,{type: 'boolean' ,name: 'suspended'}
        ,{type: 'int' ,name: 'version'}

        ,{type: 'string' ,name: 'depreason'}
        ,{type: 'string' ,name: 'manreason'}
    ]
});


    


    

    
