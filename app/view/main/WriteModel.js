/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('InboxManagement.view.main.WriteModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.write',
    requires: [
        'InboxManagement.Global'
    ],
    data: {
        email: 'huonglm@qsoft.com'
    }
});

