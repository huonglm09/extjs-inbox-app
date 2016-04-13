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
    height: 485,
    width: 400,
    resizable: false,
    movable: false,
    closable: false,
    title: 'Login',
    iconCls: 'x-fa fa-user', 
    layout: 'fit',
    cls: 'login-form',    
    bodyPadding: 15,
    items: [
        {
            xtype: 'form',
            bodyPadding: 10,
            reference: 'login_form',
            items: [
                {
                    xtype: 'textfield',
                    anchor: '100%',
                    name: 'email',
                    allowBlank: false,
                    margin: '0 0 20 0',
                    vtype: 'email',
                    emptyText: 'Email',
                    height: 50
                }, {
                    xtype: 'textfield',
                    anchor: '100%',
                    inputType: 'password',
                    name: 'password',
                    allowBlank: false,
                    margin: '0 0 20 0',
                    reference: 'password_field',
                    emptyText: 'Password',
                    height: 50
                }, {
                    xtype: 'checkboxfield',
                    anchor: '100%',
                    fieldLabel: 'Remember Me',
                    inputValue: 1,
                    name: 'remember'
                }, {
                    xtype: 'button',
                    cls: 'btn btn-save',
                    text: 'Submit',
                    width: '100%',
                    height: 50,
                    handler: 'onSubmit'
                }, {
                    title: 'OR',
                    margin: '10 0 10 0',
                    cls: 'line-or',
                    height: 10
                }, {
                    xtype: 'button',
                    cls: 'btn btn-save',
                    text: 'Login with Facebook',
                    width: '100%',
                    height: 50,
                    handler: 'onSubmit'
                }, {
                    title: 'OR',
                    margin: '10 0 10 0',
                    cls: 'line-or',
                    height: 10
                }, {
                    xtype: 'button',
                    cls: 'btn btn-save',
                    text: 'Create Account',
                    width: '100%',
                    height: 50,
                    handler: 'onSubmit'
                }
            ]
        }
    ]
});