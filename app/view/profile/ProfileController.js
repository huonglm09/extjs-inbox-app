/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('InboxManagement.view.profile.ProfileController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.profile',
    onSaveProfile: function(btn) {
        var me = this,
            form = me.lookupReference('profile-form');

        if (form.isValid()) {
            var formData = form.getForm().getValues();
            form.submit({
                url: InboxManagement.Global.getApiUrl() + 'users/edit/' + formData.id,
                waitMsg: 'Loading...',
                method: 'POST',
                success: function(form, action) {
                    var res = Ext.decode(action.response.responseText);
                },
                failure: function(form, action) {
                    var res = Ext.decode(action.response.responseText);
                    Ext.MessageBox.show({
                        title: 'Save Profile',
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
