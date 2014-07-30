Ext.define('OP.controller.Messages', {
	extend : 'Ext.app.Controller',
	
	baseUrl: "",
	requires: ['Ext.direct.*'],
	models : [ 'Message' ],
	views : [ 'Messages'],
	stores : [ 'Operators' ],

	init : function() {
		this.control({
			'#sendbutton' : {
				click : this.postMessage
			}
		});
	},

	postMessage : function(button) {
		// get selected record of activesessions grid
		var me = this;
		var view = me.getView('Messages');
		var comp = Ext.ComponentQuery.query('#messagetext')[0];
		var val = comp.getValue();

		if (val != undefined && val != null) {
			var oper = me.getStore('Operators').first();
			// add new item to store
			var rec = new OP.model.Message({
				author : {id: oper.get('id'), displayName:oper.get('displayName')},
				timestamp : new Date().getTime(),
				message : val,
				dirty:true
			});
			var view = Ext.ComponentQuery.query('messages')[0];
			var store = view.getStore();
			
			store.insert(store.getCount(), rec);
			comp.setValue("");
			comp.focus(true);
		}

	},
	
    setSession: function(record) {
    	var me = this;
    	
        // this gives the messages store associated with the session record
        var store  = record.messagesStore;
        if (store == undefined || store == null) {
        	store = me.buildStore(record.get("id"))
        	record.messages = [];
        	record.messagesStore = store;
        }
        var view = Ext.ComponentQuery.query('messages')[0];
        view.reconfigure(store);
    },
    
    
    buildStore: function(sessionId) {
    	var me = this;
    	var store = Ext.create('Ext.data.Store', {
    		model: 'OP.model.Message',
    		
    		autoLoad: false,
            autoSync: true,
            proxy: {
                type: 'ajax',
                url : me.baseUrl+'message/'+sessionId,
                writer: {
                    type: 'json',
                    writeAllFields: true
                },
                listeners: {
                    exception: function(proxy, response, operation){
                        Ext.MessageBox.show({
                            title: 'REMOTE EXCEPTION',
                            msg: operation.getError(),
                            icon: Ext.MessageBox.ERROR,
                            buttons: Ext.Msg.OK
                        });
                    }
                }
            }

    	});
    	
    	return store;
    },
     
    pollUnreadMessages: function() {
		var me = this;
		var oper = me.getStore('Operators').first();
		console.log("add polling for messages");
		
		var poll = new Ext.direct.PollingProvider({
			 id:'MessagesPolling',
			 interval:30000,
		     type:'polling',
		     url : me.baseUrl+'message/read/'+oper.get('id'),
		     listeners: {
		            data: function(provider, event) {
		            	console.log("polling: "+event.data);
		            	var messageData = event.data;
		            	var asStore = me.getStore('ActiveSessions');
		            	asStore.each(function(session){
		            		var sessionMessages = messageData[session.get("id")];
		            		if (sessionMessages) {
		            			for (var i=0; i<sessionMessages.length; i++) {
		            				session.messagesStore.insert(session.messagesStore.getCount(), sessionMessages[i]);
		            				session.set('unread', true);
		            			}
		            		}
		                });
		            }
		      }

		 });
		
		Ext.direct.Manager.addProvider(poll);
	}    
  
});