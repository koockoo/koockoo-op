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
                },
                stores: {
                    messages: {
                        model: 'Message',
                        data : [
                            {displayName: 'Ed',    id: 'Spencer', timestamp:'"2012-01-03 5:43:21 PM"', message: 'Opera dsafds fsdfsafsadfsadfsdf'},
                            {displayName: 'Tommy', id: 'Maintz', timestamp:'"2012-01-03 5:43:21 PM"', message: 'Mozila sfsadfsafd safdsadf sadfsa fdsad fsa dfsa df safsa f'},
                            {displayName: 'Aaron', id: 'Conran', timestamp:'"2014-09-17 00:05:21 AM"', message: 'Android fdasfsadfrrdaewsdf safafsedfascd dsafd dsaf ewa fsadfs dsaf '},
                            {displayName: 'Jamie', id: 'Avins', timestamp:'"2012-01-03 5:43:21 AM"', message: 'IE dsafsdf saf sdf fretyt yjuy ujjmnbn bnvc fds vcfdsvcfds gtrjh m hfn'}
                        ]
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
        var tab = this.chatView(chatRoom.get('guest')['displayName']);
        var ps = Ext.getStore("Pending");
        var currentTab = tabs.getActiveTab();

        tabs.add(tab);
        tabs.setActiveTab(tab);
        ps.remove(chatRoom);

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