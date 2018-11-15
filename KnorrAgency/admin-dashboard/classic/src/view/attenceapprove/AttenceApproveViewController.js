Ext.define('Admin.view.attenceapprove.AttenceApproveViewController', {
    extend: Ext.app.ViewController,
    alias: 'controller.attenceApproveViewController',

    //封装审批表单数据,并以Ajax提交到后台完成任务的流程变量封装对象中。
    complete: function(url, variables,form){
        // 转换JSON为字符串
        var keys = "", values = "", types = "";
        if (variables) {
            Ext.each(variables, function (item) {
                if (keys != "") {
                    keys += ",";
                    values += ",";
                    types += ",";
                }
                keys += item.key;
                values += item.value;
                types += item.type;
            });
        }
        Ext.Ajax.request({
            url: url,
            method: 'post',
            params : { 
                keys: keys,
                values: values,
                types: types
            }, 
            success: function(response, options) {
                var json = Ext.util.JSON.decode(response.responseText);
                if (json.success) {
                    Ext.Msg.alert('操作成功', json.msg, function() {
                        form.up('window').close();
                        //grid.getStore().reload();
                        Ext.data.StoreManager.lookup('leaveApproveStore').load();
                        Ext.data.StoreManager.lookup('appealApproveStore').load();
                    });
                } else {
                    Ext.Msg.alert('操作失败', json.msg);
                }
            }
        });
    },

    /***********************************************请假业务**********************************************************/
    //1.签收任务
    onClickLeaveApproveClaimButton: function(view, recIndex, cellIndex, item, e, record) {
        Ext.Ajax.request({
            url: 'leave/claim/' + record.get('taskId'),
            method: 'post',
            success: function(response, options) {
                var json = Ext.util.JSON.decode(response.responseText);
                if (json.success) {
                    Ext.Msg.alert('操作成功', json.msg, function() {
                        view.getStore().reload();
                    });
                } else {
                    Ext.Msg.alert('操作失败', json.msg);
                }
            }
        });
    },
    //2.创建审批表单（并绑定Task id）
    setCurrentView: function(view, form, title) {
		var cfg = Ext.apply({
			xtype: 'attenceApproveWindow',
			items: [{xtype: form}]
		},{
			title: title
		});
		var win = Ext.widget(cfg);
        view.up('panel').up('container').add(win);
        return win;
    },
    onClickLeaveApproveCompleteWindowButton: function(view, recIndex, cellIndex, item, e, record) {
    	//选中点击的行
        var taskDefinitionKey = record.get('taskDefinitionKey');

        var leavetype=record.get('leaveType');
        if(leavetype=='A'){
            record.data.leaveType='带薪假期';
        }else if(leavetype=='B'){
            record.data.leaveType='无薪假期';
        }else if(leavetype=='C'){
            record.data.leaveType='病假';
        }

        if (taskDefinitionKey == 'deptLeaderAudit') {
            //部门领导审批
            var win = this.setCurrentView(view,'leavedeptLeaderAudit', '部门领导审批');
            win.down('form').getForm().loadRecord(record);
        } else if (taskDefinitionKey == 'hrAudit') {
        	//人事审批
        	var win = this.setCurrentView(view,'leavehrAudit','人事审批表单');
        	win.down('form').getForm().loadRecord(record);
        }
        else if (taskDefinitionKey == 'reportBack') {
        	//申请人销假
        	var win = this.setCurrentView(view,'leavereportBack','销假表单');
        	win.down('form').getForm().loadRecord(record);
        }
        else if (taskDefinitionKey == 'modifyApply') {
        	//申请人调整申请：可以编写到工具类中
        	var win = this.setCurrentView(view,'leavemodifyApply','调整申请表单');
        	win.down('form').getForm().loadRecord(record);
        }
    },
    
	//部门经理审批
    onClickDeptleaderAuditFormSubmitButton: function(btn) {
    	var form = btn.up('form');
    	var values = form.getValues();
    	var url = 'leave/complete/' + values.taskId;
    	var variables = [{
			key: 'deptLeaderPass',
			value: values.deptLeaderPass,//获取表单选择的value
			type: 'B'
		},{
			key: 'deptLeaderBackReason',
			value: values.deptLeaderBackReason,//获取表单选择的value
			type: 'S'
		}];
        this.complete(url,variables,form);
    },
    //人事文员审批
    onClickHrAuditFormSubmitButton: function(btn) {
        var form = btn.up('form');
    	var values = form.getValues();
    	var url = 'leave/complete/' + values.taskId;
    	var variables = [{
			key: 'hrPass',
			value: values.hrPass,//获取表单选择的value
			type: 'B'
		},{
			key: 'hrBackReason',
			value: values.hrBackReason,//获取表单选择的value
			type: 'S'
		}];
        this.complete(url,variables,form);
    },
    //销假
    onClickReportBackFormSubmitButton: function(btn) {
        
    	var form = btn.up('form');
        if(form.isValid()){
            var values = form.getValues();
            var url = 'leave/complete/' + values.taskId;
            var variables = [{
                key: 'realityStartTime',
                value: values.realityStartTime,//获取表单选择的value
                type: 'D'
            },{
                key: 'realityEndTime',
                value: values.realityEndTime,//获取表单选择的value
                type: 'D'
            }];
            this.complete(url,variables,form);
        }else{
            Ext.Msg.alert('提示','不允许为空');
        }
     	
    },
    //调整申请
    onClickModifyApplyFormSubmitButton: function(btn) {
        var form = btn.up('form');
    	var values = form.getValues();
    	var url = 'leave/complete/' + values.taskId;
    	var variables = [{
			key: 'reApply',
			value: values.reApply,//获取表单选择的value
			type: 'B'
		},{
			key: 'leaveType',
			value: values.leaveType,//获取表单选择的value
			type: 'S'
		},{
			key: 'startTime',
			value: values.startTime,//获取表单选择的value
			type: 'D'
		},{
			key: 'endTime',
			value: values.endTime,//获取表单选择的value
			type: 'D'
		},{
			key: 'reason',
			value: values.reason,//获取表单选择的value
			type: 'S'
		}];
        this.complete(url,variables,form);
    },
     //流程跟踪
    onClickGraphTraceButton : function(view, recIndex, cellIndex, item, e, record) {
        var diagramResourceUrl = 'process-trace?processInstanceId=' + record.get('processInstanceId');
        var win = new Ext.window.Window({
            title: '流程跟踪',
            width : 860,
            height : 500,
            layout: 'fit',
            items:[new Ext.Panel({         
               resizeTabs :true,
               autoScroll : true,
               html:'<iframe scrolling="auto" frameborder="0" width="100%" height="100%" src='+diagramResourceUrl+'></iframe>'
           })]
        });
        win.show();
    },
    selectChange:function(){
        var val=this.lookReference('ss').getValue();
        alert(val);
        /*if(val==""){
            this.lookReference('ss').hidden();
        }*/
    },




    /***********************************************申诉业务**********************************************************/
    //1.签收任务
    onClickAppealApproveClaimButton: function(view, recIndex, cellIndex, item, e, record) {
        Ext.Ajax.request({
            url: 'attence/claim/' + record.get('taskId'),
            method: 'post',
            success: function(response, options) {
                var json = Ext.util.JSON.decode(response.responseText);
                if (json.success) {
                    Ext.Msg.alert('操作成功', json.msg, function() {
                        view.getStore().reload();
                    });
                } else {
                    Ext.Msg.alert('操作失败', json.msg);
                }
            }
        });
    },
    //2.审批
    onClickAppealApproveCompleteWindowButton: function(view, recIndex, cellIndex, item, e, record) {
        //选中点击的行
        var taskDefinitionKey = record.get('taskDefinitionKey');

        var attenceStatus=record.get('attenceStatus');
        if(attenceStatus=='LEAVE'){
            record.data.attenceStatus='请假';
        }else if(attenceStatus=='LATER'){
            record.data.attenceStatus='迟到';
        }else if(attenceStatus=='EARLY'){
            record.data.attenceStatus='早退';
        }else if(attenceStatus=='EARLYandLATER'){
            record.data.attenceStatus='迟到,早退';
        }
        if (taskDefinitionKey == 'deptLeaderAudit') {
            //部门领导审批
            var win = this.setCurrentView(view,'appealdeptLeaderAudit', '部门领导审批');
            win.down('form').getForm().loadRecord(record);
        } else if (taskDefinitionKey == 'hrmanagerAudit') {
            //人事审批
            var win = this.setCurrentView(view,'appealhrAudit','人事审批表单');
            win.down('form').getForm().loadRecord(record);
        }
        else if (taskDefinitionKey == 'modifyApply') {
            //申请人调整申请：可以编写到工具类中
            var win = this.setCurrentView(view,'appealmodifyApply','调整申诉表单');
            win.down('form').getForm().loadRecord(record);
        }
        else if (taskDefinitionKey == 'appealConfirm') {
            //申请人调整申请：可以编写到工具类中
            var win = this.setCurrentView(view,'appealConfirm','申诉结果确认');
            win.down('form').getForm().loadRecord(record);
        }
    },
    //部门经理审批
    onClickAppealDeptleaderAuditFormSubmitButton: function(btn) {
        var form = btn.up('form');
        var values = form.getValues();
        var url = 'attence/complete/' + values.taskId;
        var variables = [{
            key: 'deptLeaderPass',
            value: values.deptLeaderPass,//获取表单选择的value
            type: 'B'
        },{
            key: 'deptLeaderBackReason',
            value: values.deptLeaderBackReason,//获取表单选择的value
            type: 'S'
        }];
        this.complete(url,variables,form);
    },
    //人事文员审批
    onClickAppealHrAuditFormSubmitButton: function(btn) {
        var form = btn.up('form');
        var values = form.getValues();
        var url = 'attence/complete/' + values.taskId;
        var variables = [{
            key: 'hrPass',
            value: values.hrPass,//获取表单选择的value
            type: 'B'
        },{
            key: 'hrBackReason',
            value: values.hrBackReason,//获取表单选择的value
            type: 'S'
        }];
        this.complete(url,variables,form);
    },
    //调整申请
    onClickAppealModifyApplyFormSubmitButton: function(btn) {
        var form = btn.up('form');
        var values = form.getValues();
        var url = 'attence/complete/' + values.taskId;
        var variables = [{
            key: 'reApply',
            value: values.reApply,//获取表单选择的value
            type: 'B'
        },{
            key: 'appealreason',
            value: values.appealreason,//获取表单选择的value
            type: 'S'
        }];
        this.complete(url,variables,form);
    },
     //确认
    onClickAppealConfirmFormSubmitButton: function(btn) {
        
        var form = btn.up('form');
        if(form.isValid()){
            var values = form.getValues();
            var url = 'attence/complete/' + values.taskId;
            var variables = [{
                key: 'confirmName',
                value: values.confirmName,//获取表单选择的value
                type: 'S'
            }];
            this.complete(url,variables,form);
        }else{
            Ext.Msg.alert('提示','不允许为空');
        }
        
    }

});