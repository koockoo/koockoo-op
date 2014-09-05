/**
 * This class manages the login process.
 */
Ext.define('OP.LoginManager', {

    config: {
        model: 'ResponseWrapper'
    },

    constructor: function (config) {
        this.initConfig(config);
    },

    applyModel: function(model) {
        return model && Ext.data.schema.Schema.lookupEntity(model);
    },

    login: function (options) {
        Ext.Ajax.request({
            url: koockoo.service.auth.signOperator.url,
            method: koockoo.service.auth.signOperator.type,
            params: options.data,
            scope: this,
            success: this.onLoginReturn,
            original: options
        });
    },

    logout: function (options) {
        Ext.Ajax.request({
            url: koockoo.service.auth.signout.url,
            method: koockoo.service.auth.signout.type,
            params: options.data
        });
    },

    onLoginReturn: function (response, options) {
        options = options.original;

        var resultSet = this.getModel().getProxy().getReader().read(response);
        var store =  Ext.getStore('Auth');
        store.loadRawData(response);
        if (resultSet.success) {
            Ext.callback(options.success, options.scope);
            return;
        }

        Ext.callback(options.failure, options.scope);
    }
});
