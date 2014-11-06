Ext.define('OP.view.lang.LangController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.lang',

    onLangChange: function (cycle, activeItem) {
        console.log(activeItem.locale);
        var lang = 'en';
        this.fireViewEvent('langChange', lang);
    }
});