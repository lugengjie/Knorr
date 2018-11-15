Ext.define('Admin.view.attence.LeaveAddWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.leaveAddWindow',
    height: 350,
    minHeight: 350,
    minWidth: 300,
    width: 500,
    scrollable: true,
    title: '请假单',
    closable: true,
    constrain: true,
    
    requires: [
        'Ext.form.field.*',
    ],
    
    defaultFocus: 'textfield',
    modal:true,
    layout: 'fit',
    items: [{
        xtype: 'form',
        layout: 'form',
        padding: '10px',
        ariaLabel: 'Enter your name',
		items: [{
            xtype: 'textfield',
            fieldLabel: 'id',
            name:'id',
            hidden: true,
            readOnly: true
        },{
            xtype: 'textfield',
            fieldLabel: 'processStatus',
            name:'processStatus',
            value:'NEW',
            hidden: true,
            readOnly: true
        },{
			xtype: 'textfield',
			name: 'userId',
			fieldLabel: '请假人',
			//value:loginUser,
			allowBlank: false,
            emptyText:'请填写请假人姓名',
            blankText:'请填写请假人'
		},{
			xtype: 'combobox',
			name: 'leaveType',
			fieldLabel: '请假类型',
			//vtype: 'email',
			store: Ext.create('Ext.data.Store', {
				fields: ['value', 'name'],
				data : [
					{"value":"A", "name":"带薪假期"},
					{"value":"B", "name":"无薪假期"},
					{"value":"C", "name":"病假"}
				]
			}),
			queryMode: 'local',
			displayField: 'name',
			valueField: 'value',
            emptyText:'--------请选择---------',
			allowBlank: false,
            blankText:'请选择类型'
		},{
			xtype: 'datefield',
			fieldLabel: '请假开始时间',
            value:new Date(),
            minValue: new Date(),
            minText:'请选择当前日期后的时间',
			format: 'Y/m/d H:i:s', 
            altFormats : "Y/m/d|Ymd",
			name: 'startTime',
            emptyText:'--------请选择---------',
            allowBlank: false,
            blankText:'请选择开始时间'
		},{
			xtype: 'datefield',
			fieldLabel: '请假结束时间',
            value:new Date(),
			minValue: new Date(),
            minText:'请选择当前日期后的时间',
            format: 'Y/m/d H:i:s', 
            altFormats : "Y/m/d|Ymd",
			name: 'endTime',
            emptyText:'--------请选择---------',
            allowBlank: false,
            blankText:'请选择结束时间'
		},{
			xtype     : 'textareafield',
			grow      : true,
			name      : 'reason',
			fieldLabel: '请假原因',
			anchor    : '100%',
            emptyText:'请填写请假原因',
            allowBlank: false,
            blankText:'请填写请假原因'
		}]
    }],
	buttons: [{
        xtype: 'button',
        text: '保存',
        handler: 'submitAddForm'
    },'->',{
        xtype: 'button',
        text: '取消',
        ui:'soft-red',
        handler: function(btn) {
            btn.up('window').close();
        }
    }]
});