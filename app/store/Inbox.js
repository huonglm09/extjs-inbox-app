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
        type: 'jsonp',
        url: 'http://localhost:8000/api/email-inbox',
        callbackKey: 'callback',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});