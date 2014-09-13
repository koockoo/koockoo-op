/**
 * This class defines the Accept new conversation dialog.
 */
Ext.define('OP.view.accept.Accept', {
    extend: 'Ext.window.Window',

    controller: 'accept',

    width: 300,
    minHeight: 250,
    height: 450,
    bodyPadding: 10,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    // As a Window the default property we are binding is "title":
    // bind: 'Accept User: {theUser.name}',
    title: "Accept Request",

    modal: true,

    items: [{
        xtype: 'textfield',
        fieldLabel: 'Name',
        bind: '{item.displayName}',
        labelWidth: 70
    },{
        xtype: 'textfield',
        fieldLabel: 'Location',
        labelWidth: 70
    },{
        xtype: 'textfield',
        fieldLabel: 'Env',
        labelWidth: 70
    },{
        xtype: 'textfield',
        fieldLabel: 'Message',
        labelWidth: 70
    }],

    buttons: [{
        text: 'Accept',
        listeners: {
            // Call is routed to our ViewController (Ticket.view.user.UserController):
            click: 'onAcceptClick'
        }
    }, '->', {
        text: 'Skip',
        listeners: {
            click: 'closeView'
        }
    }]
});