Ext.define('Admin.view.allattence.AllAttenceViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.allAttenceViewController',

    /*查询*/
    openSearchAllAttenceWindow:function(btn){
        btn.up('panel').up('container').add(Ext.widget('allAttenceSearchWindow')).show();
    },
    searchAllAttence:function(btn){
        var store = Ext.data.StoreManager.lookup('allAttenceGridStroe');
        var win = btn.up('window');
        var form = win.down('form');
        var values  =form.getValues();

        Ext.apply(store.proxy.extraParams, {employeeName:"",storeName:"",timeStart:"",timeEnd:""});
        Ext.apply(store.proxy.extraParams,{
        employeeName:values.employeeName,
        storeName:values.storeName,
        timeStart:Ext.util.Format.date(values.timeStart, 'Y/m/d H:i:s'),
        timeEnd:Ext.util.Format.date(values.timeEnd, 'Y/m/d H:i:s')
      });
      store.load({params:{start:0, limit:20, page:1}});
      win.close();
    },
    /*刷新*/
    refresh:function(btn){
        var store = Ext.data.StoreManager.lookup('allAttenceGridStroe');
        Ext.apply(store.proxy.extraParams, {employeeName:"",storeName:"",timeStart:"",timeEnd:""});
        store.load({params:{start:0, limit:20, page:1}});
    },

    /*打开下载选择窗口*/
    openSelectWindow:function(btn){
         btn.up('panel').up('container').add(Ext.widget('selectWindow')).show();
    },
    /*下载考勤表*/
    downloadAttenceExcel:function(btn){
        var win  = btn.up('window');
        var form = win.down('form');
        var values  =form.getValues();

        Ext.Ajax.request({ 
            url : '/attence/judgeAttenceExcel', 
            method : 'post', 
            params : { 
              month :values.month,
              storeName:values.storeName
            }, 
            success: function(response, options) {
              var json = Ext.util.JSON.decode(response.responseText);
              if(json.success){
                  win.close();
                  window.location = "/attence/downloadAttenceExcel?month="+values.month+"&storeName="+values.storeName;
              }else{
                Ext.Msg.alert('下载失败', "无该月考勤信息");
              }
            }
        });





        
    }
});
