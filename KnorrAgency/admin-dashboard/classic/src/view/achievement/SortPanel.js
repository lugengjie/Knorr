Ext.define('Admin.view.achievement.SortPanel', {
    extend: 'Ext.container.Container',
    xtype: 'sortPanel',
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
             bind: '{sortDate}',
             itemTpl:
            "<tpl if='rank==1'><div style='color:#919191;'><div style='text-align:center;'><img src='resources/images/user-profile/{picture}' alt='Profile Pic'  style='height:100px ;width:100px;border-radius:500px;'></div>"+
            "<div style='line-height:2em;'><p style='color:#919191;font-size:25px'>&nbsp;&nbsp;&nbsp;&nbsp;{word}</p></div>"+
            "<p style='text-align:right;color:#919191;font-size:2em'>———{employeeName}</p></div></tpl>",
             cls:'_boder',
             flex : 1
          },
          {    
             xtype: 'dataview',
             bind: '{sortDate}',
             itemTpl: 
            "<tpl if='rank==2'><div style='color:#919191;'><div style='text-align:center;'><img src='resources/images/user-profile/{picture}' alt='Profile Pic'  style='height:100px ;width:100px;border-radius:500px;'></div>"+
            "<div style='line-height:2em;'><p style='color:#919191;font-size:25px'>&nbsp;&nbsp;&nbsp;&nbsp;{word}</p></div>"+
            "<p style='text-align:right;color:#919191;font-size:2em'>———{employeeName}</p></div></tpl>",
             cls:'_boder',
             flex : 1            
          },
          {
            xtype: 'dataview',
            bind: '{sortDate}',
            itemTpl:
             "<tpl if='rank==3'><div style='color:#919191;'><div style='text-align:center;'><img src='resources/images/user-profile/{picture}' alt='Profile Pic'  style='height:100px ;width:100px;border-radius:500px;'></div>"+
            "<div style='line-height:2em;'><p style='color:#919191;font-size:25px'>&nbsp;&nbsp;&nbsp;&nbsp;{word}</p></div>"+
            "<p style='text-align:right;color:#919191;font-size:2em'>———{employeeName}</p></div></tpl>",
             cls:'_boder',
             flex : 1    
          },
          {
             xtype: 'dataview',
             bind: '{sortDate}',
             itemTpl: 
            "<tpl if='rank==4'><div style='color:#919191;'><div style='text-align:center;'><img src='resources/images/user-profile/{picture}' alt='Profile Pic'  style='height:100px ;width:100px;border-radius:500px;'></div>"+
            "<div style='line-height:2em;'><p style='color:#919191;font-size:25px'>&nbsp;&nbsp;&nbsp;&nbsp;{word}</p></div>"+
            "<p style='text-align:right;color:#919191;font-size:2em'>———{employeeName}</p></div></tpl>",
             cls:'_boder',
             flex : 1    
          }
      ]
    
});
