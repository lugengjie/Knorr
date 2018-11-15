Ext.define('Admin.view.dashboard.HDDUsage', {
    extend: 'Ext.panel.Panel',
    xtype: 'hddusage',

    requires: [
        'Ext.chart.CartesianChart',
        'Ext.chart.axis.Category',
        'Ext.chart.axis.Numeric',
        'Ext.chart.series.Area',
        'Ext.chart.interactions.PanZoom'

    ],

    title: 'HDD Usage',
    ui: 'light',
    iconCls: 'x-fa fa-database',
    headerPosition: 'bottom',

    cls: 'quick-graph-panel shadow',
    height: 130,
    layout: 'fit',

    html:'hddusage'
        
});
