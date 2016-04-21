Ext.define('InboxManagement.store.DashboardSent', {
    extend: 'Ext.data.Store',
    alias: 'store.dashboardsent',
    requires: [
        'InboxManagement.Global'
    ],
    model: 'InboxManagement.model.DashboardSent',
    autoLoad: true,
    proxy: {
        type: 'ajax',
        api: {
            read: InboxManagement.Global.getApiUrl() + 'pie-charts/sent'
        },
        reader: {
            type: 'json',
            rootProperty: 'data',
            successProperty: 'success'
        }
    }
});