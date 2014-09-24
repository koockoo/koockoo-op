/**
 * This View Controller is associated with the Login view.
 */
Ext.define('OP.view.chat.ChatController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.chat',


    constructor: function () {
        this.callParent(arguments);
    },

    onSendClick: function() {
        var ms = this.getViewModel().getStore('messages');
        var textarea = this.lookupReference('chat-textarea');
        var text = textarea.getValue();
        var msg = new OP.model.Message({displayName: 'Aaron', id: Ext.id(), timestamp:'2013-01-31T10:10:05.000Z', message: text});
        ms.add(msg);
        textarea.setValue("");
    }
});
