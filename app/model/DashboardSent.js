Ext.define('InboxManagement.model.DashboardSent', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.reader.Json'
    ],

    fields: ['id', 'mail_content', 'mail_subject', 'from_user_email', 'to_user_email', 'created_at', 'updated_at', 'deleted_at', 'to_deleted', 'from_deleted', 'total', 'fullName']
});