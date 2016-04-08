Ext.define('InboxManagement.view.profile.ProfileModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.profile',
    data: {
        profile : new InboxManagement.store.Profile()
    }
});