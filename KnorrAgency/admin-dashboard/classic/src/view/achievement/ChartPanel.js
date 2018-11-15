Ext.define('Admin.view.achievement.ChartPanel', {
    extend: 'Ext.Panel',
    xtype: 'chartPanel',
    
    requires: [
        'Ext.chart.CartesianChart',
        'Ext.chart.axis.Category',
        'Ext.chart.axis.Numeric',
        'Ext.chart.series.Bar'
    ],
    layout: 'fit',
    items: [{
        xtype: 'cartesian',  //笛卡尔坐标的图表
        colors: [
            '#6aa5db'
        ],
        bind: '{barData}',
        axes: [{                //轴线
            type: 'category',  //有限集合
            fields: [
                'employeeName'
            ],
            position: 'bottom'
        },{
            type: 'numeric',   //连续数字
            fields: [
                'total'
            ],
            grid: {
                odd: {
                    fill: '#e8e8e8'
                }
            },
            position: 'left'
        }],
        series: [{          
            type: 'bar',    
            xField: 'employeeName',
            yField: [
                'total'
            ]
        }],
        tbar:['->',{
                xtype: 'combobox',
                reference:'searchFieldName',
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
                emptyText: 'Select a state...',
                width: 135,
                listeners:{
                    select: 'searchCombobox'
                },
            },{
               xtype: 'combobox',
               reference:'searchFieldName2',
               hideLabel: true,
               store:Ext.create("Ext.data.Store", {
                    model:'Admin.model.achievement.StoreModel',
                    proxy: {
                        type: 'rest',
                        url: '/achievement/findAllStore',
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
                emptyText: 'Select a state...',
                width: 240,
                listeners:{
                    render: function(combo) {
                        combo.getStore().on("load", function(s, r, o) { 
                            combo.setValue(r[0].get('storeName'));
                        });
                        combo.getStore().load();
                    },
                    select: 'searchCombobox'  
                }
            }]

    }]
});
