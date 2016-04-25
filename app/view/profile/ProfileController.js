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
            if (formData.password && formData.retype) {
                if (formData.password !== formData.retype) {
                    Ext.MessageBox.show({
                        title: 'Save Profile',
                        msg: 'Password and retype must the same',
                        icon: Ext.MessageBox.ERROR,
                        width: 400,
                        closable: false,
                        buttons: Ext.MessageBox.OK
                    });

                    return false;
                }
            }

            form.submit({
                url: InboxManagement.Global.getApiUrl() + 'users/update',
                waitMsg: 'Loading...',
                method: 'POST',
                success: function(form, action) {
                    var res = Ext.decode(action.response.responseText);                    
                    var el = Ext.getCmp('profile-main');
                    Ext.suspendLayouts();
                    el.removeAll(true);
                    el.add(Ext.apply({xtype: 'profile'}));
                    Ext.resumeLayouts(true);
                    Ext.MessageBox.show({
                        title: 'Save Profile',
                        msg: res.message,
                        width: 400,
                        closable: false,
                        buttons: Ext.MessageBox.OK
                    });
                },
                failure: function(form, action) {
                    var res = Ext.decode(action.response.responseText);
                    Ext.MessageBox.show({
                        title: 'Save Profile',
                        msg: res.message,
                        icon: Ext.MessageBox.ERROR,
                        width: 400,
                        closable: false,
                        buttons: Ext.MessageBox.OK
                    });
                }
            });
        }
    }
});