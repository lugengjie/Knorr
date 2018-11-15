Ext.define('Admin.view.file.FileSendPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'fileSendPanel',

     requires: [
        'Ext.grid.Panel',
        'Ext.toolbar.Paging',
        'Ext.form.field.ComboBox',
        'Ext.grid.column.Date',
        'Ext.grid.filters.Filters'
    ],

    controller: 'fileSendViewController',               //viewController:代码与视图分离。声明视图绑定的事件，可以多个视图共享。
    viewModel: {type: 'fileViewModel'},
    
    layout: {
        type: 'vbox',
        pack: 'start',
        align: 'stretch'
    },
    items: [
        {
            title: '已发送'
        },
        {
            bodypadding:15,
            cls: 'has-border',
            height:60,
            tbar: [
                '->',
                {
                    xtype: 'button',
                    ui: 'soft-red',
                    text: '批量删除',
                    disabled: true,
                    id:'file_sendPanelRemove',
                    iconCls:'fa fa-close',
                    handler: 'onRemoveMore'
                }
            ]
        },
        {
            xtype: 'gridpanel',
            id:'file_sendgridpanel',
            cls: 'has-border',
            flex: 2,
            bind: '{sendLists}',
            scrollable: false,
            selModel: {type: 'checkboxmodel',checkOnly: true},
            listeners: { 
                cellclick: 'onGridCellItemClick',                           
                selectionchange: function(selModel, selections){
                    this.up('panel').down('#file_sendPanelRemove').setDisabled(selections.length === 0);
                }
            },
            features: [{
                ftype: 'grouping',
                // enableGroupingMenu: true,
                startCollapsed: true,
                groupHeaderTpl: '{name}'+'  (共发送{rows.length}条)',
            }],
            plugins: {
                gridfilters: true
            },
            columns: [
                {xtype: 'gridcolumn',width: 40,dataIndex: 'id',text: 'id',hidden:true},
                {xtype: 'gridcolumn', cls: 'content-column',width:150,dataIndex: 'emailTo',text: '发件人',
                    filter: {
                        type: 'string',
                        itemDefaults: {
                            emptyText: '请输入收件人姓名...'
                        }
                    }
                },
                {xtype: 'gridcolumn', cls: 'content-column',width:180,dataIndex: 'emailSubject',text: '主题'},
                {xtype: 'gridcolumn', cls: 'content-column',width:180,dataIndex: 'emailContent',flex: 1,text: '内容'},
                {xtype: 'gridcolumn', cls: 'content-column',width:80,dataIndex: 'emailAttachment',text: '<span class="x-fa fa-paperclip"></span>',
                    renderer: function(value) {
                        return value ? '<span class="x-fa fa-paperclip"></span>' : '';
                    }
                },
                {xtype: 'datecolumn',cls: 'content-column',width: 200,dataIndex: 'sendTime',text: '发送时间',formatter: 'date("Y/m/d H:i:s")',
                    filter: true
                },
                {xtype: 'datecolumn',cls: 'content-column',width: 180,dataIndex: 'sendDay',text: '时间',hidden:true,flex:1,formatter: 'date("Y/m/d")'},
                {xtype: 'gridcolumn', cls: 'content-column',width:150,dataIndex: 'emailStatus',text: 'emailStatus',hidden:true},
                {xtype: 'gridcolumn', cls: 'content-column',width:150,dataIndex: 'readStatus',text: 'readStatus',hidden:true},
                {xtype: 'gridcolumn', cls: 'content-column',width:150,dataIndex: 'inboxStatus',text: 'inboxStatus',hidden:true},
                {xtype: 'actioncolumn',cls: 'content-column', width: 150,dataIndex: 'bool',text: '操作',tooltip: 'edit ',
                    items: [
                    	{xtype: 'button', iconCls: 'x-fa fa-download' ,tooltip:'点击下载附件',handler: 'onDownloadButton'},
                        {xtype: 'button', iconCls: 'x-fa fa-close' ,tooltip:'点击删除',handler: 'onDelete'}
                    ]
                }
            ],
            dockedItems: [{
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                itemId: 'userPaginationToolbar',
                displayInfo: true,
                bind: '{sendLists}',
            }]
        }
    ]
});
