Ext.define('Admin.view.dashboard.DashboardController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.dashboard',

    init:function(){
    	Ext.Ajax.request({
            url: '/attence/isAttence',
            success: function(response, options) {
                var json = Ext.util.JSON.decode(response.responseText);
                var msg=json.msg;
                if(json.success){  
                    if(msg=='work'||msg=='out'){
                        //未上班或已下班
                        Ext.getCmp('work').show();
                        Ext.getCmp('out').hide(); 
                    }else if(msg=='working'){
                        //已上班但未签退
                        Ext.getCmp('work').hide();
                        Ext.getCmp('out').show();
                    }
                    
                }else{ 
                   Ext.getCmp('work').show();
                   Ext.getCmp('out').hide(); 
                }
            }
            
        });
    }
});
