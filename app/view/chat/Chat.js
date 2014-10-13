Ext.define('OP.view.chat.Chat', {
    extend: 'Ext.panel.Panel',

    requires: [
        'Ext.ux.PreviewPlugin',
        'Ext.form.Panel',
        'Ext.button.Button',
        'Ext.form.field.Text',
        'Ext.form.field.ComboBox',
        'Ext.toolbar.Toolbar',
        'Ext.form.field.HtmlEditor',
        'Ext.grid.Panel'
    ],

    viewModel: 'chat',
    controller: 'chat',

    bodyPadding: 10,
    bind: '{title}',

    layout: {
        type: 'vbox',
        align: 'stretch',
        pack: 'start'
    },

    margins: '5 5 5 5',

    tools: [
        {
            type: 'print'
        },
        {
            type: 'save'
        }
    ],

    items: [
        {

            xtype: 'grid',
            reference: 'chat-grid',
            flex: 4,
            border: false,
            hideHeaders: true,
            cls: 'feed-grid',
            bind: {
                store: '{messages}'
            },
            viewConfig: {
                stripeRows: false,
                enableTextSelection: true,
                autoScroll: true,
                plugins: [
                    {
                        pluginId: 'preview',
                        ptype: 'preview',
                        bodyField: 'message',
                        expanded: true
                    }
                ]
            },

            columns: [
                {
                    text: 'Author',
                    dataIndex: 'displayName',
                    renderer: this.formatTitle,
                    flex: 1
                },
                {
                    text: 'Date',
                    dataIndex: 'timestamp',
                    renderer: this.formatDate,
                    width: 200
                }
            ]
        },
        {
            xtype: 'form',
            layout: 'fit',
            border: true,
            items: [
                {
                    xtype: 'htmleditor',
                    reference: 'chat-textarea',
                    flex: 1,
                    enableLinks: true,
                    enableLists: false,
                    enableSourceEdit: false,
                    enableAlignments: false,
                    enableColors: true,
                    enableFontSize: false,
                    enableFormat: true
                    //                    enableFont		 : false
                }
            ],
            buttons: [
                {
                    text: 'Send',
                    width: 150,
                    height: 30,
                    listeners: {
                        click: 'onSendClick'
                    }
                }
            ]

        }
    ],

    /**
     * Title renderer
     * @private
     */
    formatTitle: function (value, p, record) {
        return Ext.String.format('<span class="author">{0}</span>', value || "Unknown");
    },

    /**
     * Date renderer
     * @private
     */
    formatDate: function (timestamp) {

        if (!timestamp) {
            return '';
        }

        var date = new Date(timestamp);
        var now = new Date();
        var d = Ext.Date.clearTime(now, true);
        var notime = Ext.Date.clearTime(date, true).getTime();

        if (notime === d.getTime()) {
            return 'Today ' + Ext.Date.format(date, 'g:i a');
        }

        d = Ext.Date.add(d, 'd', -6);
        if (d.getTime() <= notime) {
            return Ext.Date.format(date, 'D g:i a');
        }
        return Ext.Date.format(date, 'Y/m/d g:i a');
    }
});
