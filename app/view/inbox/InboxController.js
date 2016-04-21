Ext.define('InboxManagement.view.inbox.InboxController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.inbox-inbox',
    requires: [
        'Ext.util.History'
    ],
    onBackBtnClick: function() {
        this.redirectTo('inbox');
    },
    onItemSelected: function(view, td, cellIndex, record, tr, rowIndex, e, eOpts) {

        this.redirectTo('inbox/' + record.get('id'));
    },

    beforeDetailsRender: function(view) {
        var record = view.record ? view.record : {};
        view.down('#mailBody').setHtml(record.get('mail_content'));
    },

    moveToTrash: function() {
        var self = this;
        var view = this.getView().down('main-inbox-detail');
        var record = view.record ? view.record : {};
        record.erase({
            success: function() {
                Ext.toast({
                    html: 'Move to trash',
                    title: 'Notification',
                    width: 200,
                    align: 'tr'
                });
                self.redirectTo('inbox');
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

    }
});