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
        view.down('#trashName').setHtml('<div class="avatar-detail"><img src="'+ record.get('from_user').avatar +'"/> <div class="text-right">From: ' + record.get('from_user').firstName + ' ' + record.get('from_user').lastName + '</div><div class="text-right two">Email: ' + record.get('from_user').email + '</div>');
        view.down('#trashEmail').setHtml('<div class="avatar-detail"><img src="'+ record.get('to_user').avatar +'"/> <div class="text-right">To: ' + record.get('to_user').firstName + ' ' + record.get('to_user').lastName + '</div><div class="text-right two">Email: ' + record.get('to_user').email + '</div>');
        view.down('#mailBody').setHtml('<div class="content-detail">' + record.get('mail_content') + '</div>');
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