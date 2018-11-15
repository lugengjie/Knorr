Ext.define('Admin.view.calendar.CalendarPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'calendarPanel',

    requires: [
        'Ext.calendar.panel.Panel',
        'Ext.calendar.panel.Days',
        'Ext.calendar.panel.Week',
        'Ext.calendar.panel.Month',
        'Ext.calendar.List',
        'Ext.layout.container.Border',
        'Ext.calendar.form.AbstractForm'
    ],
    controller: 'calendarViewController',
    width: 1000,
    height: 800,

    viewModel: {
        data: {
            value: Ext.Date.getFirstDateOfMonth(new Date())
        },
        stores: {
            calStore: {
                type: 'calendar-calendars',
                autoLoad: true,
                proxy: {
                    type: 'ajax',
                    url: 'calendar/findCalendars',
                    reader: {
                      type: 'json',
                      rootProperty: 'lists'
                    }
                },
                eventStoreDefaults: {
                    proxy: {
                      type: 'ajax',
                      url:'calendar/finds',
                      reader: {
                        type: 'json',
                        rootProperty: 'lists'
                      }
                    }
                }
            }
        }
    },

    layout: 'border',
    bind: {
        title: '{value:date("M Y")}'
    },
    titleAlign: 'center',
    items: [{
        region: 'west',
        title: 'Calendars',
        ui: 'light',
        width: 150,
        bodyPadding: 5,
        collapsible: true,
        items: {
            xtype: 'calendar-list',
            bind: '{calStore}'
        }
    }, {
        region: 'center',
        xtype: 'calendar-month',
        visibleWeeks: null,
        timezoneOffset: 0,
        gestureNavigation: false,
        bind: {
            value: '{value}',
            store: '{calStore}'
        }
    }]
    
});