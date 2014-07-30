Ext.define('OP.view.Login', {
    extend: 'Ext.window.Window',
    alias: 'widget.login',

    autoShow: true,
    height: 200,
    width: 400,
    layout: {
        type: 'fit'
    },
    iconCls: 'key',
    title: 'Login', 
    closeAction: 'hide',
    closable: false,

    items: [
        {
            xtype: 'form',
            frame: false,
            bodyPadding: 10,
            defaults: {
                xtype: 'textfield',
                anchor: '100%',
                labelWidth: 70,
                allowBlank: false,
                vtype: 'alphanum',
                minLength: 3,
                msgTarget: 'side'
            },
            items: [
                {
                    name: 'user',
                    fieldLabel: 'Login',
                    maxLength: 50,
                    value: 'your email'
                },
                {
                    inputType: 'password',
                    name: 'password',
                    fieldLabel: "Password",
                    enableKeyEvents: true,
                    id: 'password',
                    maxLength: 15,
                    value: '123456',
                    msgTarget: 'side'
                }
            ],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [

                        {
                            xtype: 'tbfill'
                        },
                        {
                            xtype: 'button',
                            itemId: 'cancel',
                            iconCls: 'cancel',
                            text: 'Cancel',
                            listeners: {
                                mouseover: function() {
                                    this.hide();
                                },
                                hide: function() {
                                    // Waits 1 second (1000ms), then shows the button again
                                    Ext.defer(function() {
                                        this.show();
                                    }, 1000, this);
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            itemId: 'submit',
                            formBind: true,
                            iconCls: 'key-go',
                            text: 'Submit' 
                        }
                    ]
                }
            ]
        }
    ]
});