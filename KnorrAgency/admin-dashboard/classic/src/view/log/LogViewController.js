Ext.define('Admin.view.log.LogViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.logViewController',
    
    downloadLogExcel:function(){
    	window.location = "/log/downloadLogExcel";
    }
});
