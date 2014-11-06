Ext.define('OP.view.login.Login', {
    extend: 'Ext.window.Window',

    requires: [
        'OP.view.login.LoginController',
        'OP.view.login.LoginModel',
        'OP.view.lang.Lang',
        'Ext.form.Panel',
        'Ext.button.Button',
        'Ext.form.field.Text',
        'Ext.form.field.ComboBox'
    ],

    viewModel: 'login',
    controller: 'login',
    bodyPadding: 0,
    padding: 0,
    closable: false,
    cls: 'login',

    formTitle: 'Operator Login',
    loginLabel: "Login",
    passwordLabel: "Password",
    submitLabel: "Submit",
    passwordTip: "Enter non-blank password",
    loginTip: "Normally your email",

    initComponent: function (config) {
        var me = this;
        Ext.apply(me, {
            title: me.formTitle,
            items: {
                xtype: 'form',
                reference: 'form',
                bodyPadding: 15,
                items: [
                    {
                        xtype: 'textfield',
                        name: 'login',
                        bind: '{login}',
                        fieldLabel: me.loginLabel,
                        allowBlank: false,
                        enableKeyEvents: true,
                        cls: 'login-name',
                        listeners: {
                            specialKey: 'onSpecialKey'
                        }
                    },
                    {
                        xtype: 'displayfield',
                        hideEmptyLabel: false,
                        value: me.loginTip,
                        cls: 'hint'
                    },
                    {
                        xtype: 'textfield',
                        name: 'password',
                        inputType: 'password',
                        fieldLabel: me.passwordLabel,
                        allowBlank: false,
                        enableKeyEvents: true,
                        cls: 'password',
                        listeners: {
                            specialKey: 'onSpecialKey'
                        }
                    },
                    {
                        xtype: 'displayfield',
                        hideEmptyLabel: false,
                        value: me.passwordTip,
                        cls: 'hint'
                    }
                ]
            },

            buttons: [
                {xtype: 'lang'},
                "->",
                {
                    text: me.submitLabel,
                    listeners: {
                        click: 'onLoginClick'
                    }
                }
            ]
        });

        me.callParent(arguments);
    }
});
