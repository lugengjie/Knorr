Ext.define('Admin.store.NavigationTree', {
    extend: 'Ext.data.TreeStore',

    storeId: 'NavigationTree',

    fields: [{
        name: 'text'
    }],

    root: {
        expanded: true,
        children: [
            {
               text: '房源管理',
               iconCls:'x-fa  fa-institution',
               selectable: false,
               expanded: false,
               children: [{
                   text: '出售管理',
                   viewType: 'chuShouGuanLi',
                   leaf: true
               }, {
                   text: '出租管理',
                   viewType: 'chuZuGuanLi',
                   leaf: true
               }, {
                    text: '房源定位',
                    viewType: 'fangYuanDingWei',
                    leaf: true
               }]
           }, {
                text: '客源管理',
                iconCls:'x-fa fa-group',
                selectable: false,
                expanded: false,
                children: [{
                    text: '求购客户管理',
                    viewType: 'qiuGouKeHuGuanLi',
                    leaf: true,
                }, {
                    text: '求租客户管理',
                    viewType: 'qiuZuKeHuGuanLi',
                    leaf: true,
                }, {
                    text: '我的客源管理',
                    viewType: 'woDeKeYuanGuanLi',
                    leaf: true,
                }]
            },{
                text: '个人信息管理',
                iconCls: 'x-fa fa-user',
                viewType: 'person',
                leaf: true
            },{
               text: '行政管理',
               iconCls:'x-fa  fa-ravelry',
               selectable: false,
               expanded: false,
               children: [,{
                    text: '门店管理',
                    iconCls: 'x-fa fa-university',
                    //rowCls: 'nav-tree-badge nav-tree-badge-new',
                    viewType: 'stores',
                    leaf: true
                },{
                    text: '员工管理',
                    iconCls: 'x-fa fa-users',
                    //rowCls: 'nav-tree-badge nav-tree-badge-new',
                    viewType: 'employee',
                    leaf: true
                }]
            },
            {
                text: '业务管理模块',
                iconCls: 'x-fa fa-briefcase',
                expanded: false,
                selectable: false,
                children: [
                    {
                        text: '合同管理',
                        iconCls: 'x-fa fa-clipboard',
                        viewType: 'contract',
                        leaf: true
                    },
                    {
                        text: '业务审核',
                        iconCls: 'x-fa fa-pencil-square-o',
                        viewType: 'contractApprove',
                        leaf: true
                    }
                ]
            },{
                text: '业务动态',
                iconCls: 'x-fa fa-gears',
                expanded: false,
                selectable: false,
                children: [
                    {
                        text: '公司公告',
                        iconCls: 'x-fa fa-bullhorn',
                        viewType: 'notice',
                        leaf: true
                    },
                    {

                        text: '业务排行',
                        iconCls: 'x-fa fa-bar-chart',
                        viewType: 'achievement',
                        leaf: true
                    }
                ]
            },{
                text: '个人办公',
                iconCls: 'x-fa  fa-paste',
                expanded: false,
                selectable: false,
                children: [
                    {
                        text: '通讯录',
                        iconCls: 'x-fa fa-address-card',
                        //rowCls: 'nav-tree-badge nav-tree-badge-new',
                        viewType: 'addressList',
                        leaf: true
                    },{
                        text: '日程管理',
                        iconCls: 'x-fa fa-calendar',
                        //rowCls: 'nav-tree-badge nav-tree-badge-new',
                        viewType: 'calendar',
                        leaf: true
                    },{
                        text: '个人考勤',
                        iconCls: 'x-fa fa-fax',
                        //rowCls: 'nav-tree-badge nav-tree-badge-new',
                        viewType: 'attence',
                        leaf: true
                    }
                ]
            },{
                text: '考勤管理',
                iconCls: 'x-fa  fa-calendar-o',
                expanded: false,
                selectable: false,
                children: [
                    {
                        text: '部门考勤表',
                        iconCls: 'x-fa fa-copy',
                        viewType: 'allAttence',
                        leaf: true
                    },
                    {
                        text: '考勤审核',
                        iconCls: 'x-fa fa-pencil-square-o',
                        viewType: 'attenceApprove',
                        leaf: true
                    }
                ]
            },{
                text: '文件传送',
                iconCls: 'x-fa fa-envelope',
                expanded: false,
                selectable: false,
                children: [
                    {
                        text: '写信',
                        iconCls: 'x-fa  fa-leaf ',
                        viewType: 'fileWritePanel',
                        leaf: true
                    },
                    {
                        text: '收信',
                        iconCls: 'x-fa fa-inbox',
                        viewType: 'fileInboxPanel',
                        leaf: true
                    },
                    {
                        text: '已发送',
                        iconCls: 'x-fa fa-send-o',
                        viewType: 'fileSendPanel',
                        leaf: true
                    },
                    {
                        text: '草稿箱',
                        iconCls: 'x-fa fa-tags',
                        viewType: 'fileEditPanel',
                        leaf: true
                    }
                ]

            },{
                text: '安全管理',
                iconCls: 'x-fa  fa-connectdevelop',
                expanded: false,
                selectable: false,
                children: [
                    {
                        text: '日志管理',
                        iconCls: 'x-fa fa-file',
                        viewType: 'log',
                        leaf: true
                    }
                ]
            },{
                text: '流程定义图',
                iconCls: 'x-fa fa-file-picture-o',
                //rowCls: 'nav-tree-badge nav-tree-badge-new',
                viewType: 'processDefinition',
                leaf: true
            },{
                text: 'Login',
                iconCls: 'x-fa fa-check',
                viewType: 'login',
                leaf: true
           }
        ]
    }
});
