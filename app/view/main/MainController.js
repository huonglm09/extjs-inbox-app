/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('InboxManagement.view.main.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main',
    onItemSelected: function(sender, record) {

    },
    onConfirm: function(choice) {

    },
    onChangeTab: function(tabPanel, newCard, oldCard, eOpts) {
        if (newCard.title === 'Logout') {   
            var me = this;
            Ext.Ajax.request({
                url: InboxManagement.Global.getApiUrl() + 'auth/logout',
                method: 'GET',                
                success:function(response){   
                    me.getView().destroy();
                    me.redirectTo('login');       
                }, failure:function() {
                    me.redirectTo('profile'); 
                }
            });                          
        }
    }
});
