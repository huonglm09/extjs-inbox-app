Ext.define('InboxManagement.view.trash.Trash', {
    extend: 'Ext.grid.Panel',
    xtype: 'main-trash-list',

    requires: [
        'InboxManagement.store.Trash',
        'InboxManagement.view.trash.TrashController',
        'InboxManagement.view.trash.TrashModel'
    ],
    controller: 'trash-trash',
    viewModel: {
        type: 'trash-trash'
    },

    title: {
        bind: {
            html: '<i class="mark-color"></i><div class="title-panel">Trash</div>'
        }
    },

    viewConfig: {
        preserveScrollOnRefresh: true,
        preserveScrollOnReload: true
    },
    headerBorders: false,
    rowLines: false,

    store: {
        type: 'trash'
    },

    columns: [{
        text: 'Subject',
        dataIndex: 'mail_subject',
        flex: 1
    }, {
        text: 'From',
        dataIndex: 'from_user',
        flex: 1
    }, {
        text: 'To',
        dataIndex: 'to_user',
        flex: 1
    }, {
        text: 'Sent Date',
        dataIndex: 'created_at',
        flex: 1
    }],
    bbar: {
        xtype: 'pagingtoolbar',
        pageSize: 20,
        store: {
            type: 'trash'
        },
        displayInfo: true,
        plugins: new Ext.ux.ProgressBarPager()
    },
    listeners: {
        cellclick: 'onItemSelected',
        scope: 'controller'
    }
});