
Ext.define('Admin.view.notice.NoticePanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'noticePanel',

    requires: [
        'Ext.grid.Panel',
        'Ext.toolbar.Paging', 
    ],
    //controller: 'searchresults',
   // viewModel: {type: 'orderViewModel'},
    layout: 'fit',
    items: [{
            xtype: 'gridpanel',
            id:"notice_panel",
            cls: 'user-grid',
            title: '历史公告',
            //routeId: 'user',
            bind: '{noticeDate}',
            scrollable: false,
            columns: [
                {xtype: 'gridcolumn',width: 40,dataIndex: 'id',text: '#',hidden:true},
                {xtype: 'gridcolumn', cls: 'content-column',dataIndex: 'time',text: 'time',flex:0.3,formatter: 'date("Y/m/d H:i:s")'},
                {xtype: 'gridcolumn',cls: 'content-column',dataIndex: 'message',text: 'message',flex: 1}
            ],
            tbar: ['->',{
		        text: '发布公告',
		        tooltip: 'Add a new row',
		        iconCls: 'fa fa-plus',
		        handler: 'openAddWindow'	
		    }],
            dockedItems: [{
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                itemId: 'userPaginationToolbar',
                displayInfo: true,
                bind: '{noticeDate}'
            }]
        }]
});
