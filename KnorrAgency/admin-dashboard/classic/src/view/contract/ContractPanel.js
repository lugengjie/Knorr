Ext.define('Admin.view.contract.ContractPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'contractPanel',

     requires: [
        'Ext.grid.Panel',
        'Ext.toolbar.Paging',
        'Ext.form.field.*',
        'Ext.grid.column.Date',
        'Ext.selection.CheckboxModel',
        'Ext.grid.plugin.*',
        'Ext.grid.feature.Grouping'
    ],
    controller:'contractViewController',
    layout:'fit',
    items: [
        {
            xtype: 'gridpanel',
            reference:'contactGridpanel',
            title:'合同信息表',
            plugins: {
		        /*rowexpander: {
		            rowBodyTpl: new Ext.XTemplate(
		                '<p><b>合同编号:</b>{contractNumber}</p>',
		                '<p><b>客户姓名:</b></p>{customerName}<br>',
		                '<p><b>房源名称:</b>{hoseName}</p>',
                        '<p><b>房产经纪人姓名:</b>{employeeName}</p>',
                        '<p><b>签约时间:</b></p>{startTime}<br>',
                        '<p><b>失效时间:</b>{endTime}</p>',
                        '<p><b>金额:</b>{total}</p>'
		            )
		        },*/
                rowediting:{
                    saveBtnText: '保存', 
                    cancelBtnText: "取消", 
                    autoCancel: false, 
                    clicksToMoveEditor: 1
                }
		    },
            cls: 'has-border',
            bind: '{contractLists}',
            selModel: {type: 'checkboxmodel',checkOnly: true},     //多选框checkbox
            //选中时才激活删除多条按钮
            listeners: {                            
                    selectionchange: function(selModel, selections){
                        this.down('#contractPanelRemove').setDisabled(selections.length === 0);
                    }
            },
            features: [{
                ftype: 'groupingsummary',
                groupHeaderTpl: '{name}'+'月份销售情况'+'  ({rows.length}条记录{[values.rows.length > 1 ? "..." : ""]})',
                hideGroupedHeader: false,
                startCollapsed: true,
                // enableGroupingMenu: true
            }, {
                ftype: 'summary',
                summaryType: 'sum',
                dock: 'bottom'
            }],
            columns: [
                {xtype: 'gridcolumn',width: 40,dataIndex: 'id',text: 'id',hidden:true},
                {header: '审核状态',dataIndex: 'processStatus',width: 100,sortable: true,id:'contract_processStatus',
                    renderer: function(val) {
                        if (val =='NEW') {
                            return '<span style="color:green;">新建</span>';
                        } else if (val =='APPROVAL') {
                            return '<span style="color:blue;">审批中...</span>';
                        } else if (val =='COMPLETE') {
                            return '<span style="color:orange;">完成审批</span>';
                        }else if(val =='CANCEL'){
                            return '<span style="color:red;">取消申请</span>';
                        }
                        return val;
                    }
                },
                {xtype: 'gridcolumn', cls: 'content-column',width:100,dataIndex: 'contractNumber',text: '合同编号',
                    summaryRenderer: function(value, summaryData, dataIndex) {
                        return '总销售额:'
                    }
                },
                {xtype: 'gridcolumn', cls: 'content-column',width:100,dataIndex: 'customerName',text: '客户姓名',
                	editor: {
                		xtype: 'textfield',
			            allowBlank: false
			        }
            	},
                {xtype: 'gridcolumn', cls: 'content-column',width:100,dataIndex: 'houseName',text: '房源名称',
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false
                    }
                },
                {xtype: 'gridcolumn', cls: 'content-column',width:120,dataIndex: 'employeeName',text: '房产经纪人姓名',
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false
                    }
                },
                {xtype: 'datecolumn',cls: 'content-column',width: 180,dataIndex: 'startTime',text: '签约时间',flex:1,formatter: 'date("Y/m/d H:i:s")',
                    editor: {
                        xtype: 'datefield',
                        value:new Date(),
                        format: 'Y/m/d H:i:s', 
                        altFormats : "Y/m/d|Ymd",
                        allowBlank: false,
                        blankText:'请选择开始时间'
                    }
                },
                 {xtype: 'datecolumn',cls: 'content-column',width: 180,dataIndex: 'day',text: '月份',hidden:true,flex:1,formatter: 'date("m")'},
                {xtype: 'datecolumn',cls: 'content-column',width: 180,dataIndex: 'endTime',text: '失效时间',flex:1,formatter: 'date("Y/m/d H:i:s")',
                    editor: {
                        xtype: 'datefield',
                        value:new Date(),
                        format: 'Y/m/d H:i:s', 
                        altFormats : "Y/m/d|Ymd",
                        allowBlank: false,
                        blankText:'请选择开始时间'
                    }
                },
                {xtype: 'gridcolumn', cls: 'content-column',width:90,dataIndex: 'contractType',text: '合同类型',
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false
                    }
                },
                {xtype: 'gridcolumn', cls: 'content-column',width:100,dataIndex: 'total',text: '金额',
                    renderer: function(val) {
                        return '<span>'+Ext.util.Format.number(val, '0,000.00')+'万</span>';
                    },
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false
                    },
                    field: { xtype: 'numberfield'},
                    summaryType: 'sum',
                    summaryRenderer: function(value, summaryData, dataIndex) {
                        return value + ' 万'
                    }
                },
                {xtype: 'gridcolumn', cls: 'content-column',width:100,dataIndex: 'storeName',text: '公司名',hidden:true,
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false
                    }
                },
                {xtype: 'actioncolumn',cls: 'content-column', width: 130,dataIndex: 'bool',text: '操作',tooltip: 'edit ',
                    items: [  
                        {xtype: 'button', iconCls: 'x-fa fa-arrow-circle-o-down' , tooltip: '合同下载',handler: 'onDownloadButton'},
                        {xtype: 'button',iconCls: 'x-fa fa-close'   , tooltip: '删除合同',handler: 'onDeleteButton'},
                        {
                            xtype: 'button',iconCls: 'x-fa fa-star',tooltip: '发起审核',
                            getClass: function(v, meta, rec) {
                                if (rec.get('processStatus')=='NEW'||rec.get('processStatus')=='CANCEL') {
                                    return 'x-fa fa-star';
                                }else{
                                    return 'x-hidden';
                                }
                                
                            },
                            handler: 'starLeaveProcess'
                        },
                        {
                            xtype: 'button',iconCls: 'x-fa fa-ban',tooltip: '取消审核',
                            getClass: function(v, meta, rec) {
                                if (rec.get('processInstanceId')==""||rec.get('processStatus')=='COMPLETE'||rec.get('processStatus')=='CANCEL') {
                                    return 'x-hidden';
                                }else{
                                    return 'x-fa fa-ban';
                                }

                            },
                            handler: 'cancelLeaveProcess'
                        },
                        {
                            xtype: 'button',iconCls: 'x-fa fa-file-text-o',tooltip: '查看审批结果',
                            getClass: function(v, meta, rec) {
                                if (rec.get('processStatus')=='COMPLETE') {
                                    return 'x-fa fa-file-text-o';
                                }
                                return 'x-hidden';
                            },
                            handler: 'LookContract'
                        }
                    ]
                }
            ],
            tbar: [{
                        iconCls:'fa fa-search fa-5x',
                        ui: 'header',
                        tooltip: '查找',
                        handler:'searchOpen'   
                    },'-',{
                        iconCls:'fa fa-refresh fa-5x',
                        ui: 'header',
                        tooltip: '刷新',
                        handler:'refresh'   
                    }
                    ,'->',{
                        xtype: 'button',
                        text:'添加合同信息',
                        tooltip:'添加合同信息',
                        ui: 'soft-purple',
                        iconCls: 'fa fa-plus-square',
                        handler:'onAddClick'   
                    },'-',{
                        xtype: 'button',
                        text: '导入合同信息',
                        tooltip:'导入合同信息',
                        ui: 'soft-blue',
                        iconCls: 'fa fa-arrow-circle-up',
                        handler: 'uploadContract' 
                           
                    },'-',{
                        xtype: 'button',
                        text: '合同模板下载',
                        tooltip:'合同模板下载',
                        ui: 'soft-green',
                        iconCls: 'fa fa-arrow-circle-down',
                        href:'/contract/downloadTemplate',
                        hrefTarget: '_self'     
                    },'-',{
                        xtype: 'button',
                        ui: 'soft-red',
                        text: '批量删除',
                        tooltip:'批量删除',
                        itemId: 'contractPanelRemove',
                        iconCls:'fa fa-trash fa-5x',
                        disabled: true,
                        handler: 'deleteMoreRows'   
                    }
             ],
            dockedItems: [{
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                itemId: 'userPaginationToolbar',
                displayInfo: true,
                bind: '{contractLists}'
            }]
        }
    ]
});





