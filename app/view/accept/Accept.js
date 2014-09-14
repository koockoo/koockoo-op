/**
 * This class defines the Accept new conversation dialog.
 */
Ext.define('OP.view.accept.Accept', {
    extend: 'Ext.window.Window',

    controller: 'accept',

    width: 450,
    minHeight: 250,
    height: 300,
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
        readOnly: true,
        bind: '{item.displayName}',
        labelWidth: 70
    },{
        xtype: 'textfield',
        readOnly: true,
        fieldLabel: 'Location',
        bind: '{item.location}',
        labelWidth: 70
    },{
        xtype: 'textfield',
        fieldLabel: 'Env',
        bind: '{item.env}',
        labelWidth: 70
    },{
        xtype: 'textareafield',
        readOnly: true,
        fieldLabel: 'Message',
        labelWidth: 70,
        flex:1
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