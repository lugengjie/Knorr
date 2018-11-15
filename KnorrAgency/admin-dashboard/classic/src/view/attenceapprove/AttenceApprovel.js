Ext.define('Admin.view.attenceapprove.AttenceApprove', {
    extend: 'Ext.panel.Panel',
    xtype: 'attenceApprove',
	
	controller: 'attenceApproveViewController',
    viewModel : { type: 'attenceApproveViewModel'},
    layout:'fit',
	items: [{xtype:'attenceApprovePanel'}]	//需要修改
});