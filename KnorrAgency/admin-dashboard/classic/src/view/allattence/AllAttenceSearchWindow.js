Ext.define('Admin.view.allattence.AllAttenceSearchWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.allAttenceSearchWindow',
    height: 380,
    // minHeight: 200,
    // minWidth: 300,
    width: 500,
    scrollable: true,
    title: '考勤搜索窗口',
    closable: true,
    modal:true,
    layout: 'anchor',
    viewModel: true,
    bodyPadding: 10,
    
    items: [
        {
            xtype: 'form',
            items:[
                {
                    xtype: 'checkbox',
                    boxLabel: '员工姓名',
                    reference: 'isEmployeeName'
                },{
                    xtype: 'textfield',
                    cls:'searchinput',
                    fieldLabel: '员工姓名',
                    name:'employeeName',
                    emptyText:'请输入员工姓名',
                    anchor: '0',
                    bind: {
                        disabled: '{!isEmployeeName.checked}'
                    }
                },
                {
                    xtype: 'checkbox',
                    boxLabel: '部门名',
                    reference: 'isStoreName'
                },{
                    xtype: 'textfield',
                    cls:'searchinput',
                    fieldLabel: '部门名',
                    name:'storeName',
                    emptyText:'请输入部门名',
                    anchor: '0',
                    bind: {
                        disabled: '{!isStoreName.checked}'
                    }
                },
                {
                    xtype: 'checkbox',
                    boxLabel: '考勤时间段',
                    reference: 'isTime'
                },{
                    xtype: 'datefield',
                    hideLabel: true,
                    format: 'Y/m/d H:i:s',
                    fieldLabel: '开始时间',
                    name: 'timeStart',
                    bind: {
                        disabled: '{!isTime.checked}'
                    }
                },
                {
                    xtype: 'datefield',
                    cls:'attencesearch',
                    hideLabel: true,
                    format: 'Y/m/d H:i:s',
                    fieldLabel: '结束时间',
                    name: 'timeEnd',
                    bind: {
                        disabled: '{!isTime.checked}'
                    }
                }
            ]
        }
    ],
    buttons:  [{
        xtype: 'button',
        text: '查询',
        ui: 'soft-green',
        iconCls: 'fa fa-search',
        handler: 'searchAllAttence'//预留提交事件，在ViewController中实现。
    },{
        xtype: 'button',
        text: '取消',
        ui: 'soft-red',
        iconCls: 'fa fa-close',
        handler: function(btn) {
            btn.up('window').close();
        }
    }]
});
