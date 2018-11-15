Ext.define('Admin.view.file.FileWritePanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'fileWritePanel',

     requires: [
        'Ext.grid.Panel',
        'Ext.toolbar.Paging',
        'Ext.form.field.ComboBox',
        'Ext.grid.column.Date',
        'Ext.selection.CheckboxModel',
        'Ext.grid.feature.Grouping'
    ],

    controller: 'fileWriteViewController',               //viewController:代码与视图分离。声明视图绑定的事件，可以多个视图共享。
    //viewModel: {type: 'fileViewModel'},
    
    layout: {
        type: 'vbox',
        pack: 'start',
        align: 'stretch'
    },
    items: [
    {
        title:'撰写邮件'
    },
    {
        xtype: 'form',
        id:'write_form',
        layout: {
            type: 'vbox',
            pack: 'start',
            align: 'stretch'
        },
        padding: '10px',
        items: [{
            xtype: 'textfield',
            fieldLabel: 'id',
            name:'id',
            hidden: true,
            readOnly: true
        },{
            xtype: 'textfield',
            fieldLabel: 'emailStatus',
            name:'emailStatus',
            hidden: true,
            readOnly: true
        },{
            xtype: 'textfield',
            fieldLabel: 'readStatus',
            name:'readStatus',
            hidden: true,
            readOnly: true
        },{
            xtype: 'textfield',
            fieldLabel: 'inboxStatus',
            name:'inboxStatus',
            hidden: true,
            readOnly: true
        },{
            xtype: 'textfield',
            fieldLabel: '收件人:',
            name:'emailTo'
        }, {
            xtype: 'textfield',
            fieldLabel: '主题:',
            name:'emailSubject'
        },{
            xtype: 'htmleditor',
            fieldLabel: '内容:',
            buttonDefaults: {
                tooltip: {
                    align: 't-b',
                    anchor: true
                }
            },
            flex: 2,
            minHeight: 800,
            labelAlign: 'top',
            name:'emailContent'
        },{
            xtype: 'textfield',
            fieldLabel: '附件名:',
            name:'emailAttachment',
            id:'write_attachmentName',
            hidden:true
        }]
    }],
    buttons:  [{
        xtype: 'button',
        text: '上传附件',
        id:'write_attachmentUpload',
        iconCls:'fa fa-cloud-upload',
        ui: 'soft-blue',
        handler:'opendUploadWindow'
    },{
        xtype: 'button',
        text: '删除附件',
        id:'write_attachmentDelete',
        iconCls:'fa fa-close',
        ui: 'soft-red',
        hidden:true,
        handler:'deleteAttachment'

    },'->',{
        xtype: 'button',
        text: '发送',
        iconCls:'fa fa-send-o',
        ui: 'soft-green',
        handler: 'onSendFormButton'
    },{
        xtype: 'button',
        text: '保存',
        iconCls:'fa fa-save',
        ui: 'gray',
        handler: 'onEditFormButton'//预留提交事件，在ViewController中实现。
    },{
        xtype: 'button',
        text: '清空',
        ui: 'soft-red',
        handler: 'onDeleteFormButton'
    }]
});


