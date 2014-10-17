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

    chatView: function (chatroom) {
        return new OP.view.chat.Chat({
            autoShow: true,
            closable: true,
            iconCls: 'iconTabOpen',
            viewModel: {
                data: {
                    chatroom: chatroom,
                    title: chatroom.get('guest')['displayName']
                },

                stores: {
                    all: Ext.getStore("Message"),
                    messages: {
                        source: Ext.getStore("Message"),
                        filters: [{
                            property: 'chatRoomId',
                            value: chatroom.get("id"),
                            operator: '='
                        }]
                    }

                }
            }
        });
    },

    showAcceptView: function (item) {
        this.acceptView = new OP.view.accept.Accept({
            autoShow: true,
            viewModel: {
                data: {
                    item: item.get('guest')
                }
            },
            listeners: {
                scope: this,
                accept: function(){this.onAccept(item);}
            }

        });
    },

    onAccept: function(chatRoom) {
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

    onAccepted: function(response, data){
        var chatRoom = data.original;
        var tabs = this.lookupReference('main-tab-panel');
        var tab = this.chatView(chatRoom);
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
    },


    getUrl: function() {
        var oper = this.getViewModel().data.operator;
        var msStore = Ext.getStore('Message');

        var lastId = null;
        if  (msStore.count() > 0 ) {
            msStore.each(function(message, idx){
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
        console.log("start polling messages "+ url);
        return url;
    },

    startPolling: function () {
        var me = this;
        var messagePoll = new Ext.direct.PollingProvider({
            id:'MessagePolling',
            interval:30000,
            type:'polling',
            url : me.getUrl(),
            listeners: {
                data: function(provider, event) {
                    console.log("response received for messages");
                    var psStore = Ext.getStore('Message');
                    psStore.loadRawData(event.data, true);
                },
                beforepoll: function(provider, eOpts) {
                    provider.url = me.getUrl();
                }
            }
        });
        Ext.direct.Manager.addProvider(messagePoll);
    }


});