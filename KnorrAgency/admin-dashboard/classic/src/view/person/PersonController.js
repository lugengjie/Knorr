Ext.define('Admin.view.person.PersonController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.personController',

   	onBasicInfoSubmit:function(){
   		Ext.Ajax.request({
            url: '/person/editPersonal',
            method: 'get',
            params: {
                email: Ext.getCmp('emailMessage').getValue(),
                quotation: Ext.getCmp('quotationMessage').getValue()
            },
            success: function(response, options) {
            	var json = Ext.util.JSON.decode(response.responseText);
	            if(json.success){
	            	Ext.Msg.alert('成功！', json.msg);
	                //window.location.reload();
		        }else{
		        	Ext.Msg.alert('失败！', json.msg);
		        }
            }
        });
   	},

   	openChangePasswordWindow:function(form){
   		form.up('panel').add(Ext.widget('changePasswordWindow')).show();
   	},

   	changePassword:function(btn){
   		Ext.Ajax.request({
            url: '/person/changePassword',
            method: 'get',
            params: {
                oldPassword: Ext.getCmp('getOldPassword').getValue(),
                newPassword1: Ext.getCmp('getNewPassword1').getValue(),
                newPassword2: Ext.getCmp('getNewPassword2').getValue()
            },
            success: function(response, options) {
            	var json = Ext.util.JSON.decode(response.responseText);
	            if(json.success){
	            	Ext.Msg.alert('成功！', json.msg);
	            	btn.up('window').close();
	                //window.location.reload();
		        }else{
		        	Ext.Msg.alert('失败！', json.msg);
		        }
            }
        });
   	},

   	openUploadFileWindow:function(form){
   		form.up('panel').add(Ext.widget('uploadFileWindow')).show();
   	},

   	firstFormReset:function(){
   		Ext.getCmp('uploadFileValue').reset();
   		//this.lookupReference('firstForm').getForm().reset();
   	},

   	firstFormSave:function(btn){
   		var form = this.lookupReference('firstForm').getForm();

        if (form.isValid()) {
            form.submit({
                url: '/person/uploadPicture',
                waitMsg: '正在上传头像...',
                success: function(form,action) {
                	Ext.Msg.alert('成功！','上传成功！');
                    btn.up('window').close();
                },
                failure: function(form,action) {
                    Ext.Msg.alert('失败！','上传失败！');
                }
            });
        }
   	}

});