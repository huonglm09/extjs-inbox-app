Ext.define('InboxManagement.Application', {
    extend: 'Ext.app.Application',
    requires: [
        'InboxManagement.Global'
    ],
    name: 'InboxManagement',
    /*
     * The default hash for the router
     * */
    defaultToken: 'inbox',
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
        //InboxManagement.Global.registerVtypes();
    }
});
