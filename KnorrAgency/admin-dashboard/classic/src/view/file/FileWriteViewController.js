Ext.define('Admin.view.file.FileWriteViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.fileWriteViewController',

    /*上传附件*/
    opendUploadWindow:function(btn){
       btn.up('panel').up('container').add(Ext.widget('attachmentUploadWindowByWrite')).show();
    },
    onClickUploadFormSumbitButtonByWrite:function(btn){
      var form = btn.up('window').down('form');
      if(form.isValid()){
          form.getForm().submit({       
              url:'/email/uploadAttachment',
              method : 'POST',
              waitMsg: '正在上传，请耐心等待....',
              success: function(form, action){ 
                  var file=action.result.msg;
                  Ext.Msg.alert('提示', '文件上传成功！',function(){
                    btn.up('window').close();
                    Ext.getCmp('write_attachmentName').setValue(file);
                    Ext.getCmp('write_attachmentName').show();
                    Ext.getCmp('write_attachmentDelete').show();
                    Ext.getCmp('write_attachmentUpload').hide();
                  });       
              }, 
              failure: function(form, action){
                Ext.Msg.alert('提示', '上传失败！');
              }
          });
      }else{
         Ext.Msg.alert('提示', '请选择文件');
      }
      
    },
    /*删除附件*/
    deleteAttachment:function(btn){
        Ext.MessageBox.confirm('提示', '确定要删除附件吗?',function(btn, text){
          if(btn=='yes'){
              Ext.Ajax.request({
                  url : '/email/deleteAttachment', 
                  method : 'post', 
                  params : { 
                    fileName: Ext.getCmp('write_attachmentName').getValue()
                  }, 
                  success: function(response, options) {
                      var json = Ext.util.JSON.decode(response.responseText);
                      if(json.success){
                        Ext.Msg.alert('操作成功', json.msg, function() {
                              Ext.getCmp('write_attachmentName').setValue('');
                              Ext.getCmp('write_attachmentName').hide();
                              Ext.getCmp('write_attachmentDelete').hide();
                              Ext.getCmp('write_attachmentUpload').show();
                          });
                      }else{
                         Ext.Msg.alert('操作失败', json.msg);
                      }
                  }
              });
          }
        }, this);
    },
    /*发送*/
    onSendFormButton:function(btn){
    	var me = this;
        var panel    = btn.up('panel');
        var form = panel.down('form');
        var record = Ext.create('Admin.model.file.FileModel');
        var values  =form.getValues();
        values.emailStatus='SEND';
        values.readStatus='NOREAD';
        values.inboxStatus='INBOX';
        values.replyStatus='NOREPLY';
        record.set(values);
        record.save();

        Ext.Msg.alert('操作成功', '发送成功',function(){
              Ext.getCmp('write_form').form.reset();
              Ext.getCmp('write_attachmentName').hide();
              Ext.getCmp('write_attachmentDelete').hide();
              Ext.getCmp('write_attachmentUpload').show();
              me.redirectTo('fileSendPanel', true);
         });
        Ext.data.StoreManager.lookup('sendGridStroe').reload();
    },
    /*保存*/
    onEditFormButton:function(btn){
        var me = this;
        var panel    = btn.up('panel');
        var form = panel.down('form');
        var record = Ext.create('Admin.model.file.FileModel');
        var values  =form.getValues();
        values.emailStatus='EDIT';
        values.readStatus='EDIT';
        values.inboxStatus='EDIT';
        values.replyStatus='EDIT';
        record.set(values);
        record.save();

        Ext.Msg.alert('操作成功', '保存成功',function(){
            Ext.getCmp('write_form').form.reset();
            Ext.getCmp('write_attachmentName').hide();
            Ext.getCmp('write_attachmentDelete').hide();
            Ext.getCmp('write_attachmentUpload').show();
            me.redirectTo('fileEditPanel', true);
        });
        Ext.data.StoreManager.lookup('editGridStroe').reload();
    },
    /*清空*/
    onDeleteFormButton:function(btn){
       Ext.MessageBox.confirm('提示', '确定要清空吗?',function(btn, text){
          if(btn=='yes'){
              Ext.getCmp('write_form').form.reset();
          }
        }, this);
    }

});
