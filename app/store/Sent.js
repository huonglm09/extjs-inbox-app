Ext.define('InboxManagement.store.Sent', {
    extend: 'Ext.data.Store',
    alias: 'store.sent',
    requires: [
        'InboxManagement.Global'
    ],

    storeId: 'Sent',

    model: 'InboxManagement.model.Sent',

    pageSize: 20,

    autoLoad: true
});