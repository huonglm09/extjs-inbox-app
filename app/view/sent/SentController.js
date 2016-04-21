Ext.define('InboxManagement.view.sent.SentController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sent-sent',
    requires: [
        'Ext.util.History'
    ],
    onBackBtnClick: function() {
        this.redirectTo('sent');
    },
    onItemSelected: function(view, td, cellIndex, record, tr, rowIndex, e, eOpts) {

        this.redirectTo('email-detail/' + record.get('id'));
    },
    beforeDetailsRender: function(view) {
        var record = view.record ? view.record : {};
        view.down('#fromName').setHtml('From: ' + record.get('from_user').firstName + ' ' + record.get('from_user').lastName);
        view.down('#fromEmail').setHtml('Email: ' + record.get('from_user').email);
        view.down('#mailBody').setHtml(record.get('mail_content'));
    },
    moveToTrash: function() {
        var self = this;
        var view = this.getView().down('main-sent-detail');
        var record = view.record ? view.record : {};
        record.erase({
            success: function() {
                Ext.toast({
                    html: 'Move to trash',
                    title: 'Notification',
                    width: 200,
                    align: 'tr'
                });
                self.redirectTo('sent');
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