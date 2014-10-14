/**
 * This class is the base class for all entities in the application.
 */
Ext.define('OP.model.Auth', {
    extend: 'Ext.data.Model',

    fields: [
        {name: 'id', type: 'string'},
        {name: 'topicRef', type: 'string'}
    ],

    associations: [
        {
            model: 'Operator',
            type: 'hasOne',
            autoLoad: false
        }
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
