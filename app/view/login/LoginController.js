/**
 * This View Controller is associated with the Login view.
 */
Ext.define('OP.view.login.LoginController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.login',
    
    loginText: 'Logging in...',

    constructor: function () {
        this.callParent(arguments);
        this.loginManager = new OP.LoginManager();
    },

    onSpecialKey: function(field, e) {
        if (e.getKey() === e.ENTER) {
            this.doLogin();
        }
    },
    
    onLoginClick: function() {
        this.doLogin();
    },
    
    doLogin: function() {
        var form = this.lookupReference('form');

        if (form.isValid()) {
            Ext.getBody().mask(this.loginText);

            this.loginManager.login({
                data: form.getValues(),
                scope: this,
                success: 'onLoginSuccess',
                failure: 'onLoginFailure'
            });
        }
    },
    
    onLoginFailure: function() {
        // Do something
        Ext.getBody().unmask();
    },

    onLoginSuccess: function() {
        Ext.getBody().unmask();
        this.fireViewEvent('login');
    }
});
