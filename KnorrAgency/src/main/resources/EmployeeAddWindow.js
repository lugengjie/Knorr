Ext.define('Admin.view.employee.EmployeeAddWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.employeeAddWindow',
    height: 250,
    minHeight: 250,
    minWidth: 300,
    width: 500,
    scrollable: true,
    title: 'Add Employee Window',
    closable: true,
    constrain: true,
    
    defaultFocus: 'textfield',
    modal:true,
    layout: 'fit',
    items: [{
        xtype: 'form',
        layout: 'form',
        padding: '10px',
        ariaLabel: 'Enter your name',
        items: [{
            xtype: 'textfield',
            fieldLabel: 'id',
            name:'id',
            hidden: true,
            readOnly: true
        }, {
            xtype: 'textfield',
            fieldLabel: '姓名',
            name:'employeeName'
        }, /*{
            xtype: 'datefield',
            fieldLabel: 'Create Time',
            name:'createTime',
            format: 'Y/m/d H:i:s'
        }*/{
            xtype: 'combobox',
            fieldLabel: '部门名称',
            name:'storeName',
            //reference:'searchFieldName',
            //hideLabel: true,
            id:'employeeAddGetStoreName',
            displayField: 'storeNameView',
            valueField:'storeName',
            editable: false,
            queryMode: 'local',
            triggerAction: 'all',
            emptyText: '选择一个部门',
            width: 135,
            listeners:{
                render:function(){
                    var tableComboStore = new Ext.data.Store({
                                                fields: ["storeName","storeNameView"],
                                                autoLoad:true,
                                                proxy: new Ext.data.HttpProxy({
                                                    type: "ajax",
                                                    actionMethods: { read: "GET" },
                                                    url: "/store/getStoreName2",
                                                    reader: 
                                                    {
                                                        type: "json",
                                                        root: "data"
                                                    }
                                                })
                                            });
                    Ext.getCmp('employeeAddGetStoreName').store=tableComboStore;
                    Ext.getCmp('employeeAddGetStoreName').bindStore(tableComboStore);
                }
            }
        },{
            xtype: 'textfield',
            fieldLabel: 'post',
            name:'post'
        }]
    }],
	buttons: ['->',{
        xtype: 'button',
        text: '添加员工',
        handler: 'submitAddForm'
    },{
        xtype: 'button',
        text: '关闭窗口',
        handler: function(btn) {
            btn.up('window').close();
        }
    },'->']
});
