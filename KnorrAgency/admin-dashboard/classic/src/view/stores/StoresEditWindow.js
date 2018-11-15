Ext.define('Admin.view.stores.StoresEditWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.storesEditWindow',
    height: 300,
    minHeight: 300,
    minWidth: 300,
    width: 500,
    scrollable: true,
    title: '编辑门店',
    closable: true,
    constrain: true,
    defaultFocus: 'textfield',
    modal:true,
    layout: 'fit',
    items: [{
        xtype: 'form',
        layout: 'form',
        padding: '10px',
        ariaLabel: 'Enter your name',
        items: [{
            xtype: 'textfield',
            fieldLabel: 'id',
            name:'id',
            hidden: true,
            readOnly: true
        }, {
            xtype: 'textfield',
            fieldLabel: '门店编号',
            name:'storeNumber'
        }, {
            xtype: 'textfield',
            fieldLabel: '门店名称',
            name:'storeName'
        }, {
            xtype: 'textfield',
            fieldLabel: '门店区域',
            name:'storeArea'
        },{
            xtype: 'combobox',
            fieldLabel: 'fatherStoreName',
            name:'fatherStoreName',
            id:'storeEditGetStoreName',
            fields: ["fatherStoreName","fatherStoreNameView"],
            displayField: 'fatherStoreNameView',
            valueField:'fatherStoreName',
            editable: false,
            queryMode: 'local',
            triggerAction: 'all',
            emptyText: 'Select a fatherStoreName',
            width: 135,
            listeners:{
                render:function(){
                    var tableComboStore = new Ext.data.Store({
                                                fields: ["fatherStoreName","fatherStoreNameView"],
                                                autoLoad:true,
                                                proxy: new Ext.data.HttpProxy({
                                                    type: "ajax",
                                                    actionMethods: { read: "GET" },
                                                    url: "/store/getStoreName",
                                                    reader: 
                                                    {
                                                        type: "json",
                                                        root: "data"
                                                    }
                                                })
                                            });
                    Ext.getCmp('storeEditGetStoreName').store=tableComboStore;
                    Ext.getCmp('storeEditGetStoreName').bindStore(tableComboStore);
                }
            }
        }]
    }],
   buttons: ['->',{
        xtype: 'button',
        text: '提交',
        handler: 'submitEditForm'
    },{
        xtype: 'button',
        text: '关闭窗口',
        handler: function(btn) {
            btn.up('window').close();
        }
    },'->']
  
});
