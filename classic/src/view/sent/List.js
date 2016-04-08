/**
 * This view is an example list of people.
 */
Ext.define('InboxManagement.view.sent.List', {
    extend: 'Ext.grid.Panel',
    xtype: 'main-sent-list',
    requires: [
        'InboxManagement.store.Sent'
    ],
    title: 'Sent mail',
    store: {
        type: 'sent'
    },
    /*bind: {
     store: '{inbox}'
     },*/
    viewConfig: {
        preserveScrollOnRefresh: true,
        preserveScrollOnReload: true
    },
    headerBorders: false,
    rowLines: false,
    columns: [{
            text: 'Subject',
            dataIndex: 'mail_subject',
            width: 200
        }, {
            text: 'To',
            dataIndex: 'To_user_email',
            flex: 1
        }
        , {
            text: 'Content',
            dataIndex: 'content_sent_email',
            flex: 1
        }
        , {
            text: 'Created at',
            dataIndex: 'created_sent_email',
            flex: 1
        }],
    listeners: {
        cellclick: 'onItemSelected',
        scope: 'controller'
    }
});