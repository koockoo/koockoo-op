Ext.define('OP.controller.PendingSessions', {
	extend: 'Ext.app.Controller',
    baseUrl: "",
    requires: ['Ext.direct.*'],
    stores: ['PendingSessions'],
    models: ['Session'],
    views: ['PendingSessions'],

	init: function() {
		var me = this;
	 	me.control({
	         'viewport > pendingsessions': {
	             itemclick: me.showSessionDetails
	         }
	    });
	},

    showSessionDetails: function(grid, record) {
    	var me = this;
    	var vpController = me.getController('Viewport');
    	vpController.showPendingSessionDetails(record);
    },
        
	pollPendingSessions: function() {
		var me = this;
		var oper = me.getStore('Operators').first();
		console.log("add polling for pending sessions");
		
		var pollA = new Ext.direct.PollingProvider({
			 id:'PendingSessionsPolling',
			 interval:30000,
		     type:'polling',
		     url : me.baseUrl+'operator/ping/'+oper.get('id'),
		     listeners: {
		            data: function(provider, event) {
		            	console.log("polling ");
		            	var psStore = me.getStore('PendingSessions');
		            	psStore.loadRawData(event.data);
		            }
		      }

		 });
		
		Ext.direct.Manager.addProvider(pollA);
	}    
    
});