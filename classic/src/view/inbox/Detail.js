Ext.define('InboxManagement.view.inbox.Detail', {
    extend: 'Ext.panel.Panel',
    xtype: 'main-inbox-detail',
    requires: [
        'InboxManagement.view.inbox.InboxController',
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
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        items: [{
            xtype: 'box',
            flex: 1,
            itemId: 'toName'
        }, {
            xtype: 'box',
            flex: 1,
            itemId: 'toEmail'
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
                            fieldLabel: 'Subject Mode:',
                            boxLabel: 'Use default subject',
                            xtype: 'checkbox',                            
                            reference: 'changeSubject'        
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