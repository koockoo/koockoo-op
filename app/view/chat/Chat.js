Ext.define('OP.view.chat.Chat', {
    extend: 'Ext.panel.Panel',

    requires: [
        'OP.view.chat.ChatController',
        'OP.view.chat.ChatModel',
        'Ext.form.Panel',
        'Ext.button.Button',
        'Ext.form.field.Text',
        'Ext.form.field.ComboBox',
        'Ext.toolbar.Toolbar',
        'Ext.form.field.HtmlEditor'
    ],

    viewModel: 'chat',
    controller: 'chat',

    bodyPadding: 10,
    title: 'Chat',

    layout: {
        type: 'vbox',
        align: 'stretch',
        pack: 'start'
    },

    margins: '5 5 5 5',

    tools: [
        {
            type: 'plus'
        },
        {
            type: 'next'
        },
        {
            type: 'print'
        },
        {
            type: 'save'
        }
    ],

    items: [
        {
            flex: 4,
            xtype: 'panel',
            autoScroll: true
        },
        {
            xtype: 'htmleditor',
            id: 'messagetext',
            flex: 1,
            enableLinks: true,
            enableLists: false,
            enableSourceEdit: false,
            enableAlignments: false,
            enableColors: true,
            enableFontSize: false,
            enableFormat: true
//                    enableFont		 : false
        },
        {
            id: "messagebutttons",
            items: [
                {
                    xtype: 'button',
                    id: 'sendbutton',
                    text: 'Send',
                    hidden: false,
                    width: '100%',
                    height: 40
                },
                {
                    xtype: 'button',
                    id: 'acceptbutton',
                    text: 'Accept',
                    height: 40,
                    hidden: true,
                    width: '50%'
                },
                {
                    xtype: 'button',
                    id: 'skipbutton',
                    text: 'Skip',
                    height: 40,
                    hidden: true,
                    width: '50%'
                }

            ]
        }
    ]
});
