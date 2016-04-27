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
            iconCls: 'x-fa fa-trash',
            listeners: {
                click: 'moveToTrash'
            }
        }, {
            iconCls: 'x-fa fa-print',
            listeners: {
                click: 'printPage'
            }
        }
    ],   
    items: [{
        xtype: 'container',
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        items: [{
            xtype: 'box',
            flex: 1,
            itemId: 'fromName'
        }, {
            xtype: 'box',
            flex: 1,
            itemId: 'fromEmail'
        }, {
            xtype: 'box',
            cls: 'mail-body',
            itemId: 'mailBody',
            scrollable: 'y',
            maxHeight: 300
        }, {
            margin: '20 0 0 0',
            items: [{
                    xtype: 'form',
                    reference: 'reply_form',
                    items: [{
                            xtype: 'hidden',
                            name: 'id',
                            itemId: 'idMailDetail'                      
                        }, {
                            xtype: 'hidden',
                            name: 'reply_to_email',
                            itemId: 'replyToEmail'                      
                        }, {
                            xtype: 'hidden',
                            name: 'type',
                            value: 'reply'
                        }, {
                            fieldLabel: 'Subject Mode:',
                            boxLabel: 'Use default subject',
                            xtype: 'checkbox',                            
                            reference: 'changeSubject'     
                        }, {                                                           
                            xtype: 'textfield',
                            reference: 'reply_subject',
                            fieldLabel: 'Reply - Subject',
                            name: 'reply_subject',                            
                            width: '100%',
                            emptyText: 'Subject',
                            allowBlank: false,                            
                            bind: {
                                disabled: '{changeSubject.checked}'
                            }
                        }, {
                            xtype: 'htmleditor',
                            reference: 'reply_content',
                            flex: 1,
                            name: 'reply',
                            minHeight: 200,
                            fieldLabel: 'Reply - Content',
                            allowBlank: false
                        }
                    ]
                }
            ]
        }]
    }],
    bbar: {
        overflowHandler: 'menu',
        items: ['->',
            {
                xtype: 'button',
                text: 'Cancel',
                padding: '10 20 10 20',
                cls: 'write-btn cancel',
                iconCls: 'x-fa fa-times-circle',
                handler: 'onCancelReply'
            }, {
                xtype: 'button',
                text: 'Send',
                padding: '10 20 10 20',
                cls: 'write-btn send',
                iconCls: 'x-fa fa-send',
                handler: 'onReply'
            }
        ]
    }
});