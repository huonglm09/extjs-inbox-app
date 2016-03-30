Ext.define('InboxManagement.store.Inbox', {
    extend: 'Ext.data.Store',
    alias: 'store.inbox',
    requires: [
        'InboxManagement.Global'
    ],

    model: 'InboxManagement.model.Inbox',

    pageSize: 20,

    autoLoad: true,
    /*data: {
        data: [{
            from_user_email: 'jeanluc.picard@enterprise.com',
            to_user_email: 'jeanluc.picard@enterprise.com',
            mail_subject: 'Subject 1'
        }, {
            from_user_email: 'jeanluc.picard@enterprise.com',
            to_user_email: 'worf.moghsson@enterprise.com',
            mail_subject: 'Subject 2'
        }, {
            from_user_email: 'jeanluc.picard@enterprise.com',
            to_user_email: 'worf.moghsson@enterprise.com',
            mail_subject: 'Subject 3'
        }, {
            from_user_email: 'jeanluc.picard@enterprise.com',
            to_user_email: 'worf.moghsson@enterprise.com',
            mail_subject: 'Subject 4'
        }]
    },*/
    proxy: {
        /*url: InboxManagement.Global.getApiUrl() + 'api/inbox'*/
        type: 'rest',
        url: 'api/inbox',
        model: 'InboxManagement.model.Inbox',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});