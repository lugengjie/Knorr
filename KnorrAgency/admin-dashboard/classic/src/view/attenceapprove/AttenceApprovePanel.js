Ext.define('Admin.view.attenceapprove.AttenceApprovePanel', {
    extend: 'Ext.tab.Panel',
	xtype:'attenceApprovePanel',

	requires: [
        'Ext.grid.Panel',
        'Ext.toolbar.Paging',
        'Ext.form.field.ComboBox',
        'Ext.grid.column.Date',
        'Ext.selection.CheckboxModel'
    ],
    layout: 'fit',
    items:[
    	{
    		title:'请假审核',
    		xtype: 'gridpanel',
    		cls:'process-definition-grid',
			bind: '{leaveApproveList}',
			layout:'fit',
			columns: [{
					xtype: 'actioncolumn',
					items: [{
						xtype: 'button',
						iconCls: 'x-fa fa-pencil',
						tooltip: '签收任务',
						getClass: function(v, meta, rec) {
				            if (rec.get('assignee')!='') {
				                  return 'x-hidden';
				            }
				            return 'x-fa fa-pencil';
						},
						handler: 'onClickLeaveApproveClaimButton'	//ajax  taskId
					},{
						xtype: 'button',
						iconCls: 'x-fa fa-edit',
						tooltip: '审批任务',
						getClass: function(v, meta, rec) {
				            if (rec.get('assignee')=='') {
				                  return 'x-hidden';
				            }
				            return 'x-fa fa-edit';
						},
						handler: 'onClickLeaveApproveCompleteWindowButton'	//taskDefinitionKey 动态表单
					},{
						xtype: 'button',
						iconCls: 'x-fa fa-object-group',
						tooltip: '任务跟踪',
						handler: 'onClickGraphTraceButton'	//流程跟踪
					}],
					cls: 'content-column',
					width: 120,
					dataIndex: 'bool',
					text: '操作',
					tooltip: 'edit '
				}
				,{header: 'id' 			,dataIndex: 'id',width: 60,sortable: true	,hidden:true}
				,{header: '审核状态',dataIndex: 'processStatus',width: 100,sortable: true,
		            renderer: function(val) {
			            if (val =='NEW') {
				            return '<span style="color:green;">新建</span>';
				        } else if (val =='APPROVAL') {
				            return '<span style="color:blue;">审批中...</span>';
				        } else if (val =='COMPLETE') {
				            return '<span style="color:orange;">完成审批</span>';
				        }else{
				        	return '<span style="color:red;">取消申请</span>';
				        }
				        return val;
		            }
				}
				,{header: '申请人'  		,dataIndex: 'userId',width:120,sortable: true}
				,{header: '拟请假开始时间' 	,dataIndex: 'startTime',width: 150,sortable: true,renderer: Ext.util.Format.dateRenderer('Y/m/d H:i:s')}
				,{header: '拟请假结束时间' 			,dataIndex: 'endTime',width: 150,sortable: true,renderer: Ext.util.Format.dateRenderer('Y/m/d H:i:s')}
				,{header: '请假开始时间' 	,dataIndex: 'realityStartTime',hidden:true,width: 150,sortable: true,renderer: Ext.util.Format.dateRenderer('Y/m/d H:i:s')}
				,{header: '请假结束时间' 	,dataIndex: 'realityEndTime',hidden:true,width: 150,sortable: true,renderer: Ext.util.Format.dateRenderer('Y/m/d H:i:s')}
				,{header: '申请提交时间' 	,dataIndex: 'applyTime',width: 150,sortable: true,renderer: Ext.util.Format.dateRenderer('Y/m/d H:i:s')}
				,{header: '请假类型'  	,dataIndex: 'leaveType',width: 80,sortable: true,
		            renderer: function(val) {
			            if (val =='A') {
				            return '<span style="color:green;">带薪假期</span>';
				        } else if (val =='B') {
				            return '<span style="color:red;">无薪假期</span>';
				        } else if (val =='C') {
				            return '<span style="color:blue;">病假</span>';
				        }
				        return val;
		            }
		        }
				,{header: '请假原因' 		,dataIndex: 'reason',width: 80,sortable: true}
				,{header: 'processInstanceId' ,dataIndex: 'processInstanceId',width: 80,sortable: true,hidden:true}
				,{header: 'taskId'  		,dataIndex: 'taskId',width: 80,sortable: true,hidden:true}
				,{header: '审核名称'  		,dataIndex: 'taskName',width: 80,sortable: true}
				,{header: '审核时间'  ,dataIndex: 'taskCreateTime',flex:1,width: 150,sortable: true,renderer: Ext.util.Format.dateRenderer('Y/m/d H:i:s')}
				,{header: 'assignee'  		,dataIndex: 'assignee',width: 80,sortable: true,hidden:true}
				,{header: 'taskDefinitionKey',dataIndex: 'taskDefinitionKey',width: 80,sortable: true,hidden:true}
				,{header: 'processDefinitionId'	,dataIndex: 'processDefinitionId',width: 80,sortable: true,hidden:true}
				,{header: 'suspended'  		,dataIndex: 'suspended',width: 80,sortable: true,hidden:true}
				,{header: 'version'  		,dataIndex: 'version',width: 60,sortable: true,hidden:true}
				,{header: '部门经理意见' ,dataIndex: 'deptLeaderBackReason',hidden:true,width: 60,sortable: true}
				,{header: '人事部经理意见' ,dataIndex: 'hrBackReason',hidden:true,width: 60,sortable: true}
			],
			dockedItems: [{
			    xtype: 'pagingtoolbar',
			    dock: 'bottom',
				bind: '{leaveApproveList}',	
			    displayInfo: true
			}]
    	},
    	{
    		title:'申诉审核',
    		xtype: 'gridpanel',
    		cls:'process-definition-grid',
			bind: '{appealApproveList}',
			layout:'fit',
			columns: [{
					xtype: 'actioncolumn',
					items: [{
						xtype: 'button',
						iconCls: 'x-fa fa-pencil',
						tooltip: '签收任务',
						getClass: function(v, meta, rec) {
				            if (rec.get('assignee')!='') {
				                  return 'x-hidden';
				            }
				            return 'x-fa fa-pencil';
						},
						handler: 'onClickAppealApproveClaimButton'	//ajax  taskId
					},{
						xtype: 'button',
						iconCls: 'x-fa fa-edit',
						tooltip: '审批任务',
						getClass: function(v, meta, rec) {
				            if (rec.get('assignee')=='') {
				                  return 'x-hidden';
				            }
				            return 'x-fa fa-edit';
						},
						handler: 'onClickAppealApproveCompleteWindowButton'	//taskDefinitionKey 动态表单
					},{
						xtype: 'button',
						iconCls: 'x-fa fa-object-group',
						tooltip: '任务跟踪',
						handler: 'onClickGraphTraceButton'	//流程跟踪
					}],
					cls: 'content-column',
					width: 120,
					dataIndex: 'bool',
					text: '操作',
					tooltip: 'edit '
				}
				,{header: 'id' 			,dataIndex: 'id',width: 60,sortable: true	,hidden:true}
				,{header: '审核状态',dataIndex: 'processStatus',width: 120,sortable: true,
		            renderer: function(val) {
			            if (val =='NEW') {
				            return '<span style="color:green;">未发起申诉</span>';
				        } else if (val =='APPROVAL') {
				            return '<span style="color:blue;">申诉审批中...</span>';
				        } else if (val =='COMPLETE') {
				            return '<span style="color:orange;">完成审批</span>';
				        }else{
				        	return '<span style="color:red;">取消申诉</span>';
				        }
				        return val;
		            }
				}
				,{header: '申请人'  		,dataIndex: 'employeeName',width: 120,sortable: true}
				,{header: '待申诉开始时间' 	,dataIndex: 'workinTime',width: 180,sortable: true,renderer: Ext.util.Format.dateRenderer('Y/m/d H:i:s')}
				,{header: '待申诉结束时间' 	,dataIndex: 'workoutTime',width: 180,sortable: true,renderer: Ext.util.Format.dateRenderer('Y/m/d H:i:s')}
				,{header: '原上班状态',dataIndex: 'attenceStatus',width: 120,sortable: true,
		            renderer: function(val) {
			            if (val =='NORMAL') {
                            return '<span style="color:green;">正常</span>';
                        } else if (val =='LEAVE') {
                            return '<span style="color:blue;">请假</span>';
                        } else if (val =='LATER') {
                            return '<span style="color:red;">迟到</span>';
                        }else if (val =='EARLY') {
                            return '<span style="color:red;">早退</span>';
                        }else if (val =='EARLYandLATER') {
                            return '<span style="color:red;">迟到,早退</span>';
                        }
                        return val;
		            }
				 }
				,{header: '申诉原因' 		,dataIndex: 'appealreason',width: 120,sortable: true}
				,{header: '申诉提交时间' 	,dataIndex: 'applyTime',width: 150,sortable: true,renderer: Ext.util.Format.dateRenderer('Y/m/d H:i:s')}
				,{header: 'processInstanceId' ,dataIndex: 'processInstanceId',width: 80,sortable: true,hidden:true}
				,{header: 'taskId'  		,dataIndex: 'taskId',width: 80,sortable: true,hidden:true}
				,{header: '审核名称'  		,dataIndex: 'taskName',width: 120,sortable: true}
				,{header: '审核时间'  ,dataIndex: 'taskCreateTime',width: 150,sortable: true,renderer: Ext.util.Format.dateRenderer('Y/m/d H:i:s')}
				,{header: 'assignee'  		,dataIndex: 'assignee',width: 80,sortable: true,hidden:true}
				,{header: 'taskDefinitionKey',dataIndex: 'taskDefinitionKey',width: 80,sortable: true,hidden:true}
				,{header: 'processDefinitionId'	,dataIndex: 'processDefinitionId',width: 80,sortable: true,hidden:true}
				,{header: 'suspended'  		,dataIndex: 'suspended',width: 80,sortable: true,hidden:true}
				,{header: 'version'  		,dataIndex: 'version',width: 60,sortable: true,hidden:true}
				,{header: '部门经理意见' ,dataIndex: 'depreason',width: 60,sortable: true,hidden:true}
				,{header: '人事部经理意见' ,dataIndex: 'hrreason',width: 60,sortable: true,hidden:true}
			],
			dockedItems: [{
			    xtype: 'pagingtoolbar',
			    dock: 'bottom',
				bind: '{appealApproveList}',	
			    displayInfo: true
			}]
    	}
    ]
});
