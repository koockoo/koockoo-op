/**
 * This class defines the Accept new conversation dialog.
 */
Ext.define('OP.view.accept.Accept', {
    extend: 'Ext.window.Window',

    controller: 'accept',
    model: 'accept',

    formTitle: 'Start Chat',
    nameLabel: 'Name',
    locationLabel: 'Location',
    envLabel: 'Env',
    messageLabel: 'Message',
    startButton: 'Start',
    skipButton: 'Skip',

    modal: true,
    width: 450,
    minHeight: 250,
    height: 300,
    bodyPadding: 10,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    initComponent: function (config) {
        var me = this;
        Ext.apply(me, {
            title: me.formTitle,
            items: [
                {
                    xtype: 'textfield',
                    fieldLabel: me.nameLabel,
                    readOnly: true,
                    bind: '{item.displayName}',
                    labelWidth: 70
                },
                {
                    xtype: 'textfield',
                    readOnly: true,
                    fieldLabel: me.locationLabel,
                    bind: '{item.location}',
                    labelWidth: 70
                },
                {
                    xtype: 'textfield',
                    fieldLabel: me.envLabel,
                    bind: '{item.env}',
                    labelWidth: 70
                },
                {
                    xtype: 'textareafield',
                    readOnly: true,
                    fieldLabel: me.messageLabel,
                    labelWidth: 70,
                    flex: 1
                }
            ],

            buttons: [
                {
                    text: me.startButton,
                    listeners: {
                        // Call is routed to our ViewController (Ticket.view.user.UserController):
                        click: 'onAcceptClick'
                    }
                },
                '->',
                {
                    text: me.skipButton,
                    listeners: {
                        click: 'closeView'
                    }
                }
            ]
        });

        me.callParent(arguments);
    }
});