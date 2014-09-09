/**
 * This is the View Model associated to the login view.
 */
Ext.define('OP.view.chat.ChatModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.chat',

    // Just some data to seed the process. This might be pulled from a cookie or other
    // in a real app.
    data: {
        title: 'Chat Window'
    }
});
