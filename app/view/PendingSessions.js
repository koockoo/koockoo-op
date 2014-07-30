Ext.define('OP.view.PendingSessions', {
	extend : 'Ext.grid.Panel',
	cls: 'custom-grid',
	
	hideHeaders: true,
	scroll: 'vertical',
	autoScroll: true,
	
	alias : 'widget.pendingsessions',

	title : 'Pending Sessions',

	store : 'PendingSessions',

	columns : [{
		header : 'Name',
		dataIndex : 'displayName',
		flex : 1
	}],
	
    viewConfig: { 
    	stripeRows: false, 
    	getRowClass: function(record) { 
    		return "pending"; 
    	} 
    }

});
