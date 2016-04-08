Ext.define('InboxManagement.store.Inbox', {
    extend: 'Ext.data.Store',
    alias: 'store.inbox',
    requires: [
        'InboxManagement.Global'
    ],

    storeId: 'Inbox',

    model: 'InboxManagement.model.Inbox',

    pageSize: 20,

    autoLoad: true,

    proxy: {
        type: 'rest',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer '
        },
        url: InboxManagement.Global.getApiUrl() + 'email-inbox/' + localStorage.getItem('email'),
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});