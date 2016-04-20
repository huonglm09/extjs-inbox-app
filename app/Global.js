Ext.define('InboxManagement.Global', {
    requires: [
    ],
    singleton: true,
    config: {
        /*
         * URL to the Laravel directory
         * */
        apiUrl: 'http://' + window.location.host + window.location.pathname + 'api/public/api/',
        /*
         * User var.  This is updated upon successful login
         * */
        user: null,
        /*
         * Start token var.  This is updated when a major route is hit
         * */
        startToken: null,
        /*
         * Using view
         * */
        currentView: null
    },
    /*
     * Initialize the config in the constructor
     * */
    constructor: function(config) {
        this.initConfig(config);
    }
});