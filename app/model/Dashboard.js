Ext.define('InboxManagement.model.Dashboard', {
    extend: 'Ext.data.Model',
    requires: [
        'Ext.data.reader.Json'
    ],
    fields: ['name', 'value', 'total']
});