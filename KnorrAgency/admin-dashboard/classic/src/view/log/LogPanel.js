Ext.define('Admin.view.log.LogPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'logPanel',

     requires: [
        'Ext.grid.Panel',
        'Ext.toolbar.Paging',
        'Ext.form.field.ComboBox',
        'Ext.grid.column.Date',
        'Ext.selection.CheckboxModel',
        'Ext.grid.feature.Grouping',
        'Ext.grid.filters.Filters'
    ],
    layout: {
        type: 'vbox',
        pack: 'start',
        align: 'stretch'
    },
    items: [
        {
            title: '系统日志列表'
        },
        {
        	//margin: '10 0 0 0',
            bodypadding:15,
            cls: 'has-border',
        	height:60,
        	tbar: [
                {
                    iconCls:'fa fa-download fa-5x',
                    ui: 'header',
                    tooltip: '导出系统日志表',
                    handler:'downloadLogExcel'
                }
        	]   
        },
        {
            xtype: 'gridpanel',
            cls: 'has-border',
            flex: 2,
            bind: '{logLists}',
            scrollable: false,
           
            features: [{
                ftype: 'grouping',
                // enableGroupingMenu: true,
                startCollapsed: true,
                groupHeaderTpl: '{name}'+'的系统使用情况：'+'  ({rows.length}条记录{[values.rows.length > 1 ? "..." : ""]})',
            }],
            plugins: {
                gridfilters: true
            },
            columns: [
                {xtype: 'gridcolumn',width: 40,dataIndex: 'id',text: 'id',hidden:true},
                {xtype: 'gridcolumn', cls: 'content-column',width:120,dataIndex: 'employeeName',text: '操作人姓名',
                    filter: {
                        type: 'string',
                        itemDefaults: {
                            emptyText: '请输入操作人姓名...'
                        }
                    }
                },
                {xtype: 'gridcolumn', cls: 'content-column',width:120,dataIndex: 'storeName',text: '所属部门',
                    filter: {
                        type: 'string',
                        itemDefaults: {
                            emptyText: '请输入所属部门名...'
                        }
                    }
                },
                {xtype: 'gridcolumn', cls: 'content-column',width:120,dataIndex: 'title',text: '操作名'},
                {xtype: 'gridcolumn', cls: 'content-column',width:120,dataIndex: 'type',text: 'Log类型'},
                {xtype: 'gridcolumn', cls: 'content-column',width:120,dataIndex: 'remoteAddr',text: '请求的IP'},
                {xtype: 'gridcolumn', cls: 'content-column',width:120,dataIndex: 'requestUri',text: '请求的Uri'},
                {xtype: 'gridcolumn', cls: 'content-column',width:120,dataIndex: 'method',text: '请求的方法类型'},
                {xtype: 'gridcolumn', cls: 'content-column',width:150,dataIndex: 'params',text: '请求提交的参数'},
                {xtype: 'datecolumn',cls: 'content-column',width: 150,dataIndex: 'operateDate',text: '操作时间',flex:1,formatter: 'date("Y/m/d H:i:s")',
                    filter: true
                },
                {xtype: 'datecolumn',cls: 'content-column',width: 50,dataIndex: 'day',text: '时间',formatter: 'date("Y/m/d")',hidden:true},
                {xtype: 'gridcolumn', cls: 'content-column',width:100,dataIndex: 'time',text: '操作时长',
                    renderer: function(val) {
                        return '<span>'+val+'秒</span>';
                    }
                }/*,
                {xtype: 'actioncolumn',cls: 'content-column', width: 100,dataIndex: 'bool',text: '操作',tooltip: 'edit ',
                    items: [
                         {xtype: 'button', iconCls: 'x-fa fa-arrow-circle-o-down' , tooltip: '日志下载'},
                    ]
                }*/
            ],
            dockedItems: [{
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                itemId: 'userPaginationToolbar',
                displayInfo: true,
                bind: '{logLists}'
            }]
        }
    ]
});


