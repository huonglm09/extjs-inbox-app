Ext.define('InboxManagement.view.trash.Detail', {
    extend: 'Ext.panel.Panel',
    xtype: 'main-trash-detail',
    requires: [
        'Ext.container.Container',
        'Ext.form.field.HtmlEditor',
        'Ext.layout.container.Anchor',
        'Ext.layout.container.HBox',
        'InboxManagement.view.trash.TrashController',
        'InboxManagement.view.trash.TrashModel'
    ],
    controller: 'trash-trash',
    cls: 'shadow',
    bodyPadding: 10,
    layout: {
        type: 'anchor',
        anchor: '100%'
    },
    listeners: {
        beforerender: 'beforeDetailsRender'
    },
    tbar: [{
        iconCls: 'x-fa fa-angle-left',
        listeners: {
            click: 'onBackBtnClick'
        }
    }, {
        iconCls: 'x-fa fa-minus',
        listeners: {
            click: 'unTrash'
        }
    }, {
        iconCls: 'x-fa fa-print',
        listeners: {
            click: 'printPage'
        }
    }],
    bbar: {
        cls: 'single-mail-action-button',
        defaults: {
            margin: '0 15 0 0'
        },
        items: [
            '->', {
                ui: 'gray',
                text: 'Save'
            }, {
                ui: 'soft-green',
                text: 'Send'
            }
        ]
    },
    items: [{
        xtype: 'container',
        height: 82,
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        items: [{
            xtype: 'box',
            flex: 1,
            itemId: 'trashName'
        }, {
            xtype: 'box',
            flex: 1,
            itemId: 'trashEmail'
        }, {
            xtype: 'box',
            cls: 'mail-body',
            itemId: 'mailBody'
        }]
    }]

});