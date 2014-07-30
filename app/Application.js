/**
 * The main application class. An instance of this class is created by app.js when it calls
 * Ext.application(). This is the ideal place to handle application launch and initialization
 * details.
 */
Ext.define('OP.Application', {
    extend: 'Ext.app.Application',
    
    name: 'OP',

    views: [
        'OP.view.Login'
    ],

    controllers: [
        'Root',
        'Login'
    ],

    stores: [
        // TODO: add stores here
    ],
    
    launch: function () {
    	Ext.widget('login');
    }
});
