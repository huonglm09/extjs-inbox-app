Ext.define('InboxManagement.view.auth.RegisterController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.register',
    /*
     * Submit method
     * */
    onSubmit: function(btn) {
        var me = this, // Controller reference
                win = btn.up('window'), // Window reference
                form = me.lookupReference('register_form'); // Form reference
        // Check if form is valid
        if (form.isValid()) {
            // Pop-up a message for registration progress
            Ext.MessageBox.show({
                title: 'Register',
                msg: 'Attempting to register, please wait...',
                width: 200,
                closable: false
            });
            form.submit({
                url: InboxManagement.Global.getApiUrl() + '/auth/register',
                // If registration is successful
                success: function(form, action) {
                    Ext.MessageBox.hide();
                    win.close(); // Close the registration form
                    me.redirectTo('login', false); // Redirect to the login route
                },
                // If registration is not successful
                failure: function(form, action) {
                    var res = Ext.decode(action.response.responseText);
                    Ext.MessageBox.hide();
                    // Show the error returned by the server
                    Ext.MessageBox.show({
                        title: 'Error',
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