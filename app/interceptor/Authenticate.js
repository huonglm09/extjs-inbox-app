(function() {
    'use strict';
    Ext.define('InboxManagement.interceptor.Authenticate', {
        singleton: true,
        init: function() {
            Ext.Ajax.on({
                beforerequest: this.onBeforeRequest,
                requestcomplete: this.onRequestComplete,
                requestexception: this.onRequestException
            });
        },
        onBeforeRequest: function(conn, options, eOpts) {

        },
        onRequestComplete: function(conn, response, options, eOpts) {

        },
        onRequestException: function(conn, response, options, eOpts) {
            if (response.status === 401) {
                console.log('User not authorized');
            }
        }
    });
})();