Ext.define('Admin.view.attence.AppealWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.appealWindow',
    requires: [
        'Ext.button.Button',
        'Ext.form.field.*'
    ],
    height: 420,
    width: 550,
    scrollable: true,
    title: '申诉表',
    closable: true,
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
        },{
            xtype: 'textfield',
            fieldLabel: '申诉人',
            cls:'appeal',
            readOnly: true,
            name:'employeeName'
        },{
            xtype: 'textfield',
            fieldLabel: '打卡地点',
            cls:'appeal',
            readOnly: true,
            name:'location'
        },{
            xtype: 'datefield',
            fieldLabel: '上班时间',
            cls:'appeal',
            readOnly: true,
            name:'workinTime',
            format: 'Y/m/d H:i:s'
        },{
            xtype: 'datefield',
            fieldLabel: '下班时间',
            cls:'appeal',
            readOnly: true,
            name:'workoutTime',
            format: 'Y/m/d H:i:s'
        },{
            xtype: 'textfield',
            fieldLabel: '原上班状态',
            cls:'appeal',
            readOnly: true,
            name:'attenceStatus',
            style:{'color':'red'
            },
        },{
            xtype: 'textareafield',
            grow: true,
            name: 'appealreason',
            emptyText: '此处填写申诉原因', 
            fieldLabel: '申诉原因',
            allowBlank: false,
            anchor: '100%'
        }]
    }],
    buttons:  [{
        xtype: 'button',
        text: '发起申诉',
        style:{'background-color':'dynamic(#fc8999)',
                'border-color':'dynamic(#fc8999)'
        },
        handler: 'starAppealProcess'//预留提交事件，在ViewController中实现。
    },{
        xtype: 'button',
        text: '取消',
        handler: function(btn) {
            btn.up('window').close();
        }
    }]
});
