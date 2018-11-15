Ext.define('Admin.view.file.FileEditViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.fileEditViewController',

    /*编辑窗口保存*/
    openFileWindow:function(toolbar){
    	toolbar.up('panel').up('container').add(Ext.widget('fileWindow')).show();
    },
    submitEditFormButton:function(btn){
    	  var win    = btn.up('window');
        var form = win.down('form');
        var record = Ext.create('Admin.model.file.FileModel');
        var values  =form.getValues();
        values.emailStatus='EDIT';
        values.readStatus='EDIT';
        values.inboxStatus='EDIT';
        values.replyStatus='EDIT';
        record.set(values);
        record.save();
        Ext.data.StoreManager.lookup('editGridStroe').reload();
        win.close();
    },
    /*编辑窗口发送*/
    submitSendFormButton:function(btn){
        var win    = btn.up('window');
        var form = win.down('form');
        var record = Ext.create('Admin.model.file.FileModel');
        var values  =form.getValues();
        values.emailStatus='SEND';
        values.readStatus='NOREAD';
        values.inboxStatus='INBOX';
        values.replyStatus='NOREPLY';
        record.set(values);
        record.save();
        Ext.data.StoreManager.lookup('sendGridStroe').reload();
        Ext.data.StoreManager.lookup('inboxGridStroe').reload();
        win.close();
    },
    /*上传附件*/
    opendUploadWindow:function(btn){
       btn.up('panel').up('container').add(Ext.widget('attachmentUploadWindow')).show();
    },
    onClickUploadFormSumbitButton:function(btn){
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
                    Ext.getCmp('file_attachmentName').setValue(file);
                    Ext.getCmp('file_attachmentName').show();
                    Ext.getCmp('file_attachmentDelete').show();
                    Ext.getCmp('file_attachmentUpload').hide();
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
                    fileName: Ext.getCmp('file_attachmentName').getValue()
                  }, 
                  success: function(response, options) {
                      var json = Ext.util.JSON.decode(response.responseText);
                      if(json.success){
                        Ext.Msg.alert('操作成功', json.msg, function() {
                              Ext.getCmp('file_attachmentName').setValue('');
                              Ext.getCmp('file_attachmentName').hide();
                              Ext.getCmp('file_attachmentDelete').hide();
                              Ext.getCmp('file_attachmentUpload').show();
                          });
                      }else{
                         Ext.Msg.alert('操作失败', json.msg);
                      }
                  }
              });
          }
        }, this);
    },
    /*删除一条*/
    onDeleteButton:function(grid, rowIndex, colIndex){
        Ext.MessageBox.confirm('提示','确定删除吗？',
          function(btn,text){
            if(btn=='yes'){
              var store = grid.getStore();
              var record = store.getAt(rowIndex);
              store.remove(record);
            }

          }
        ,this);
    },
    /*删除多条*/
    onRemoveMore:function(btn, rowIndex, colIndex){
        var grid = Ext.getCmp('file_editgridpanel');
        var selModel = grid.getSelectionModel();
        if (selModel.hasSelection()){
            Ext.Msg.confirm("警告", "确定要删除吗？", function (button) {
                if (button == "yes") {
                    var rows = selModel.getSelection();
                    var selectIds = []; //要删除的id
                    Ext.each(rows, function (row) {
                        selectIds.push(row.data.id);
                    });
                    Ext.Ajax.request({
                        url : '/email/deletes', 
                        method : 'post', 
                        params : { 
                          ids :selectIds
                        }, 
                        success: function(response, options) {
                            var json = Ext.util.JSON.decode(response.responseText);
                            if(json.success){
                              Ext.Msg.alert('操作成功', json.msg, function() {
                                    grid.getStore().reload();
                                });
                            }else{
                               Ext.Msg.alert('操作失败', json.msg);
                            }
                        }
                    });
                }
            });
        }else {
              Ext.Msg.alert("错误", "没有任何行被选中，无法进行删除操作！");
        }
    },
    /*发送一条*/
    onSendButton:function(grid, rowIndex, colIndex){
        Ext.Ajax.request({
            url : '/email/sendOne', 
            method : 'post', 
            params : { 
              id :grid.getStore().getAt(rowIndex).data.id
            }, 
            success: function(response, options) {
                var json = Ext.util.JSON.decode(response.responseText);
                if(json.success){
                  Ext.Msg.alert('操作成功', json.msg, function() {
                        grid.getStore().reload();
                    });
                }else{
                   Ext.Msg.alert('操作失败', json.msg);
                }
            }
        });
    },
    /*发送多条*/
    onSendMore:function(btn, rowIndex, colIndex){
        var grid = Ext.getCmp('file_editgridpanel');
        var selModel = grid.getSelectionModel();
        if (selModel.hasSelection()){
              var rows = selModel.getSelection();
              var selectIds = []; //要发送的id
              Ext.each(rows, function (row) {
                  selectIds.push(row.data.id);
              });
              Ext.Ajax.request({
                  url : '/email/sendMore', 
                  method : 'post', 
                  params : { 
                    ids :selectIds
                  }, 
                  success: function(response, options) {
                      var json = Ext.util.JSON.decode(response.responseText);
                      if(json.success){
                        Ext.Msg.alert('操作成功', json.msg, function() {
                              grid.getStore().reload();
                          });
                      }else{
                         Ext.Msg.alert('操作失败', json.msg);
                      }
                  }
              });
        }else{
              Ext.Msg.alert("错误", "没有任何行被选中，无法进行发送操作！");
        }
    },
    /*编辑修改*/
    onEditButton:function(grid, rowIndex, colIndex){
        /*打开窗口*/
        var record = grid.getStore().getAt(rowIndex);
        if (record ) {
          var win = grid.up('panel').up('container').add(Ext.widget('editWindow'));
          if(record.data.emailAttachment!=''){
              Ext.getCmp('file_attachmentName').setValue(record.data.emailAttachment);
              Ext.getCmp('file_attachmentName').show();
              Ext.getCmp('file_attachmentDelete').show();
              Ext.getCmp('file_attachmentUpload').hide();
          }
          win.show();
          win.down('form').getForm().loadRecord(record);
        }
    },
    onEditFormButton:function(btn){
        var win = btn.up('window');
        var store = Ext.data.StoreManager.lookup('editGridStroe');
        var values  = win.down('form').getValues();//获取form数据
        var record = store.getById(values.id);//获取id获取store中的数据
        record.set(values);
        /*store.load();*/
        win.close();
    }

});
