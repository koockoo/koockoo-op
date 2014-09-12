/**
 * This class is the base class for all entities in the application.
 */
Ext.define('OP.model.Thread', {
    extend: 'Ext.data.Model',

    fields: [
        {name: 'id', type: 'string'},
        {name: 'displayName', type: 'string'}
    ]


});
