Ext.define('Admin.view.person.Person', {
    extend: 'Ext.container.Container',
    xtype: 'person',

    requires: [
        'Ext.ux.layout.ResponsiveColumn'
    ],
    viewModel: {type: 'colleagueViewModel'},
    controller: 'personController',
    
    layout: 'responsivecolumn',

    items:[
        {
            xtype: 'colleaguePanel',
            userCls: 'big-30 small-100'
        },
        {
            xtype: 'personalPanel',
            userCls: 'big-70 small-100'
        }
    ]
});