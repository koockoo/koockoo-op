Ext.define('OP.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    requires: [
        'Ext.MessageBox',
        'OP.view.chat.Chat'
    ],

    alias: 'controller.main',
    polling: false,

    onClickButton: function () {
        Ext.Msg.confirm('Confirm', 'Are you sure?', 'onConfirm', this);
    },

    onClickLogout: function () {
        this.fireViewEvent('logout');
    },

    chatView: function (tabSettings ) {
        var chatroom = tabSettings.chatroom;
        var me = new OP.view.chat.Chat({
            autoShow: true,
            closable: true,
            iconCls: tabSettings.iconCls,
            viewModel: {
                data: {
                    chatroom: chatroom,
                    title: chatroom.get('guest')['displayName']
                },

                stores: {
                    messages: {
                        source: Ext.getStore("Message"),
                        filters: [
                            {
                                property: 'chatRoomId',
                                value: chatroom.get("id"),
                                operator: '='
                            }
                        ]
                    }
                }
            }
        });
        return me;
    },

    showAcceptView: function (item) {
        var me = this;
        me.acceptView = new OP.view.accept.Accept({
            autoShow: true,
            viewModel: {
                data: {
                    item: item.get('guest')
                }
            },
            listeners: {
                scope: me,
                accept: function () {
                    me.onAccept(item);
                }
            }

        });
    },

    onAccept: function (chatRoom) {
        this.acceptView.close();
        var viewModel = this.getViewModel();
        var oper = viewModel.data.operator;
        Ext.Ajax.request({
            url: koockoo.service.chatroom.accept.url,
            method: koockoo.service.chatroom.accept.type,
            params: {roomId: chatRoom.id, operatorId: oper.id},
            scope: this,
            success: this.onAccepted,
            original: chatRoom
        });
    },

    onAccepted: function (response, data) {
        var chatRoom = data.original;
        var tabs = this.lookupReference('main-tab-panel');
        var tab = this.chatView({chatroom:chatRoom, iconCls:'iconTabOpen'});
        var ps = Ext.getStore("Pending");
        var currentTab = tabs.getActiveTab();

        tabs.add(tab);
        tabs.setActiveTab(tab);
        ps.remove(chatRoom);

        if (currentTab && currentTab.id != 'dashboard-tab') {
            currentTab.setIconCls('iconTab');
        }
        if (this.polling === false) {
            this.startPolling();
            this.polling = true;
        }
    },

    onTabChanged: function (tabs, newTab, oldTab) {

        if (newTab.id != 'dashboard-tab') {
            newTab.setIconCls('iconTabOpen');
            newTab.controller.scroll();
        }

        if (oldTab.id != 'dashboard-tab') {
            oldTab.setIconCls('iconTab');
        }
    },

    onPendingRowClick: function (grid, record, tr, rowIndex, e, eOpts) {
        if (record) {
            this.showAcceptView(record);
        }
    },

    getUrl: function () {
        var oper = this.getViewModel().data.operator;
        var msStore = Ext.getStore('Message');

        var lastId = null;
        if (msStore.count() > 0) {
            msStore.each(function (message, idx) {
                if (message.get("authorRef") != oper.id) {
                    lastId = message.id;
                }
            });
        }

        var url = "";
        if (lastId != null) {
            url = koockoo.service.message.readByOperator.url;
            url = Ext.String.format(url, oper.id, lastId);
        } else {
            url = koockoo.service.message.readAllByOperator.url;
            url = Ext.String.format(url, oper.id);
        }
        console.log("start polling messages " + url);
        return url;
    },

    startPolling: function () {
        var me = this;
        var messagePoll = new Ext.direct.PollingProvider({
            id: 'MessagePolling',
            interval: 30000,
            type: 'polling',
            url: me.getUrl(),
            listeners: {
                scope: me,
                data: me.onReceiveMessages,
                beforepoll: function (provider, eOpts) {
                    provider.url = me.getUrl();
                }
            }
        });
        Ext.direct.Manager.addProvider(messagePoll);
    },

    onReceiveMessages: function(provider, event) {
        console.log("response received for messages");
        var psStore = Ext.getStore('Message');
        var result  = psStore.getProxy().getReader().read(event.data);
        var records = result.getRecords();
        if (result.getSuccess()) {
            console.log("total: " + result.getTotal());
            var rooms = {};
            Ext.each(records, function (message) {
                psStore.add(message);
                var roomId = message.get("chatRoomId");
                if (rooms[roomId] == undefined) {
                    rooms[roomId] = 0;
                }
                rooms[roomId] += 1;
            });
            this.markTabsUnread(rooms);
        }
    },

    markTabsUnread: function(rooms) {
        var tabs = this.lookupReference('main-tab-panel');
        Ext.each(tabs.items.items, function (tab) {
            if (tab != tabs.getActiveTab() && tab.id !='dashboard-tab') {
                var roomId = tab.viewModel.data.chatroom.id;
                if (rooms[roomId] != undefined && rooms[roomId] != null) {
                    tab.setIconCls('iconTabUnread');
                }
            } else if (tab == tabs.getActiveTab()){
                tab.controller.scroll();
            }
        });
    },

    onLocaleChange: function() {
        var tabSettings = [];
        var tabs = this.lookupReference('main-tab-panel');
        var i=0;
        Ext.each(tabs.items.items, function (tab) {
            if (tab.id == 'dashboard-tab') return;
            var isActive = (tab == tabs.getActiveTab());
            tabSettings[i++] = {
                isActive: isActive,
                chatroom: tab.viewModel.data.chatroom,
                iconCls: tab.iconCls
            };
        });
        this.fireViewEvent('localeChange', tabSettings);
    },

    restoreTabs: function(tabSettings) {
        if (tabSettings == undefined) return;
        var tabs = this.lookupReference('main-tab-panel');
        for	(var i = 0; i < tabSettings.length; i++) {
            var setting = tabSettings[i];
            var tab = this.chatView(setting);
            tabs.add(tab);
            if (setting.isActive) {
                tabs.setActiveTab(tab);
                tab.controller.scroll();
            }
        }
    }

});