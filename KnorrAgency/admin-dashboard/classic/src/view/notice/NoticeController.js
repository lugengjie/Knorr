
Ext.define('Admin.view.notice.NoticeController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.noticeViewController',
	/*Quick Search*/	
	openAddWindow:function(btn){
		btn.up('panel').up('container').add(Ext.widget('putOutWindow')).show();
	},
	submitAddForm:function(btn){
		 var values=btn.up('window').down('form').getValues();
		 websocket.send(JSON.stringify({
                  "event":"notice",
                  "idGroup":null,
                  "data":values['message']
          }));
		 var record = Ext.create('Admin.model.notice.NoticeModel');
		 console.log
         record.set(values);
         record.save();
         Ext.getCmp("notice_panel").getStore().load(); 
	}
});