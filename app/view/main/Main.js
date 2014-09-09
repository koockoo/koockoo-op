Ext.define('OP.view.main.Main', {
    extend: 'Ext.container.Viewport',

    xtype: 'app-main',

    controller: 'main',
    viewModel: {
        type: 'main'
    },

    layout: {
        type: 'border'
    },

    items: [{
        xtype: 'container',
        id: 'app-header',
        region: 'north',
        height: 52,
        layout: {
            type: 'hbox',
            align: 'middle'
        },

        items: [{
            xtype: 'component',
            id: 'app-header-logo',
            listeners: {
                click: 'showBindInspector',
                element: 'el'
            }
        },{
            xtype: 'component',
            cls: 'app-header-text',
            bind: '{company}',
            flex: 1
        },{
            xtype: 'component',
            id: 'app-header-username',
            cls: 'app-header-text',
            bind: '{userName}',
            listeners: {
                click: 'onClickUserName',
                element: 'el'
            },
            margin: '0 10 0 0'
        },{
            xtype: 'button',
            text: 'Logout',
            height: 30,
            id: 'app-header-logout',
            listeners: {
                click: 'onClickLogout',
                element: 'el'
            },
            margin: '0 10 0 0'
        }]

    },{
        region: 'south',
        xtype: 'component',
        padding: 10,
        height: 30,
        html: 'status bar'
    },{
        xtype: 'panel',
        collapsible: true,
        collapsed: false,
        title: 'Pending',
        region: 'east',
        html: '<ul><li>This area is commonly used for navigation, for example, using a "tree" component.</li></ul>',
        width: 250,
        split: true,
        tbar: [{
            text: 'Button',
            handler: 'onClickButton'
        }]
    },{
        region: 'center',
        xtype: 'tabpanel',
        reference: 'main-tab-panel',
        items:[{
            title: 'Dashboard',
            html: '<h2>Operator Dashboard</h2>',
            closable: false
        }]
    }]
});