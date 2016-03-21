Ext.define('InboxManagement.view.auth.Password', {
    extend: 'Ext.window.Window',
    alias: 'widget.auth_password',
    requires: [
        'Ext.button.Button',
        'Ext.form.Panel',
        'Ext.form.field.Text',
        'Ext.layout.container.Fit',
        'InboxManagement.view.auth.PasswordController',
        'InboxManagement.view.auth.PasswordModel'
    ],
    controller: 'password',
    viewModel: 'password',
    autoShow: true,
    height: 325,
    width: 375,
    modal: true,
    resizable: false,
    movable: false,
    closable: false,
    title: 'Recover Password',
    iconCls: 'x-fa fa-user-secret',
    layout: 'fit',
    items: [
        {
            xtype: 'form',
            bodyPadding: 10,
            reference: 'password_form',
            /*
             * Binding the html to the viewmodel
             * */
            bind: {
                html: '{html}'
            },
            defaults: {
                labelWidth: 150
            },
            items: [
                {
                    xtype: 'textfield',
                    anchor: '100%',
                    fieldLabel: 'Email',
                    name: 'email',
                    allowBlank: false,
                    margin: '0 0 20 0',
                    vtype: 'email', // Using the built in email vtype
                    bind: {
                        readOnly: '{readOnly}' // Binding readOnly to the viewmodel
                    }
                },
                {
                    xtype: 'textfield',
                    anchor: '100%',
                    fieldLabel: 'Password Token',
                    name: 'password_token',
                    allowBlank: false,
                    margin: '0 0 20 0',
                    readOnly: true,
                    bind: {
                        value: '{password_token}', // Bind value to the viewmodel
                        disabled: '{disabled}'  // Bind disabled to the viewmodel
                    }
                },
                {
                    xtype: 'textfield',
                    anchor: '100%',
                    fieldLabel: 'New Password',
                    inputType: 'password',
                    name: 'password',
                    allowBlank: false,
                    margin: '0 0 20 0',
                    vtype: 'passwordCheck', // Using the vtype from the global singleton.
                    itemId: 'firstPassword', // This itemId is used in the passwordMatch vtype in the global singleton
                    bind: {
                        disabled: '{disabled}' // Bind disabled to the viewmodel
                    }
                },
                {
                    xtype: 'textfield',
                    anchor: '100%',
                    fieldLabel: 'New Password (re-enter)',
                    inputType: 'password',
                    allowBlank: false,
                    margin: '0 0 20 0',
                    vtype: 'passwordMatch', // Using the vtype from the global singleton
                    validateFieldId: 'firstPassword', // The itemId from the field you want to compare against
                    bind: {
                        disabled: '{disabled}' // Bind disabled to the viewmodel
                    }
                }
            ]
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            items: [
                {
                    xtype: 'button',
                    text: 'Get Reset Token',
                    handler: 'onGetResetToken',
                    bind: {
                        disabled: '{!disabled}' // Bind disabled to the viewmodel
                    }
                },
                {
                    xtype: 'button',
                    text: 'Submit',
                    handler: 'onSubmit',
                    bind: {
                        disabled: '{disabled}' // Bind disabled to the viewmodel
                    }
                }
            ]
        }
    ]
});