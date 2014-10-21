/**
 * This class is the base class for all entities in the application.
 */
Ext.define('OP.model.Message', {
    extend: 'Ext.data.Model',

    fields : ['id', { name: 'timestamp', type: 'date' }, 'authorName',  'text', 'chatRoomId', 'authorRef', 'authorType', 'utcDateTime']

});
