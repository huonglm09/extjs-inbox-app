Ext.define('InboxManagement.view.auth.LoginController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.login',    
    /*
     * Form submit method
     * */
    onSubmit: function(btn) {
        var me = this,
                win = btn.up('window'),
                form = me.lookupReference('login_form'),
                password;

        if (form.isValid()) {
            form.submit({
                url: InboxManagement.Global.getApiUrl() + 'auth/login',
                waitMsg: 'Loading...',
                method: 'POST',
                success: function(form, action) {
                    var res = Ext.decode(action.response.responseText);
                    win.close();
                    InboxManagement.service.Authenticate.setCurrentUser(res.data);
                    InboxManagement.Global.setUser(res.data);
                    me.redirectTo('dashboard');
                },
                failure: function(form, action) {
                    var res = Ext.decode(action.response.responseText);
                    Ext.MessageBox.show({
                        title: 'Login failed',
                        msg: res.message,
                        icon: Ext.MessageBox.ERROR,
                        width: 200,
                        closable: false,
                        buttons: Ext.MessageBox.OK
                    });
                }
            });
        }
    },
    /**
     * [onFacebookLogin description]
     * @return {[type]} [description]
     */
    onFacebookLogin: function(btn) {
        var self = this;
        var win = btn.up('window');
        window.FB.getLoginStatus(function(response) {
            if (response.status === 'connected') {
                self.onFBLogin(win);
            } else if (response.status === 'not_authorized') {
                window.FB.login(function(response) {
                    if (response.authResponse) {
                        self.onFBLogin(win);
                    } else {

                    }
                }, {
                    scope: 'email'
                });
            } else {
                // the user isn't logged in to Facebook.
            }
        });

    },
    /**
     * [onLogin description]
     * @param  {[type]} data [description]
     * @return {[type]}      [description]
     */
    onFBLogin: function(win) {
        var self = this;
        window.FB.api('/me', {
            fields: 'email,first_name,last_name'
        }, function(res) {

            InboxManagement.service.Auth.login(res).then(function(response, opts) {
                InboxManagement.service.Authenticate.setCurrentUser(response);
                win.close();
                self.redirectTo('dashboard');
            },
                    function(response, opts) {
                        Ext.toast(response.message);
                    }
            );
        });

    },
    /*
     * onRegister method is called when the options - register menu item is selected.  Redirects to register route
     * */
    onRegister: function() {
        var me = this;
        var register = Ext.create('Ext.window.Window', {
            layout: 'fit',
            autoShow: true,
            height: 580,
            width: 400,
            resizable: false,
            movable: false,
            controller: 'login',
            closable: false,
            cls: 'login-form',
            title: 'Signup',
            bodyPadding: '0px 10px 10px 10px',
            items: {
                xtype: 'form',
                bodyPadding: '0px 10px 10px 10px',
                reference: 'register',
                items: [{
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
                        emptyText: 'Password',
                        height: 50
                    }, {
                        xtype: 'textfield',
                        anchor: '100%',
                        inputType: 'password',
                        name: 'retype',
                        allowBlank: false,
                        margin: '0 0 20 0',
                        emptyText: 'Retype Password',
                        height: 50
                    }, {
                        xtype: 'textfield',
                        anchor: '100%',
                        name: 'firstName',
                        allowBlank: false,
                        margin: '0 0 20 0',
                        emptyText: 'First Name',
                        height: 50
                    }, {
                        xtype: 'textfield',
                        anchor: '100%',
                        name: 'lastName',
                        allowBlank: false,
                        margin: '0 0 20 0',
                        emptyText: 'Last Name',
                        height: 50
                    }, {
                        xtype: 'button',
                        cls: 'btn btn-save btn-save-login',
                        text: 'Save',
                        width: '100%',
                        height: 50,
                        handler: 'onRegisterSave',
                        iconCls: 'fa-angle-right',
                        iconAlign: 'right'
                    }, {
                        title: 'OR',
                        margin: '15 0 15 0',
                        cls: 'line-or',
                        height: 15
                    }, {
                        xtype: 'button',
                        cls: 'btn btn-save btn-create-account',
                        text: 'Cancel',
                        width: '100%',
                        height: 50,
                        handler: function() {
                            register.close();
                        },
                        iconCls: 'x-btn-icon-el x-btn-icon-el-default-small fa-angle-left',
                        iconAlign: 'right'
                    }]
            }
        }).show();
    },
    onRegisterSave: function(btn) {
        var me = this,
                win = btn.up('window'),
                form = me.lookupReference('register');

        if (form.isValid()) {
            var formData = form.getForm().getValues();
            if (formData.password && formData.retype) {
                if (formData.password !== formData.retype) {
                    Ext.MessageBox.show({
                        title: 'Signup',
                        msg: 'Password and retype must the same',
                        icon: Ext.MessageBox.ERROR,
                        width: 400,
                        closable: false,
                        buttons: Ext.MessageBox.OK
                    });

                    return false;
                }
            }

            form.submit({
                url: InboxManagement.Global.getApiUrl() + 'auth/register',
                waitMsg: 'Loading...',
                method: 'POST',
                success: function(form, action) {
                    var res = Ext.decode(action.response.responseText);
                    Ext.MessageBox.show({
                        title: 'Signup',
                        msg: res.message,
                        width: 300,
                        closable: false,
                        buttons: Ext.MessageBox.OK
                    });

                    form.reset();
                    win.close();
                },
                failure: function(form, action) {
                    var res = Ext.decode(action.response.responseText);
                    Ext.MessageBox.show({
                        title: 'Signup',
                        msg: res.message,
                        icon: Ext.MessageBox.ERROR,
                        width: 300,
                        closable: false,
                        buttons: Ext.MessageBox.OK
                    });
                }
            });
        }
    }
});