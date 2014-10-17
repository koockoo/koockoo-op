/**
 * This View Controller is associated with the Login view.
 */
Ext.define('OP.view.chat.ChatController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.chat',


    constructor: function () {
        this.callParent(arguments);
    },

    onSendClick: function () {
        var ms = this.getViewModel().getStore('messages');
        var chatroom = this.getViewModel().data.chatroom;
        var textarea = this.lookupReference('chat-textarea');
        var text = textarea.getValue();
        var auth = Ext.getStore('Auth').first();
        var msg = this.createMessage(auth.get("operator"), text, chatroom.id);
        ms.add(msg);
        textarea.setValue("");

        // scroll to the bottom
        var grid = this.lookupReference('chat-grid');
        grid.getView().focusRow(ms.count() - 1);
        grid.getEl().down('.x-grid-view').scroll('bottom', 200, true);
        textarea.focus();

        // publish
        this.postMessage(msg);
    },

    postMessage: function (message) {
        var url = koockoo.service.message.postByOperator.url;
        url = Ext.String.format(url, message.get("authorRef"), message.get("chatRoomId"));
        Ext.Ajax.request({
            url: url,
            method: koockoo.service.message.postByOperator.type,
            data: message.get("text"),
            scope: this,
            success: this.onMessagePosted,
            original: message
        });
    },

    onMessagePosted: function(response, opts){
        var message = opts.original;
        var responseMessage = Ext.decode(response.responseText);
        message.set("id", responseMessage.id);
        message.set("timestamp", responseMessage.timestamp);
    },

    createMessage: function (operator, text, roomId) {
        return new OP.model.Message({
            authorName: operator.displayName,
            id: Ext.id(),
            timestamp: '2013-01-31T10:10:05.000Z',
            text: text,
            chatRoomId: roomId,
            authorRef: operator.id
        });
    }
});
