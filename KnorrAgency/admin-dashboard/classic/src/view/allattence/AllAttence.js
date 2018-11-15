Ext.define('Admin.view.allattence.AllAttence', {
    extend: 'Ext.container.Container',
    xtype: 'allAttence',

    //requires: [],
    controller: 'allAttenceViewController',				//viewController:代码与视图分离。声明视图绑定的事件，可以多个视图共享。
    viewModel: {type: 'allAttenceViewModel'},	           //viewModel：配置Stote数据源。多个视图共享Store。
    	
    layout: 'fit',
    items: [{xtype:'allAttencePanel'}]
});
