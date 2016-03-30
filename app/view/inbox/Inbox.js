Ext.define('InboxManagement.view.inbox.Inbox', {
    extend: 'Ext.panel.Panel',
    xtype: 'main-inbox',
    requires: [
        'InboxManagement.view.inbox.InboxController',
        'InboxManagement.view.inbox.InboxModel'
    ],

    controller: 'inbox-inbox',
    viewModel: {
        type: 'inbox-inbox'
    },
    items: [{
        xtype: 'main-inbox-list',
        itemId: 'mailContent'
    }]
});