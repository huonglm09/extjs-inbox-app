Ext.define('InboxManagement.view.trash.TrashController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.trash-trash',
    requires: [
        'Ext.util.History'
    ],
    onBackBtnClick: function() {
        this.redirectTo('trash');
    },
    onItemSelected: function(view, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        this.redirectTo('trash/' + record.get('id'));
    },
    beforeDetailsRender: function(view) {
        var record = view.record ? view.record : {};
        view.down('#mailBody').setHtml(record.get('mail_content'));
    }
});