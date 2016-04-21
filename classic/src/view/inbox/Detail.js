Ext.define('InboxManagement.view.inbox.Detail', {
    extend: 'Ext.panel.Panel',
    xtype: 'main-inbox-detail',
    requires: [
        'InboxManagement.view.inbox.DetailModel',
        'Ext.container.Container',
        'Ext.form.field.HtmlEditor',
        'Ext.layout.container.Anchor',
        'Ext.layout.container.HBox'
    ],
    viewModel: {
        type: 'inbox-detail'
    },
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
            iconCls: 'x-fa fa-trash',
            listeners: {
                click: 'moveToTrash'
            }
        }, {
            iconCls: 'x-fa fa-exclamation-circle'
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
                type: 'hbox',
                align: 'stretch'
            },
            items: [{
                    xtype: 'box',
                    cls: 'mail-body',
                    itemId: 'mailBody'
                }]
        }]

});