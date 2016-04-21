Ext.define('InboxManagement.model.Email', {
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
        url: InboxManagement.Global.getApiUrl() + 'email',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        },
        reader: {
            rootProperty: function(data) {
                return data.emails || data;
            }
        }
    }
});