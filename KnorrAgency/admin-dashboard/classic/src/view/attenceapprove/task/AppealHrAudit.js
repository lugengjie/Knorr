Ext.define('Admin.view.attenceapprove.task.AppealHrAudit', {
    extend: 'Ext.form.Panel',
    alias: 'widget.appealhrAudit',
    requires: [
        'Ext.button.Button',
        'Ext.form.RadioGroup',
        //'Ext.form.field.Radio', 
        'Ext.form.field.*'
        //'Ext.form.field.File',
        //'Ext.form.field.Date',
        //'Ext.form.field.ComboBox',
        //'Ext.form.field.HtmlEditor'
    ],
    bodyPadding: 10,
    bodyBorder: true,
    defaults: {
        anchor: '100%'
    },
    fieldDefaults: {
        labelAlign: 'left',
        msgTarget: 'none',
        invalidCls: '' 
    },
    items: [{
        xtype: 'textfield',
        name: 'taskId',
        fieldLabel: '任务ID',
        hidden: true,
        readOnly: true
    },{
        xtype: 'textfield',
        fieldLabel: '申诉人',
        readOnly: true,
        name:'employeeName'
    },{
        xtype: 'textfield',
        fieldLabel: '打卡地点',
        readOnly: true,
        name:'location'
    },{
        xtype: 'datefield',
        fieldLabel: '上班时间',
        readOnly: true,
        name:'workinTime',
        format: 'Y/m/d H:i:s'
    },{
        xtype: 'datefield',
        fieldLabel: '下班时间',
        readOnly: true,
        name:'workoutTime',
        format: 'Y/m/d H:i:s'
    },{
        xtype: 'textfield',
        fieldLabel: '原上班状态',
        readOnly: true,
        name:'attenceStatus',
        style:{'color':'red',
        },
    },{
        xtype: 'textareafield',
        grow: true,
        readOnly: true,
        name: 'appealreason',
        fieldLabel: '申诉原因',
        anchor: '100%'
    },{
        xtype: 'textareafield',
        name: 'deptLeaderBackReason',
        fieldLabel: '部门经理审批意见',
        readOnly: true
    },{
		xtype: 'radiogroup',
		fieldLabel: '人事文员审批',
		defaults: {
			flex: 1
		},
		items: [{
			name: 'hrPass',
			inputValue: true,
			boxLabel: '同意',
			checked: true
		}, {
			name: 'hrPass',
			inputValue: false,
			boxLabel: '不同意'
		}]
    },{
        xtype     : 'textareafield',
        grow      : true,
        name      : 'hrBackReason',//修改
        fieldLabel: '人事文员审批意见',
        emptyText: '此处可填写意见', 
        anchor    : '100%'
    }],

   	bbar: [{
		xtype: 'button',
		ui: 'soft-green',
		text: '提交'	,
		handler: 'onClickAppealHrAuditFormSubmitButton'
	},{
		xtype: 'button',
		ui: 'gray',
		text: '取消',
		handler:function(btn){
			var win = btn.up('window');
	        if (win) {
	            win.close();
	        }
		}
	}]
});
