/**
 * This class is the base class for all entities in the application.
 */
Ext.define('OP.model.ChatRoom', {
    extend: 'Ext.data.Model',

    fields: [
        'id', 'startDate', 'endDate'
    ],
    associations: [{
            model: 'Guest',
            type: 'hasOne',
            autoLoad: false
        },
        {
            model: 'Operator',
            type: 'hasMany',
            autoLoad: false
        }
    ]


});
