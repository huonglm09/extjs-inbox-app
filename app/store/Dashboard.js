Ext.define('InboxManagement.store.Dashboard', {
    extend: 'Ext.data.Store',
    alias: 'store.dashboard',
    requires: [
        'InboxManagement.Global'
    ],
    model: 'InboxManagement.model.Dashboard',
    autoLoad: true,
    proxy: {
        type: 'ajax',
        api: {
            read: InboxManagement.Global.getApiUrl() + 'pie-charts/' + InboxManagement.service.Authenticate.getCurrentUser().email
        },
        reader: {
            type: 'json',
            rootProperty: 'data',
            successProperty: 'success'
        }
    }
});
