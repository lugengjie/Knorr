Ext.define('Admin.view.stores.Stores', {
    extend: 'Ext.container.Container',
    xtype: 'stores',
    //requires: [],
    //controller: 'order',				//viewController:代码与视图分离。声明视图绑定的事件，可以多个视图共享。
    //viewModel: {type: 'orderlist'},	//viewModel：配置Stote数据源。多个视图共享Store。
    
    controller: 'storesViewController',
    viewModel: {type: 'storesViewModel'},
    	
    layout: 'fit',
    items: [{xtype:'storesPanel'}]
    //html:'行政管理模块'
});