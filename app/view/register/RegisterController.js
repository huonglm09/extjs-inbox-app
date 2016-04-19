Ext.define('InboxManagement.view.register.RegisterController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.register',
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
            form = me.lookupReference('register'),
            password;

        if (form.isValid()) {
            form.submit({
                url: InboxManagement.Global.getApiUrl() + 'auth/register',
                waitMsg: 'Loading...',
                method: 'POST',
                success: function(form, action) {                    
                    win.close();                    
                    me.redirectTo('login');
                },
                failure: function(form, action) {
                    var res = Ext.decode(action.response.responseText);
                    Ext.MessageBox.show({
                        title: 'Register failed',
                        msg: res.message,
                        icon: Ext.MessageBox.ERROR,
                        width: 200,
                        closable: false,
                        buttons: Ext.MessageBox.OK
                    });
                }
            });
        }
    }
});