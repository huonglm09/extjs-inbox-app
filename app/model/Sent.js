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
            type: 'auto',
            convert: function(value) {
                return value;
            }
        }, {
            name: 'mail_subject',
            type: 'string'
        }, {
            name: 'created_at',
            type: 'date',
            convert: function(value) {
                return value;
            }
        }],
    proxy: {
        type: 'rest',
        url: InboxManagement.Global.getApiUrl() + 'email-sent/' + InboxManagement.service.Authenticate.getCurrentUser().email || '',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        },
        reader: {
            rootProperty: 'emails'
        }
    }
});