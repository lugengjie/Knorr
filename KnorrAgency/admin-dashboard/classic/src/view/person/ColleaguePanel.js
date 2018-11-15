Ext.define('Admin.view.person.ColleaguePanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'colleaguePanel',

    requires: [
        'Ext.grid.Panel',
        'Ext.grid.View',
        'Ext.form.field.Text',
        'Ext.button.Button',
        'Ext.selection.CheckboxModel'
    ],

    cls: 'todo-list shadow-panel',

    //title: '你的同事',
    //height:320,
    autoHeight:true,
    //autoWidth:,
    //bodyPadding: 15,
    layout: 'fit',
    items:[{
        xtype: 'gridpanel',
        cls: 'user-grid',
        title: '我的同事',
        bind: '{colleagueLists}',
        scrollable: false,
        columns: [
                {xtype: 'gridcolumn',width: 40,dataIndex: 'id',text: 'Key',hidden:true},
                {xtype: 'gridcolumn',width: 70,dataIndex: 'picture',text: '头像',
                    renderer: function(value) {
                        return "<img src='resources/images/user-profile/" + value + "' alt='Profile Pic' height='40px' width='40px'>";
                    }
                },
                {xtype: 'gridcolumn',width: 140,cls: 'content-column',dataIndex: 'employeeNumber',text: '工号',flex: 1},
                {xtype: 'gridcolumn',width: 140,cls: 'content-column',dataIndex: 'employeeName',text: '姓名',flex: 1},
                {xtype: 'gridcolumn',width: 50,cls: 'content-column',dataIndex: 'post',text: '职称',flex: 1}
            ],
    }]
    
});
