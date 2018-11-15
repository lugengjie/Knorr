Ext.define('Admin.view.person.PersonalPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'personalPanel',
    title: '我的信息',
    width: 700,
    height: 600,
    layout: 'accordion',

    id:'personPanel',

    requires: [
        'Ext.layout.container.Anchor',
        'Ext.layout.container.Accordion',
    ],

    defaults: {
        //xtype: 'form',
        border: false,
        bodyPadding: 10,
        defaultType: 'textfield',
        defaults: {
            anchor: '100%'
        }
    },

    items:[{
        title: '个人信息',
        buttons: [{
            text: '上传新头像',
            listeners: {
                click:'openUploadFileWindow'
            }
        },{
            text: '修改密码',
            listeners: {
                click: 'openChangePasswordWindow'
            }
        },{
            text: '信息提交',
            listeners: {
                click: 'onBasicInfoSubmit'
            }
        }],

        items: [{
            xtype: 'image',
            id:'pictureMessage',
            //fieldLabel: 'picture',
            name: 'picture',
            height: 100,
            width: 100,
            alt:'点击上传新头像',
            src: 'resources/images/user-profile/default.jpg'
        }, {
            //xtype: 'component',
            //disabled:true,
            readOnly: true,
            id:'employeeNameMessage',
            fieldLabel: '姓名',
            name: 'employeeName'
        }, {
            //xtype: 'component',
            //disabled:true,
            readOnly: true,
            id:'employeeNumberMessage',
            fieldLabel: '工号',
            name: 'employeeNumber'
        }, {
            //xtype: 'component',
            //disabled:true,
            readOnly: true,
            id:'postMessage',
            fieldLabel: '职称',
            name: 'post'
        },{
            id:'emailMessage',
            fieldLabel: '邮箱',
            name: 'email'
        },  {
            xtype:'textareafield',
            id:'quotationMessage',
            fieldLabel: '口号',
            name: 'quotation'
        }]
    },{
        title: '门店信息',
        items:[{
            //xtype: 'component',
            //disabled:true,
            readOnly: true,
            id:'storeNameMessage',
            fieldLabel: '门店名称',
            name: 'storeName'
        },{
            //xtype: 'component',
            //disabled:true,
            readOnly: true,
            id:'storeNumberMessage',
            fieldLabel: '门店编号',
            name: 'storeNumber'
        },{
            id:'storeAreaMessage',
            //disabled:true,
            readOnly: true,
            //xtype: 'component',
            fieldLabel: '门店区域',
            name: 'storeArea'
        }]

    }],
    listeners:{
        render:function(){
            Ext.Ajax.request({
                url: '/person/getPersonal',
                method: 'get',
                success: function(response, options) {
                    var json = Ext.util.JSON.decode(response.responseText);
                    if(json.success){
                        Ext.getCmp('pictureMessage').getEl().dom.src = 'resources/images/user-profile/'+json.map.picture;
                        Ext.getCmp('employeeNameMessage').setValue(json.map.employeeName);
                        Ext.getCmp('employeeNumberMessage').setValue(json.map.employeeNumber);
                        Ext.getCmp('emailMessage').setValue(json.map.email);
                        Ext.getCmp('postMessage').setValue(json.map.post);
                        Ext.getCmp('quotationMessage').setValue(json.map.quotation);
                        Ext.getCmp('storeNameMessage').setValue(json.map.storeName);
                        Ext.getCmp('storeNumberMessage').setValue(json.map.storeNumber);
                        Ext.getCmp('storeAreaMessage').setValue(json.map.storeArea);
                        //window.location.reload();
                    }else{
                        Ext.Msg.alert('加载失败', json.msg);
                    }
                }
            });
        }
    }
});
