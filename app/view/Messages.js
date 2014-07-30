Ext.define("OP.view.Messages", {
	extend: 'Ext.grid.Panel',
	alias: 'widget.messages',
    cls: 'feed-grid',

    requires: ['Ext.ux.PreviewPlugin', 'Ext.toolbar.Toolbar'],
    
    border: false,
    hideHeaders: true,
    
    initComponent: function() {
        Ext.apply(this, {
            viewConfig: {

                stripeRows: false,
                enableTextSelection: true,
	
                plugins: [{
                    pluginId: 'preview',
                    ptype: 'preview',
                    bodyField: 'message',
                    previewExpanded: true
                }]
            },

            columns: [ {
                text: 'Author',
                dataIndex: 'author',
                renderer: this.formatTitle,
                flex: 1
            }, {
                text: 'Date',
                dataIndex: 'timestamp',
                renderer: this.formatDate,
                width: 200
            }]
        });
        this.callParent(arguments);
        
        this.on('afterlayout', this.loadStore, this, {
            delay: 3
        });        
    },
    
    loadStore: function() {
    	var last = this.store.getCount()-1;
    	if (last>0) {
    		this.getView().focusRow(last);
    	}
    },
    
    onStoreLoad: function(){
    	console.log("store was loaded");
//        Ext.Msg.show({
//            title: 'Store Load Callback',
//            msg: 'store was loaded, data available for processing',
//            icon: Ext.Msg.INFO,
//            buttons: Ext.Msg.OK
//        });
    },    
    
    /**
     * Title renderer
     * @private
     */
    formatTitle: function(value, p, record) {
        return Ext.String.format('<span class="author">{0}</span>', value.displayName || "Unknown");
    },

    /**
     * Date renderer
     * @private
     */
    formatDate: function(timestamp) {
        
    	if (!timestamp) {
            return '';
        }
    	
    	var date = new Date(timestamp);
        var now = new Date(),
            d = Ext.Date.clearTime(now, true),
            notime = Ext.Date.clearTime(date, true).getTime();

        if (notime === d.getTime()) {
            return 'Today ' + Ext.Date.format(date, 'g:i a');
        }

        d = Ext.Date.add(d, 'd', -6);
        if (d.getTime() <= notime) {
            return Ext.Date.format(date, 'D g:i a');
        }
        return Ext.Date.format(date, 'Y/m/d g:i a');
    }
});