Ext.define('OP.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    requires: [
        'Ext.MessageBox',
        'OP.view.chat.Chat'
    ],

    alias: 'controller.main',

    onClickButton: function () {
        Ext.Msg.confirm('Confirm', 'Are you sure?', 'onConfirm', this);
    },

    onConfirm: function (choice) {
        if (choice === 'yes') {
            var tabs = this.lookupReference('main-tab-panel');
            var tab = this.chatView('New Title');
            tabs.add(tab);
            tabs.setActiveTab(tab);
        }
    },

    onClickUserName: function () {
        Ext.Msg.confirm('Confirm', 'Are you sure?', 'onConfirm', this);
    },

    onClickLogout: function () {
        this.fireViewEvent('logout');
    },

    
    onPendingSelect: function(model, selections){
        var item =  selections[0];
        var tabs = this.lookupReference('main-tab-panel');
        var tab = this.chatView(item.get("displayName"));
        var ps = Ext.getStore("Pending");
        tabs.add(tab);
        tabs.setActiveTab(tab);
        ps.remove(item);
    },

    chatView: function (title) {
        return new OP.view.chat.Chat({
            autoShow: true,
            closable: true,

            viewModel: {
                data: {
                    title: title
                }
            }
        });
    }


});