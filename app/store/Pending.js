Ext.define('OP.store.Pending', {
    extend: 'Ext.data.Store',
    requires: 'OP.model.Thread',
    model: 'OP.model.Thread',
    data : [
        {displayName: 'Ed',    id: 'Spencer'},
        {displayName: 'Tommy', id: 'Maintz'},
        {displayName: 'Aaron', id: 'Conran'},
        {displayName: 'Jamie', id: 'Avins'}
    ]
});
