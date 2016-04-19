(function() {
    'use strict';
    Ext.define('InboxManagement.model.Inbox', {
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
                name: 'from_user',
                type: 'auto',
                convert: function(value) {
                    return value.firstName + ' ' + value.lastName;
                }
            }, {
                name: 'created_at',
                type: 'date',
                convert: function(value) {
                    return window.moment(value).format('dddd MMM DD, YYYY, h:mm:ss a');
                }
            }],
        proxy: {
            type: 'rest',
            url: InboxManagement.Global.getApiUrl() + 'email-inbox/' + InboxManagement.service.Authenticate.getCurrentUser().email || '',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            },
            reader: {
                rootProperty: 'emails'
            }
        }
    });
})();