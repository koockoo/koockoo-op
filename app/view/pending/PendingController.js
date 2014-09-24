/**
 * This View Controller is associated with the Pending view.
 */
Ext.define('OP.view.pending.PendingController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.pending',

    requires: [
        'Ext.direct.*'
    ],

    init: function () {
        this.startPolling();
    },

    startPolling: function () {
        console.log("start polling pending chatrooms");
        var auth = Ext.getStore('Auth').first();
        var pendingPoll = new Ext.direct.PollingProvider({
            id:'PendingPolling',
            interval:30000,
            type:'polling',
            url : koockoo.service.chatroom.pending.url,
            listeners: {
                data: function(provider, event) {
                    console.log("response received for pending");
                    var psStore = Ext.getStore('Pending');
                    psStore.loadRawData(event.data);
                }
            }

        });
        Ext.direct.Manager.addProvider(pendingPoll);
    }
});
