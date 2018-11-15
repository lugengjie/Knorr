Ext.define('Admin.view.email.AttachmentUploadWindowByReply', {
    extend: 'Ext.window.Window',
    alias: 'widget.attachmentUploadWindowByReply',
    requires: [
        'Ext.button.Button',
        'Ext.form.field.Text',
        'Ext.form.field.File',
        'Ext.form.field.HtmlEditor'
    ],
    controller: 'fileInboxViewController',
    height: 180,
    minHeight: 100,
    minWidth: 300,
    width: 500,
    scrollable: true,
    title: '附件上传窗口',
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
        	xtype: 'filefield',
	        width: 400,
	        labelWidth: 80,
	        name:'file',
	        emptyText: '请选择文件', 
	        fieldLabel: '上传文件:',
	        labelSeparator: '',
	        buttonConfig: {
	            xtype: 'filebutton',
	            glyph:'',
	            iconCls: 'x-fa fa-cloud-upload',
	            text: '上传'
	        },
            allowBlank:false,
            blankText:'请选择文件后再上传'
	    }]
    }],
	buttons: ['->',{
        xtype: 'button',
        text: '上传',
        handler: 'onClickUploadFormSumbitButtonByReply'
    },{
        xtype: 'button',
        text: '取消',
        handler: function(btn) {
            btn.up('window').close();
        }
    },'->']
});
