Ext.define('Admin.view.contract.ContractUploadWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.contractUploadWindow',
    requires: [
        'Ext.button.Button',
        'Ext.form.field.Text',
        'Ext.form.field.File',
        'Ext.form.field.HtmlEditor'
    ],
    height: 180,
    minHeight: 100,
    minWidth: 300,
    width: 500,
    scrollable: true,
    title: 'Contract Upload Window',
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
	        emptyText: '请选择.doc/.docx文件', 
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
        handler: 'onClickUploadFormSumbitButton'
    },{
        xtype: 'button',
        text: '取消',
        handler: function(btn) {
            btn.up('window').close();
        }
    },'->']
});
