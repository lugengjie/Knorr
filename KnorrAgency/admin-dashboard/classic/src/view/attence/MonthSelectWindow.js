Ext.define('Admin.view.attence.MonthSelectWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.monthSelectWindow',
    requires: [
        'Ext.button.Button',
        'Ext.form.field.*'
    ],
    height: 160,
    width: 300,
    scrollable: true,
    title: '请选择月份',
    closable: true,
    modal:true,
    layout: 'fit',
    items: [{
        xtype: 'form',
        layout: 'form',
        padding: '10px',
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
            }
        ]
    }],
    buttons:  [{
        xtype: 'button',
        text: '下载',
        ui:'soft-green',
        handler: 'downloadMyAttenceExcel'//预留提交事件，在ViewController中实现。
    }]
});
