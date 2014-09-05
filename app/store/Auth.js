Ext.define('OP.store.Auth', {
    extend: 'Ext.data.Store',
    requires: 'OP.model.Auth',
    storeId: 'authStore',
    model: 'OP.model.Auth'
});