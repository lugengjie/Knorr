Ext.define('Admin.view.attence.LookAppealWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.lookAppealWindow',
    requires: [
        'Ext.button.Button',
        'Ext.form.RadioGroup',
        'Ext.form.field.*'
    ],
    height: 600,
    width: 550,
    title:'申诉结果',
    bodyPadding: 5,
    bodyBorder: true,
    defaults: {
        anchor: '100%'
    },
    fieldDefaults: {
        labelAlign: 'left',
        msgTarget: 'none',
        invalidCls: '' 
    },
    items:[
        {
            xtype: 'form',
            layout: 'form',
            padding: '10px',
            items: [
            {
                xtype: 'textfield',
                name: 'taskId',
                fieldLabel: '任务ID',
                hidden: true,
                readOnly: true
            },{
                xtype: 'textfield',
                fieldLabel: '申诉人',
                cls:'lookqppeal',
                readOnly: true,
                name:'employeeName'
            },{
                xtype: 'textfield',
                fieldLabel: '打卡地点',
                cls:'lookqppeal',
                readOnly: true,
                name:'location'
            },{
                xtype: 'datefield',
                fieldLabel: '上班时间',
                cls:'lookqppeal',
                readOnly: true,
                name:'workinTime',
                format: 'Y/m/d H:i:s'
            },{
                xtype: 'datefield',
                fieldLabel: '下班时间',
                cls:'lookqppeal',
                readOnly: true,
                name:'workoutTime',
                format: 'Y/m/d H:i:s'
            },{
                xtype: 'textfield',
                fieldLabel: '申诉后上班状态',
                cls:'lookqppeal',
                readOnly: true,
                name:'attenceStatus'
            },{
                xtype: 'textareafield',
                grow: true,
                name: 'appealreason',
                fieldLabel: '申诉原因',
                anchor: '100%'
            },{
                xtype: 'textareafield',
                name: 'deptLeaderBackReason',
                fieldLabel: '部门经理审批意见',
                emptyText: '部门经理还未审批',
                readOnly: true
            },{
                xtype: 'textareafield',
                name: 'hrBackReason',
                fieldLabel: '人事文员审批意见',
                emptyText: '人事文员还未审批',
                readOnly: true
            }]
        }
    ]
});
