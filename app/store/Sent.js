Ext.define('InboxManagement.store.Sent', {
    extend: 'Ext.data.Store',
    alias: 'store.sent',
    requires: [
        'InboxManagement.Global'
    ],

    storeId: 'Sent',

    model: 'InboxManagement.model.Sent',

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