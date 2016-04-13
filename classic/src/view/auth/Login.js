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
    height: 505,
    width: 400,
    resizable: false,
    movable: false,
    closable: false,
    title: 'Sign into your account',     
    layout: 'fit',
    cls: 'login-form',    
    bodyPadding: '0px 10px 10px 10px',
    items: [
        {
            xtype: 'form',
            bodyPadding: '0px 10px 10px 10px',
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
                    cls: 'btn btn-save btn-save-login',
                    text: 'Submit',
                    width: '100%',
                    height: 50,
                    handler: 'onSubmit',
                    iconCls: 'fa-angle-right',
                    iconAlign: 'right'
                }, {
                    title: 'OR',
                    margin: '15 0 15 0',
                    cls: 'line-or',
                    height: 15
                }, {
                    xtype: 'button',
                    cls: 'btn btn-save btn-save-face',
                    text: 'Login with Facebook',
                    width: '100%',
                    height: 50,
                    handler: 'onSubmit',
                    iconCls: 'x-btn-icon-el-facebook-large x-fa fa-facebook',
                    iconAlign: 'right'
                }, {
                    title: 'OR',
                    margin: '15 0 15 0',
                    cls: 'line-or',
                    height: 15
                }, {
                    xtype: 'button',
                    cls: 'btn btn-save btn-create-account',
                    text: 'Create Account',
                    width: '100%',
                    height: 50,
                    //handler: 'onSubmit',
                    iconCls: 'x-btn-icon-el-gray-large x-fa fa-user-plus',
                    iconAlign: 'right'
                }
            ]
        }
    ]
});