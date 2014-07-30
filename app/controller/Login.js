Ext.define('OP.controller.Login', {
    extend: 'Ext.app.Controller',
    me: this,
    
    views: [
            'Login'
        ],

    init: function(application) {      
            this.control({                 
                "login form button#submit": {
                    click: this.onButtonClickSubmit
                }
            });
    },
        
    onButtonClickSubmit: function(button, e, options) {
            var formPanel = button.up('form');
            var login = button.up('login');
            var user = formPanel.down('textfield[name=user]').getValue();
            var pass = formPanel.down('textfield[name=password]').getValue();   

            if (formPanel.getForm().isValid()) {
                Ext.get(login.getEl()).mask("Authenticating... Please wait...", 'loading');
            }

     },    
        
        
     onLoginSuccess: function(conn, response, options, eOpts) {
            Ext.get(login.getEl()).unmask();
            if (false) {
                login.close();
                Ext.create('Packt.view.MyViewport');
            }
     }
    	
});
