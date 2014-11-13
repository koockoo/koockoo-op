Ext.define('OP.view.pending.Pending', {
    extend: 'Ext.grid.Panel',
    cls: 'pending-grid',
    controller: 'pending',

    hideHeaders: true,
    scroll: 'vertical',
    autoScroll: true,

    alias: 'widget.pending',
    formTitle: 'Pending Requests',

    store: 'Pending',

    initComponent: function (config) {
        var me = this;
        Ext.apply(me, {
            title: me.formTitle,
            columns: [
                {
                    header: 'Name',
                    dataIndex: 'guest',
                    renderer: function (value, meta, record) {
                        return value['displayName'];
                    },
                    flex: 1
                }
            ]
        });

        me.callParent(arguments);
    }
});
