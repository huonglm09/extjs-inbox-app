Ext.define('InboxManagement.view.sent.Sent', {
    extend: 'Ext.container.Container',
    xtype: 'main-sent',
    requires: [
        'InboxManagement.view.sent.SentController',
        'InboxManagement.view.sent.SentModel'
    ],
    controller: 'sent-sent',
    viewModel: {
        type: 'main-sent'
    },
    id: 'sentMainContainer',
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    items: [{
            xtype: 'container',
            itemId: 'sent-content-panel',
            id: 'sent-content-panel',
            margin: '0 20 20 0',
            flex: 1
        }]
});