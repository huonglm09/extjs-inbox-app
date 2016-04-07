Ext.define('InboxManagement.view.main.Write', {
    extend: 'Ext.form.Panel',
    xtype: 'write',
    alias: 'write',
    requires: [        
        'Ext.button.Button',
        'Ext.form.field.Text',
        'Ext.form.field.File',
        'Ext.form.field.HtmlEditor',
        'InboxManagement.view.main.WriteController',
        'InboxManagement.view.main.WriteModel'        
    ],
    viewModel: {
        type: 'write'
    },
    controller: 'write',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    bodyPadding: 10,
    scrollable: true,
    defaults: {
        labelWidth: 60,
        labelSeparator: ''
    },
    items: [
        {
            xtype: 'form',            
            reference: 'write_form',
            items: [{
                    xtype : 'hidden',  
                    name  : 'from_email',
                    bind  : '{email}'
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'To:',
                    allowBlank: false,
                    name: 'to_email',
                    vtype: 'email',
                    width: '100%',
                    emptyText: 'example@qsoft.com'
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Subject:',
                    name: 'subject',
                    allowBlank: false,
                    width: '100%',
                    emptyText: 'Example sent to ...'
                }, {
                    xtype: 'htmleditor',
                    flex: 1,
                    name: 'content',
                    minHeight: 400,
                    fieldLabel: 'Message:'
                }
            ]
        }
    ],
    bbar: {
        overflowHandler: 'menu',
        items: ['->',
            {
                xtype: 'button',
                text: 'Discard',
                padding: '10 20 10 20',
                id: 'discard',
                cls: 'write-btn',
                handler: 'onDiscard'
            }, {
                xtype: 'button',
                text: 'Send',
                padding: '10 20 10 20',
                id: 'send',
                cls: 'write-btn',
                handler: 'onWrite'
            }
        ]
    }
});
