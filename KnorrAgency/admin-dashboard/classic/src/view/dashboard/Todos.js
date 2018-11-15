Ext.define('Admin.view.dashboard.Todos', {
    extend: 'Ext.panel.Panel',
    xtype: 'todo',

    requires: [
        'Ext.grid.Panel',
        'Ext.grid.View',
        'Ext.form.field.Text',
        'Ext.button.Button',
        'Ext.selection.CheckboxModel'
    ],

    cls: 'todo-list shadow-panel',

    title: 'TODO List',
    height: 320,
    bodyPadding: 15,
    layout: 'fit',
    html:'TODO'
});
