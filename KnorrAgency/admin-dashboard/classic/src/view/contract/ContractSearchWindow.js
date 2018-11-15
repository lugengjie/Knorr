Ext.define('Admin.view.contract.ContractSearchWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.contractSearchWindow',
    height: 550,
    // minHeight: 200,
    // minWidth: 300,
    width: 500,
    scrollable: true,
    title: '合同搜索窗口',
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
                    boxLabel: '合同编号',
                    reference: 'isContractNumber'
                },{
                    xtype: 'textfield',
                    cls:'searchinput',
                    fieldLabel: '合同编号',
                    name:'contractNumber',
                    emptyText:'请输入合同编号',
                    anchor: '0',
                    bind: {
                        disabled: '{!isContractNumber.checked}'
                    }
                },
                {
                    xtype: 'checkbox',
                    boxLabel: '客户姓名',
                    reference: 'isCustomerName'
                },{
                    xtype: 'textfield',
                    cls:'searchinput',
                    fieldLabel: '客户姓名',
                    name:'customerName',
                    emptyText:'请输入客户姓名',
                    anchor: '0',
                    bind: {
                        disabled: '{!isCustomerName.checked}'
                    }
                },
                {
                    xtype: 'checkbox',
                    boxLabel: '房源名称',
                    reference: 'isHouseName'
                },{
                    xtype: 'textfield',
                    cls:'searchinput',
                    fieldLabel: '房源名称',
                    name:'houseName',
                    emptyText:'请输入房源名称',
                    anchor: '0',
                    bind: {
                        disabled: '{!isHouseName.checked}'
                    }
                },
                {
                    xtype: 'checkbox',
                    boxLabel: '合同类型',
                    reference: 'isContractType'
                },{
                    xtype: 'combobox',
                    name: 'contractType',
                    fieldLabel: '合同类型',
                    cls:'searchinput',
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
                    bind: {
                        disabled: '{!isContractType.checked}'
                    }
                },
                {
                    xtype: 'checkbox',
                    boxLabel: '签约时间段',
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
                    cls:'search',
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
        handler: 'searchContract'//预留提交事件，在ViewController中实现。
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
