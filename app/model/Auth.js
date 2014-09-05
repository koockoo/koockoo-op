/**
 * This class is the base class for all entities in the application.
 */
Ext.define('OP.model.Auth', {
    extend: 'Ext.data.Model',

    fields: [
        {name: 'id', type: 'string'},
        {name: 'operatorRef', type: 'string'}
    ],

    schema: {
        namespace: 'OP.model',
        proxy: {
            reader: {
                type: 'json',
                rootProperty: 'data',
                successProperty: 'success'
            }
        }
    }
});
