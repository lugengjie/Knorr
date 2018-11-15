Ext.define('Admin.view.person.UploadFileWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.uploadFileWindow',
    height: 200,
    minHeight: 200,
    minWidth: 350,
    width: 350,
    scrollable: true,
    closable: true,
    constrain: true,
    modal:true,
    title: '图片上传',
    /*defaults: {
        xtype: 'form',
        layout: 'anchor',

        bodyPadding: 10,
        style: {
            'margin-bottom': '20px'
        },

        defaults: {
            anchor: '100%'
        }
    },*/
    

    /*defaults: {
        anchor: '100%',
        allowBlank: false,
        msgTarget: 'side',
        labelWidth: 60
    },*/

    items: [{
        //title: '图片上传',
        //frame: true,
        xtype:'form',
        fileUpload:true,
        layout: 'form',
        padding: '10px',
        reference: 'firstForm',
        items:[{
            id:'uploadFileValue',
            xtype: 'filefield',
            emptyText: '小于2MB图片',
            fieldLabel: '图片',
            name: 'photo-path',
            buttonText: '点击上传',
        }]
    }],

    buttons: [{
        text: '保存',
        handler: 'firstFormSave'
    }, {
        text: '重置',
        handler: 'firstFormReset'
    }]
});