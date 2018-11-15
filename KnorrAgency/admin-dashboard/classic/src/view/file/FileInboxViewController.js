Ext.define('Admin.view.file.FileInboxViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.fileInboxViewController',

    /*打开回复窗口*/
    onRebackButton:function(grid, rowIndex, colIndex){
    	/*打开窗口*/
    	Ext.Ajax.request({
            url : '/email/readOne', 
            method : 'post', 
            params : { 
              id :grid.getStore().getAt(rowIndex).data.id
            }, 
            success: function(response, options) {
                var json = Ext.util.JSON.decode(response.responseText);
                if(json.success){
                  Ext.Msg.alert('操作成功', json.msg, function() {
                        grid.getStore().reload();
                        var record = grid.getStore().getAt(rowIndex);
				        if (record ) {
				          var win = grid.up('panel').up('container').add(Ext.widget('replyWindow'));
				          if(record.data.emailAttachment!=''){
				              Ext.getCmp('reply_attachmentName').setValue(record.data.emailAttachment);
				              Ext.getCmp('reply_attachmentName').show();
				              Ext.getCmp('reply_attachmentDownload').show();
				          }
				          win.show();
				          win.down('form').getForm().loadRecord(record);
				        }
                    });
                }else{
                   Ext.Msg.alert('操作失败', json.msg);
                }
            }
        });   
    },
    /*回复*/
    onReplyFormButton:function(btn){
    	var win    = btn.up('window');
      var form = win.down('form');
      var values  =form.getValues();
    	Ext.Ajax.request({
            url : '/email/reply', 
            method : 'post', 
            params : { 
              id :values.id,
              replyEmailContent:values.reply_emailContent,
              replyEmailAttachment:values.replyEmailAttachment
            }, 
            success: function(response, options) {
                var json = Ext.util.JSON.decode(response.responseText);
                if(json.success){
                  Ext.Msg.alert('操作成功', json.msg, function() {
                    //     Ext.data.StoreManager.lookup('sendGridStroe').reload();
        				        // Ext.data.StoreManager.lookup('inboxGridStroe').reload();
                      win.close();
                    });
                }else{
                   Ext.Msg.alert('操作失败', json.msg);
                }
            }
        });
    },
    /*上传附件*/
    opendUploadWindow:function(btn){
       btn.up('panel').up('container').add(Ext.widget('attachmentUploadWindowByReply')).show();
    },
    onClickUploadFormSumbitButtonByReply:function(btn){
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
                    Ext.getCmp('reply_attachmentName').setValue(file);
                    Ext.getCmp('reply_attachmentName').show();
                    Ext.getCmp('reply_attachmentDelete').show();
                    Ext.getCmp('reply_attachmentUpload').hide();
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
                              Ext.getCmp('reply_attachmentName').setValue('');
                              Ext.getCmp('reply_attachmentName').hide();
                              Ext.getCmp('reply_attachmentDelete').hide();
                              Ext.getCmp('reply_attachmentUpload').show();
                          });
                      }else{
                         Ext.Msg.alert('操作失败', json.msg);
                      }
                  }
              });
          }
        }, this);
    },
    /*下载*/
    onDownload:function(btn){
        var fileName=Ext.getCmp('from_attachmentName').getValue();
        window.location = "/email/downloadAttachment?fileName="+fileName;
    },
    onDownloadButton:function(grid, rowIndex, colIndex){
    	var record = grid.getStore().getAt(rowIndex);
        if(record.data.emailAttachment!=''){
             window.location = "/email/downloadAttachment?fileName="+record.data.emailAttachment;
        }else{
            Ext.Msg.alert("错误", "此邮件无发件不能进行下载！");
        }
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
      var grid = Ext.getCmp('file_inboxgridpanel');
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
    onReadMore:function(btn, rowIndex, colIndex){
        var grid = Ext.getCmp('file_inboxgridpanel');
        var selModel = grid.getSelectionModel();
        if (selModel.hasSelection()){
              var rows = selModel.getSelection();
              var selectIds = []; //要发送的id
              Ext.each(rows, function (row) {
                  selectIds.push(row.data.id);
              });
              Ext.Ajax.request({
                  url : '/email/readMore', 
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
    }

});
