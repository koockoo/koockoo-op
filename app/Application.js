/**
 * The Application class just links up the main controller and our simulated data.
 */
Ext.define('OP.Application', {
    extend: 'Ext.app.Application',

    requires: [
        'Ext.app.bindinspector.*'
    ],

    controllers: [
        'Root@OP.controller'
    ],

    stores: [
       'Auth@OP.store'
    ],

    onBeforeLaunch: function () {
        // All smoke-and-mirrors with data happens in SimData. This is a fake server that
        // runs in-browser and intercepts the various Ajax requests a real app would make
        // to a real server.
        this.callParent();
    }
});
