Ext.define('Admin.view.processdefinition.ProcessDefinition', {
    extend: 'Ext.container.Container',
    xtype: 'processDefinition',

    controller: 'processDefinitionViewController',
    viewModel: {type: 'processDefinitionViewModel'},

    layout: 'fit',
    items: [{xtype:'processDefinitionPanel'}]
});
