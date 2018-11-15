Ext.define('Admin.view.dashboard.Earnings', {
    extend: 'Ext.Panel',
    xtype: 'earnings',

    requires: [
        'Ext.chart.CartesianChart',
        'Ext.chart.axis.Category',
        'Ext.chart.axis.Numeric',
        'Ext.chart.series.Line',
        'Ext.chart.interactions.PanZoom'
    ],

    title: 'Earnings',
    ui: 'light',
    iconCls: 'x-fa fa-dollar',
    headerPosition: 'bottom',

    cls: 'quick-graph-panel shadow',
    height: 130,
    layout: 'fit',

    html:'Earnings',
    tools: [
        {
            xtype: 'tool',
            cls: 'quick-graph-panel-tool x-fa fa-ellipsis-v'
        }
    ]
});
