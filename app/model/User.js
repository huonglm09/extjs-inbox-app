Ext.define('InboxManagement.model.User', {
    extend: 'Ext.data.Model',
    requires: [
        'Ext.data.reader.Json'
    ],
    fields: ['id', 'firstName', 'lastName', 'email', 'created_at', 'updated_at']
});