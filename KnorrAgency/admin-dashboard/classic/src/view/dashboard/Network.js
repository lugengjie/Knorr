Ext.define('Admin.view.dashboard.Network', {
    extend: 'Ext.panel.Panel',
    xtype: 'network',

    requires: [
        'Ext.chart.CartesianChart',
        'Ext.chart.axis.Category',
        'Ext.chart.axis.Numeric',
        'Ext.chart.series.Line',
        'Ext.chart.interactions.PanZoom',
        'Ext.ProgressBar'
    ],

    cls: 'dashboard-main-chart shadow',
    height: 380,

    bodyPadding: 15,

    title: 'Network',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    html:'netWork'
});
