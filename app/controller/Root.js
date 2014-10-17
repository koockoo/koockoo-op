/**
 * This global controller manages the login view and ensures that view is created when
 * the application is launched. Once login is complete we then create the main view.
 */
Ext.define('OP.controller.Root', {
    extend: 'Ext.app.Controller',

    requires: [
        'OP.view.login.Login',
        'OP.view.main.Main',
        'OP.LoginManager'
    ],

    loadingText: 'Loading...',

    onLaunch: function () {
        this.initServices();
        this.showLogin();
    },

    /** initialize service endpoints */
    initServices: function () {
        var self = this;
        if (koockoo != undefined && koockoo.service != undefined) {
            koockoo.service.init(function(){self.onServiceInitialized(self)}, self.onServiceInitializedFail);
        } else {
            Ext.Msg.alert('Service Unavailable', 'koockoo is not ready to serve');
        }
    },

    onServiceInitialized: function (self) {
        console.log("service enpoints are initialized");
    },

    onServiceInitializedFail: function () {
        console.log("service enpoints fail to initialize");
        Ext.Msg.alert('Service Unavailable', 'Please retry later');
    },

    /**
     * Called when the login controller fires the "login" event.
     *
     * @param loginController
     * @param loginManager
     */
    onLogin: function () {
        this.login.destroy();
        this.showUI();
    },

    onLogout: function () {
        this.viewport.destroy();
        Ext.getStore('Auth').removeAll();
        this.showLogin();
    },

    showLogin: function () {
        this.login = new OP.view.login.Login({
            autoShow: true,
            listeners: {
                scope: this,
                login: 'onLogin'
            }
        });
    },

    showUI: function () {
        var store = Ext.getStore('Auth');
        this.viewport = new OP.view.main.Main({
            autoShow: true,
            listeners: {
                scope: this,
                logout: 'onLogout'
            },
            viewModel: {
                data: {
                    name: "OP",
                    company: "koockoo",
                    auth: store.getAt(0),
                    operator: store.getAt(0).get('operator')
                }
            }
        });
    }
});
