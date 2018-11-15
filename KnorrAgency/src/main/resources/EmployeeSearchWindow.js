Ext.define('Admin.view.employee.EmployeeSearchWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.employeeSearchWindow',
    height: 370,
    minHeight: 100,
    minWidth: 300,
    width: 500,
    x:300,
    y:100,
    scrollable: true,
    title: '员工查询',
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
            fieldLabel: '工号',
            name:'employeeNumber'
        },{
            xtype: 'textfield',
            fieldLabel: '姓名',
            name:'employeeName'
        },{
            xtype: 'textfield',
            fieldLabel: '职称',
            name:'post',
        },{
            xtype: 'textfield',
            fieldLabel: '部门编号',
            name:'storeNumber',
        }, {
            xtype: 'textfield',
            fieldLabel: '部门名称',
            name:'storeName',
        }, {
            xtype: 'textfield',
            fieldLabel: '区域',
            name:'storeArea',
        }]
    }],
   buttons: ['->',{
        xtype: 'button',
        text: '开始查询',
        handler: 'submitSearchForm'
    },{
        xtype: 'button',
        text: '关闭窗口',
        handler: function(btn) {
            btn.up('window').close();
        }
    },'->']
});
