Ext.define('Admin.view.file.DetailWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.detailWindow',
    height: 450,
    // minHeight: 200,
    // minWidth: 300,
    width: 950,
    scrollable: true,
    title: '查看窗口',
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
            fieldLabel: '收件人:',
            name:'emailTo',
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
            xtype: 'htmleditor',
            fieldLabel: '内容:',
            buttonDefaults: {
                tooltip: {
                    align: 't-b',
                    anchor: true
                }
            },
            flex: 1,
            minHeight: 100,
            labelAlign: 'top',
            name:'emailContent',
            readOnly:true
        },{
            xtype: 'textfield',
            fieldLabel: '附件名:',
            name:'emailAttachment',
            id:'detail_attachmentName',
            hidden:true
        }]
    }],
    buttons:  [{
        xtype: 'button',
        text: '下载附件',
        id:'detail_attachmentDownload',
        iconCls:'fa fa-cloud-upload',
        ui: 'soft-blue',
        handler:'onDownload',
        hidden:true
    },'->',{
        xtype: 'button',
        text: '关闭',
        ui: 'soft-red',
        handler: function(btn) {
            btn.up('window').close();
        }
    }]
});
