Ext.define('Admin.view.contractapprove.task.ModifyApply', {
    extend: 'Ext.form.Panel',
    alias: 'widget.modifyApply',
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
        //id:'depreasonModify',
        name: 'depreason',//修改
        fieldLabel: '财务经理审批意见',
        emptyText: '财务经理还未审批',
        readOnly: true 
        /*listeners:{
        	change:function(){
        		var val=Ext.getCmp('depreasonModify').getValue();
        		if(val!=null){
        			Ext.get('hrreasonModify').hide();
        		}
        	}
        }*/
    },{
        xtype: 'textareafield',
        //id:'hrreasonModify',
        name: 'hrreason',//修改
        fieldLabel: '经理审批意见',
        emptyText: '经理还未审批',
        readOnly: true
        /*listeners:{
        	change:function(){
        		var val=Ext.getCmp('hrreasonModify').getValue();
        		if(val!=null){
        			Ext.get('depreasonModify').hide();
        			Ext.get('hrreasonModify').setVisible(true);   
        		}
        	}
        }*/
    }],

   	bbar: [{
		xtype: 'button',
		ui: 'soft-green',
		text: '提交'	,
		handler: 'onClickModifyApplyFormSubmitButton'
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
