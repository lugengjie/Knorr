Ext.define('Admin.view.user.UserPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'userPanel',

     requires: [
        'Ext.grid.Panel',
        'Ext.toolbar.Paging',
        'Ext.form.field.ComboBox',
        'Ext.grid.column.Date',
        'Ext.selection.CheckboxModel',
        'Ext.grid.plugin.*',
        'Admin.view.GridFilters.GridFilters'
    ],
    //controller: 'searchresults',
   // viewModel: {type: 'orderViewModel'},
    layout: 'fit',
    items: [{
            xtype: 'gridpanel',
            plugins: {
                gfilters: true
            },
            cls: 'user-grid',
            title: 'UserGrid Results',
            //routeId: 'user',
            bind: '{userLists}',
            scrollable: false,
            selModel: {type: 'checkboxmodel',checkOnly: true},     //多选框checkbox
            //选中时才激活删除多条按钮
            listeners: {                            
                    selectionchange: function(selModel, selections){
                        this.down('#userPanelRemove').setDisabled(selections.length === 0);
                    }
            },
            columns: [
                {xtype: 'gridcolumn',width: 40,dataIndex: 'id',text: 'id',hidden:true,filter: 'number'},
                {xtype: 'gridcolumn', cls: 'content-column',width:320,dataIndex: 'userName',text: 'userName',
                    filter: {
                        type: 'string',
                        itemDefaults: {
                            emptyText: 'Search for...'
                        }
                    }
                },
                {xtype: 'datecolumn',cls: 'content-column',width: 120,dataIndex: 'time',text: 'createTime',flex:1,formatter: 'date("Y/m/d H:i:s")'},
                {xtype: 'actioncolumn',cls: 'content-column', width: 250,dataIndex: 'bool',text: 'Actions',tooltip: 'edit ',
                    items: [
                        {xtype: 'button', iconCls: 'x-fa fa-pencil' ,handler: 'onEditButton'},
                        {xtype: 'button',iconCls: 'x-fa fa-close'   ,handler: 'onDeleteButton'},
                        {xtype: 'button',iconCls: 'x-fa fa-ban'     ,handler: 'onDisableButton'}
                    ]
                }
            ],
            tbar: [
            {
                text: 'Add Employee',
                iconCls: 'employee-add',
                handler: function () {
                    var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
                        clicksToEdit: 1
                    });
                    var store = Ext.data.StoreManager.lookup('userGridStroe');

                    rowEditing.cancelEdit();

                    // Create a model instance
                    var r = Ext.create('Admin.model.user.UserModel');
                    var insertPosition = 0;
                    //insertPosition = store.getCount();
                    var lastRecord = store.insert(0, r);
                       rowEditing.startEdit(r, 0);
                    }
            },'-',{
                xtype: 'combobox',
                reference:'searchFieldName',
                id:'user_combobox',
                hideLabel: true,
                store:Ext.create("Ext.data.Store", {
                    id:'xxStroe',
                    fields: ["name", "value"],
                    data: [
                        { name: '用户名', value: 'userName' },
                        { name: '创建时间', value: 'createTime' }
                    ]  
                }),
                displayField: 'name',
                valueField:'value',
                value:'{name}',
                editable: false,
                
                triggerAction: 'all',   //点击下拉列表时执行的操作
                queryMode: 'local',    //store的查询模式
                //emptyText: 'Select a state...',
                width: 135,
                listeners:{
                    afterRender:function(combo){
                        var record=combo.store.getAt(0);
                        combo.setValue(record.data);
                    },
                    select: 'searchComboboxSelectChange'
                }
            }, '-',{
                xtype:'textfield',
                reference:'searchFieldValue',
                name:'userPanelSearchField'
            }, '-',{
                xtype: 'datefield',
                hideLabel: true,
                hidden:true,
                format: 'Y/m/d H:i:s',
                reference:'searchDataFieldValue',
                fieldLabel: 'From',
                name: 'from_date'
            },{
                xtype: 'datefield',
                hideLabel: true,
                hidden:true,
                format: 'Y/m/d H:i:s',
                reference:'searchDataFieldValue2',
                fieldLabel: 'To',
                name: 'to_date'
            },'-',{
                text: 'Search',
                iconCls: 'fa fa-search',
                handler: 'quickSearch'
            }, '-',{
                text: 'Search More',
                iconCls: 'fa fa-search-plus',
                handler: 'openSearchWindow' 
            }, '->',{
                text: 'Add',
                tooltip: 'Add a new row',
                iconCls: 'fa fa-plus',
                handler: 'openAddWindow'    
            },'-',{
                text: 'Removes',
                itemId: 'userPanelRemove',
                tooltip: 'Remove the selected item',
                iconCls:'fa fa-trash',
                disabled: true,
                handler: 'deleteMoreRows'   
            }],
            dockedItems: [{
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                itemId: 'userPaginationToolbar',
                displayInfo: true,
                bind: '{userLists}'
            }]
        }]
});
