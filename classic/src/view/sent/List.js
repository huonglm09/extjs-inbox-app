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
        flex: 1
    }, {
        text: 'To',
        dataIndex: 'to_user',
        flex: 1
    }, {
        text: 'Received Date',
        dataIndex: 'created_at',
        flex: 1
    }],
    bbar: {
        xtype: 'pagingtoolbar',
        pageSize: 20,
        store: {
            type: 'sent'
        },
        displayInfo: true,
        plugins: new Ext.ux.ProgressBarPager()
    },
    listeners: {
        cellclick: 'onItemSelected',
        scope: 'controller'
    }
});