Ext.define('InboxManagement.view.auth.PasswordController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.password',
    /*
     * Get reset token method
     * */
    onGetResetToken: function() {
        var me = this,
                form = this.lookupReference('password_form');
        if (form.isValid()) {
            /*
             * Make an ajax request to the server to get the code
             * */
            Ext.Ajax.request({
                url: InboxManagement.Global.getApiUrl() + 'auth/password',
                method: 'GET',
                params: form.getValues(), // Submit the email from the form as the params in the request
                success: function(response) {
                    var res = Ext.decode(response.responseText);
                    /*
                     * After decoding the response set the data in the viewModel. We change disabled, readOnly and html
                     * and update the password_token value to the response token
                     * */
                    me.getViewModel().setData({
                        disabled: false,
                        readOnly: true,
                        password_token: res.token,
                        html: 'Please enter a new password and submit'
                    });
                }
            })
        }
    },
    /*
     * Submit function
     * */
    onSubmit: function() {
        var me = this,
                form = this.lookupReference('password_form');
        if (form.isValid()) {
            Ext.MessageBox.show({
                title: 'Recover Password',
                msg: 'Attempting to reset password, please wait...',
                width: 200,
                closable: false
            });
            // Submit login form
            form.submit({
                url: InboxManagement.Global.getApiUrl() + '/auth/password',
                // If login is successful
                success: function(form, action) {
                    Ext.MessageBox.hide();
                    me.redirectTo('login', false);  // Redirect to login route
                },
                // If login is not successful
                failure: function(form, action) {
                    var res = Ext.decode(action.response.responseText);
                    Ext.MessageBox.hide();
                    // If the server returns user:false
                    if (!res.user) {
                        win.close();
                        me.redirectTo('register', false); // Redirect to the register route
                    }
                }
            });
        }
    }
});