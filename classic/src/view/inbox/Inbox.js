Ext.define('InboxManagement.view.inbox.Inbox', {
    extend: 'Ext.container.Container',
    xtype: 'main-inbox',
    requires: [
        'InboxManagement.view.inbox.InboxController',
        'InboxManagement.view.inbox.InboxModel'
    ],
    controller: 'inbox-inbox',
    viewModel: {
        type: 'main-inbox'
    },
    id: 'inboxMainContainer',
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    items: [{
            xtype: 'container',
            itemId: 'inbox-content-panel',
            id: 'inbox-content-panel',
            margin: '0 20 20 0',
            flex: 1
        }]
});