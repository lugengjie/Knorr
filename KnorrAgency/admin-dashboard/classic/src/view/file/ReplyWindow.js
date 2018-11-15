Ext.define('Admin.view.file.ReplyWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.replyWindow',
    height: 650,
    // minHeight: 200,
    // minWidth: 300,
    width: 950,
    scrollable: true,
    title: '回复窗口',
    closable: true,
    modal:true,
    layout: 'fit',
    items: [{
        xtype: 'form',
        layout: 'form',
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
            fieldLabel: '发件人:',
            name:'emailFrom',
            readOnly:true
        }, {
            xtype: 'textfield',
            fieldLabel: '主题:',
            name:'emailSubject',
            readOnly:true
        },{
            xtype: 'datefield',
            fieldLabel: '发送时间:',
            format: 'Y/m/d H:i:s', 
            name:'sendTime',
            readOnly:true
        },{
            xtype: 'textareafield',
            name: 'emailContent',
            fieldLabel: '邮件内容',
            readOnly: true 
        },{
            xtype: 'htmleditor',
            fieldLabel: '回复',
            emptyText: '此处填写回复信息',
            buttonDefaults: {
                tooltip: {
                    align: 't-b',
                    anchor: true
                }
            },
            flex: 1,
            minHeight: 100,
            labelAlign: 'top',
            name:'reply_emailContent'
        },{
            xtype: 'textfield',
            fieldLabel: '我的附件名:',
            name:'replyEmailAttachment',
            id:'reply_attachmentName',
            hidden:true
        },{
            xtype: 'textfield',
            fieldLabel: '附件名:',
            name:'emailAttachment',
            id:'from_attachmentName',
            hidden:true
        }]
    }],
    buttons:  [{
        xtype: 'button',
        text: '上传附件',
        id:'reply_attachmentUpload',
        iconCls:'fa fa-cloud-upload',
        ui: 'soft-blue',
        handler:'opendUploadWindow'
    },{
        xtype: 'button',
        text: '删除附件',
        id:'reply_attachmentDelete',
        iconCls:'fa fa-close',
        ui: 'soft-red',
        hidden:true,
        handler:'deleteAttachment'

    },'-',{
        xtype: 'button',
        text: '下载附件',
        id:'reply_attachmentDownload',
        iconCls:'fa fa-cloud-download',
        ui: 'soft-purple',
        handler:'onDownload',
        hidden:true
    },'->',{
        xtype: 'button',
        text: '回复',
        iconCls:'fa fa-send-o',
        ui: 'soft-green',
        handler: 'onReplyFormButton'
    },{
        xtype: 'button',
        text: '关闭',
        ui: 'soft-red',
        handler: function(btn) {
            btn.up('window').close();
        }
    }]
});
