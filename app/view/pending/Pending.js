Ext.define('OP.view.PendingSessions', {
    extend : 'Ext.grid.Panel',
    cls: 'pending-grid',

    hideHeaders: true,
    scroll: 'vertical',
    autoScroll: true,

    alias : 'widget.pending',
    title : 'Pending Sessions',

    store : 'Pending',

    columns : [ {
        header : 'Name',
        dataIndex : 'displayName',
        flex : 1
    }],

//    initComponent: function(){
//        this.callParent(arguments);
//        this.on('selectionchange', this.onSelect, this);
//    },

    onSelect: function(model, selections){
        Ext.Msg.confirm('Confirm', 'Are you sure?', 'onConfirm', this);
    }
 });
