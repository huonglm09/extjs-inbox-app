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
                    InboxManagement.Global.setUser(res.data);
                    me.redirectTo('profile');
                },
                failure: function(form, action) {
                    var res = Ext.decode(action.response.responseText);
                    Ext.MessageBox.show({
                        title : 'Login failed',
                        msg : res.message,
                        icon: Ext.MessageBox.ERROR,
                        width : 200,
                        closable : false,
                        buttons: Ext.MessageBox.OK
                    });
                }
            });
        }
    },
    /*
     * onRegister method is called when the options - register menu item is selected.  Redirects to register route
     * */
    onRegister: function() {
        this.redirectTo('register', false);
    },
    /*
     * onRecoverPassword method is called when the options - recover password menu item is selected.  Redirects to
     * password route
     * */
    onRecoverPassword: function() {
        this.redirectTo('password', false);
    }
});