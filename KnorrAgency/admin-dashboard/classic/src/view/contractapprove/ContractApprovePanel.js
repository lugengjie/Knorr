Ext.define('Admin.view.contractapprove.ContractApprovePanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'contractApprovePanel',

     requires: [
        'Ext.grid.Panel',
        'Ext.toolbar.Paging',
        'Ext.form.field.ComboBox',
        'Ext.grid.column.Date',
        'Ext.selection.CheckboxModel'
    ],
    layout: 'fit',
    items: [
    {
        title: '合同审核',
        xtype: 'gridpanel',
        id:'contractGridpanel',
        cls: 'process-definition-grid',
        layout:'fit',
        bind: '{contractApproveLists}',
        features: [{
            ftype: 'grouping',
            // enableGroupingMenu: true,
            startCollapsed: true,
            groupHeaderTpl: '{name}'+'任务：'+'  (共有{rows.length}条)未审核',
        }],
        columns: [
            {
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
                    handler: 'onClickContractApproveClaimButton'   //ajax  taskId
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
                    handler: 'onClickContractApproveCompleteWindowButton'  //taskDefinitionKey 动态表单
                },{
                    xtype: 'button',
                    iconCls: 'x-fa fa-object-group',
                    tooltip: '任务跟踪',
                    handler: 'onClickGraphTraceButton'  //流程跟踪
                }],
                cls: 'content-column',
                width: 120,
                dataIndex: 'bool',
                text: '操作',
                tooltip: 'edit '
            }
            ,{header: 'id'          ,dataIndex: 'id',width: 60,sortable: true   ,hidden:true}
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
            ,{header: '申请人' ,dataIndex: 'userId',width: 120,sortable: true}
            ,{xtype: 'gridcolumn', cls: 'content-column',width:150,dataIndex: 'contractNumber',text: '合同编号'}
            ,{xtype: 'gridcolumn', cls: 'content-column',width:100,dataIndex: 'customerName',text: '客户姓名',hidden:true}
            ,{xtype: 'gridcolumn', cls: 'content-column',width:100,dataIndex: 'houseName',text: '房源名称',hidden:true}
            ,{xtype: 'gridcolumn', cls: 'content-column',width:120,dataIndex: 'employeeName',text: '房产经纪人姓名'}
            ,{xtype: 'datecolumn',cls: 'content-column',width: 150,dataIndex: 'startTime',text: '签约时间',flex:1,formatter: 'date("Y/m/d H:i:s")',hidden:true}
            ,{xtype: 'datecolumn',cls: 'content-column',width: 150,dataIndex: 'endTime',text: '失效时间',flex:1,formatter: 'date("Y/m/d H:i:s")',hidden:true}
            ,{xtype: 'gridcolumn', cls: 'content-column',width:90,dataIndex: 'contractType',text: '合同类型'}
            ,{xtype: 'gridcolumn', cls: 'content-column',width:100,dataIndex: 'total',text: '金额',hidden:true,
                renderer: function(val) {
                    return '<span>'+Ext.util.Format.number(val, '0,000.00')+'万</span>';
                }
            }
            ,{xtype: 'gridcolumn', cls: 'content-column',width:150,dataIndex: 'area',text: '门店名'}
            ,{header: 'processInstanceId' ,dataIndex: 'processInstanceId',width: 80,sortable: true,hidden:true}
            ,{header: 'taskId'          ,dataIndex: 'taskId',width: 80,sortable: true,hidden:true}
            ,{header: '审核名称'        ,dataIndex: 'taskName',width: 150,sortable: true}
            ,{header: '提交审核时间'  ,dataIndex: 'taskCreateTime',width: 150,flex:1,sortable: true,renderer: Ext.util.Format.dateRenderer('Y/m/d H:i:s')}
            ,{header: 'assignee'        ,dataIndex: 'assignee',width: 80,sortable: true,hidden:true}
            ,{header: 'taskDefinitionKey',dataIndex: 'taskDefinitionKey',width: 80,sortable: true,hidden:true}
            ,{header: 'processDefinitionId' ,dataIndex: 'processDefinitionId',width: 80,sortable: true,hidden:true}
            ,{header: 'suspended'       ,dataIndex: 'suspended',width: 80,sortable: true,hidden:true}
            ,{header: 'version'         ,dataIndex: 'version',width: 60,sortable: true,hidden:true}
            ,{header: 'depreason' ,dataIndex: 'depreason',width: 60,sortable: true,hidden:true}
            ,{header: 'manreason' ,dataIndex: 'manreason',width: 60,sortable: true,hidden:true}
        ],
        dockedItems: [{
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            bind: '{contractApproveLists}'
        }]
        
    }]
    
});


