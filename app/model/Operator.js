/**
 * This class is the base class for all entities in the application.
 */
Ext.define('OP.model.Operator', {
    extend: 'Ext.data.Model',

    fields: [
        {name: 'id', type: 'string'},
        {name: 'displayName', type: 'string'},
        {name: 'email', type: 'string'},
        {name: 'topicRef', type: 'string'}
    ]


});
