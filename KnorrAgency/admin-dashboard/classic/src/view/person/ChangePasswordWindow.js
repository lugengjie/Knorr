Ext.define('Admin.view.person.ChangePasswordWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.changePasswordWindow',
    height: 250,
    minHeight: 250,
    minWidth: 300,
    width: 500,
    scrollable: true,
    title: '修改密码',
    closable: true,
    constrain: true,
    
    defaultFocus: 'textfield',
    modal:true,
    layout: 'fit',
    items: [{
        xtype: 'form',
        layout: 'form',
        padding: '10px',
        items: [{
            id:'getOldPassword',
            xtype: 'textfield',
            fieldLabel: '请输入原密码',
            name:'oldPassword'
        },{
            id:'getNewPassword1',
            xtype: 'textfield',
            fieldLabel: '请输入新密码',
            name:'newPassword1'
        },{
            id:'getNewPassword2',
            xtype: 'textfield',
            fieldLabel: '请再输入新密码',
            name:'newPassword2'
        }]
    }],
	buttons: ['->',{
        xtype: 'button',
        text: '确认修改',
        handler: 'changePassword'
    },{
        xtype: 'button',
        text: '关闭窗口',
        handler: function(btn) {
            btn.up('window').close();
        }
    },'->']
});
