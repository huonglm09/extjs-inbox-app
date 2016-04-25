Ext.define('InboxManagement.view.trash.TrashMain', {
    extend: 'Ext.container.Container',
    xtype: 'main-trash',
    requires: [
        'InboxManagement.view.trash.TrashController',
        'InboxManagement.view.trash.TrashModel'
    ],
    controller: 'trash-trash',
    viewModel: {
        type: 'trash-trash'
    },
    id: 'trashMainContainer',
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    items: [{
            xtype: 'container',
            itemId: 'trash-content-panel',
            id: 'trash-content-panel',
            margin: '0 0 20 0',
            flex: 1
        }]
});