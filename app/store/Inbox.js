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
        /*url: InboxManagement.Global.getApiUrl() + 'api/inbox'*/
        type: 'rest',
        url: 'api/inbox',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});