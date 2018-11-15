Ext.define('Admin.view.file.File', {
    extend: 'Ext.container.Container',
    xtype: 'file',

    //requires: [],
    controller: 'fileViewController',				//viewController:代码与视图分离。声明视图绑定的事件，可以多个视图共享。
    viewModel: {type: 'fileViewModel'},	//viewModel：配置Stote数据源。多个视图共享Store。
    	
    layout: 'fit',
    items: [{xtype:'filePanel'}]
    //html:'用户管理模块'
});
