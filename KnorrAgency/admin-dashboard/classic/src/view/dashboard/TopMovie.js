Ext.define('Admin.view.dashboard.TopMovie', {
    extend: 'Ext.panel.Panel',
    xtype: 'topmovies',

    requires: [
        'Ext.chart.series.Pie',
        'Ext.chart.series.sprite.PieSlice',
        'Ext.chart.interactions.Rotate'
    ],

    title: 'Top Movie',
    ui: 'light',
    iconCls: 'x-fa fa-video-camera',
    headerPosition: 'bottom',

    cls: 'quick-graph-panel shadow',
    height: 130,
    layout: 'fit',

    html:'Top Movie'
});
