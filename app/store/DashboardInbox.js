Ext.define('InboxManagement.store.DashboardInbox', {
    extend: 'Ext.data.Store',
    alias: 'store.dashboardinbox',
    requires: [
        'InboxManagement.Global'
    ],
    model: 'InboxManagement.model.DashboardInbox',
    autoLoad: true,
    proxy: {        
        type: 'ajax',        
        api: {
            read: InboxManagement.Global.getApiUrl() + 'pie-charts/inbox/' + InboxManagement.service.Authenticate.getCurrentUser().email
        },
        reader: {
            type: 'json',
            rootProperty: 'data',
            successProperty: 'success'
        }
    }
});
