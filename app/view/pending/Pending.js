Ext.define('OP.view.PendingSessions', {
    extend : 'Ext.grid.Panel',
    cls: 'pending-grid',
    controller: 'pending',

    hideHeaders: true,
    scroll: 'vertical',
    autoScroll: true,

    alias : 'widget.pending',
    title : 'Pending Sessions',

    store : 'Pending',

    columns : [ {
        header : 'Name',
        dataIndex : 'guest',
        renderer : function(value, meta, record) {
            return value['displayName'];
        },
        flex : 1
    }]
 });
