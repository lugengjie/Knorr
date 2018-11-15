Ext.define('Admin.view.main.Main', {
    extend: 'Ext.container.Viewport',

    requires: [
        'Ext.button.Segmented',
        'Ext.list.Tree'
    ],

    controller: 'main',
    viewModel: 'main',

    cls: 'sencha-dash-viewport',
    itemId: 'mainView',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    listeners: {
        render: 'onMainViewRender'
    },

    items: [
        {
            xtype: 'toolbar',
            cls: 'sencha-dash-dash-headerbar shadow',
            height: 64,
            itemId: 'headerBar',
            items: [
                {
                    xtype: 'component',
                    reference: 'senchaLogo',
                    cls: 'sencha-logo',
                    html: '<div class="main-logo" style="font-size:16px;font-weight:bold;font-family:微软雅黑;position:absolute;top:-10%;"><img style="width:60px;height:50px;"src="resources/images/k.png">家乐房产中介</div>',
                    width: 250
                },
                {
                    margin: '0 0 0 8',
                    ui: 'header',
                    iconCls:'x-fa fa-navicon',
                    id: 'main-navigation-btn',
                    handler: 'onToggleNavigationSize'
                },
                '->',
                {
                    /*x-fa fa-envelope fa-5x*/
                    iconCls:'fa fa-envelope fa-5x',
                    ui: 'header',
                    href: '#fileInboxPanel',
                    hrefTarget: '_self',
                    tooltip: '查看邮件'
                },
                {
                    iconCls:'fa fa-th-large fa-5x',
                    ui: 'header',
                    href: '#profile',
                    hrefTarget: '_self',
                    tooltip: '个人空间'
                },
                {
                    iconCls:'fa fa-fax fa-5x',
                    id:'work',
                    ui: 'header',
                    tooltip: '上班打卡',
                    handler:'attence'
                },
                {
                    iconCls:'fa fa-share-square fa-5x',
                    id:'out',
                    ui: 'header',
                    tooltip: '下班签退',
                    handler:'signback',
                    hidden:true
                },
                {
                    xtype: 'tbtext',
                    id:'loginUserName',
                    cls: 'top-user-name'
                },
                {
                    xtype: 'textfield',
                    id:'Login_SessionUserName',
                    hidden:true
                },
                {
                    xtype: 'image',
                    cls: 'header-right-profile-image',
                    id:'loginUserImage',
                    height: 35,
                    width: 35,
                    alt:'current user image',
                    src: 'resources/images/user-profile/2.png'
                },
                {
                    iconCls:'x-fa fa-sign-out',
                    ui: 'header',
                    tooltip: 'Logout',
                    handler: 'logoutButton'
                }
            ]
        },
        {
            xtype: 'maincontainerwrap',
            id: 'main-view-detail-wrap',
            reference: 'mainContainerWrap',
            flex: 1,
            items: [
                {
                    xtype: 'treelist',
                    reference: 'navigationTreeList',
                    itemId: 'navigationTreeList',
                    ui: 'nav',
                    store: 'NavigationTree',
                    width: 250,
                    expanderFirst: false,
                    expanderOnly: false,
                    listeners: {
                        selectionchange: 'onNavigationTreeSelectionChange'
                    }
                },
                {
                    xtype: 'container',
                    flex: 1,
                    reference: 'mainCardPanel',
                    cls: 'sencha-dash-right-main-container',
                    itemId: 'contentPanel',
                    layout: {
                        type: 'card',
                        anchor: '100%'
                    }
                }
            ]
        }
    ]
});
