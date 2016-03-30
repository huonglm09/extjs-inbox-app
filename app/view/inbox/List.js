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

    /*bind: {
        store: '{inbox}'
    },*/

    columns: [{
        text: 'Subject',
        dataIndex: 'mail_subject'
    }, {
        text: 'From',
        dataIndex: 'from_user_email',
        flex: 1
    }, {
        text: 'To',
        dataIndex: 'to_user_email',
        flex: 1
    }],
    listeners: {
        select: 'onItemSelected',
        selectInbox: 'onFilmSelect'
        scope: 'controller'
    }
});