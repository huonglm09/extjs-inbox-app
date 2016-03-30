Ext.define('InboxManagement.view.inbox.Detail', {
    extend: 'Ext.panel.Panel',
    xtype: 'main-inbox-detail',
    requires: [
        'InboxManagement.view.inbox.DetailController',
        'InboxManagement.view.inbox.DetailModel'
    ],

    controller: 'inbox-detail',
    viewModel: {
        type: 'inbox-detail'
    },

    html: 'Hello, World!!'
});