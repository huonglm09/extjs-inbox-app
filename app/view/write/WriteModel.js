/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('InboxManagement.view.write.WriteModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.write',
    requires: [
        'InboxManagement.Global'
    ],
    data: {
        email: 'kmahuong.09@gmail.com'
    }
});

