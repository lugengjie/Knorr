Ext.define('Admin.view.calendar.Calendar', {
    extend: 'Ext.container.Container',
    xtype: 'calendar',
    requires: ['Ext.calendar.form.AbstractForm'],
    
    controller: 'calendarViewController',
    
    layout: 'fit',
    items: [{xtype:'calendarPanel'}]

});
