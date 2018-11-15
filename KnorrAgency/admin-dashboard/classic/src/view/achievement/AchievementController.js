Ext.define('Admin.view.achievement.AchievementController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.achievementController',
   	searchCombobox:function(combo,record,index){
		 var searchField = this.lookupReference('searchFieldName').getValue();
		 var searchField2 = this.lookupReference('searchFieldName2').getValue();
		 var store = combo.up('cartesian').getStore();
		 var store2 =combo.findParentByType('achievement').items.first().items.first().getStore();
		 var store3 =combo.findParentByType('achievement').items.last().items.first().getStore();
		 console.log(store3);
		 Ext.apply(store.proxy.extraParams, {month:searchField,area:searchField2});
		 Ext.apply(store2.proxy.extraParams, {month:searchField,area:searchField2});
		 Ext.apply(store3.proxy.extraParams, {month:searchField,area:searchField2});
		 store.load();
		 store2.load();
		 store3.load();
	}

});