Ext.define('Admin.view.file.FileSendViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.fileSendViewController',
    /*删除多条*/
    onRemoveMore:function(btn, rowIndex, colIndex){
      var grid = Ext.getCmp('file_sendgridpanel');
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

    /*删除一条*/
    onDelete:function(grid, rowIndex, colIndex){
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
    /*下载附件*/
    onDownloadButton:function(grid, rowIndex, colIndex){
        var record = grid.getStore().getAt(rowIndex);
        if(record.data.emailAttachment!=''){
             window.location = "/email/downloadAttachment?fileName="+record.data.emailAttachment;
        }else{
            Ext.Msg.alert("错误", "此邮件无发件不能进行下载！");
        }
    },
    /*打开详情窗口*/
    onGridCellItemClick: function(view, td, cellIndex, record){
        if(cellIndex > 1){
            var view=this.getView();
            var win=view.add(Ext.widget('detailWindow'));
            if(record.data.emailAttachment!=''){
                Ext.getCmp('detail_attachmentName').show();
                Ext.getCmp('detail_attachmentDownload').show();
            }
            win.show();
            win.down('form').getForm().loadRecord(record);
        }
    },
    /*详情窗口中的下载*/
    onDownload:function(btn){
        var fileName=Ext.getCmp('detail_attachmentName').getValue();
        window.location = "/email/downloadAttachment?fileName="+fileName;
    }
});
