Ext.define('Admin.view.employee.EmployeePanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'employeePanel',
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
            title: '员工管理',
            //routeId: 'user',
            bind: '{employeeLists}',
            scrollable: false,
            //selModel: {type: 'checkboxmodel'},
            columns: [
                {xtype: 'gridcolumn',width: 40,dataIndex: 'id',text: 'Key',hidden:true},
                {xtype: 'gridcolumn',width: 75,dataIndex: 'picture',text: '头像',
                    renderer: function(value) {
                        return "<img src='resources/images/user-profile/" + value + "' alt='Profile Pic' height='40px' width='40px'>";
                    }
                },
                {xtype: 'gridcolumn',cls: 'content-column',dataIndex: 'employeeNumber',text: '工号',flex: 1},
                {xtype: 'gridcolumn',cls: 'content-column',dataIndex: 'employeeName',text: '姓名',flex: 1},
                {xtype: 'gridcolumn',cls: 'content-column',dataIndex: 'post',text: '职称',flex: 1,
                    renderer: function(value) {
                        if (value=="admin") {
                            return "<font size='3' color='red'>"+value+"</font>";
                        }else if(value=="manager"){
                            return "<font size='2' color='blue'>"+value+"</font>";
                        }else return "<font size='2' color='green'>"+value+"</font>";
                    }
                },
                //{xtype: 'datecolumn',cls: 'content-column',width: 200,dataIndex: 'createTime',text: 'Create Time',formatter: 'date("Y/m/d H:i:s")'},
                {xtype: 'gridcolumn',cls: 'content-column',dataIndex: 'email',text: '邮箱',flex: 1},
                {xtype: 'gridcolumn',cls: 'content-column',dataIndex: 'storeNumber',text: '门店编号',flex: 1},
                {xtype: 'gridcolumn',cls: 'content-column',dataIndex: 'storeName',text: '门店名称',flex: 1},
                {xtype: 'gridcolumn',cls: 'content-column',dataIndex: 'storeArea',text: '门店区域',flex: 1},
                {xtype: 'actioncolumn',cls: 'content-column', width: 120,text: '操作',tooltip: 'edit ',
                    items: [
                        {xtype: 'button', iconCls: 'x-fa fa-pencil' ,handler: 'openEditWindow'},
                        {xtype: 'button',iconCls: 'x-fa fa-close'	,handler: 'deleteOneRow'},
                        /*{xtype: 'button',iconCls: 'x-fa fa-ban'	 	,handler: 'onDisableButton'}*/
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
						{ name: '地区', value: 'storeArea' },
                        { name: '职称', value: 'post'}
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
            	name:'employeePanelSearchField'
		    }, /*'-',{
            	xtype:'datefield',
            	format: 'Y/m/d H:i:s',
            	reference:'searchDataFieldValue',
            	hidden :true,
            	name:'orderPanelSearchDataField'
		    },*/'-',{
		        text: '快速查找',
		        iconCls: 'fa fa-search',
		        handler: 'quickSearch'
		    }, '-',{
		        text: '多条件查找',
		        iconCls: 'fa fa-search-plus',
		        handler: 'openSearchWindow'	
			}, '->',{
		        text: '添加员工',
		        tooltip: '添加员工',
		        iconCls: 'fa fa-plus',
		        handler: 'openAddWindow'	
		    }/*,'-',{
		        text: 'Removes',
		        tooltip: 'Remove the selected item',
		        iconCls:'fa fa-trash',
                itemId: 'employeeGridPanelRemove',
		        disabled: true,
		        handler: 'deleteMoreRows'	
		    }*/],			
            dockedItems: [{
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                itemId: 'userPaginationToolbar',
                displayInfo: true,
                bind: '{employeeLists}'
            }]/*,
            listeners: {
                selectionchange: function(selModel, selections){
                    this.down('#employeeGridPanelRemove').setDisabled(selections.length === 0);
                }
            }   */
        }]
});
