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
    },
    /*
     * The register VTypes method is where you can put form field vtypes to use throughout your application
     * */
    registerVtypes: function() {
        Ext.apply(Ext.form.field.VTypes, {
            /*
             * Passwordcheck.  This vtype will force a password be at least 8 chars in length and have 1 uppercase and 1 number
             * */
            passwordCheck: function(val) {
                var reg = /^.*(?=.{8,16})(?=.*\d)(?=.*[a-zA-Z]).*$/;
                return reg.test(val);
            },
            passwordCheckText: 'Password must be 8-16 characters in length and contain at least one number and one upper-case letter',
            /*
             * passwordmatch.  This vtype will make sure that passwords match in two different fields if comparing
             * */
            passwordMatch: function(value, field) {
                var password = field.up('form').down('#' + field.validateFieldId);
                return (value == password.getValue());
            },
            passwordMatchText: 'Passwords must match'
        });
    }
});