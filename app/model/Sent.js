Ext.define('InboxManagement.model.Sent', {
    extend: 'InboxManagement.model.Base',
    fields: [{
            name: 'id',
            type: 'integer'
        }, {
            name: 'from_user_email',
            type: 'string',
            reference: 'User'
        }, {
            name: 'to_user_email',
            type: 'string',
            reference: 'User'
        }, {
            name: 'mail_subject',
            type: 'string'
        }, {
            name: 'created_at',
            type: 'date'
        }],
    proxy: {
        type: 'rest',
//        url: InboxManagement.Global.getApiUrl() + localStorage.getItem('email') ,
        url: InboxManagement.Global.getApiUrl() + 'email-sent/' + localStorage.getItem('email'),
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        },
        reader: {
            rootProperty: 'emails'
        }
    }
});