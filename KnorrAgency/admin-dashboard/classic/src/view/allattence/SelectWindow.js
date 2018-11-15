Ext.define('Admin.view.allattence.SelectWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.selectWindow',
    requires: [
        'Ext.button.Button',
        'Ext.form.field.*'
    ],
    height: 160,
    width: 380,
    scrollable: true,
    title: '请选择月份和门店名',
    closable: true,
    modal:true,
    layout: 'fit',
    items: [{
        xtype: 'form',
        layout: 'hbox',
        margin:'10,20,20,20',
        items: [
           {
                xtype: 'combobox',
                name:'month',
                hideLabel: true,
                store:Ext.create("Ext.data.Store", {
                    fields: ["value"],
                    data: [
                        {value: '一月' },
                        {value: '二月' },
                        {value: '三月' },
                        {value: '四月' },
                        {value: '五月' },
                        {value: '六月' },
                        {value: '七月' },
                        {value: '八月' },
                        {value: '九月' },
                        {value: '十月' },
                        {value: '十一月'},
                        {value: '十二月'}
                    ]
                }),
                displayField: 'value',
                valueField:'value',
                value:"一月",
                editable: false,
                queryMode: 'local',
                triggerAction: 'all',
                emptyText: '请选择月份...',
                width: 135
            },
            {
               xtype: 'combobox',
               name:'storeName',
               cls:'select',
               hideLabel: true,
               store:Ext.create("Ext.data.Store", {
                    model:'Admin.model.achievement.StoreModel',
                    proxy: {
                        type: 'rest',
                        url: '/store/findAllStore',
                        reader:{
                            type:'json',
                            rootProperty:'content',//对应后台返回的结果集名称
                        },
                        writer: {
                            type: 'json'
                        }
                   },
                   autoLoad: true,
                   autoSync: true
                }),
                displayField: 'storeName',
                valueField:'storeName',
                editable: false,
                queryMode: 'local',
                triggerAction: 'all',
                emptyText: '请选择门店名...',
                width: 135,
                value:'请选择门店名...'
                // listeners:{
                //     render: function(combo) {
                //         combo.getStore().on("load", function(s, r, o) { 
                //             combo.setValue(r[0].get('storeName'));
                //         });
                //         combo.getStore().load();
                //     },
                //     select: 'searchCombobox'  
                // }
            }
        ]
    }],
    buttons:  [{
        xtype: 'button',
        text: '下载',
        ui:'soft-green',
        handler: 'downloadAttenceExcel'//预留提交事件，在ViewController中实现。
    }]
});
