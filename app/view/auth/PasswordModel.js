Ext.define('InboxManagement.view.auth.PasswordModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.password',
    /*
     * Data config
     * */
    data: {
        html: 'To recover your password submit your email and you will be provided with a code to reset your password',
        disabled: true
    }
});
