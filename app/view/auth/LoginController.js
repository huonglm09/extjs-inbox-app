Ext.define('InboxManagement.view.auth.LoginController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.login',
    init: function() {
        new Ext.Panel({
            width: '100%',
            height: '100%',
            cls: 'login-bg',
            renderTo: document.body
        });
    },
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
                    self.redirectTo('profile');
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
        this.redirectTo('register', false);
    }
});