Ext.define('OP.view.main.Main', {
    extend: 'Ext.container.Viewport',

    xtype: 'app-main',

    requires: [
        'OP.view.lang.Lang',
        'Ext.toolbar.Toolbar'
    ],

    controller: 'main',
    viewModel: {
        type: 'main'
    },

    logoutLabel: "Logout",
    mainTabTitle: "Dashboard",

    initComponent: function () {
        Ext.apply(this, {
            layout: 'border',
            items: [
                {
                    xtype: 'container',
                    id: 'app-header',
                    region: 'north',
                    height: 52,
                    bodyPadding: 20,
                    layout: {
                        type: 'hbox',
                        align: 'middle'
                    },

                    items: [
                        {
                            xtype: 'component',
                            id: 'app-header-logo'
                        },
                        {
                            xtype: 'component',
                            cls: 'app-header-text',
                            bind: '{operator.displayName}',
                            flex: 1
                        },
                        {
                            xtype: 'button',
                            text: this.logoutLabel,
                            iconCls: 'iconLogOut',
                            listeners: {
                                click: 'onClickLogout',
                                element: 'el'
                            }
                        },
                        {
                            xtype: 'lang',
                            margin: 10,
                            listeners: {
                                localeChange: 'onLocaleChange'
                            }
                        }
                    ]
                },
                {
                    region: 'south',
                    xtype: 'component',
                    padding: 10,
                    height: 30,
                    html: 'status bar'
                },
                {
                    region: 'east',
                    xtype: 'pending',
                    reference: 'main-pending',
                    collapsible: true,
                    collapsed: false,
                    width: 250,
                    split: true,
                    listeners: {
                        rowclick: 'onPendingRowClick'
                    }
                },
                {
                    region: 'center',
                    xtype: 'tabpanel',
                    reference: 'main-tab-panel',
                    listeners: {
                        tabchange: 'onTabChanged'
                    },

                    items: [
                        {
                            title: this.mainTabTitle,
                            id: 'dashboard-tab',
                            iconCls: 'iconTabDashboard',
                            html: '<h2>Operator Dashboard</h2>',
                            closable: false
                        }
                    ]
                }
            ]
        });
        this.callParent(arguments);
    }
});