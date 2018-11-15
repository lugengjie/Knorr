Ext.define('Admin.view.attence.LeaveGridWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.leaveGridWindow',
    height: 550,
    minHeight: 500,
    //minWidth: 600,
    width:1200,
    scrollable: true,
    title: '我的请假单',
    closable: true,
    constrain: false,
    autoScroll:true,
    
    requires: [
        'Ext.form.field.*',
        'Ext.grid.plugin.RowEditing',
        'Ext.grid.feature.Grouping'
    ],
    modal:true,
    layout: 'fit',
    items: [
        {
            xtype:'gridpanel',
            bind: '{leaveLists}',
            cls:'leave',
            id:'leave_gridPanel',
            //scrollable: false,
            autoScroll:true,
            selModel: {type: 'checkboxmodel'},
            listeners: {                            
                selectionchange: function(selModel, selections){
                    this.down('#leaveGridPanelRemove').setDisabled(selections.length === 0);
                }
            },
            plugins: {
                rowediting:{
                    saveBtnText: '保存', 
                    cancelBtnText: "取消", 
                    autoCancel: false, 
                    clicksToMoveEditor: 1
                }
            },
            features: [{
                ftype: 'grouping',
                // enableGroupingMenu: true,
                startCollapsed: true,
                groupHeaderTpl: '共请'+'{name}'+'  ({rows.length}天)',
            }],
            columns: [
                 {header: 'id',dataIndex:'id',width: 60,sortable: true,hidden:true}
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
                ,{header: '申请人',dataIndex: 'userId',width: 100,sortable: true}
                ,{header: '开始时间',dataIndex: 'startTime',width: 180,sortable: true,renderer:Ext.util.Format.dateRenderer('Y/m/d H:i:s'),
                    editor: {
                        xtype:'datefield',
                        value:new Date(),
                        minValue: new Date(),
                        format: 'Y/m/d H:i:s', 
                        altFormats : "Y/m/d|Ymd"
                    }
                 }
                ,{header: '结束时间',dataIndex: 'endTime',width: 180,sortable: true,renderer: Ext.util.Format.dateRenderer('Y/m/d H:i:s'),
                    editor: {
                        xtype:'datefield',
                        value:new Date(),
                        minValue: new Date(),
                        format: 'Y/m/d H:i:s', 
                        altFormats : "Y/m/d|Ymd"
                    }
                 }
                ,{header: '请假类型',dataIndex: 'leaveType',width: 150,sortable: true,
                    renderer: function(val) {
                        if (val =='A') {
                            return '<span style="color:green;">带薪假期</span>';
                        } else if (val =='B') {
                            return '<span style="color:red;">无薪假期</span>';
                        } else if (val =='C') {
                            return '<span style="color:blue;">病假</span>';
                        }
                        return val;
                    },
                    editor: {
                        xtype: 'combobox',
                        store: Ext.create('Ext.data.Store', {
                            fields: ['value', 'name'],
                            data : [
                                {"value":"A", "name":"带薪假期"},
                                {"value":"B", "name":"无薪假期"},
                                {"value":"C", "name":"病假"}
                            ]
                        }),
                        queryMode: 'local',
                        displayField: 'name',
                        valueField: 'value'
                    }
                }
                ,{header: '请假原因',dataIndex: 'reason',width: 220,sortable: true,editor: 'textfield'}
                ,{header: '部门经理审批意见',dataIndex: 'depReason',width: 220,sortable: true,hidden:true}
                ,{header: '人事经理审批意见',dataIndex: 'hrReason',width: 220,sortable: true,hidden:true}
                ,{xtype: 'actioncolumn',cls: 'content-column', width: 120,flex:1,text: '操作',tooltip: 'edit ',
                    items: [
                        //{xtype: 'button', iconCls: 'x-fa fa-pencil',handler: 'openEditWindow'},
                        {xtype: 'button',iconCls: 'x-fa fa-close',tooltip: '删除请假单',handler: 'deleteOneRow'},
                        {
                            xtype: 'button',iconCls: 'x-fa fa-star',tooltip: '发起请假',
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
                            xtype: 'button',iconCls: 'x-fa fa-ban',tooltip: '取消请假',
                            getClass: function(v, meta, rec) {
                                if (rec.get('processInstanceId')==""||rec.get('processStatus')=='COMPLETE'||rec.get('processStatus')=='CANCEL') {
                                    return 'x-hidden';
                                }
                                return 'x-fa fa-ban';
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
                            handler: 'LookLeave'
                        }
                    ]
                }
            ],
            tbar: [
                {
                    xtype: 'datefield',
                    hideLabel: true,
                    format: 'Y/m/d H:i:s',
                    reference:'searchLeaveDataFieldValue',
                    fieldLabel: 'From',
                    emptyText:'-----开始时间-----',
                    name: 'from_date'
                },{
                    xtype: 'datefield',
                    hideLabel: true,
                    format: 'Y/m/d H:i:s',
                    reference:'searchLeaveDataFieldValue2',
                    fieldLabel: 'To',
                    emptyText:'-----结束时间-----',
                    name: 'to_date'
                },
                {
                    iconCls:'fa fa-search fa-5x',
                    ui: 'header',
                    tooltip: '查找',
                    handler:'searchLeave'   
                },'-',{
                    iconCls:'fa fa-refresh fa-5x',
                    ui: 'header',
                    tooltip: '刷新',
                    handler:'refreshLeave'   
                },
                '->',
                {
                    xtype: 'button',
                    ui: 'soft-red',
                    text: '批量删除',
                    disabled: true,
                    id:'leaveGridPanelRemove',
                    iconCls:'fa fa-close',
                    disabled: true,
                    handler: 'onRemoveMore'
                }
            ],   
            dockedItems: [{
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                displayInfo: true,
                bind: '{leaveLists}'
            }]
        }
    ]
});


