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

        this.login = new OP.view.login.Login({
            autoShow: false,
            listeners: {
                scope: this,
                login: 'onLogin'
            }
        });
        this.initServices();
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
        self.login.show();
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

    showUI: function () {
        this.viewport = new OP.view.main.Main({
            autoShow: true,
            viewModel: {
                data: {
                    name: "OP"
                }
            }
        });
    }
});
