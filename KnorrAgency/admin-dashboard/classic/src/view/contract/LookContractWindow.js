Ext.define('Admin.view.contract.LookContractWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.lookContractWindow',
    requires: [
        'Ext.button.Button',
        'Ext.form.RadioGroup',
        'Ext.form.field.*'
    ],
    height: 600,
    width: 550,
    title:'合同审批结果',
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
                cls:'lookcontract',
                name: 'contractNumber',
                fieldLabel: '合同编号',
                readOnly: true
            },{
                xtype: 'textfield',
                cls:'lookcontract',
                name: 'customerName',
                fieldLabel: '客户姓名',
                readOnly: true
            },{
                xtype: 'textfield',
                cls:'lookcontract',
                name: 'houseName',
                fieldLabel: '房源名称',
                readOnly: true
            },{
                xtype: 'textfield',
                cls:'lookcontract',
                name: 'employeeName',
                fieldLabel: '房产经纪人姓名',
                readOnly: true
            },{
                xtype: 'datefield',
                cls:'lookcontract',
                name: 'startTime',
                fieldLabel: '签约时间',
                format: 'Y/m/d H:i:s',
                readOnly: true
            },{
                xtype: 'datefield',
                cls:'lookcontract',
                name: 'endTime',
                fieldLabel: '失效时间',
                format: 'Y/m/d H:i:s',
                readOnly: true
            },{
                xtype: 'textfield',
                cls:'lookcontract',
                name: 'contractType',
                fieldLabel: '合同类型',
                readOnly: true
            },{
                xtype: 'textfield',
                cls:'lookcontract',
                name: 'total',
                fieldLabel: '金额',
                readOnly: true
            },{
                xtype: 'textareafield',
                name: 'depreason',
                fieldLabel: '店长审批意见',
                readOnly: true
            },{
                xtype: 'textareafield',
                name: 'manreason',
                fieldLabel: '经理审批意见',
                readOnly: true
            }]
        }
    ]
});
