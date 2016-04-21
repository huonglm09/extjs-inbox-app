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
    },
    unTrash: function() {
        var self = this;
        var view = this.getView();
        var record = view.record ? view.record : {};
        record.save({
            success: function() {
                Ext.toast({
                    html: 'Restore',
                    title: 'Notification',
                    width: 200,
                    align: 'tr'
                });
                self.redirectTo('trash');
            },
            failure: function() {
                Ext.toast({
                    html: 'Something wrong!',
                    title: 'Notification',
                    width: 200,
                    align: 'tr'
                });
            }
        });
    },
    printPage: function() {
        window.print();
    }
});