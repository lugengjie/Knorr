Ext.define('Admin.view.attenceapprove.task.AppealModifyApply', {
    extend: 'Ext.form.Panel',
    alias: 'widget.appealmodifyApply',
    requires: [
        'Ext.button.Button',
        'Ext.form.RadioGroup',
        'Ext.form.field.*'
    ],
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
    items: [{
		xtype: 'radiogroup',
		fieldLabel: '重新申请',
		items: [{
			name: 'reApply',
			inputValue: true,
			boxLabel: '是',
			checked: true
		}, {
			name: 'reApply',
			inputValue: false,
			boxLabel: '否'
		}]
    },{
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
    }],

   	bbar: [{
		xtype: 'button',
		ui: 'soft-green',
		text: '提交'	,
		handler: 'onClickAppealModifyApplyFormSubmitButton'
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
