Ext.define('InboxManagement.store.Users', {
    extend: 'Ext.data.Store',
    alias: 'store.users',
    requires: [
        'InboxManagement.Global'
    ],
    model: 'InboxManagement.model.User',
    autoLoad: true,
    pageSize: 1,
    proxy: {
        type: 'ajax',
        enablePaging: true,
        api: {
            read: InboxManagement.Global.getApiUrl() + 'users'
        },
        reader: {
            type: 'json',
            rootProperty: 'users',
            successProperty: 'success'
        }
    }
});

