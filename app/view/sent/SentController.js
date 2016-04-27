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
        view.down('#fromName').setHtml('<div class="avatar-detail"><img src="'+ record.get('from_user').avatar +'"/> <div class="text-right">Me: ' + record.get('from_user').firstName + ' ' + record.get('from_user').lastName + '</div><div class="text-right two">Email: ' + record.get('from_user').email + '</div>');
        view.down('#fromEmail').setHtml('<div class="avatar-detail"><img src="'+ record.get('to_user').avatar +'"/> <div class="text-right">To: ' + record.get('to_user').firstName + ' ' + record.get('to_user').lastName + '</div><div class="text-right two">Email: ' + record.get('to_user').email + '</div>');
        view.down('#mailBody').setHtml('<div class="content-detail">' + record.get('mail_content') + '</div>');
        view.down('#replyToEmail').setValue(record.get('to_user').email);        
        view.down('#idMailDetail').setValue(record.get('id'));      
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
    },
    onReply: function() {
        var me = this;
        var form = me.lookupReference('reply_form');        
        if (form.isValid()) {
            form.submit({
                url: InboxManagement.Global.getApiUrl() + 'write-email',
                waitMsg: 'Loading...',
                method: 'POST',
                success: function(form, action) {
                    var res = Ext.decode(action.response.responseText);
                    form.reset();
                    me.redirectTo('sent');
                }, failure: function(form, action) {
                    var res = Ext.decode(action.response.responseText);
                    Ext.MessageBox.show({
                        title: 'Reply',
                        msg: 'Please try again',
                        icon: Ext.MessageBox.ERROR,
                        width: 200,
                        closable: false,
                        buttons: Ext.MessageBox.OK
                    });
                }
            });
        }
    },
    onCancelReply: function() {
        var replyContent = this.lookupReference('reply_content');
        var replySubject = this.lookupReference('reply_subject');
        var replySubjectMode = this.lookupReference('changeSubject');
        replyContent.reset();
        replySubject.reset();
        replySubjectMode.reset();
    }
});