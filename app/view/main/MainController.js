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

    onClickLogout: function () {
        this.fireViewEvent('logout');
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

    showAcceptView: function (item) {
        this.acceptView = new OP.view.accept.Accept({
            autoShow: true,
            viewModel: {
                data: {
                    item: item
                }
            },
            listeners: {
                scope: this,
                accept: 'onAccepted'
            }

        });
    },

    onAccepted: function(item){
        this.acceptView.close();
        var tabs = this.lookupReference('main-tab-panel');
        var tab = this.chatView(item.get("displayName"));
        var ps = Ext.getStore("Pending");
        var currentTab = tabs.getActiveTab();

        tabs.add(tab);
        tabs.setActiveTab(tab);
        ps.remove(item);

        if (currentTab && currentTab.id != 'dashboard-tab') {
            currentTab.setIconCls('iconTab');
        }
    },

    onTabChanged: function(tabs, newTab, oldTab) {
        var tabs = this.lookupReference('main-tab-panel');
        Ext.each(tabs.items.items, function(item){
            if (item) {
                if (item.id == 'dashboard-tab') return;
                if (item == newTab) {
                    item.setIconCls('iconTabOpen');
                } else {
                    item.setIconCls('iconTab');
                }
            }
        });
    },

    onPendingRowClick: function(grid, record, tr, rowIndex, e, eOpts){
        if (record) {
            this.showAcceptView(record);
        }
    }

});