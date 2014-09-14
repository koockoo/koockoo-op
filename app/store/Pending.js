Ext.define('OP.store.Pending', {
    extend: 'Ext.data.Store',
    requires: 'OP.model.Thread',
    model: 'OP.model.Thread',
    data : [
        {displayName: 'Ed',    id: 'Spencer', location:'US', env: 'Opera'},
        {displayName: 'Tommy', id: 'Maintz', location:'CANADA', env: 'Mozila'},
        {displayName: 'Aaron', id: 'Conran', location:'RUSSIA', env: 'Android'},
        {displayName: 'Jamie', id: 'Avins', location:'BRASIL', env: 'IE'}
    ]
});
