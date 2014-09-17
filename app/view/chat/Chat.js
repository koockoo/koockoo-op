Ext.define('OP.view.chat.Chat', {
    extend: 'Ext.panel.Panel',

    requires: [
        'OP.plugin.PreviewPlugin',
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
            flex: 4,
            autoScroll: true,
            border: false,
            hideHeaders: true,
            cls: 'feed-grid',
            store : 'Message',

            viewConfig: {
                stripeRows: false,
                enableTextSelection: true,
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
            xtype: 'htmleditor',
            flex: 1,
            enableLinks: true,
            enableLists: false,
            enableSourceEdit: false,
            enableAlignments: false,
            enableColors: true,
            enableFontSize: false,
            enableFormat: true
//                    enableFont		 : false
        },
        {
            items: [
                {
                    xtype: 'button',
                    text: 'Send',
                    width: '100%',
                    height: 40
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
