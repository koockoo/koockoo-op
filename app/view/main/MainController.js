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
        this.acceptView(item);
    },

    chatView: function (title) {
        return new OP.view.chat.Chat({
            autoShow: true,
            closable: true,
            iconCls: 'iconTabOpen',
            viewModel: {
                data: {
                    title: title
                }
            }
        });
    },

    acceptView: function (item) {
        var win = new OP.view.accept.Accept({
            viewModel: {
                data: {
                    item: item
                }
            }
        });

        win.show();
    },

    onAccepted: function(item){

        var tabs = this.lookupReference('main-tab-panel');
        var tab = this.chatView(item.get("displayName"));
        var ps = Ext.getStore("Pending");
        var currentTab = tabs.getActiveTab();

        tabs.add(tab);
        tabs.setActiveTab(tab);
        ps.remove(item);

        if (currentTab) {
            currentTab.setIconCls('iconTab');
        }
    }





});