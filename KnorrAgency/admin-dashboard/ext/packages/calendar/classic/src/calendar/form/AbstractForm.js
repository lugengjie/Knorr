/**
 * A base implementation of a form for the classic toolkit.
 * @abstract
 */
Ext.define('Ext.calendar.form.AbstractForm', {extend:Ext.window.Window, layout:'fit', modal:true, closable:false, defaultListenerScope:true, config:{calendarField:{xtype:'calendar-calendar-picker', fieldLabel:'Calendar', name:'calendarId', forceSelection:true, editable:false, queryMode:'local', displayField:'title', valueField:'id'}, titleField:{xtype:'textfield', fieldLabel:'Title', name:'title', allowBlank:false}, fromContainer:{xtype:'fieldcontainer', fieldLabel:'From', layout:'hbox'}, startDateField:{xtype:'datefield', 
itemId:'startDate', name:'startDate', allowBlank:false}, startTimeField:{xtype:'timefield', itemId:'startTime', name:'startTime', margin:'0 0 0 5'}, toContainer:{xtype:'fieldcontainer', fieldLabel:'To', layout:'hbox'}, endDateField:{xtype:'datefield', itemId:'endDate', name:'endDate', allowBlank:false}, endTimeField:{xtype:'timefield', itemId:'endTime', name:'endTime', margin:'0 0 0 5'}, allDayField:{xtype:'checkbox', itemId:'allDay', name:'allDay', boxLabel:'All Day', hideEmptyLabel:false, handler:'onAllDayChange'}, 
descriptionField:{xtype:'textarea', fieldLabel:'Description', name:'description', flex:1}, dropButton:{text:'Delete', handler:'onDropTap'}, saveButton:{text:'Save', handler:'onSaveTap'}, cancelButton:{text:'Cancel', handler:'onCancelTap'}}, initComponent:function() {
  var me = this;
  me.initForm();
  me.fbar = me.generateButtons();
  me.callParent();
  me.form = me.items.first();
  me.checkFields();
  me.applyValues();
}, generateButtons:function() {
  var buttons = [], drop = this.getDropButton();
  if (drop) {
    buttons.push(drop);
  }
  buttons.push({xtype:'component', flex:1}, this.getSaveButton(), this.getCancelButton());
  return buttons;
}, applyValues:function() {
  this.form.getForm().setValues(this.consumeEventData());
}, createItems:function() {
  var me = this, calField = me.getCalendarField(), fromCt = me.getFromContainer(), toCt = me.getToContainer();
  if (!calField.store) {
    calField.store = me.getCalendarStore();
  }
  if (!fromCt.items) {
    fromCt.items = [me.getStartDateField(), me.getStartTimeField()];
  }
  if (!toCt.items) {
    toCt.items = [me.getEndDateField(), me.getEndTimeField()];
  }
  this.items = [{xtype:'form', border:false, trackResetOnLoad:true, layout:{type:'vbox', align:'stretch'}, bodyPadding:10, items:[calField, me.getTitleField(), fromCt, toCt, me.getAllDayField(), me.getDescriptionField()]}];
}, privates:{checkFields:function() {
  var checked = this.down('#allDay').checked;
  this.down('#startTime').setDisabled(checked);
  this.down('#endTime').setDisabled(checked);
}, onAllDayChange:function() {
  this.checkFields();
}, onCancelTap:function() {
  this.fireCancel();
}, onDropTap:function() {
  this.fireDrop();
}, onSaveTap:function() {
  var form = this.form, values = form.getForm().getFieldValues();
  if (!form.isValid()) {
    return;
  }
  values.allDay = this.down('#allDay').checked;
  this.fireSave(this.produceEventData(values));
  Ext.Ajax.request({
    url:'/calendar/save', 
    method:'post', 
    headers:{'Content-Type':'application/json'},
    params:JSON.stringify({
      title:values.title,
      calendarId:values.calendarId,
      startDate:values.startDate,
      endDate:values.endDate,
      description:values.description
    }), 
    success:function(response, options) {
    var json = Ext.util.JSON.decode(response.responseText);
    if (json.success) {
      Ext.Msg.alert('操作成功', json.msg);
    } else {
      Ext.Msg.alert('操作失败', json.msg);
    }
  }});
}}});