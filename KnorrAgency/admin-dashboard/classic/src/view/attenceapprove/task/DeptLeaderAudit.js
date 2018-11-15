Ext.define('Admin.view.attenceapprove.task.DeptLeaderAudit', {
    extend: 'Ext.form.Panel',
    alias: 'widget.leavedeptLeaderAudit',
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
        cls:'dep',
        name: 'userId',
        fieldLabel: '申请人',
        readOnly: true
    },{
        xtype: 'textfield',
        cls:'dep',
        name: 'leaveType',
        fieldLabel: '请假类型',
        readOnly: true
    },{
        xtype: 'datefield',
        cls:'dep',
        name: 'startTime',
        fieldLabel: '开始时间',
        format: 'Y/m/d H:i:s',
        readOnly: true
    },{
        xtype: 'datefield',
        cls:'dep',
        name: 'endTime',
        fieldLabel: '结束时间',
        format: 'Y/m/d H:i:s',
        readOnly: true
    },{
        xtype: 'textareafield',
        name: 'reason',
        fieldLabel: '请假原因',
        readOnly: true
    },{
		xtype: 'radiogroup',
		fieldLabel: '部门经理审批',
		defaults: {
			flex: 1
		},
		items: [{
			name: 'deptLeaderPass',
			inputValue: true,
			boxLabel: '同意',
			checked: true
		}, {
			name: 'deptLeaderPass',
			inputValue: false,
			boxLabel: '不同意'
		}]
    },{
        xtype: 'textareafield',
        grow: true,
        name: 'deptLeaderBackReason',//修改
        emptyText: '此处可填写意见', 
        fieldLabel: '意见',
        anchor: '100%',
    }],

   	bbar: [{
		xtype: 'button',
		ui: 'soft-green',
		text: '提交'	,
		handler: 'onClickDeptleaderAuditFormSubmitButton'
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
