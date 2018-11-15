Ext.define('Admin.view.achievement.Achievement', {
    extend: 'Ext.panel.Panel',
    xtype: 'achievement',
	height: window.innerHeight,
    requires: [ 
        'Admin.view.achievement.AchievementViewModel',
        'Ext.layout.container.VBox',
        'Ext.layout.container.HBox',
         'Admin.view.achievement.ChartPanel',
        'Admin.view.achievement.AchievementViewModel'
    ],
    controller: 'achievementController',
    viewModel: {
        type: 'achievementViewModel'
    },
    layout: {
        type :'vbox',
        align: 'stretch'               
    },

    defaults: {
        defaults: {
            animation : !Ext.isIE9m && Ext.os.is.Desktop
        }
    },

    items : [{
        xtype: 'analysePanel',
		height: window.innerHeight/3
    },{
       xtype: 'chartPanel',
	   height: window.innerHeight/3,
       margin: '0 0 10 0'
    },{
        xtype: 'sortPanel',
		height: window.innerHeight/3
    }]
});
