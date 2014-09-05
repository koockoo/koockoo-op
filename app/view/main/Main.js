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
        items:[{
            title: 'Tab 1',
            html: '<h2>Content appropriate for the current navigation.</h2>'
        },{
            title: 'The Data',
            layout: 'fit',
            items: [{
                xtype: 'grid',
                title: 'Simpsons',
                store: {
                    fields:['name', 'email', 'phone'],
                    data:[
                        { name: 'Lisa',  email: "lisa@simpsons.com",phone: "555-111-1224"  },
                        { name: 'Bart',  email: "bart@simpsons.com",phone: "555-222-1234" },
                        { name: 'Homer', email: "home@simpsons.com",phone: "555-222-1244"  },
                        { name: 'Marge', email: "marge@simpsons.com",phone: "555-222-1254"  }
                    ],
                    proxy: {
                        type: 'memory'
                    }
                },
                columns: [
                    { text: 'Name',  dataIndex: 'name' },
                    { text: 'Email', dataIndex: 'email', flex: 1},
                    { text: 'Phone', dataIndex: 'phone' }
                ]
            }]
        }
        ]
    }]
});