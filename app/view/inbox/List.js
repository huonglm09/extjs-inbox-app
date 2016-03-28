/**
 * This view is an example list of people.
 */
Ext.define('InboxManagement.view.inbox.List', {
    extend: 'Ext.grid.Panel',
    xtype: 'main-inbox-list',

    requires: [
        'InboxManagement.store.Inbox'
    ],

    title: 'Inbox',

    store: {
        type: 'inbox'
    },

    columns: [{
        text: 'Name',
        dataIndex: 'name'
    }, {
        text: 'Email',
        dataIndex: 'email',
        flex: 1
    }, {
        text: 'Phone',
        dataIndex: 'phone',
        flex: 1
    }],
    listeners: {
        select: 'onItemSelected',
        scope: 'controller'
    }
});