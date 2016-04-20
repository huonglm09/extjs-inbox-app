Ext.define('InboxManagement.view.dashboard.DashboardMain', {
    extend: 'Ext.container.Container',
    xtype: 'main-dashboard',
    id: 'dashboardMainContainer',
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    items: [{
            xtype: 'container',
            itemId: 'dashboard-main',
            id: 'dashboard-main',
            flex: 1
        }]
});