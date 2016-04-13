/**
 * This view is an example list of people.
 */
Ext.define('InboxManagement.view.sent.List', {
    extend: 'Ext.grid.Panel',
    xtype: 'main-sent-list',
    requires: [
        'InboxManagement.store.Sent'
    ],
    title: {
        bind: {
            html: '<i class="mark-color"></i><div class="title-panel">Sent</div>'
        }
    },
    store: {
        type: 'sent'
    },
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
            dataIndex: 'to_user_email',
            flex: 1
        }
        , {
            text: 'Content',
            dataIndex: 'mail_content',
            flex: 1
        }
        , {
            text: 'Created at',
            dataIndex: 'created_at',
            flex: 1
        }],
    listeners: {
        cellclick: 'onItemSelected',
        scope: 'controller'
    }
});