Ext.define('Admin.store.employee.EmployeeGridStroe', {
	extend: 'Ext.data.Store',
	storeId:'employeeGridStroe',
	alias: 'store.employeeGridStroe',
	model:'Admin.model.employee.EmployeeModel',
	proxy: {
		type: 'rest',
		url: '/employee',
		reader:{
			type:'json',
			rootProperty:'content',//��Ӧ��̨���صĽ��������
			totalProperty: 'totalElements'//��ҳ��Ҫ֪���ܼ�¼��
		},
		writer: {
			type: 'json'
		},
		simpleSortMode: true	//������ģʽ
	},
	autoLoad: true,
	autoSync: true,
	remoteSort: true,//ȫ��(Զ��)����
	pageSize: 10,
	sorters: {
		direction: 'DESC',property: 'id'
	}
});
