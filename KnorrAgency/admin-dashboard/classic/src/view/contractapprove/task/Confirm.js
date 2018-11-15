Ext.define('Admin.view.contractapprove.task.Confirm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.confirm',
    requires: [
        'Ext.button.Button',
        'Ext.form.RadioGroup',
        'Ext.form.field.*'
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
    },/*{
        xtype: 'textfield',
        fieldLabel: '家乐房产中介合同',
        style:{'text-align':'center',
               'position': 'absolute',
               'top': '10%',
               'left':'50%',
        },
        readOnly: true
    },*/{
        xtype: 'textfield',
        cls:'dep',
        name: 'contractNumber',
        fieldLabel: '合同编号',
        readOnly: true
    },{
        xtype: 'textfield',
        cls:'dep',
        name: 'customerName',
        fieldLabel: '客户姓名',
        readOnly: true
    },{
        xtype: 'textfield',
        cls:'dep',
        name: 'houseName',
        fieldLabel: '房源名称',
        readOnly: true
    },{
        xtype: 'textfield',
        cls:'dep',
        name: 'employeeName',
        fieldLabel: '房产经纪人姓名',
        readOnly: true
    },{
        xtype: 'datefield',
        cls:'dep',
        name: 'startTime',
        fieldLabel: '签约时间',
        format: 'Y/m/d H:i:s',
        readOnly: true
    },{
        xtype: 'datefield',
        cls:'dep',
        name: 'endTime',
        fieldLabel: '失效时间',
        format: 'Y/m/d H:i:s',
        readOnly: true
    },{
        xtype: 'textfield',
        cls:'dep',
        name: 'contractType',
        fieldLabel: '合同类型',
        readOnly: true
    },{
        xtype: 'textfield',
        cls:'dep',
        name: 'total',
        fieldLabel: '金额',
        readOnly: true
    },{
        xtype: 'textareafield',
        name: 'depreason',
        fieldLabel: '财务经理审批意见',
        readOnly: true
    },{
        xtype: 'textareafield',
        name: 'manreason',
        fieldLabel: '经理审批意见',
        readOnly: true
    },{
        xtype: 'textfield',
        name:'confirmName',
        fieldLabel: '请签名确认',
        allowBlank:false
    }],
   	bbar: [{
		xtype: 'button',
		ui: 'soft-green',
		text: '提交'	,
		handler: 'onClickConfirmFormSubmitButton'
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
