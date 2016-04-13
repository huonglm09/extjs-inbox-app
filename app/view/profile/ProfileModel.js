Ext.define('InboxManagement.view.profile.ProfileModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.profile',
    data: {
        profileStore : new InboxManagement.store.Profile()
    }, 
    formulas: {
        profile: function(get) {
            return get('profileStore').load();
        }
    }
});