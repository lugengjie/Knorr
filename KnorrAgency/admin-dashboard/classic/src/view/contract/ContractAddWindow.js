Ext.define('Admin.view.contract.ContractAddWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.contractAddWindow',
    height: 400,
    // minHeight: 200,
    // minWidth: 300,
    width: 500,
    scrollable: true,
    title: '合同添加窗口',
    closable: true,
    modal:true,
    layout: 'fit',
    items: [{
        xtype: 'form',
        layout: 'form',
        padding: '10px',
        items: [{
            xtype: 'textfield',
            fieldLabel: 'id',
            name:'id',
            hidden: true,
            readOnly: true
        },{
            xtype: 'textfield',
            fieldLabel: 'processStatus',
            name:'processStatus',
            value:'NEW',
            hidden: true,
            readOnly: true
        },{
            xtype: 'textfield',
            fieldLabel: '客户姓名',
            name:'customerName',
            allowBlank: false,
            emptyText:'请填写客户姓名',
            blankText:'请填写客户姓名'
        }, {
            xtype: 'textfield',
            fieldLabel: '房源名称',
            name:'houseName',
            allowBlank: false,
            emptyText:'请填写房源名称',
            blankText:'请填写房源名称'
        },{
            xtype: 'datefield',
            fieldLabel: '签约时间',
            name:'startTime',
            value:new Date(),
            format: 'Y/m/d H:i:s', 
            emptyText:'--------请选择---------',
            allowBlank: false,
            blankText:'请选择签约时间'
        },{
            xtype: 'datefield',
            fieldLabel: '失效时间',
            name:'endTime',
            value:new Date(),
            format: 'Y/m/d H:i:s', 
            emptyText:'--------请选择---------',
            allowBlank: false,
            blankText:'请选择失效时间'
        }, {
            xtype: 'combobox',
            name: 'contractType',
            id:'contractType',
            fieldLabel: '合同类型',
            //vtype: 'email',
            store: Ext.create('Ext.data.Store', {
                fields: ['contractType'],
                data : [
                    {"contractType":"出租合同"},
                    {"contractType":"出售合同"}
                ]
            }),
            queryMode: 'local',
            displayField: 'contractType',
            valueField: 'contractType',
            emptyText:'--------请选择合同类型---------',
            allowBlank: false,
            blankText:'请选择类型'
        }, {
            xtype: 'numberfield',
            fieldLabel: '金额(单位:万元)',
            name:'total',
            allowBlank: false,
            value:1.0,
            minValue:0.00,
            step: 1.0,
            emptyText:'请填写金额',
            blankText:'请填写金额'
        }]
    }],
    buttons:  [{
        xtype: 'button',
        text: 'Submit',
        handler: 'submitContractEditFormButton'//预留提交事件，在ViewController中实现。
    },{
        xtype: 'button',
        text: 'Close',
        handler: function(btn) {
            btn.up('window').close();
        }
    }]
});
