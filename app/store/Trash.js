Ext.define('InboxManagement.store.Trash', {
    extend: 'Ext.data.Store',
    alias: 'store.trash',
    requires: [
        'InboxManagement.Global'
    ],
    storeId: 'Trash',
    model: 'InboxManagement.model.Trash',
    pageSize: 20,
    autoLoad: true
});