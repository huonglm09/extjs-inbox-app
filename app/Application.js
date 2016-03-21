Ext.define('InboxManagement.Application', {
    extend: 'Ext.app.Application',
    requires: [
        'InboxManagement.Global'
    ],
    name: 'InboxManagement',
    /*
     * The default hash for the router
     * */
    defaultToken: 'home',
    /*
     * Define the router controller
     * */
    controllers: [
        'Routes'
    ],
    stores: [],
    launch: function() {
        /*
         * Calling the registerVtypes method in the Global singleton to set up the vtypes to use in the application
         * */
        InboxManagement.Global.registerVtypes();
    },
    onAppUpdate: function() {
        Ext.Msg.confirm('Application Update', 'This application has an update, reload?',
                function(choice) {
                    if (choice === 'yes') {
                        window.location.reload();
                    }
                }
        );
    }
});
