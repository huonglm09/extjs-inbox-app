Ext.define('InboxManagement.store.Inbox', {
    extend: 'Ext.data.Store',
    alias: 'store.inbox',
    requires: [
        'InboxManagement.Global'
    ],
    storeId: 'Inbox',
    model: 'InboxManagement.model.Inbox',
    pageSize: 20,
    autoLoad: true
});