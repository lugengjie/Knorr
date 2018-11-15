Ext.define('Admin.view.employee.EmployeeEditWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.employeeEditWindow',
    height: 200,
    minHeight: 200,
    minWidth: 300,
    width: 500,
    scrollable: true,
    title: 'Edit Employee Window',
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
            fieldLabel: '职称',
            name:'post'
        }, {
            xtype: 'combobox',
            fieldLabel: '门店名称',
            name:'storeName',
            id:'employeeEditGetStoreName',
            fields: ["storeName","storeNameView"],
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
                    Ext.getCmp('employeeEditGetStoreName').store=tableComboStore;
                    Ext.getCmp('employeeEditGetStoreName').bindStore(tableComboStore);
                }
            }
        }]
    }],
   buttons: ['->',{
        xtype: 'button',
        text: '提交',
        handler: 'submitEditForm'
    },{
        xtype: 'button',
        text: '关闭窗口',
        handler: function(btn) {
            btn.up('window').close();
        }
    },'->']
  
});
