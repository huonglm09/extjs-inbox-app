Ext.define('InboxManagement.view.sent.Detail', {
    extend: 'Ext.panel.Panel',
    xtype: 'main-sent-detail',
    requires: [
        'InboxManagement.view.sent.DetailModel',
        'Ext.container.Container',
        'Ext.form.field.HtmlEditor',
        'Ext.layout.container.Anchor',
        'Ext.layout.container.HBox'
    ],
    viewModel: {
        type: 'sent-detail'
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
    tbar: [
        // Default item type for toolbar is button, thus we can skip it's definition in
        // the array items
        {
            iconCls: 'x-fa fa-angle-left',
            listeners: {
                click: 'onBackBtnClick'
            }
        }, {
            iconCls: 'x-fa fa-trash'
        }, {
            iconCls: 'x-fa fa-exclamation-circle'
        }, {
            iconCls: 'x-fa fa-print'
        }, {
            iconCls: 'x-fa fa-forward'
        }
    ],
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