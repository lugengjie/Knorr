Ext.define('Admin.view.dashboard.Services', {
    extend: 'Ext.Panel',
    xtype: 'services',

    requires: [
        'Ext.chart.series.Pie',
        'Ext.chart.series.sprite.PieSlice',
        'Ext.chart.interactions.Rotate'
    ],

    cls: 'service-type shadow',
    height: 320,
    bodyPadding: 15,
    title: 'Services',
    layout: {
        type: 'hbox',
        align: 'stretch'
    },

    html:'services'
});
