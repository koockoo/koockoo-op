Ext.define('OP.view.lang.Lang', {
    extend: 'Ext.button.Cycle',
    alias: 'widget.lang',

    viewModel: 'lang',
    controller: 'lang',

    showText: true,

    listeners: {
        change: 'onLangChange',
        scope: 'controller'
    },

    menu: {
        id: 'lang-menu',
        items: [
            {
                iconCls: 'en',
                text: 'English',
                locale: 'us',
                checked: true
            },
            {
                iconCls: 'ru',
                text: 'Русский',
                locale: 'ru'
            }
        ]
    }
});