Ext.define('Admin.view.achievement.AnalysePanel', {
    extend: 'Ext.container.Container',
    xtype: 'analysePanel',
    requires: [ 
        'Ext.layout.container.HBox',
    ],
    dataIndex:'fullname',
    layout: {
        type :'hbox',
        align: 'stretch'               
    },
    margin: '0 0 10 0',
    items: [
        {   
          xtype: 'dataview',
          bind: '{anlyseDate}',
          itemTpl:
           "<img src='resources/images/user-profile/{picture}' alt='Profile Pic'  style='height:100px ;width:100px;border-radius:500px;position: absolute;left:33%;top: 25%;'>"+
           "<img src='resources/images/icons/crown1.png' alt='Profile Pic'  style='height:120px ;width:200px;position: absolute;left:16%;top: -11%;'>"+
           "<img src='resources/images/icons/crown2.png' alt='Profile Pic'  style='height:120px ;width:200px;position: absolute;left:16%;top: 30%;'>"+
           "<tpl for='.'><p style='position: absolute;bottom:0px;text-align: center;left: 0;right: 0;color:#919191;font-size:2em'>销售冠军:"+"{winner}"+"</p></tpl>",
           cls:'_boder',
           flex : 1
        },
        {  
           xtype: 'dataview',
           bind: '{anlyseDate}',
           itemTpl:
           "<br><br><br><br><br><div style='color:#919191;text-align:center;line-height:0.8em'><p style='font-size:4em'>￥{total}万</p><br><br><br>"+
           "<p style='color:#919191;font-size:2em'>销售总额</p></div>",
           cls:'_boder',
           flex : 1              
        },
        {
           xtype: 'dataview',
           bind: '{anlyseDate}',
           itemTpl:
           "<br><br><br><br><br><div style='color:#919191;text-align:center;line-height:0.8em'><p style='font-size:4em'>{rate}%</p><br><br><br>"+
           "<p style='color:#919191;font-size:2em'>月增长率</p></div>",
           cls:'_boder',
           flex : 1
        },
        {
           xtype: 'dataview',
           bind: '{anlyseDate}',
           itemTpl:
          "<br><br><br><br><br><div style='color:#919191;text-align:center;line-height:0.8em'><p style='font-size:4em'>{peopleNum}</p><br><br><br>"+
           "<p style='color:#919191;font-size:2em'>总人数</p></div>",
           cls:'_boder',
           flex : 1
        }
    ]
    
});
