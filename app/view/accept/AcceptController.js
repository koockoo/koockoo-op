Ext.define('OP.view.accept.AcceptController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.accept',

    onAcceptClick: function() {
        var viewModel = this.getViewModel();
        this.fireViewEvent('accept', viewModel.data.item);
    }
});
