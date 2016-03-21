Ext.define('InboxManagement.view.auth.Login', {
    extend: 'Ext.window.Window',
    alias: 'widget.auth_login',
    requires: [
        'Ext.button.Button',
        'Ext.button.Split',
        'Ext.form.Panel',
        'Ext.form.field.Checkbox',
        'Ext.form.field.Text',
        'Ext.layout.container.Fit',
        'Ext.menu.Item',
        'Ext.menu.Menu',
        'Ext.toolbar.Fill',
        'InboxManagement.view.auth.LoginController'
    ],
    controller: 'login',
    autoShow: true,
    height: 250,
    width: 350,
    modal: true,
    resizable: false,
    movable: false,
    closable: false,
    title: 'Login',
    iconCls: 'x-fa fa-user', // Added a font-awesome icon to the window
    layout: 'fit',
    items: [
        {
            xtype: 'form',
            bodyPadding: 10,
            reference: 'login_form',
            items: [
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
                    reference: 'password_field'
                },
                {
                    xtype: 'checkboxfield',
                    anchor: '100%',
                    fieldLabel: 'Remember Me',
                    inputValue: 1,
                    name: 'remember'
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
                },
                {
                    xtype: 'tbfill'
                },
                {
                    xtype: 'splitbutton',
                    text: 'Options',
                    menu: {
                        xtype: 'menu',
                        width: 160,
                        items: [
                            {
                                xtype: 'menuitem',
                                text: 'Register',
                                iconCls: 'x-fa fa-user-plus', // Font-awesome icon for the menu item
                                handler: 'onRegister'
                            },
                            {
                                xtype: 'menuitem',
                                text: 'Recover Password',
                                iconCls: 'x-fa fa-user-secret', // Font-awesome icon for the menu item
                                handler: 'onRecoverPassword'
                            }
                        ]
                    }
                }
            ]

        }
    ]
});