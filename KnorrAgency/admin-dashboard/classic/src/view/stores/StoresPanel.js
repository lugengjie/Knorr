Ext.define('Admin.view.stores.StoresPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'storesPanel',
    requires: [
        'Ext.grid.Panel',
        'Ext.toolbar.Paging',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Date',
        'Ext.grid.column.Date'
    ],
    layout: 'fit',
    items: [{
            xtype: 'gridpanel',
            cls: 'user-grid',
            title: '门店管理',
            //routeId: 'user',
            bind: '{storesLists}',
            scrollable: false,
            columns: [
                {xtype: 'gridcolumn',width: 40,dataIndex: 'id',text: 'Key',hidden:true},
                {xtype: 'gridcolumn',cls: 'content-column',dataIndex: 'storeNumber',text: '门店编号',flex: 1},
                {xtype: 'gridcolumn',cls: 'content-column',dataIndex: 'storeName',text: '门店名称',flex: 1},
                {xtype: 'gridcolumn',cls: 'content-column',dataIndex: 'storeArea',text: '门店区域',flex: 1},
                {xtype: 'gridcolumn',cls: 'content-column',dataIndex: 'fatherStoreName',text: '上级门店',flex: 1},
                {xtype: 'actioncolumn',cls: 'content-column', width: 120,text: '操作',tooltip: 'edit ',
                    items: [
                        {xtype: 'button', iconCls: 'x-fa fa-pencil' ,handler: 'openEditWindow'},
                        {xtype: 'button',iconCls: 'x-fa fa-close'	,handler: 'deleteOneRow'},
                        /*{xtype: 'button',iconCls: 'x-fa fa-man'	,handler: 'showEmployee'}*/
                    ]
                }
            ],
            tbar: [{
	            xtype: 'combobox',
	            reference:'searchFieldName',
	            hideLabel: true,
	            store:Ext.create("Ext.data.Store", {
				    fields: ["name", "value"],
				    data: [
				      	{ name: '部门名称', value: 'storeName' },
						{ name: '地区', value: 'storeArea' }
				    ]
				}),
	            displayField: 'name',
	            valueField:'value',
	            value:'storeArea',
	            editable: false,
	            queryMode: 'local',
	            triggerAction: 'all',
	            emptyText: '查询条件',
	            width: 135,
	            /*listeners:{
					select: 'searchComboboxSelectChuang'
				}*/
	        }, '-',{
            	xtype:'textfield',
            	reference:'searchFieldValue',
            	name:'storesPanelSearchField'
		    },'-',{
		        text: '快速查找',
		        iconCls: 'fa fa-search',
		        handler: 'quickSearch'
		    },'->',{
		        text: '添加门店',
		        tooltip: '添加门店',
		        iconCls: 'fa fa-plus',
		        handler: 'openAddWindow'	
		    }],			
            dockedItems: [{
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                itemId: 'userPaginationToolbar',
                displayInfo: true,
                bind: '{storesLists}'
            }]
        }]
});
