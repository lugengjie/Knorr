Ext.define('Admin.view.dashboard.Sales', {
    extend: 'Ext.panel.Panel',
    xtype: 'sales',

    requires: [
        'Ext.chart.CartesianChart',
        'Ext.chart.axis.Category',
        'Ext.chart.axis.Numeric',
        'Ext.chart.series.Bar'
    ],

    title: 'Sales',
    ui: 'light',
    iconCls: 'x-fa fa-briefcase',
    headerPosition: 'bottom',

    cls: 'quick-graph-panel shadow',
    height: 130,
    layout: 'fit',

    html:'Sales'
});
