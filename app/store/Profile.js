Ext.define('InboxManagement.store.Profile', {
    extend: 'Ext.data.Store',
    alias: 'store.profile',
    requires: [
        'InboxManagement.Global'
    ],
    model: 'InboxManagement.model.Profile',
    autoLoad: true,
    proxy: {        
        type: 'ajax',        
        api: {
            read: InboxManagement.Global.getApiUrl() + 'auth/profile'
        },
        reader: {
            type: 'json',
            rootProperty: 'data',
            successProperty: 'success'
        }
    }
});
