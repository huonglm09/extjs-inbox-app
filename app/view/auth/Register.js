Ext.define('InboxManagement.view.auth.Register', {
    extend: 'Ext.window.Window',
    alias: 'widget.auth_register',
    requires: [
        'Ext.button.Button',
        'Ext.form.Panel',
        'Ext.form.field.Text',
        'Ext.layout.container.Fit',
        'InboxManagement.view.auth.RegisterController'
    ],
    controller: 'register',
    autoShow: true,
    height: 275,
    width: 375,
    modal: true,
    resizable: false,
    movable: false,
    closable: false,
    title: 'Register',
    iconCls: 'x-fa fa-user-plus', // Font-awesome icon for the menu item
    layout: 'fit',
    items: [
        {
            xtype: 'form',
            bodyPadding: 10,
            reference: 'register_form',
            defaults: {
                labelWidth: 120
            },
            items: [
                {
                    xtype: 'textfield',
                    anchor: '100%',
                    fieldLabel: 'Name',
                    name: 'name',
                    allowBlank: false,
                    margin: '0 0 20 0'
                },
                {
                    xtype: 'textfield',
                    anchor: '100%',
                    fieldLabel: 'Email',
                    name: 'email',
                    allowBlank: false,
                    margin: '0 0 20 0',
                    vtype: 'email' // Using the built in email vtype
                },
                {
                    xtype: 'textfield',
                    anchor: '100%',
                    fieldLabel: 'Password',
                    inputType: 'password',
                    name: 'password',
                    allowBlank: false,
                    margin: '0 0 20 0',
                    reference: 'password_field',
                    vtype: 'passwordCheck', // Using the vtype from the global singleton.
                    itemId: 'firstPassword' // This itemId is used in the passwordMatch vtype in the global singleton
                },
                {
                    xtype: 'textfield',
                    anchor: '100%',
                    fieldLabel: 'Password (re-enter)',
                    inputType: 'password',
                    allowBlank: false,
                    vtype: 'passwordMatch', // Using the vtype from the global singleton
                    validateFieldId: 'firstPassword' // The itemId from the field you want to compare against
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
                    text: 'Submit',
                    handler: 'onSubmit'
                }
            ]

        }
    ]
});