Ext.define('OP.model.Message', {
    extend: 'Ext.data.Model',
    
    fields: [
        { name: 'id', type: 'auto' },
        { name: 'timestamp', type: 'auto' },
        { name: 'message', type: 'auto' },
        { name: 'author', type: 'auto' }

    ]
});
