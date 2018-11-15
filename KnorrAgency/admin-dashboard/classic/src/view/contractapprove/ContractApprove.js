Ext.define('Admin.view.contractapprove.ContractApprove', {
    extend: 'Ext.container.Container',
    xtype: 'contractApprove',

    //requires: [],
    controller: 'contractApproveViewController',				//viewController:代码与视图分离。声明视图绑定的事件，可以多个视图共享。
    viewModel: {type: 'contractApproveViewModel'},           //viewModel：配置Stote数据源。多个视图共享Store。
    	
    layout: 'fit',
    items: [{xtype:'contractApprovePanel'}]
});
