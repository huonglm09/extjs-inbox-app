/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('InboxManagement.view.write.WriteController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.write',
    onDiscard: function() {
        var me = this,
                form = me.lookupReference('write_form');
        form.reset();

        this.redirectTo('inbox');
    },
    onWrite: function(btn) {
        var me = this,
                form = me.lookupReference('write_form');

        if (form.isValid()) {
            form.submit({
                url: InboxManagement.Global.getApiUrl() + 'write-email',
                waitMsg: 'Loading...',
                method: 'POST',
                success: function(form, action) {
                    var res = Ext.decode(action.response.responseText);
                    form.reset();
                    me.redirectTo('sent');
                }, failure: function(form, action) {
                    var res = Ext.decode(action.response.responseText);
                    Ext.MessageBox.show({
                        title: 'Compose',
                        msg: 'Please try again',
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

